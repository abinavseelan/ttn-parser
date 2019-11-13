# ISP Plans Alert

A simple webscrapping script that looks up [my ISP's](https://www.ttnetwork.net/) plans and sends alerts to Slack if my current plan has a better alternative.

## Stack

- Puppeteer - For scrapping the ISP webpage
- NodeJS
- Travis - For scheduling the cron job
- Bash - For detailing out the job script

## Setting the project up

1. Install dependencies

```bash
$ npm install
```

2. Run script

```bash
$ npm start
```

## Where do things go?

### Current ISP Plan

The `config.js` file contains the meta data about the current ISP plan.

### Configuring Job

The `job.sh` script contains all the job steps.

### Setting up the Cron Job

This has been done on Travis's Web App

### Setting up the Slack App

This has been done on Slack's AppBuilder App
