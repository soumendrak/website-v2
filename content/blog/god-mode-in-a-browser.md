+++
title = "God mode in a browser"
description = "How to use the God mode in a browser to modify any text on a website."
date = "2024-01-14"
updated = "2024-08-16"
[extra]
social_media_card = "/images/posts/god-mode-browser.webp"

[taxonomies]
tags=["browser", "tricks", "javascript", "tools", "god", "god-mode"]
categories=["tools"]
+++

With the help of god mode, you can modify any text on a website. Yes, **any text**.

![God mode explained](https://cdn.hashnode.com/res/hashnode/image/upload/v1705206226752/fcbee2dc-9b86-4ee3-a210-141109189e0e.gif)

```javascript
document.designMode = "on";
```

Write the above in your browser console or

```javascript
javascript: ((d, o, m) => {
  d[m] = d[m] !== o ? o : "off";
})(document, "on", "designMode");
```

Make a bookmark with the above as the URL.
