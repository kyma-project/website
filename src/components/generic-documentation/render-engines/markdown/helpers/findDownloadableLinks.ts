const linkRegexp = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
const supportedExts = ["yml", "yaml", "json"];

export interface DownloadableLink {
  link: string;
  extension: string;
}

export function findDownloadableLinks(source: string): DownloadableLink[] {
  const matches = source.match(linkRegexp) || [];
  return matches
    .map(link => {
      const ext = link.split(".").pop() || "";
      if (!supportedExts.includes(ext)) return;
      return {
        link,
        extension: ext,
      };
    })
    .filter(Boolean) as DownloadableLink[];
}
