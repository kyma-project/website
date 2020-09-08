import { Post } from "@typings/blog";

import { CSSProp } from "styled-components";

export interface LandingPageContext {
  adopters: Adopter[];
  latestBlogPosts: Post[];
}

export interface Adopter {
  websiteUrl: string;
  company: string;
  url?: string;
  cssProperties?: CSSProp;
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

export enum FeaturesI18nTarget {
  EXTENSIBILITY = "extensibility",
  RUNTIME = "runtime",
  SUPPORT = "support",
}
