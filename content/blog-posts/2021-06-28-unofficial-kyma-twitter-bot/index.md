---
title: "Say Hello to the unofficial Kyma Update Twitter Bot"
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

Do you spent some time on Twitter? Do you want to see a tweet when a new Kyma or Kyma CLI release was published with a reference to the release? If the answer to both is yes, then say hello to the (unofficial) Kyma Update Twitter Bot 👋.

<!-- overview -->

As you pushed the "read more" button, you would like to get informed about updates on Kyma directly via Twitter. Me too and that was the reason why I built a Twitter Bot that serves this purpose. With this short blog post I would like to give you some more information about it in an FAQ style.

## Which Twitter Account to follow?

The account of the Twitter Bot is [@KymaUpdates](https://twitter.com/KymaUpdates).

## Which Releases are taken into account?

The bot currently only takes releases into account. Pre-releases are ignored.

## Which repositories are watched

I currently focus on Kyma and "Kyma-related" repositories. You find an up-to-date list [here](https://github.com/lechnerc77/kyma-updates-twitter-bot#watched-repositories).

## How does it work?

The main technological building blocks used behind the scenes are [Azure Functions](https://docs.microsoft.com/azure/azure-functions/) and the [Durable Extension](https://docs.microsoft.com/azure/azure-functions/durable/durable-functions-overview). If you want to take a closer look, I have published a dedicated blog post on the building blocks. You find it [here](https://dev.to/lechnerc77/say-hello-to-the-kyma-update-twitter-bot-by-azure-durable-functions-4e1a)

## Where is the Code?

The code is completely available on GitHub in this [repository](https://github.com/lechnerc77/kyma-updates-twitter-bot).

## Disclaimer

The bot is still "young", so maybe it contains some bugs - so bear with my little bot. If you find a bug - pull requests are always welcome 😁.
