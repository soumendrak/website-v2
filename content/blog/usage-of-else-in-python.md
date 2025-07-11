+++
title = "Usage of 'else' in Python"
description = "How the 'else' keyword in Python works and its different uses."
date = "2024-03-18"
updated = "2025-06-14"
[extra]
social_media_card = "/images/posts/usage-of-else-in-python.webp"

[taxonomies]
tags=["python", "loops", "tips", "conditional-statement", "exceptionhandling"]

+++

The `else` keyword in Python has a few different applications, but it primarily functions within conditional statements:

## Conditions

- `if...else` statements: This is the most common use of `else`.
- It allows you to define an alternate block of code to execute if the condition in the `if` statement is False.

```python
age = 12
if age >= 18:
    print("You are eligible to vote.")
else:
    print("You are not eligible to vote.")
```

- `else` with ternary operator

```python
age = 12
print("You are eligible to vote.") if age >= 18 else print("You are not eligible to vote.")

# You are not eligible to vote.
```

- `else` with comprehension

```python
# Even/Odd Marker
numbers_list = ["even" if num %2 == 0 else "odd" for num in range(10)]

# ['even', 'odd', 'even', 'odd', 'even', 'odd', 'even', 'odd', 'even', 'odd']
```

## Loops

- `for...else` and `while...else` loops: In Python, you can optionally use an `else` block with `for` and `while` loops.
- This code block will only execute if the loop terminates normally (i.e., it completes all iterations without a `break` statement being called).

### for else loop

- Imagine you have a list of groceries and want to check if a specific item is present. Traditionally, you might use a flag variable to track if the item is found:

```python
found = False
grocery_list = ["Milk", "Eggs", "Bread", "Apples"]
item_to_find = "Cheese"

for item in grocery_list:
    if item == item_to_find:
        found = True
        break  # Exit the loop after finding the item

if found:
    print(f"{item_to_find} is in your grocery list.")
else:
    print(f"{item_to_find} is not on your grocery list.")
```

With `for...else`, you can achieve the same functionality without needing a flag:

```python
grocery_list = ["Milk", "Eggs", "Bread", "Apples"]
item_to_find = "Cheese"

for item in grocery_list:
    if item == item_to_find:
        print(f"{item_to_find} is in your grocery list.")
        break  # Exit the loop after finding the item
else:
    print(f"{item_to_find} is not on your grocery list.")
```

- The `else` block here executes only **if the loop finishes iterating through the entire list without finding a match**.
- \`break\` statement needs to be added once the condition inside the loop is satisfied to come out of the loop. Otherwise the else statement will execute.
- This keeps the code cleaner and avoids the need for an extra variable.

### while else loop

- Suppose you want a valid integer input from the user within a specific range. Here's how you might do it with a `while` loop:

```python
lower_limit = 5
upper_limit = 10

while True:
    user_input = int(input("Enter an integer between 5 and 10: "))
    if lower_limit <= user_input <= upper_limit:
        print("Valid input!")
        break  # Exit the loop on valid input

print(f"Your input: {user_input}")
```

With `while...else`, you can express the validation process more clearly:

```python
lower_limit = 5
upper_limit = 10

while True:
    user_input = int(input("Enter an integer between 5 and 10: "))
    if lower_limit <= user_input <= upper_limit:
        print("Valid input!")
        break  # Exit the loop on valid input
else:
    print("Invalid input. Please enter a number between 5 and 10.")

print(f"Your input (if valid): {user_input}")  # Print input only if valid
```

- The `else` block here executes only if the `while` loop completes all iterations without finding a valid input.
- This provides a clear message to the user if their input doesn't meet the criteria.

## Exception Handling

- `try...except...else` blocks: The `else` block in a `try...except` statement handles exceptions.
- If no exceptions occur while executing the code in the `try` block, the code within the `else` block will be executed.
  ```python
  try:
      result = 10 / 0  # This will cause a ZeroDivisionError
  except ZeroDivisionError:
      print("Division by zero error!")
  else:
      print("The result is:", result)  # This won't execute because of the exception
  ```
- Remember that the `else` block is always optional and only executes under specific conditions depending on the context (i.e., if the `if` condition is False, the loop completes normally, or no exceptions occur in the `try` block).

## Summary

We have gone through various ways we can use \`else\` keyword in Python programming language.

## Related Articles

- [Usage of Underscore](@/blog/usage-of-underscore-in-python.md) - Understanding underscore usage
- [Usage of Asterisk](@/blog/usage-of-asterik-in-python.md) - Python operators
- [Usage of Forward Slash](@/blog/usage-of-forward-slash-in-python.md) - Python operators
- [Usage of Backward Slash](@/blog/usage-of-backward-slash-in-python.md) - Python syntax
- [Learn Python Programming](@/blog/learn-python-programming.md) - Python programming guide
