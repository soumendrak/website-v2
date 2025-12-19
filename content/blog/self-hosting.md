+++
title = "Self-Hosting Journey: From Heroku to Hetzner VPS with Coolify & Proxmox"
description = "Explore my self-hosting journey from Heroku to Cloudflare Pages, PikaPods to Hetzner VPS. Learn how I host Listmonk, Uptime Kuma, Jellyfin, and more using Coolify and Proxmox for cost-effective home server management."
date = "2025-12-19"

[taxonomies]
tags = ["self-hosting", "homelab", "VPS", "coolify", "proxmox", "hetzner", "FOSS"]

[extra]
social_media_card = "/images/posts/self-host/self-host-cover.webp"
+++

![Cover](/images/posts/self-host/self-host-cover.webp)
*Cover Image*

## Journey
- The first time I felt empowerd was when I hosted my own website, most probably you are reading this on my webiste. I used godaddy and heroku for that with GitHub. Then I moved to Notion CMS, Vercel and now it is at Cloudflare pages. I thank to [Karan Sharma](https://mrkaran.dev/) for introducing me to Zola framework and now I am hosting my site made on this framework.
- The first app which I self hosted was Listmonk (thanks to Kailash Nadh) followed by Uptime Kuma. Being a FOSS India member has inspired me to try out these. I had hosted these two in Pikapods. Where you can easily host app on a nominal fee per app.
- However, soon I have hosted more apps like change detection, Fider, Monica and Karakeep. These all exceeded $10 per month. I knew that it will be cheaper if I rent a VPS and host all these apps and my future apps.
- With that thought thinking about alternatives, I got ideas from [Kailash](https://nadh.in/) to get a server from Digital Ocean for just $4 per month. I switched and moved all my apps to DO. I was hosting all the apps in the server directly with conatiners.
- I got influenced by the YT channel, [Easy Self Host](https://www.youtube.com/@easyselfhost) to try Coolify. It was super easy to install new apps and I have upgraded my CPU and RAM of the server and slowly the montly cost got increased to $30. I was in a phase of my life at this time where I was not taking care of these expenses much. However, I was looking out for alternative.
- Then for the second time after applying to Hetzner they finally approved creation of my account. First time they rejected my plea and my account verification failed. Anyway in Hetzner it was cheap. I upgraded my VPS and still it was $10 per month[^1].

- With 16GB RAM and 8vCPU I have got room to try out new apps. These are the apps I have tried out and currently up and running.
    - [Glance](https://github.com/glanceapp/glance) - Home page and RSS reader
    - [Traccar](https://github.com/traccar/traccar) - Track devices
    - [n8n](https://github.com/n8n-io/n8n) - Automate anything
    - [NocoDB](https://github.com/nocodb/nocodb) - Airtable alternative
    - [Gotify](https://github.com/gotify/server) - Go based notification
    - [Syncthing](https://github.com/syncthing/syncthing) - File and folder sync
    - [Actual](https://github.com/actualbudget/actual) - Budgeting App
    - [Umami](https://github.com/umami-software/umami) - Web Analytics
    - [Stirling PDF](https://github.com/Stirling-Tools/Stirling-PDF) - PDF Editor
    - [Gramps](https://github.com/gramps-project/gramps) - Family Tree
    - [IT-Tools](https://github.com/CorentinTh/it-tools) - Dev tools
    - [Listmonk](https://github.com/knadh/listmonk) - Email provider
    - [Postiz](https://github.com/gitroomhq/postiz-app) - Social Media management
    - [Plane](https://github.com/makeplane/plane) - Project management
    - [Fider](https://github.com/getfider/fider) - Feedback collector

I have got a mini PC from Beelink; 32GB RAM and 16vCPU. I have been using this with my couple of external hard drives to run my mini theatre with Jellyfin.

## Evolution of my tech stacks
### DNS providers
GoDaddy -> Cloudflare
### Static Site Hosts
Heroku -> GitHub Pages -> Cloudflare Pages 
### VPS 
PikaPods -> Digital Ocean -> Hetzner

## Physical Home Server
I have ordered a mini PC from Indiamart. This entire process I have solely relied on Google Gemini; from buying the hardware to turning on the home lab.
### Movies and TV Series
- From Torrent downloaded to 1TB HDD around in 2015-16.
- In My WiFi Router plugged in my external HDD and accessed it inside the home. I have to download the file at the client (mobile/laptop) and then watch.
- From Usenet downloaded to my 1 TB + 2TB HDD. Beelink mini PC runs Proxmox OS which runs Jellyfin in an LXC container. Now, I have to only download once at my server and not at the client side.

## End goal
The end goal I have planned is to maximize sustainability. I do not see any alternative for my ISP. Other than that rest all I am planning to make it self-sustainable. When I will take up a permanent home, I will be installing solar cells to charge my UPS and router power backups. I have not fully utilized my mini PC, will be migrating my Hetzner apps to there in 2026.


[^1]: https://x.com/soumendrak_/status/1979180093852262676
