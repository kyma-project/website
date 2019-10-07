export interface LandingPageContext {
  earlyAdopters: EarlyAdopter[];
}

export interface EarlyAdopter {
  company: string;
  title: string;
  link: string;
}

export interface Adopter {
  url: string;
  logo: string;
  title?: string;
  content?: string;
  info?: {
    company?: string;
    location?: string;
    industry?: string;
  };
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
