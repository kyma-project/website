export interface Tickets {
  [release: string]: {
    [capability: string]: Issue[];
  };
}

export interface Release {
  release_id: string;
  title: string;
  start_date: string;
  desired_end_date: string;
  state: "open" | "closed";
}

export interface Repository {
  name: string;
  id: string | number;
  issues: Issue[];
}

export interface Capability {
  displayName: string;
  epicsLabels: string[];
  id: string;
}

export interface Issue {
  title: string;
  body: string;
  number: number;
  labels: string[];
  githubUrl: string;
  zenHubUrl: string;
  dueDate: string;
  release: Release;
  repository: Repository;
  capability: Capability;
}

export interface ReleasesIssuesData {
  [release: string]: ReleaseIssue[];
}

export interface ReleaseIssue {
  repo_id: number;
  issue_number: number;
}
