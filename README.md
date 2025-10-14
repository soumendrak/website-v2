<h2 align="center">Website</h2>

* This website is powered by Rust based static site generator [Zola](https://www.getzola.org/). 
* The theme is based on [Tabi](https://github.com/welpo/tabi) theme.
* The blog posts are written in [Markdown](https://www.markdownguide.org/basic-syntax/).
* The website is hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

<h2 align="center">Benchmarks</h2>
* This website has got the following benchmarks:

| Benchmark | Value |
|---|---|
| [Yellow Labs](https://yellowlab.tools/result/gylwbdiesy) | 100/100 |
| [Google PageSpeed Insights](https://pagespeed.web.dev/analysis/https-www-soumendrak-com/zvs6umn4xh?form_factor=desktop) | 96/100 |
| [Mozilla Observatory](https://developer.mozilla.org/en-US/observatory/analyze?host=www.soumendrak.com) | 50/100 |

## Installation issues

1. First clone the repo using command: 

```sh
git clone git@github.com:soumendrak/website-v2.git
```
2. Then remove the `themes/tabi` folder.
3. Remove the folder from git index

```sh
git rm -r --cached themes/tabi
```
4. Add `tabi` as a submodule

```sh
git submodule add https://github.com/welpo/tabi.git themes/tabi
```

5. Install Zola and run `zola serve`.