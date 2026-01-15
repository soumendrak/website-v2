+++
path = "blog/cache-heavy-computation-functions-with-timeout"
title="Cache heavy computation functions with a timeout value"
description="How to cache heavy computation functions with a specific timeout value."
date="2020-11-25"
updated="2025-06-14"
[extra]
social_media_card = "cache-heavy-computation-functions-with-timeout.webp"

[taxonomies]
tags=["programming", "python"]
+++
## Cache heavy computation functions with a timeout value

## Traditional lru_cache

``` python
from functools import lru_cache
from time import sleep


@lru_cache
def heavy_computation_function(*args):
    sleep(25) # to mimic heavy computation
    computed_value = 12345
    return computed_value

```
## Limitation

- `lru_cache` you can use as a decorator to cache the return value from a function. 
- It has `maxsize` argument to set a limit to the size of the cache, but not a `seconds` argument to set an expiry time for the cache.

## Solution

The following code snippet overcomes the limitation:

``` python
def timed_lru_cache(
    _func=None, *, seconds: int = 7000, maxsize: int = 128, typed: bool = False
):
    """ Extension over existing lru_cache with timeout
    :param seconds: timeout value
    :param maxsize: maximum size of the cache
    :param typed: whether different keys for different types of cache keys
    """

    def wrapper_cache(f):
        # create a function wrapped with traditional lru_cache
        f = lru_cache(maxsize=maxsize, typed=typed)(f)
        # convert seconds to nanoseconds to set the expiry time in nanoseconds
        f.delta = seconds * 10 ** 9  
        f.expiration = monotonic_ns() + f.delta

        @wraps(f)  # wraps is used to access the decorated function attributes
        def wrapped_f(*args, **kwargs):
            if monotonic_ns() >= f.expiration:
                # if the current cache expired of the decorated function then 
                # clear cache for that function and set a new cache value with new expiration time 
                f.cache_clear()
                f.expiration = monotonic_ns() + f.delta
            return f(*args, **kwargs)

        wrapped_f.cache_info = f.cache_info
        wrapped_f.cache_clear = f.cache_clear
        return wrapped_f

    # To allow decorator to be used without arguments
    if _func is None:
        return wrapper_cache
    else:
        return wrapper_cache(_func)
```


## Unit test case for the above function:

``` python
import time

import timed_lru_cache


def test_cache():
    count = 0
    count2 = 0

    @timed_lru_cache(seconds=1)
    def test(arg1):
        nonlocal count
        count += 1
        return count

    @timed_lru_cache(seconds=10)
    def test_another(arg2):
        nonlocal count2
        count2 += 1
        return count2

    assert test(1) == 1, "Function test with arg 1 should be called the first time we invoke it"
    assert (
        test(1) == 2
    ), "Function test with arg 1 should not be called because it is already cached"

    assert test(-1) == 2, "Function test with arg -1 should be called the first time we invoke it"
    assert (
        test(-1) == 2
    ), "Function test with arg -1 should not be called because it is already cached"

    assert (
        test_another(1) == 1
    ), "Function test_another with arg 1 should be called the first time we invoke it"
    assert (
        test_another(1) == 1
    ), "Function test_another with arg 1 should not be called because it is already cached"

    # Let's now wait for the cache to expire
    time.sleep(1)

    assert (
        test(1) == 3
    ), "Function test with arg 1 should be called because the cache already expired"
    assert (
        test(-1) == 4
    ), "Function test with arg -1 should be called because the cache already expired"

    # func.cache_clear clear func's cache, not all lru cache
    assert (
        test_another(1) == 1
    ), "Function test_another with arg 1 should not be called because the cache NOT expired yet"

```
- Source: https://gist.github.com/Morreski/c1d08a3afa4040815eafd3891e16b945
- Photo by <a href="https://unsplash.com/@loic?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Djim Loic</a> on <a href="https://unsplash.com/s/photos/time?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

## Related Articles

- [Optimize Your Python Code](@/blog/2018/10/optimize-your-python-code/index.md) - Performance improvement techniques
- [Cool Python Tricks You Should Use](@/blog/2020/11/cool-python-tricks-you-are-not-using-but-you-should/index.md) - Advanced Python tips
- [10 Best Practices for Python Code](@/blog/2023/03/10-best-practices-for-your-python-code/index.md) - Essential coding practices
- [Python vs Golang vs Rust](@/blog/2022/05/python-vs-golang-vs-rust/index.md) - Language performance comparison
- [Production Readiness Checklist](@/blog/2024/08/production-readiness-checklist/index.md) - Preparing code for production
  