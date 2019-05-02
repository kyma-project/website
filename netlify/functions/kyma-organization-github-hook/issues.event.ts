import { Issues } from "github-webhook-event-types";
import { IssuesLabel } from "github-webhook-event-types/source/Issues";

enum IssuesActionType {
  OPENED = "opened",
  EDITED = "edited",
  DELETED = "deleted",
  CLOSED = "closed",
  REOPENED = "reopened",
  LABELED = "labeled",
  UNLABELED = "unlabeled",
}

const EPIC_LABEL = "Epic";

export const checkIssuesEvent = (event: Issues): boolean => {
  console.log("action: ", event.action);

  switch (event.action as IssuesActionType) {
    case (IssuesActionType.OPENED,
    IssuesActionType.EDITED,
    IssuesActionType.DELETED,
    IssuesActionType.CLOSED,
    IssuesActionType.REOPENED):
      return checkLabelsFromChangedIssue(event.issue.labels);
    case (IssuesActionType.LABELED, IssuesActionType.UNLABELED): {
      const label = (event as any).label;
      console.log("label: ", label);
      return label ? checkChangedLabel(label) : false;
    }
    default:
      return false;
  }
};

const checkLabelsFromChangedIssue = (labels: IssuesLabel[]): boolean => {
  return labels.some(label => label.name === EPIC_LABEL);
};

const checkChangedLabel = (label: IssuesLabel): boolean => {
  return label.name === EPIC_LABEL;
};
