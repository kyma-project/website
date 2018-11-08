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
- `{START_DATE}` is the starting day from which particular banner slide will be shown, counting from 00:00 at night. Use `DD-MM-YYYY` format.
- `{END_DATE}` is the ending day up to which particular banner slide will be shown, counting to 23:59 at night. Use `DD-MM-YYYY` format.
- `{ICON}` is filename of icon used in the banner slide. Icons are stored in [./src/banner/assets](../src/banner/assets) folder. It is an optional parameter.

`{TEXT}`, `{START_DATE}`, and `{END_DATE}` are mandatory parameters. `{INTERNAL}` is also mandatory if `{URL}` is provided.

To show banner for one full day make sure `{START_DATE}` and `{END_DATE}` are equal.

## Icon

To use it put desired image file in [./src/banner/assets](../src/banner/assets) folder. This image will be scaled to fit into 30px wide, 45px high box, while preserving its original ascpect ratio.

Image must be in `jpeg`, `png`, or `gif` format.

## Multiple slides

To show multiple slides that are perodically changing like in typical carousel add more sections enclosed by `{` and `}`, as in this example:

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
    "endDate": " 05-11-2018",
    "icon": "example3.png"
  }
]
```

## No banner

If no banner should be shown change [banners.json](../src/banner/banners.json) into

```json
[]
```
