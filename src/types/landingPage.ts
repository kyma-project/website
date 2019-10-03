export interface LandingPageContext {
  earlyAdopters: EarlyAdopter[];
}

export interface EarlyAdopter {
  company: string;
  title: string;
  link: string;
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
