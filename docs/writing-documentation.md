# How to add documentation?

1. Follow rules in [CONTRIBUTING.md](https://github.com/kyma-project/community/blob/master/CONTRIBUTING.md#contribution-rules) from `kyma-project/community`
2. Add documentation file written in Markdown in appropriate folder in [docs](https://github.com/kyma-project/kyma/tree/master/docs) folder.

Add this file in `/docs/{DIRECTORY}/docs`, where content fits this schema:

```
---
title: {YOUR_TITLE}
---

{CONTENT_WRITTEN_IN_MARKDOWN}
```

If you want your documentation to appear under specific subsection inside main section, change it to:

```
---
title: {YOUR_TITLE}
type: {SECTION_TITLE}
---

{CONTENT_WRITTEN_IN_MARKDOWN}
```

> **NOTE:** Omit curly braces in actual document.

2. Make pull request
3. Wait for review
4. After merge of your documentation into `kyma` repository, ask
   ////do what exactly? ask someone in our kyma-community slack to take care of this issue? Is it my role as contributor?

   ////It's all already written in paragraph mentioned in 1. - how to write documentation is already in scope of this task, make new issue with this or just do it?
