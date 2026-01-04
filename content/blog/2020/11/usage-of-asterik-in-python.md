+++
path = "blog/usage-of-asterik-in-python"
title="5 usages of an asterisk (*) in Python"
description="5 usages of an asterisk (*) in Python"
date="2020-11-25"
updated="2025-06-10"

[taxonomies]
tags=["programming", "python"]
+++
## 5 usages of an asterisk (*) in Python

# Star and Python

A star can be used in many scenarios in Python. Let's start.

## 1. Star as a multiplication operator

``` python
>>> 5 * 6
30
>>> 'star' * 2
starstar
>>> ['star'] * 2
['star', 'star']
```
## 2. Stars as exponential operator

``` python
>>> 2 ** 3
8
```

## 3. Star in arguments

``` python
>>> def add_num(*args):
...     for arg in args: print(arg)
...     return f"the sum is: {sum(args)}"
... 
>>> add_num(1,2,3)
1
2
3
the sum is: 6
```
Here the star helps to unpack iterables; called as **unpacking operator**.

## 4. Stars in keyword arguments

``` python
>>> def add_num(**kwargs):
...     return f"the sum is: {sum(kwargs.values())}"
...
>>> add_num(a=1, b=2, c=3)
the sum is: 6
```
Double stars can be used to unpack a dictionary

## 5. Stars to update two dictionaries

Merging two dictionaries can be done in many ways.

``` python
>>> x = {'a': 1, 'b': 2}
>>> y = {'a': 10, 'c': 30}
>>> yy = {'aa': 10, 'c': 30}
>>> z = x | y  # Union operator introduced recently
>>> z
{'a': 10, 'b': 2, 'c': 30}
>>> x.update(y)  # in place update
# as `y` value getting updated in `x`, `a` value getting overwritten from 1 to 10.
>>> x
{'a': 10, 'b': 2, 'c': 30}
>>> z = dict(**x, **yy)
>>> z
{'a': 1, 'b': 2, 'aa': 10, 'c': 30}
# same key in two dictionaries will throw error
>>> z = dict(**x, **y)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: dict() got multiple values for keyword argument 'a'

```
## Related Articles
- [Cool Python tricks you are not using, but you should](@/blog/2020/11/cool-python-tricks-you-are-not-using-but-you-should.md) - Advanced Python tips and tricks
- [Usage of the Underscore(_) in Python](@/blog/2021/07/usage-of-underscore-in-python.md) - More special Python syntax features
- [10 Best Practices for your Python code](@/blog/2023/03/10-best-practices-for-your-python-code.md) - Writing better Python code
- [Optimize your Python code](@/blog/2018/10/optimize-your-python-code.md) - Python performance optimization

Photo by <a href="https://unsplash.com/@mikekilcoyne?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Michael Kilcoyne</a> on <a href="https://unsplash.com/s/photos/star?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
