export interface BlogPageContext {
  posts: Post[];
}

export interface Post {
  id: string;
  excerpt?: string;
  rawMarkdownBody: string;
  fields: PostFields;
  frontmatter: PostMetaData;
}

export interface PostPageContext {
  post: Post;
  previous?: Post;
  next?: Post;
  assetsPath?: string;
}

export interface PostFields {
  slug: string;
  date: string;
  postInfo: PostFieldsInfo;
}

export interface PostFieldsInfo {
  year: string;
  month: string;
  day: string;
}

export interface PostMetaData extends PostTypeMetadata {
  title: string;
  author: PostMetaDataAuthor;
  tags?: string[];
}

export interface PostMetaDataAuthor {
  name: string;
  socialMedia?: {
    github?: string;
    twitter?: string;
  };
}

export type PostType = "release" | "event";
export const PostTypeRelease = "release";
export const PostTypeEvent = "event";

export interface PostTypeMetadata {
  type?: PostType;
  releaseTag?: string;
}
