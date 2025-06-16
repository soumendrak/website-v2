+++
title = "Static and Dynamic Call in COBOL"
description = "Static and Dynamic Call in COBOL. What is the difference between static and dynamic call in COBOL? When to use static call and when to use dynamic call?"
date = 2016-01-07
canonical_url = "https://www.quora.com/What-Is-the-difference-between-static-and-dynamic-Call-in-Cobol/answer/Soumendrak"
[extra]
social_media_card = "/images/default.webp"
[taxonomies]
tags = ["cobol", "programming", "cobol-programming"]
+++

Static call:

1. The called program(s) are link-edited to the calling programs load module. Therefore, if any changes are there to any of the program then all the programs need to be recompiled.
2. If the size of the called programs are less or few programs are being called (This needs to be decided according the platform and varies organisation to organisation), then it will take less time to run as it will not search for load modules in the load library during the run time.

Dynamic call:

1. The called programs are compiled separately; they have separate load modules in the load library. If there are any changes to any called or the calling program then only the required changing program needs to be changed, rest all programs need not be compiled.
2. If the size of the called programs are more. For e.g. 100 programs are being called from calling program then it's wise to use dynamic call. Though it will take little more time to run than the static call, still it will be flexible in the long run.