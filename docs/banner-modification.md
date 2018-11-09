# Banner modification

To edit the banner on the website you have to make changes in [banners.json](../src/banner/banners.json). This file has the following structure:

```json
{
  "bannerDuration": "{BANNER_DURATION}",
  "slides": [
    {
      "text": "{TEXT}",
      "url": "{URL}",
      "openInNewTab": "{OPEN_IN_NEW_TAB}",
      "startDate": "{START_DATE}",
      "endDate": "{END_DATE}",
      "icon": "{ICON_FILE}"
    }
  ]
}
```

Replace these parameters with real values:

- **{BANNER_DURATION}** is the time (in milliseconds) after which a banner slide changes to the next one if there is more than one slide.
- **{TEXT}** is the banner's text. The content you provide should be no longer than one sentence.
- **{URL}** is an optional address. If present, the `Read more` link appears to the right of the banner's text.
- **{OPEN_IN_NEW_TAB}** indicates whether an optional link is pointing to an internal or external resource. Set it to `false` for external links like `https://www.google.com/`, and to `true` for internal links like `/blogs`. Remove this line if a link is not present. If this parameter is not provided it defaults to external link.
- **{START_DATE}** is the date from which a particular banner slide starts to appear on the website, counting from midnight. Use the `DD-MM-YYYY` format.
- **{END_DATE}** is the date up to which a particular banner slide appears, counting to 23:59. Use the `DD-MM-YYYY` format.
- **{ICON_FILE}** is a path of an icon used in the banner slide. Store icons in the [`assets`](../src/banner/assets) folder. It is an optional parameter.

**{TEXT}**, **{START_DATE}**, and **{END_DATE}** are mandatory parameters.

To show the banner for one full day, make sure **{START_DATE}** and **{END_DATE}** are equal.

## Add an icon

If you add an image to the banner, place it in the [`assets`](../src/banner/assets) folder. This image scales to fit into a box that is 30px wide and 45px high, while preserving its original aspect ratio.

The acceptable image formats are JPEG, PNG, SVG, and GIFF.

## Add multiple slides

To show multiple slides that change periodically, like in a typical carousel, add more sections enclosed in curly brackets and separate them with a comma, as in this example:

```json
{
  "bannerDuration": 4000,
  "slides": [
    {
      "text": "A flexible and easy way to connect and extend enterprise",
      "startDate": "01-11-2018",
      "endDate": "30-11-2018"
    },
    {
      "text": "Join us for the  SAP TechEd, Bangalore, November 25-30",
      "url": "https://google.com",
      "openInNewTab": true,
      "startDate": "01-10-2018",
      "endDate": "30-11-2018",
      "icon": "assets/small.gif"
    },
    {
      "text": "Some kind of internal link",
      "url": "/blog",
      "openInNewTab": false,
      "startDate": "20-10-2018",
      "endDate": "05-12-2018",
      "icon": "assets/community.svg"
    }
  ]
}
```

## Remove the banner

If you want to remove the banner from the website, change [banners.json](../src/banner/banners.json) as follows:

```json
[]
```
