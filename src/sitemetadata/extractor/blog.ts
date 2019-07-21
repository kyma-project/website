import { Post } from "@components/blog/types";
import { BlogPostMetadata } from "../SiteMetadata";

function getPageTitle(uri: string, markdownRemark: Post): string {
  if (uri === "/blog") {
    return "Blog";
  }
  return markdownRemark.frontmatter.title;
}

function getPageDescription(uri: string, markdownRemark: Post): string {
  if (uri === "/blog") {
    return "";
  }

  return `${markdownRemark.rawMarkdownBody
    .replace(/<(?:.|\n)*?>/gm, "")
    .substring(0, 297)}...`;
}

function getBlogPostMetadata(
  uri: string,
  markdownRemark: Post,
): BlogPostMetadata | undefined {
  if (uri === "/blog") {
    return;
  }

  const { frontmatter, fields } = markdownRemark;
  return {
    author: frontmatter.author.name,
    datePublish: fields.date,
    headline: frontmatter.title,
    slug: fields.slug,
  };
}

function getBlogPostTags(markdownRemark: Post): string[] {
  const tags =
    markdownRemark &&
    markdownRemark.frontmatter &&
    markdownRemark.frontmatter.tags;

  return tags || [];
}

export function extractBlogMetadata(
  uri: string,
  data: any,
): {
  pageTitle: string;
  description: string;
  blogPostMetadata?: BlogPostMetadata;
  tags?: string[];
} {
  const { markdownRemark } = data;

  return {
    pageTitle: getPageTitle(uri, markdownRemark),
    description: getPageDescription(uri, markdownRemark),
    blogPostMetadata: getBlogPostMetadata(uri, markdownRemark),
    tags: getBlogPostTags(markdownRemark),
  };
}
