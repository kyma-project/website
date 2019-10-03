import { Post } from "@typings/blog";
import { BlogPostMetadata } from "../SiteMetadata";

const BLOG_ROOT_PATH = "/blog";

function getPageTitle(uri: string, post: Post): string {
  if (uri === BLOG_ROOT_PATH) {
    return "Blog";
  }
  return post.frontmatter.title;
}

function getPageDescription(uri: string, post: Post): string {
  if (uri === BLOG_ROOT_PATH) {
    return "";
  }

  return `${post.rawMarkdownBody
    .replace(/<(?:.|\n)*?>/gm, "")
    .substring(0, 297)}...`;
}

function getBlogPostMetadata(
  uri: string,
  post: Post,
): BlogPostMetadata | undefined {
  if (uri === BLOG_ROOT_PATH) {
    return;
  }

  const { frontmatter, fields } = post;
  return {
    author: frontmatter.author.name,
    datePublish: fields.date,
    headline: frontmatter.title,
    slug: fields.slug,
  };
}

function getBlogPostTags(uri: string, post: Post): string[] {
  if (uri === BLOG_ROOT_PATH) {
    return [];
  }

  const tags = post && post.frontmatter && post.frontmatter.tags;
  return tags || [];
}

export function extractBlogMetadata(
  uri: string,
  pageContext: any,
): {
  pageTitle: string;
  description: string;
  blogPostMetadata?: BlogPostMetadata;
  tags?: string[];
} {
  return {
    pageTitle: getPageTitle(uri, pageContext.post),
    description: getPageDescription(uri, pageContext.post),
    blogPostMetadata: getBlogPostMetadata(uri, pageContext.post),
    tags: getBlogPostTags(uri, pageContext.post),
  };
}
