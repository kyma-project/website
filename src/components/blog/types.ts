/* Post */
export interface Post {
  id: string;
  excerpt?: string;
  rawMarkdownBody: string;
  fields: PostFields;
  frontmatter: PostMetaData;
}

/* Post Page Context */
export interface PostPageContext {
  previous?: Post;
  next?: Post;
  assetsPath?: string;
}

/* Post fields */
export interface PostFields {
  slug: string;
  date: string;
  postInfo: PostFieldsInfo;
}

export interface PostFieldsInfo {
  year: string;
  month: string;
  day: string;
  fileName: string;
}

/* Post Metadata */
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

/* Post types */
export type PostType = "release" | "event";
export const PostTypeRelease = "release";
export const PostTypeEvent = "event";

export interface PostTypeMetadata {
  type?: PostType;
  releaseTag?: string;
}
