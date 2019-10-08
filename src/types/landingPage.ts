export interface LandingPageContext {
  adopters: Adopter[];
}

export interface EarlyAdopter {
  company: string;
  title: string;
  link: string;
}

export interface Adopter {
  url: string;
  logo: string;
  content?: string;
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
