+++
title = "Multiple return values from a function"
date = "2023-02-18"
og_preview_img = "https://cdn.hashnode.com/res/hashnode/image/upload/v1676611821562/9103d75a-efdd-4409-812b-d656c1ffcac6.png"

[taxonomies]
tags=["go", "developer", "beginners", "go-lang", "programming-tips"]
+++

One feature that makes GoLang unique is its support for multiple return values from a function. This can be very useful in various situations, such as error handling, parsing data, and returning multiple values from a computation.

For example, let's say you have a function that needs to parse a string into an integer and return both the integer value and an error if the line cannot be parsed. It would be best to use an out parameter or an exception in many languages to handle the error case. But in GoLang, you can return both the integer and the error as different values, like this:

```go
func parseInt(s string) (int, error) {
    i, err := strconv.Atoi(s)
    if err != nil {
        return 0, err
    }
    return i, nil
}
```

In this example, the `strconv.Atoi` function parses the string `s` into an integer `i`, and returns an error if the string cannot be parsed. The `parseInt` function checks for the error and returns the integer and error as separate values.

This pattern of returning multiple values is used extensively throughout the GoLang standard library and can be very powerful in your code. Using multiple return values, you can make your code more concise and expressive and easily handle errors and other complex situations.
