import fetch from "node-fetch";
import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";
import { Issues, PullRequest, Release } from "github-webhook-event-types";

import { checkIssuesEvent } from "./issues.event";
import { checkPullRequestEvent } from "./pull-request.event";
import { checkReleaseEvent } from "./release.event";

interface Headers {
  [name: string]: string;
}

const extractGithubEventType = (headers: Headers): string => {
  if (headers["x-github-event"]) {
    return headers["x-github-event"];
  }
  return "";
};

const checkCondition = <T>(
  body: string,
  fn: (event: T) => boolean | Promise<boolean>,
): boolean | Promise<boolean> => {
  if (!body) {
    return false;
  }

  const event = (JSON.parse(body) as any) as T;
  return fn(event);
};

enum EventType {
  ISSUES = "issues",
  PULL_REQUEST = "pull_request",
  RELEASE = "release",
}

const actionByEventType = async (
  eventType: EventType,
  body: string,
): Promise<boolean> => {
  switch (eventType as EventType) {
    case EventType.ISSUES:
      return checkCondition<Issues>(body, checkIssuesEvent);
    case EventType.PULL_REQUEST:
      return await checkCondition<PullRequest>(body, checkPullRequestEvent);
    case EventType.RELEASE:
      return checkCondition<Release>(body, checkReleaseEvent);
    default:
      return false;
  }
};

const triggerBuild = async () => {
  await fetch(process.env.MASTER_BRANCH_BUILD_HOOK, { method: "POST" });
};

const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  const eventType = extractGithubEventType(event.headers);
  if (!eventType) return;

  let result: boolean = false;
  try {
    result = await actionByEventType(eventType as EventType, event.body);
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }

  if (result) {
    try {
      await triggerBuild();
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    }
  }

  console.log(eventType, result);

  return {
    statusCode: 200,
    body: JSON.stringify({ result: result }),
  };
};

export { handler };
