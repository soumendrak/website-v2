+++
title = "Targeted Profiling in Python using tprof"
description = "How to use tprof for targeted profiling in Python."
date = "2026-01-15"

[taxonomies]
tags=["Python", "Profiling", "tprof"]

[extra]
social_media_card = "/images/posts/targeted-profiling-cover.webp"
+++

![Targeted Profiling with tprof](/images/posts/targeted-profiling-cover.webp)

Recently, I was working on a project that involved processing large JSON datasets and needed to optimize the performance of JSON serialization and deserialization. I ran a quick benchmark using **[tprof](https://github.com/adamchainz/tprof)**, a lightweight targeting profiler and the results were eye-opening.

## The Setup

I created a realistic dataset: 10,000 user records with IDs, names, emails, and status flags. Then I compared serialization and deserialization speeds between Python's built-in `json` and **[orjson](https://github.com/ijl/orjson)**, a Rust-powered alternative.

```python
from tprof import tprof
import json
import orjson

data = {
    "users": [
        {"id": i, "name": f"user_{i}", "email": f"user_{i}@example.com", "active": i % 2 == 0}
        for i in range(10_000)
    ]
}

with tprof(json_serialize, orjson_serialize, compare=True):
    for _ in range(100):
        json_serialize()
        orjson_serialize()
```

## The Results

| Operation | json | orjson | Improvement |
|-----------|------|--------|-------------|
| **Serialization (bytes)** | 3ms | 472μs | **86% faster** |
| **Serialization (str, apple-to-apple)** | 3ms | 512μs | **85% faster** |
| **Deserialization** | 4ms | 2ms | **59% faster** |

I knew that orjson was faster than the built-in json library, but I was surprised by the extent of the difference. 

**orjson is roughly 6x faster for serialization** and about 2x faster for deserialization. Even with `.decode("utf-8")` to convert bytes to string, orjson remains ~85% faster, the decode overhead is negligible (~40μs).

## Why tprof Over cProfile?

Traditional profilers like `cProfile` are great for finding bottlenecks, but they have drawbacks when you're in the optimization loop:

| Aspect | cProfile | tprof |
|--------|----------|-------|
| **Scope** | Profiles *entire* program | Profiles only *target* functions |
| **Overhead** | Adds overhead to all function calls | Zero overhead for non-target code |
| **Output** | Verbose stats for everything | Focused report on what you care about |
| **API** | `sys.setprofile` (older) | `sys.monitoring` (Python 3.12+) |
| **Timing** | Python-level timing | C-level timing for precision |
| **Use case** | Finding bottlenecks | Measuring optimization impact |

### How tprof Works

tprof uses Python 3.12's `sys.monitoring` a low-level API that lets you register callbacks for *specific* functions only. Unlike `cProfile` which instruments every function call, tprof adds **zero overhead** to code outside your targets.

```python
# cProfile workflow: profile everything, dig through output
python -m cProfile -s cumtime myscript.py | grep "my_function"

# tprof workflow: profile only what matters
tprof -t my_module:my_function ./myscript.py
```

### When to Use Each

**Use cProfile when:**
- You don't know where the bottleneck is
- You need a full program profile
- You're on Python < 3.12

**Use tprof when:**
- You've identified the slow function and want to measure optimization impact
- You want to compare "before" and "after" implementations
- You need minimal profiling overhead
- You want a quick, focused report

The `compare=True` flag is particularly useful it gives you a delta column showing exactly how much faster one approach is versus another.

## Other Python Profiling Tools

tprof isn't the only option. Here's how it fits into the broader profiling ecosystem:

| Tool | Type | Best For | Overhead |
|------|------|----------|----------|
| **[cProfile](https://docs.python.org/3/library/profile.html)** | Deterministic | Finding bottlenecks (full program) | Medium |
| **[tprof](https://github.com/adamchainz/tprof)** | Targeted | Measuring specific functions (Python 3.12+) | Very Low |
| **[Pyinstrument](https://github.com/joerick/pyinstrument)** | Sampling | Clean call stack visualization | Low |
| **[py-spy](https://github.com/benfred/py-spy)** | Sampling | Production profiling, live processes | Very Low |
| **[Scalene](https://github.com/plasma-umass/scalene)** | Sampling | CPU + Memory analysis together | Low |
| **[line_profiler](https://github.com/pyutils/line_profiler)** | Line-level | Finding slow lines within a function | High |
| **[memory_profiler](https://github.com/pythonprofilers/memory_profiler)** | Memory | Tracking memory usage per line | High |


### Choosing the Right Tool

| Scenario | Recommended Tool |
|----------|------------------|
| Don't know where the bottleneck is | cProfile, Pyinstrument |
| Optimizing a known slow function | **tprof**, line_profiler |
| Production debugging (live process) | py-spy |
| Memory leaks or high memory usage | Scalene, memory_profiler |
| Comparing "before" vs "after" implementations | **tprof** (`compare=True`) |
| Python 3.12+ with minimal overhead | **tprof** |

**tprof fills a unique niche**: it's specifically designed for the "measure → optimize → re-measure" loop with zero overhead on non-target code.

## The Bytes vs String Tradeoff

The biggest difference: **`orjson.dumps()` returns `bytes`, not `str`**.

```python
import json, orjson

json.dumps({"key": "value"})    # Returns: '{"key": "value"}' (str)
orjson.dumps({"key": "value"})  # Returns: b'{"key": "value"}' (bytes)
```

**Why bytes?** According to the orjson maintainers, "bytes is the correct type for a serialized blob." It avoids an extra encoding step and is what you'd send over the wire anyway.

**Does decoding hurt performance?** Barely. Our benchmark shows:
- **orjson (bytes)**: 472μs → 86% faster
- **orjson (str with decode)**: 512μs → 85% faster

The `.decode("utf-8")` adds only ~40μs negligible compared to the 2.5ms+ you save.

**When this matters:**
- **Web frameworks**: Most frameworks (FastAPI, Flask) handle bytes fine, but if your code explicitly expects `str`, you'll need `.decode()`:
  ```python
  orjson.dumps(data).decode("utf-8")  # Convert to string if needed
  ```
- **String concatenation**: You can't do `"prefix" + orjson.dumps(data)` directly use `b"prefix"` or decode first.

## When NOT to Use orjson

orjson isn't always the right choice:

| Limitation | Details |
|------------|---------|
| **No `object_hook`** | Can't deserialize directly to dataclasses, UUIDs, or custom types use a validation library like Pydantic |
| **No custom indentation** | Only `OPT_INDENT_2` is supported, no `indent=4` |
| **No `ensure_ascii`** | UTF-8 characters cannot be escaped to ASCII |
| **Non-string dict keys** | Requires explicit `option=orjson.OPT_NON_STR_KEYS` flag |
| **No NDJSON/JSONL** | Use [orjsonl](https://github.com/umarbutler/orjsonl) instead |
| **No JSON5/RJSON** | Strictly RFC 8259 compliant only |
| **Stricter validation** | Raises errors on invalid UTF-8 strings, integers > 64 bits |

## Should You Switch?

**Use orjson if:**
- Building APIs that serialize large responses
- Processing JSON logs or data pipelines
- Working with microservices where latency matters
- You need native support for `datetime`, `dataclass`, `numpy`, `UUID`

**Stick with stdlib `json` if:**
- You need `object_hook` for custom deserialization
- You require custom indentation levels
- You need ASCII escaping for legacy systems
- Minimal dependencies matter more than speed

## Related Articles

- [Creating Python Packages Using Rust](@/blog/2025/03/creating-python-packages-using-rust.md)
- [Patching a memory leak](@/blog/2024/05/patching-a-memory-leak.md)
- [Optimize your Python code](@/blog/2018/10/optimize-your-python-code.md)
- [Python vs Golang vs Rust](@/blog/2022/05/python-vs-golang-vs-rust.md)

---

## Appendix

Try it yourself:

```bash
# Create a new project
uv init targeted-profiling
cd targeted-profiling

# Add dependencies
uv add tprof orjson
```

I can not share the actual proprietary code I have tested with here is an equivalent code snippet (Claude Code generated):

```python
import json
import orjson
from tprof import tprof

# Sample data to serialize/deserialize
data = {
    "users": [
        {"id": i, "name": f"user_{i}", "email": f"user_{i}@example.com", "active": i % 2 == 0}
        for i in range(10_000)
    ],
    "metadata": {"version": "1.0", "count": 10_000}
}

# Pre-serialize for deserialization benchmarks
json_string = json.dumps(data)
orjson_bytes = orjson.dumps(data)


def json_serialize():
    """Standard library json serialization"""
    return json.dumps(data)


def orjson_serialize_bytes():
    """orjson serialization (returns bytes)"""
    return orjson.dumps(data)


def orjson_serialize_str():
    """orjson serialization with decode to string (apple-to-apple comparison)"""
    return orjson.dumps(data).decode("utf-8")


def json_deserialize():
    """Standard library json deserialization"""
    return json.loads(json_string)


def orjson_deserialize():
    """orjson deserialization"""
    return orjson.loads(orjson_bytes)


if __name__ == "__main__":
    # Compare serialization performance (bytes vs str)
    print("=== Serialization Comparison (orjson returns bytes) ===")
    with tprof(json_serialize, orjson_serialize_bytes, compare=True):
        for _ in range(100):
            json_serialize()
            orjson_serialize_bytes()

    # Apple-to-apple comparison (both return str)
    print("\n=== Serialization Comparison (apple-to-apple, both return str) ===")
    with tprof(json_serialize, orjson_serialize_str, compare=True):
        for _ in range(100):
            json_serialize()
            orjson_serialize_str()

    # Compare deserialization performance
    print("\n=== Deserialization Comparison ===")
    with tprof(json_deserialize, orjson_deserialize, compare=True):
        for _ in range(100):
            json_deserialize()
            orjson_deserialize()

```
## Appendix
The output of the benchmark is:

```bash
uv run orjson_vs_json_benchmark.py       
=== Serialization Comparison (orjson returns bytes) ===
🎯 tprof results:
 function                          calls total  mean ± σ      min … max   delta   
 __main__:json_serialize()           100 338ms   3ms ± 64μs   3ms … 4ms   -       
 __main__:orjson_serialize_bytes()   100  45ms 455μs ± 27μs 440μs … 592μs -86.53% 

=== Serialization Comparison (apple-to-apple, both return str) ===
🎯 tprof results:
 function                        calls total  mean ± σ      min … max   delta   
 __main__:json_serialize()         100 339ms   3ms ± 93μs   3ms … 4ms   -       
 __main__:orjson_serialize_str()   100  49ms 487μs ± 19μs 473μs … 589μs -85.63% 

=== Deserialization Comparison ===
🎯 tprof results:
 function                      calls total mean ± σ   min … max  delta   
 __main__:json_deserialize()     100 406ms  4ms ± 1ms 4ms … 17ms -       
 __main__:orjson_deserialize()   100 178ms  2ms ± 2ms 1ms … 20ms -56.22% 
```

---

*Benchmarked on Python 3.12 using tprof 1.0.0*
