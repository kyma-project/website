export interface Tickets {
  [release: string]: {
    [capability: string]: Issue[];
  }
}

export interface Attributes {
  displayName: string;
  epicsLabels: string[];
  id: string;
};

export interface Repository {
  name: string;
  id: string | number;
  issues: Issue[];
};

export interface Issue {
  title: string;
  body: string;
  url: string;
  number: number;
  labels: string[];
  release: string;
  zenHubUrl: string;
  dueDate: string;
};

export interface Release {
  release_id: string;
  title: string;
  start_date: string;
  desired_end_date: string;
  state: "open" | "closed";
}

export interface ReleasesData {
  [release: string]: ReleaseIssues[]
}

export interface ReleaseIssues {
  repo_id: number;
  issue_number: number;
}