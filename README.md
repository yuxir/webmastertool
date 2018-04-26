Webmaster tool: a chrome extension to view information from various cloud service providers

Please follow me at Steemit: https://steemit.com/@yuxi

## What is the project about?

Lots of technical people like me use various cloud service providers to manage their VPS, domain, storage etc. It is a time-consuming and tedious job to check each account regularly. For example, most service providers recommend users to enable two factor authentication therefore users have to get their phone when they want to login. However, in most time, users only want to have a quick check of their services' status, account information etc. That is why I want to develop this Chrome extension to put all those information together and allow users to check all information in a single click!

## Technology Stack

Chrome extension
Javascript
JQuery
Bootstrap

## Features


**Vultr account information**: Users can view their balance, pending charges etc
**Vultr server information**: All VPS servers will be listed here with all necessary information, e.g. Server state, current status, location, IP, RAM, and storage.
**Vultr backup information**: All backups are listed here.
**Vultr snapshot information**: All snapshots are listed here.
**Settings**: In the current version, user can set their Vultr API key here to enable all features under Vultr tab.

## Roadmap

The current version of Webmaster tool supports pulling out information via Vultr API, in the following iterations, more cloud providers will be added, e.g. Digital Ocean, Linode, AWS, etc. Also, depending on the feedback, I may support some operations via cloud service provider APIs, e.g. start/stop/restart a server, create a snapshot, etc. 


