import { library, config } from "@fortawesome/fontawesome-svg-core";
import {
  faExternalLinkAlt,
  faCloudDownloadAlt,
  faAnchor,
  faTags,
  faArrowUp,
  faArrowLeft,
  faArrowRight,
  faBook,
  faBars,
  faTimes,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit, faCopy, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faTwitter,
  faLinkedinIn,
  faGithub,
  faSlack,
  faYoutube,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Props } from "@fortawesome/react-fontawesome";

config.autoAddCss = false;

library.add(
  faExternalLinkAlt,
  faCloudDownloadAlt,
  faCalendarAlt,
  faAnchor,
  faLink,
  faTags,
  faArrowUp,
  faArrowLeft,
  faArrowRight,
  faBook,
  faBars,
  faTimes,
  faEdit,
  faCopy,
  faTwitter,
  faLinkedinIn,
  faGithub,
  faSlack,
  faYoutube,
  faStackOverflow,
);
