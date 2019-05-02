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
  switch (event.action as IssuesActionType) {
    case IssuesActionType.OPENED:
    case IssuesActionType.EDITED:
    case IssuesActionType.DELETED:
    case IssuesActionType.CLOSED:
    case IssuesActionType.REOPENED: {
      return checkLabelsFromChangedIssue(event.issue.labels);
    }
    case IssuesActionType.LABELED:
    case IssuesActionType.UNLABELED: {
      const label = (event as any).label;
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
