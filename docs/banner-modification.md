# Banner modification

To edit the banner on the website you have to make changes in [`slides.yml`](../content/banner/slides.yml). This file has the following structure:

``` yaml
bannerDuration: {BANNER_DURATION}
slides:
  - text: {TEXT}
    url: {URL}
    openInNewTab: {OPEN_IN_NEW_TAB}
    startDate: {START_DATE}
    endDate: {END_DATE}
    icon: {ICON_ADDRESS}
```

Replace these parameters with real values:

- **{BANNER_DURATION}** is the time (in milliseconds) after which a banner slide changes to the next one if there is more than one slide.
- **{TEXT}** is the banner's text. The content you provide should be no longer than one sentence.
- **{URL}** is an optional address. If present, the `Read more` link appears to the right of the banner's text.
- **{OPEN_IN_NEW_TAB}** indicates whether an optional link is pointing to an internal or external resource. Set it to `false` for external links like `https://www.google.com/`, and to `true` for internal links like `/blogs`. Remove this line if a link is not present. If you do not provide this parameter, it points to the external link by default.
- **{START_DATE}** is the date from which a particular banner slide starts to appear on the website, counting from midnight. Use the `DD/MM/YYYY` format.
- **{END_DATE}** is the date up to which a particular banner slide appears, counting to 23:59. Use the `DD/MM/YYYY` format.
- **{ICON_ADDRESS}** is an address to an icon used in the banner slide.

**{TEXT}**, **{START_DATE}**, and **{END_DATE}** are mandatory parameters.

To show the banner for one full day, make sure **{START_DATE}** and **{END_DATE}** are equal.

## Add multiple slides

To show multiple slides that change periodically, like in a typical carousel, add more sections enclosed in curly brackets and separate them with a comma, as in this example:

```yaml
bannerDuration: 4000
slides:
  - text: "Example 1"
    startDate: "01/11/2018"
    endDate: "30/11/2018"
  - text: "Example 2"
    url: "kyma-project.io"
    startDate: "01/11/2018"
    endDate: "30/11/2018"
  - text: "Example 3"
    url: "kyma-project.io"
    openInNewTab: true
    startDate: "01/11/2018"
    endDate: "30/11/2018"
```

## Remove the banner

If you want to remove the banner from the website, change [`slides.yml`](../content/banner/slides.yml) as follows:

``` yaml
bannerDuration: {BANNER_DURATION}
```
