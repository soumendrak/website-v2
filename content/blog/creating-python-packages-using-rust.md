+++
title="Creating Python packages using Rust"
description="Creating Python Packages with Rust: A Comprehensive Guide"
date="2025-03-23"
updated="2025-12-02"
[extra]
social_media_card = "/images/posts/rust/title.webp"

[taxonomies]
tags=["python", "rust", "python-projects"]

+++


![Cover Picture](/posts/rust/title.webp)
Python's simplicity and vast ecosystem make it a favorite among developers, but when performance becomes a bottleneck, traditional approaches like C extensions can fall short.
Enter Rust - a modern, memory-safe language that's transforming how we build high-performance Python tools. In this blog post, we'll explore how to create Python packages with Rust, leveraging its speed and safety. From real-world examples like Ruff and uv to hands-on tutorials with PyO3, this guide has you covered. Let's dive in!
![Python and Rust](/images/posts/rust/1.webp)
Python and Rust

---

## The Rise of Rust-Powered Python Tools
Rust has emerged as a game-changer for Python developers, powering tools that prioritize performance without sacrificing safety.
Take Ruff, a Python linter that's 10–100x faster than traditional options like Flake8, or uv, a package manager that outpaces pip by 8–10x. These tools exemplify how Rust enhances Python, making it ideal for performance-critical tasks.

## Why Combine Python and Rust?
![Why Combine Python and Rust](/images/posts/rust/2.webp)
Python shines in rapid prototyping and ease of use, but its interpreted nature and Global Interpreter Lock (GIL) limit performance in computationally intensive scenarios.
Rust, by contrast, offers blazing-fast execution and memory safety, preventing crashes and vulnerabilities common in C extensions.
By combining them, you can write performance-critical code in Rust while keeping Python's user-friendly interface; a perfect synergy.

---

## Understanding Python Packaging Challenges
### Performance Bottlenecks in Pure Python Packages
Pure Python excels for quick development, but tasks like numerical computations or large-scale data processing expose its limits.
The GIL restricts true parallelism, and its interpreted nature slows execution.
For example, a Medium article highlights how Python struggles with CPU-bound tasks, pushing developers to seek faster alternatives.

### The C Extension Approach and Its Limitations
Historically, C extensions addressed these bottlenecks, but they come with trade-offs. Writing C is complex, and memory errors - like null pointer dereferences - can crash applications.
A Pythonspeed article notes additional overhead from function calls and debugging challenges, making C less appealing today.

## Rust as the Modern Alternative
### Rust's Safety and Performance Advantages
Rust eliminates memory bugs at compile time, offering safety without a garbage collector. Its performance rivals C/C++, making it a compelling choice for Python extensions.
According to Emeritus, Rust's adoption in major projects - like a 2024 White House report praising memory-safe languages - underscores its reliability.

### Comparing Rust to C/C++ for Python Extensions
Unlike C/C++, Rust's PyO3 framework simplifies bindings, as noted in DataCamp.
Compared to Cython, which is Pythonic but less performant for complex tasks, Rust excels in safety and speed, supported by a rich ecosystem on crates.io.

## Case Studies: Ruff and uv
### Ruff: A Blazingly Fast Python Linter
Ruff redefines linting, running checks in sub-second times on large codebases - 10–100x faster than Flake8. Adopted by projects like Apache Airflow, it's a testament to Rust's real-world impact (Jerrycodes).
### uv: Reimagining Python Package Management
uv accelerates package installation, resolving dependencies in 0.60s versus pip's slower pace - up to 115x faster with caching. Its ease of use makes it a drop-in replacement for pip (Bitecode).

![Ruff and uv](/images/posts/rust/3.webp)
Rust python package benchmarks

## Getting Started with PyO3
### Setting Up Your Development Environment
To begin, install Rust via rustup, then set up a Python virtual environment:
```sh
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install maturin
```
Maturin simplifies building Rust-Python packages (Depth-First).
## The PyO3 Framework: Bridging Rust and Python
PyO3 connects Rust to Python seamlessly. Create a new project:
```sh
maturin new my_package
cd my_package
```
Edit lib.rs with a simple function:

```rust
use pyo3::prelude::*;

#[pyfunction]
fn sum_as_string(a: i32, b: i32) -> PyResult<String> {
    Ok((a + b).to_string())
}

#[pymodule]
fn my_package(_py: Python, m: &PyModule) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(sum_as_string, m)?)?;
    Ok(())
}
```
Build and test:
```sh
maturin develop
python -c "import my_package; print(my_package.sum_as_string(5, 20))"
# Outputs: '25'
```
See PyO3 GitHub for more.

