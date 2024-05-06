import { markdownToHtml } from "../src";

test("convert simple markdown heading to html", () => {
  const markdownPage = "# Heading"
  const expectedHTML = "<div><h1>Heading</h1></div>"
  const html = markdownToHtml(markdownPage);
  expect(html).toBe(expectedHTML);
});

test("convert simple markdown to html", () => {
const markdownText = `
# My Markdown Document

This is a paragraph of text in **Markdown** format. You can use various formatting options such as **bold**, *italic*, and \`code\`.

## Lists

- Item 1
- Item 2
- Item 3

1. First item
2. Second item
3. Third item

## Code Block

## Links and Images

Here's a [link to Google](https://www.google.com/) and an ![image of a cat](https://via.placeholder.com/150).
`;
  const expectedHTML = "<div><h1>My Markdown Document</h1><p>This is a paragraph of text in <b>Markdown</b> format. You can use various formatting options such as <b>bold</b>, <i>italic</i>, and <code>code</code>.</p><h2>Lists</h2><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul><ol><li>First item</li><li>Second item</li><li>Third item</li></ol><h2>Code Block</h2><h2>Links and Images</h2><p>Here's a <a href='https://www.google.com/'>link to Google</a> and an <img alt='image of a cat' src='https://via.placeholder.com/150'></img>.</p></div>"
  const html = markdownToHtml(markdownText);
  expect(html).toBe(expectedHTML);
});

test("convert simple markdown to html", () => {
const markdownText = `
# My Markdown Document

This is a paragraph of text in **Markdown** format. You can use various formatting options such as **bold**, *italic*, and \`code\`.

## Lists

- Item 1
- Item 2
- Item 3

1. First item
2. Second item
3. Third item

## Code Block

\`\`\`
const greet = (name) => {
  console.log("Hello, " + name + "!");
};
greet("World");
\`\`\`

## Links and Images

Here's a [link to Google](https://www.google.com/) and an ![image of a cat](https://via.placeholder.com/150).

> This is a blockquote. You can add blockquotes to your Markdown text.

| Column 1 | Column 2 |
| -------- | -------- |
| Row 1    | Row 1    |
| Row 2    | Row 2    |
`;

  const expectedHTML = `<div><h1>My Markdown Document</h1><p>This is a paragraph of text in <b>Markdown</b> format. You can use various formatting options such as <b>bold</b>, <i>italic</i>, and <code>code</code>.</p><h2>Lists</h2><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul><ol><li>First item</li><li>Second item</li><li>Third item</li></ol><h2>Code Block</h2><pre><code>\nconst greet = (name) => {\n  console.log("Hello, " + name + "!");\n};\ngreet("World");\n</code></pre><h2>Links and Images</h2><p>Here's a <a href='https://www.google.com/'>link to Google</a> and an <img alt='image of a cat' src='https://via.placeholder.com/150'></img>.</p><blockquote>This is a blockquote. You can add blockquotes to your Markdown text.</blockquote><table><tr><th><h3>Column 1</h3></th><th><h3>Column 2</h3></th></tr><tr><td><p>Row 1</p></td><td><p>Row 1</p></td></tr><tr><td><p>Row 2</p></td><td><p>Row 2</p></td></tr></table></div>`;
  const html = markdownToHtml(markdownText);
  expect(html).toBe(expectedHTML);
});
