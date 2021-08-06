---
title: "Say hello to the unofficial Kyma Update Twitter Bot"
author:
  name: "Christian Lechner, just another Kymma fan"
tags:
  - kmya
  - updates
  - twitter
  - community
redirectFrom:
  - "/blog/unofficial-kyma-twitter-bot"
---

Do you spend time on Twitter? Do you want to see a tweet whenever a new Kyma or Kyma CLI release is published? If the answer to both is yes, then say hello to the unofficial Kyma Update Twitter Bot 👋.

<!-- overview -->

As you pushed the **Read more** button, you would like to get informed about Kyma updates directly on Twitter. Me too, and that was the reason why I built the Twitter Bot that serves this purpose. With this short blog post, I would like to give you some more information about it in FAQ style.

## Which Twitter account to follow?

The account of the Twitter Bot is [@KymaUpdates](https://twitter.com/KymaUpdates).

## Which updates are taken into account?

The bot currently only takes releases into account. Pre-releases are ignored.

## Which repositories are watched

I currently focus on Kyma and Kyma-related repositories. You can find the up-to-date list [here](https://github.com/lechnerc77/kyma-updates-twitter-bot#watched-repositories).

## How does it work?

The main technological building blocks used behind the scenes are [Azure Functions](https://docs.microsoft.com/azure/azure-functions/) and the [Durable Extension](https://docs.microsoft.com/azure/azure-functions/durable/durable-functions-overview). If you want to take a closer look, I have published a dedicated blog post on the building blocks. You can find it [here](https://dev.to/lechnerc77/say-hello-to-the-kyma-update-twitter-bot-by-azure-durable-functions-4e1a).

## Where is the code?

The code is completely available on GitHub in [this](https://github.com/lechnerc77/kyma-updates-twitter-bot) repository.

## Disclaimer

The bot is still "young" and it may contain some bugs, so please bear with my little bot. If you find a bug, pull requests are always welcome 😁.
