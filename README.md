Please follow me at Steemit: https://steemit.com/@yuxi

# Webmaster tool

Webmaster tool is a chrome extension to view information from various cloud service providers.

## What is the project about?

Lots of technical people like me use various cloud service providers to manage their VPS, domain, storage etc. It is a time-consuming and tedious job to check each account regularly. For example, most service providers recommend users to enable two factor authentication therefore users have to get their phone when they want to login. However, in most time, users only want to have a quick check of their services' status, account information etc. That is why I want to develop this Chrome extension to put all those information together and allow users to check all information in a single click!

## Technology Stack

Chrome extension

Javascript

JQuery

Bootstrap

## Features


**Showing Vultr information**: show users, accounts, VPS servers, backups, snapshots, DNS information.

**Showing Digital Ocean information**: show DO account, droplets, snapshots, DNS information.

**Showing Linode information**: show Linode account, profile, invoices, instances, and domains.

**Showing Heroku information**: show Heroku account, invoices, credits, applications, dynos, and domains.

**Supporting Cloudflare, Namesilo and Name.com**

**Settings**: set Vultr/DO/Linode/Heroku API keys.

## Roadmap

The current version of Webmaster tool supports pulling out information via Vultr/DO/Linode/Heroku API, in the following iterations, more cloud providers will be added. Also, depending on the feedback, I may support some operations via cloud service provider APIs, e.g. start/stop/restart a server, create a snapshot, etc. 


