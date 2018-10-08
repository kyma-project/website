# How to add documentation?

1. Fork [kyma-project/kyma](https://github.com/kyma-project/kyma/)
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

//note -> add two pics with comparison?

> **NOTE:** Omit curly braces in actual document.

2. Make pull request
3. Wait for review
4. After merge of your documentation into `kyma` repository, ask
   //do what exactly? ask someone in our kyma-community slack to take care of this issue? Is it my role as contributor?
