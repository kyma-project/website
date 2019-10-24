# Banner modification

To edit the banner on the website you have to make changes in [`slides.yml`](../content/banner/slides.yml). This file has the following structure:

``` yaml
bannerDuration: {BANNER_DURATION}
slides:
  - text: {TEXT}
    url: {URL}
    startDate: {START_DATE}
    endDate: {END_DATE}
```

Replace these parameters with real values:

- **{BANNER_DURATION}** is the time (in milliseconds) after which a banner slide changes to the next one if there is more than one slide.
- **{TEXT}** is the banner's text. The content you provide should be no longer than one sentence.
- **{URL}** is the event's URL. If the parameter is not empty, the `Read more` link appears to the right of the banner's text.
- **{START_DATE}** is the date from which a particular banner slide starts to appear on the website, counting from midnight. Use the `DD/MM/YYYY` format.
- **{END_DATE}** is the date up to which a particular banner slide appears, counting to 23:59. Use the `DD/MM/YYYY` format.

To show the banner for one full day, make sure **{START_DATE}** and **{END_DATE}** are equal.

> **NOTE**: **{TEXT}**, **{START_DATE}**, and **{END_DATE}** are mandatory parameters. **{URL}** is optional, but if not needed, it must stay empty.
>
> **NOTE**: If the **{URL}** starts with `http`, the link opens in a new tab. If not, it opens in the same tab.

## Add multiple slides

To show multiple slides that change periodically, like in a typical carousel, add more sections indicated by a dash, as in this example:

```yaml
bannerDuration: 4000
slides:
  - text: "Example 1"
    url: ""
    startDate: "01/11/2018"
    endDate: "30/11/2018"
  - text: "Example 2"
    url: "kyma-project.io"
    startDate: "01/11/2018"
    endDate: "30/11/2018"
  - text: "Example 3"
    url: "kyma-project.io"
    startDate: "01/11/2018"
    endDate: "30/11/2018"
```

## Remove the banner

If you want to remove the banner from the website, change [`slides.yml`](../content/banner/slides.yml) as follows:

``` yaml
bannerDuration: {BANNER_DURATION}
```
