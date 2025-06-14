+++
title = "Tricks to manually detect AI-generated fake images"
description = "Pointers to check if an image is AI-generated"
date = "2022-03-29"
updated="2025-06-10"
[extra]
social_media_card = "/images/posts/tricks-to-manually-detect-ai-generated-fake-images.webp"

[taxonomies]
tags=["AI", "github", "opensource", "images", "social-media"]

+++

## Introduction

With the help of [GAN (Generative Adversarial Network)](https://en.wikipedia.org/wiki/Generative_adversarial_network), it has been possible to train the model with existing photos and generate non-existing random individuals.

- It is becoming difficult to identify which images are real and which are fake.
- Even there can be images of people who actually do not exist at all.
- The cover photo I have used is an AI-generated fake photo.
- These photographs can be used on social media platforms to misidentify, harass, etc.

In this blog post, I have mentioned a few tricks to detect a fake AI-generated image with your bare eyes.

## Tricks

_Disclaimer:_

- These tricks are not 100% guaranteed that these are fake images. But, should be enough to bring in a sense of intuition and make you alert. You need to do your own due diligence.
- With more advanced AI, I have no doubt that these tricks will be obsolete.

### 1. Eye Alignment

![center_aligned.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1648540638891/X0Pk1z9f9.png)

- Check if the face and eyes are center-aligned on the image.
- Even if somebody will crop the photo, check for the eye alignment always parallel to the ground.
- Even if someone will rotate the image, you can easily find it.

### 2. Ear or Earring

![missing_ear.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1648541048907/x3shLNs7j.jpg)

- Check if one of the earrings is missing.
- Check the ear is missing fully.
- Now the GAN models forget these things, but sure they will improve.

### 3. Hairs

![stranded_hairs.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1648541139352/togPFzTuU.jpg)

- Check if hairs are abruptly on air. You can see this picture to get an idea.

### 4. Background

![vague_background.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1648541284564/jYoJtjOuM.jpg)

- Vague background, which does not represent any actual place or any place at all.
- Actual people click photos in a realistic background.

### 5. Irregular pupil size

![shape5.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1648541350131/JqGAyxq7B.png)

- This one is a bit difficult to check.
- To know this you need to zoom in till you get to see the eye pupil clearly.
- The left one is a real child, the right girl is a fake one.

### Bonus Tricks

- Check if eye colors are mismatched.
- The face is deformed or another nearby person's face is deformed.
- Check for eyelid hairs, if they do not look right.

## Related Articles

- [AI Tools](@/blog/ai-tools.md) - Collection of AI tools and services
- [ChatGPT Alternatives](@/blog/chatgpt-alternatives.md) - Explore different AI language models
- [Large Language Models History](@/blog/large-language-models-history.md) - Evolution of AI models
- [ML in Academics vs ML in Production](@/blog/ml-academics-vs-ml-production.md) - Real-world AI applications
- [From Naive to Light: The Evolution of RAG Systems](@/blog/evolution-rag.md) - Modern AI architectures

## References

- StyleGAN2 - Official TensorFlow Implementation [source code](https://github.com/NVlabs/stylegan2)
- Analyzing and Improving the Image Quality of StyleGAN [paper](https://arxiv.org/abs/1912.04958)
- [That smiling LinkedIn profile face might be a computer-generated fake](https://www.npr.org/2022/03/27/1088140809/fake-linkedin-profiles)
- Images credit: https://thispersondoesnotexist.com/
- [Eyes Tell All: Irregular Pupil Shapes Reveal GAN-generated Faces](https://www.arxiv-vanity.com/papers/2109.00162/)

Hope you learned something new today and stay alert on social media.
As technology is a two-faced sword, with the advancement of technology, we need to be vigilant.

If this is the first time you are reading my article, then welcome here, I am Soumendra you can know more about me in the [About me](https://blog.soumendrak.com/about-me) section.

You can connect with me on [Twitter](https://twitter.com/soumendrak_) or [LinkedIn](https://www.linkedin.com/in/soumendrak/). Thank you.

Inspiration for this blog: https://twitter.com/soumendrak_/status/1508422664699842565?s=20&t=Zw94nEpRAQ3URHt24C_ftw