## Building Your First Rust-Powered Python Package
Project Structure and Organization
A typical structure uses Cargo for Rust and setuptools for Python:
```sh
my_package/
├── Cargo.toml
├── pyproject.toml
└── src/
    └── lib.rs
```
## Writing Rust Functions for Python Consumption
Extend the example with error handling:
```rust
use pyo3::exceptions::PyValueError;

#[pyfunction]
fn divide(a: f64, b: f64) -> PyResult<f64> {
    if b == 0.0 {
        Err(PyValueError::new_err("Cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}
```
## Error Handling Across Language Boundaries
PyO3 converts Rust errors to Python exceptions, ensuring smooth integration (Medium).
## Distribution Considerations
### Packaging for Multiple Platforms
Use Maturin to build wheels:
```sh
maturin publish
```
For broader compatibility, tools like cibuildwheel automate multi-platform builds (Yossarian).
Managing Binary Wheels and Compatibility
Ensure Rust dependencies are bundled, and test across Windows, Linux, and macOS to avoid runtime issues.

---

Testing and Benchmarking
Validating Correctness
Use pytest for Python-side tests:
```python
import my_package

def test_divide():
    assert my_package.divide(10, 2) == 5.0
```
## Measuring Performance Gains
Benchmark with timeit:
```python
import timeit
print(timeit.timeit("my_package.sum_as_string(5, 20)", setup="import my_package"))
```
Rust extensions often yield significant speedups (Red Hat).
## Advanced Techniques
### Memory Management Between Rust and Python
PyO3 handles memory safely, but avoid leaks by managing Python object references carefully.
### Parallel Processing Strategies
Use Rust's Rayon crate for parallelism:
```rust
use pyo3::Python;
use rayon::prelude::*;

#[pyfunction]
fn parallel_sum(py: Python, numbers: Vec<i32>) -> PyResult<i32> {
    let sum = py.allow_threads(|| numbers.par_iter().sum());
    Ok(sum)
}
```
## Leveraging Rust's Ecosystem
Explore crates.io for libraries enhancing Python packages.

---

## Conclusion and Future Directions
### When to Choose Rust for Python Tools
Opt for Rust in performance-critical scenarios or when safety is non-negotiable - think linters, data processing, or package managers.
### The Growing Ecosystem of Rust-Python Hybrids
With tools like Polars joining Ruff and uv, the Rust-Python ecosystem is thriving. As adoption grows, expect tighter integration and more hybrid tools.
Ready to supercharge your Python projects? Start experimenting with Rust today!
## Key Citations
- [Using Rust with Python](https://www.linkedin.com/learning/using-rust-with-python) - LinkedIn Learning course
- [Ruff GitHub: An extremely fast Python linter and code formatter, written in Rust](https://github.com/astral-sh/ruff)
- [uv PyPI: An extremely fast Python package and project manager, written in Rust](https://pypi.org/project/uv/)
- [Write a Python module in Rust tutorial](https://mathspp.com/blog/write-a-python-module-in-rust)
- [Writing and publishing a Python module in Rust blog](https://blog.yossarian.net/2020/08/02/Writing-and-publishing-a-python-module-in-rust)
- [Cython, Rust, and more: choosing a language for Python extensions](https://pythonspeed.com/articles/rust-cython-python-extensions/)
- [PyO3 GitHub: Rust bindings for the Python interpreter](https://github.com/PyO3/pyo3)
- [Create a Python Package with Super-Fast Rust Code in 3 Steps article](https://towardsdatascience.com/create-a-python-package-with-super-fast-rust-code-in-3-steps-a27389629beb/)
- [How to use Rust with Python, and Python with Rust article](https://www.infoworld.com/article/2335770/how-to-use-rust-with-python-and-python-with-rust.html)
- [Speed up your Python using Rust article](https://developers.redhat.com/blog/2017/11/16/speed-python-using-rust)
- [Python Extensions in Pure Rust with Rust-CPython article](https://depth-first.com/articles/2022/03/09/python-extensions-in-pure-rust-with-rust-cpython/)
- [Rust vs. Python: Strengths, challenges and use cases](https://www.techtarget.com/searchapparchitecture/tip/When-to-use-Rust-vs-Python)
- [Why you should use Python and Rust together](https://opensource.com/article/23/3/python-loves-rust)
- [Make Python Hundreds of Times Faster With a C-Extension](https://medium.com/swlh/make-python-hundreds-of-times-faster-with-a-c-extension-9d0a5180063e)
- [The hidden performance overhead of Python C extensions](https://pythonspeed.com/articles/python-extension-performance/)
- [What is Rust Programming Language? Learn its Unique Benefits](https://emeritus.org/blog/coding-rust-programming-language/)
- [Rust vs Python: Choosing the Right Language for Your Data Project](https://www.datacamp.com/blog/rust-vs-python)
- [Ruff: one Python linter to rule them all](https://blog.jerrycodes.com/ruff-the-python-linter/)
- [A year of uv: pros, cons, and should you migrate](https://www.bitecode.dev/p/a-year-of-uv-pros-cons-and-should)