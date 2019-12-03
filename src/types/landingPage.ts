import { Post } from "@typings/blog";

export interface LandingPageContext {
  adopters: Adopter[];
  latestBlogPosts: Post[];
}

export interface Adopter {
  websiteUrl: string;
  url?: string;
  verticalPadding?: string;
  logo: string;
  content: string;
}

export interface Slide {
  text: string;
  url: string;
  startDate: string;
  endDate?: string;
}

export interface SlidesBannerProps {
  bannerDuration: number;
  slides: Slide[];
}

export enum NewsroomI18nTarget {
  TWITTER = "twitter",
  YOUTUBE = "youtube",
  Blog_POST = "lastBlogPost",
}
