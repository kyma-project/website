import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";
import { Issues } from "github-webhook-event-types";

interface Response {
  statusCode: number;
  body: string;
}

const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  console.log(event.headers);

  const issue = (JSON.parse(event.body) as any) as Issues;
  console.log(issue.action);
  console.log(issue.changes);

  const response: Response = {
    statusCode: 200,
    body: "",
  };

  callback(undefined, response);
};

export { handler };
