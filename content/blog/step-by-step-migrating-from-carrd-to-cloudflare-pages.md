+++
title = "Step-by-Step: Migrating from Carrd to Cloudflare Pages"
description = "Carrd.co is a single-page website builder with a no-code paid tool. Cloudflare Pages is a JAMstack platform for front-end developers to collaborate and deploy websites."
date = "2023-07-31"
updated = "2024-08-16"
[extra]
social_media_card = "/images/posts/step-by-step-migrating-from-carrd-to-cloudflare-pages.webp"

[taxonomies]
tags=["cloudflare", "migration", "carrd", "cloudflare-pages"]

+++

[Carrd.co](https://carrd.co) is a single-page website builder with a no-code paid tool. [Cloudflare Pages](https://pages.cloudflare.com/) is a JAMstack platform for front-end developers to collaborate and deploy websites. In this blog post, I will describe how to move your static website from Carrd.co (Paid) to [Cloudflare pages](https://pages.cloudflare.com/) (Free). Let's start.

## Back story

I got my eyes on carrd.co when I saw it was (still is, AFAIK) the only No-code platform that allows you to create static single-page websites (for portfolio, landing page, etc.) for just $19 per year. Yes, not per month but per year. During the Black Friday week, I got a good deal and upgraded to the highest-ever tier there. However, I soon realize I do not use many features and do not need to update my static sites frequently. Also, I do not feel it is satisfying enough to be a full-stack developer with a No-code tool. No-code tools are excellent for building up something quickly but are a pain to the wallet in the long run. Therefore, I migrated from carrd.co and found Cloudflare pages, a free alternative. Hence this blog post.

## Prerequisites

1. Carrd.co pro account, which supports the download of the website
2. Cloudflare Account
3. Website domain hosted in Cloudflare (Optional but Recommended)
4. GitHub Account (Optional)

## Procedure

### Download your website

1. First, log in to your carrd.co account

   ![Step 1 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690800023889/c79e00ee-b126-42c9-9109-3dc6ea635294.png)

2. Go to the site you want to migrate. Click on the \`Manage this site\` gear icon.

   ![Step 2 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690800166291/3c92c01f-3275-4bf3-a8bd-e80af20bd908.png)

3. Download the website

   ![Step 3 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690800301712/1e22bc2e-9dec-44b3-a2e3-121b9fb282a4.png)

4. Wait for a few seconds till the download gets completed.

   ![Step 4 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690800354004/4a9501d9-2a1e-43af-894f-95009d29141c.png)

### Create a GitHub repo.

Though you can directly upload the downloaded file to Cloudflare Pages, we will use GitHub to ease version management for future changes.

1. Go to [https://github.com/new](https://github.com/new)
2. Feel the details for your repository. Only `repository name` is mandatory to fill.

   ![Step 5 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690800720386/bc9621da-c281-465c-8d1f-4e938d150ae2.png)

3. Click on \`Create repository\` button.
4. Open the repository in VS Code on the browser by:

   1. Pressing the dot (.) key OR
   2. Change '.com' to '.dev' on the URL. In my case  
      [https://github.com/soumendrak/countdown](https://github.dev/soumendrak/countdown) to  
      [https://github.dev/soumendrak/countdown](https://github.dev/soumendrak/countdown)
   3. Unzip the downloaded website content

      ![Step 6 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690801095897/fb2c20c7-6abf-48be-a11c-c3347658b397.png)

   4. Drag the assets and index.html files and drop them in the VS Code sidebar.

      ![Step 7 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690801161089/b04b05be-0904-4288-9cbf-664b6b5d12ff.png)

   5. Click on the source control.

      ![Step 8 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690801242308/4ded5838-0f45-4c28-97ea-d22478d9082e.png)

      Write a comment like 'initial commit' below.

      ![Step 9 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690801294157/43854198-9798-4876-99d2-a33f1e767ae0.png)

      Hover your mouse cursor beside the \`Changes\` dropdown and Click on the plus (+) icon to stage all the changes.

      ![Step 10 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690801406860/6a7a8b3e-a9c5-4515-b40b-9b8b50cb6bb6.png)

      Click on the \`Commit and Push\` button.

   6. ![Step 11 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690801457284/8deab3b4-007f-4099-83f5-3a198ce1914f.png)

### Cloudflare Pages setup

Now we will link the GitHub repo to Cloudflare Pages. On the Cloudflare page, we will build and host the website. We can create up to 100 websites in Cloudflare pages for free.

1. Login to your Cloudflare Account
2. Click on the 'Workers and Pages' section on the sidebar.
3. Then click on the 'Create Application' button on the right.

   ![Step 12 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690801962175/0aa001f5-85e0-467d-b3a9-dd528b7f259b.png)

4. Click on the 'Pages' tab, then on 'Connect to Git.'

   ![Step 13 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690802186889/e979c96f-a5ba-418d-999a-1db483609a5b.png)

5. Set up GitHub if not done before. Then check if the newly created repository is visible if not, provide access to that repo to Cloudflare by clicking on the Cloudflare pages.

   ![Step 14 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690802359516/1bb51475-4c06-49ba-a137-1ea0dfbdde76.png)

6. Providing access from GitHub. After selecting, click on Save.

   ![Step 15 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690802482615/f2bb18d9-ce3b-47a7-96e2-38af94600fb1.png)

7. Click on the repo in Cloudflare now by reloading the page or following the same steps from 3 to 6. Click Begin Setup.

   ![Step 16 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690802662858/abcaa8e4-5ad9-4e32-95d8-811b3f3ca862.png)

8. I have a plain static HTML site, so no framework needs to be selected.

   1. Remember to add the current directory as dot (.) in the 'Build output directory' field.
   2. Then click the 'Save and Deploy' button.

      ![Step 17 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690802738140/221071e5-1047-4295-8a35-dd02da709cd4.png)

9. Click on 'Continue to Project' after the build gets over.

   ![Step 18 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690803142094/dcaa5965-1822-4933-b395-c372567fc0bf.png)

10. Click on the 'custom domain' tab to link to your previous custom domain. Click 'Set up a custom domain'

    ![Step 19 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690803247676/eade532c-8e1c-434a-8c8b-34cf7bdf56cf.png)

11. Fill out the site and click on the Continue button. Do not use http/https

    ![Step 20 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690803389778/348304cf-cc3c-4017-9d99-818673810f6c.png)

12. Make the DNS record changes as shown.

    ![Step 21 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690803504533/4fea83c7-d415-4802-9943-c1e904ddd74d.png)

13. After making the changes, the existing and new records will become the same, then you can click on the 'Activate domain' button.

    ![Step 22 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690803609842/9d08bb29-3a80-4f71-897e-bd2b3acbd36a.png)

14. Once it shows Active, the process is completed.

    ![Step 23 screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1690803720031/261cc9cb-0010-47bb-bc40-6c00e61d9b97.png)

## Summary

In summary, we have witnessed how to migrate from carrd.co single page website to freely hosted Cloudflare pages. We have downloaded the website from carrd.co, version managed the website assets in GitHub. We have hosted the site with an auto-generated SSL certificate on Cloudflare pages.

If you have any doubts, please comment. If you have any specific requirements, please contact me on [Twitter](https://twitter.com/soumendrak_) or [LinkedIn](https://www.linkedin.com/in/soumendrak/).
