import { Release } from "github-webhook-event-types";

export const checkReleaseEvent = (event: Release): boolean => {
  return true;
};
