import { Handler, Context, Callback, APIGatewayEvent } from "aws-lambda";

interface Response {
  statusCode: number;
  body: string;
}

const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  console.log(
    JSON.parse(event.body),
    event.headers,
  );
  const response: Response = {
    statusCode: 200,
    body: "",
  };

  callback(undefined, response);
};

export { handler };
