# Internationalization

Follow these steps to add a new translated content to the website:

1. Create a new subfolder in the `content/i18n` folder with a lowercase abbreviated language name which you want to add. Follow the naming convention from the [react-intl](https://github.com/yahoo/react-intl) library.

2. Create `json` files with names and content identical to those in `content/i18n/en`.

3. Replace only values in appropriate files. Remember that the value between `{}` chars is a variable and you cannot remove it. If required, change the location of variables in a sentence to match the word order of a given language.

4. Import newly created `json` files in the [`locales.ts`](../src/common/i18n/locales.ts) file and create a new object with the new content in the exported object, similar to that for the `en` language.

5. Import appropriate locale data from the `react-intl/locale-data` package to the [`Provider.tsx`](../src/common/i18n/Provider.tsx) file and add it to the `addLocaleData` array in the same file.

6. Add the new language to [`config.json`](../config.json) under the **i18n** field. Define the **path** and **locale** values without defining the **default** field as it is reserved only for English as a fallback.

7. Make a pull request.

8. Wait for the review.

9. After the merge, the site rebuilds automatically and the pages with the language prefix appear.
