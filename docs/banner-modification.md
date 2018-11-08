# Banner modification

//to ask -> put info about duration of each slide here?
//I'm talking about <Banner slides={bannerData} duration={THIS_THING} />
//I would omit this and just leave it at 5/6s

//allow gifs as icons?

//"limits for title length" -> still valid? we have dynamic sizing of banner to solve this issue

To edit the banner on the website, make changes in [`banners.json`](../src/banner/banners.json). This file has the following structure:

```json
[
  {
    "text": { TEXT },
    "url": { URL },
    "internal": { INTERNAL },
    "startDate": { START_DATE },
    "endDate": { END_DATE },
    "icon": { ICON_FILE }
  }
]
```

Replace these parameters with real values:

- `{TEXT}` is the banner's text.
- **{URL}** is an optional address. If present, the `Read more` link appears to the right of the banner's text.
- **{INTERNAL}** indicates whether an optional link is pointing to an internal or external resource. Set it to `false` for external links like `https://www.google.com/`, and to `true` for internal links like `/blogs`. Remove this line if a link is not present.
- **{START_DATE}** is the date from which a particular banner slide starts to appear on the website, counting from midnight. Use the `DD-MM-YYYY` format.
- **{END_DATE}** is the date up to which a particular banner slide appears, counting to 23:59. Use the `DD-MM-YYYY` format.
- **{ICON}** is a filename of an icon used in the banner slide. Store icons in the [`assets`](../src/banner/assets) folder. It is an optional parameter.

**{TEXT}**, **{START_DATE}**, and **{END_DATE}** are mandatory parameters. `{INTERNAL}` is also mandatory if you provide `{URL}`.

To show the banner for one full day, make sure **{START_DATE}** and **{END_DATE}** are equal.

## Icon

If you add an image to the banner, place it in the [`assets`](../src/banner/assets) folder. This image scales to fit into a box that is 30px wide and 45px high, while preserving its original aspect ratio.

The acceptable image formats are JPEG, PNG, and GIFF. 

## Multiple slides

To show multiple slides that change periodically, like in a typical carousel, add more sections enclosed in curly brackets and separate them with a comma, as in this example:

```json
[
  {
    "text": "A flexible and easy way to connect and extend enterprise",
    "startDate": "01-11-2018",
    "endDate": "30-11-2019"
  },
  {
    "text": "Kyma is an open-source project designed natively on Kubernetes.",
    "url": "https://google.com",
    "external": true,
    "startDate": "01-10-2018",
    "endDate": " 30-11-2018",
    "icon": "icons_filename.jpeg"
  },
  {
    "text": "Some kind of internal link",
    "url": "/blog",
    "external": false,
    "startDate": "05-11-2018",
    "endDate": "05-11-2018",
    "icon": "example3.png"
  }
]
```

## No banner

If no banner should be shown change [banners.json](../src/banner/banners.json) into

```json
[]
```
