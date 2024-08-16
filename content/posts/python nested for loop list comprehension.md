+++
title="Python double/nested for loop list comprehension"
description="Python double/nested for loop list comprehension: How to use list comprehension to create a new list from an existing list."
date="2020-11-25"
[extra]
og_preview_img = "/images/posts/python-nested-for-loop-list-comprehension.webp"
[taxonomies]
tags=["programming", "python"]
categories=["python"]
+++

### Single for-loop with if condition

```python
my_list = []
for x in range(3):
    if x % 2 == 0:
        my_list.append(x)
```

In List comprehension

```python
>>> my_list = [x for x in range(3) if x % 2 == 0]
>>> my_list
[0, 2]
```

### Single for-loop with if-else conditions

```python
my_list = []
for x in range(3):
    if x % 2 == 0:
        my_list.append(y)
    else:
        my_list.append('odd')
```

In List comprehension

```python
>>> my_list = [x if x % 2 == 0 else 'odd' for x in range(3)]
>>> my_list
[0, 'odd', 2]
```

### Double for-loops with if condition

```python
my_list = []
for x in range(3):
    for y in range(x):
        if y % 2 == 0:
            my_list.append(y)
```

In List comprehension

```python
>>> my_list = [y for x in range(3) for y in range(x) if y % 2 == 0]
>>> my_list
[0, 0]
```

See how the outer for loop came first then the inner for loop

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1678766499844/89d7af34-f7bf-467b-b491-35f4ea15ec56.gif)

### Double for-loops with if and else conditions

```python
my_list = []
for x in range(3):
    for y in range(x):
        if y % 2 == 0:
            my_list.append(y)
        else:
            my_list.append('odd')
```

In List comprehension

```python
>>> my_list = [y if y % 2 == 0 else 'odd' for x in range(3) for y in range(x)]
>>> my_list
[0, 0, 'odd']
```

*Disclaimer:* Writing double for loops with if-else conditions severely affects the readability of the code. Please use it at your own risk.