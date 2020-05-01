import { Post, PostPageContext } from "@typings/blog";
import { BlogPostMetadata } from "../SiteMetadata";

const BLOG_ROOT_PATH = "/blog";

function getPageTitle(uri: string, context: PostPageContext): string {
  if (uri === BLOG_ROOT_PATH) {
    return "Blog";
  }
  return context.frontmatter.title;
}

function getPageDescription(uri: string, context: PostPageContext): string {
  if (uri === BLOG_ROOT_PATH) {
    return "";
  }

  return `${context.content
    .replace(/<(?:.|\n)*?>/gm, "")
    .substring(0, 297)}...`;
}

function getBlogPostMetadata(
  uri: string,
  context: PostPageContext,
): BlogPostMetadata | undefined {
  if (uri === BLOG_ROOT_PATH) {
    return;
  }

  const fields = context.fields;
  const frontmatter = context.frontmatter;

  return {
    author: frontmatter.author.name,
    datePublish: fields.date,
    headline: frontmatter.title,
    slug: fields.slug,
  };
}

function getBlogPostTags(uri: string, context: PostPageContext): string[] {
  if (uri === BLOG_ROOT_PATH) {
    return [];
  }

  return context.frontmatter?.tags || [];
}

export function extractBlogMetadata(
  uri: string,
  pageContext: PostPageContext,
): {
  pageTitle: string;
  description: string;
  blogPostMetadata?: BlogPostMetadata;
  tags?: string[];
} {
  return {
    pageTitle: getPageTitle(uri, pageContext),
    description: getPageDescription(uri, pageContext),
    blogPostMetadata: getBlogPostMetadata(uri, pageContext),
    tags: getBlogPostTags(uri, pageContext),
  };
}
