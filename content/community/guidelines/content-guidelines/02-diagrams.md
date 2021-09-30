---
title: Diagrams
---

Same as with the screenshots, diagrams are worth a thousand words. Therefore, rather than pile up a block of text to describe a given concept, use a diagram to visualize it instead.

To convey the intended message effectively in a diagram, follow these basic principles:
- Everything that means the same should look the same.
- Limit visual noise.
- Keep it simple but descriptive.

For details on how to format diagrams and their elements in Kyma documents, see the particular document sections.

## Alternative text

Always add an alternative (alt) text that concisely describes the content or function of the diagram you are referring to. The alt text:

- Helps to maintain accessibility for every visitor, including people with vision impairments.
- Appears in place of a diagram if it fails to load.
- Improves the SEO of the website by enabling crawlers to index the diagram contents better.

    ⛔️ `![](./assets/create-bucket.svg)`  
    ✅ `![Create a bucket](./assets/create-bucket.svg)`  

## Tool

Use [draw.io](https://www.draw.io) or [diagrams.net](https://www.diagrams.net/index.html) as a recommended tool. Export the diagram as an SVG and save it under the corresponding `assets` directory.

## Size

Keep your diagram reasonable in size. Preview the image at full size to see how it fits into the whole document. The diagram should be large enough to be legible and convey the intended message, but should not dominate the whole document. To demonstrate large concepts, simplify the diagram or divide it into a few smaller ones.

>**NOTE:** The diagrams keep their original aspect ratio on both the Console UI and the `kyma-project.io` website. However, the maximum width on the website is 860px. Any diagram that exceeds that limit is resized to the maximum width.

## Background

Keep the background of the diagram **white** as it renders well both on Github and in the UI.

## Shapes

Do not use fill that is other than **white** in boxes or similar shapes unless you add an actor to the diagram. Apply **blue** (HEX: #0A6ED1) fill for the shape that refers to a given actor.

> **NOTE:** Same as in the Unified Modeling Language (UML), the term **actor** refers to a role played by a human user, external hardware, or any other entity.

## Outlines

Use **grey** (HEX: #D2D5D9) for the shape outlines. Set the outlines of the main shapes to 2pt and the outlines of the secondary shapes to 1pt.  

If you need color differentiation for shape outlines, use **turquoise** (HEX: #24CACC) or **green** (HEX: #ACD62F).

> **NOTE:** Do not overuse colors. Use them only when you need to differentiate one shape from another. Explain the meaning of different colors in the legend under the diagram.

## Text

Use **black** both for the primary and secondary texts.
Use the following **Helvetica** font sizes:
- 15pt for headings
- 13pt for the primary text, such as secondary shape names
- 12pt for the secondary text, such as the description text for connectors

Bold the headings. Position the text horizontally in a text box or shape.
When you add a title to the main shape, put the text inside the shape.

## Steps

Mark multiple areas or steps on the diagram using **blue** (HEX: #0A6ED1) round stamps with white numbers.

Explain the steps under the diagram with the ordered list.

## Connectors

Use 1pt, **rounded**, **grey** (HEX: #959CA4) lines to connect shapes.

## Examples

See the exemplary diagrams for reference.

* Example 1

![Example 1](./assets/example-1.png)

* Example 2

![Example 2](./assets/example-2.png)
