import { TextNode } from "../src/textnode";
import { Markdown, MarkdownImage, MarkdownLink } from "../src/markdown";
import { extractMarkdownImages, extractMarkdownLinks, splitNodeImages, splitNodeLinks, splitNodesDelimiter, textToTextNodes } from "../src/inline";

test("split bold delimiter", () => {
  const tn = new TextNode("This is a text with a **bold** word", Markdown.TEXT);
  const newNodes = splitNodesDelimiter([tn], "**", Markdown.BOLD);

  const expectedNodes = [
    new TextNode("This is a text with a ", Markdown.TEXT),
    new TextNode("bold", Markdown.BOLD),
    new TextNode(" word", Markdown.TEXT),
  ];

  for (let i = 0; i < expectedNodes.length; i++) {
    expect(newNodes[i].toString()).toBe(expectedNodes[i].toString());
  }
});

test("split bold delimiter with no trail", () => {
  const tn = new TextNode("This is a text with a **bold**", Markdown.TEXT);
  const newNodes = splitNodesDelimiter([tn], "**", Markdown.BOLD);

  const expectedNodes = [
    new TextNode("This is a text with a ", Markdown.TEXT),
    new TextNode("bold", Markdown.BOLD),
  ];

  for (let i = 0; i < expectedNodes.length; i++) {
    expect(newNodes[i].toString()).toBe(expectedNodes[i].toString());
  }
});

test("split italic delimiter", () => {
  const tn = new TextNode("This is a text with a *italic* word", Markdown.TEXT);
  const newNodes = splitNodesDelimiter([tn], "*", Markdown.ITALIC);

  const expectedNodes = [
    new TextNode("This is a text with a ", Markdown.TEXT),
    new TextNode("italic", Markdown.ITALIC),
    new TextNode(" word", Markdown.TEXT),
  ];

  for (let i = 0; i < expectedNodes.length; i++) {
    expect(newNodes[i].toString()).toBe(expectedNodes[i].toString());
  }
});

test("split code delimiter", () => {
  const tn = new TextNode("This is a text with a `code` word", Markdown.TEXT);
  const newNodes = splitNodesDelimiter([tn], "`", Markdown.CODE);

  const expectedNodes = [
    new TextNode("This is a text with a ", Markdown.TEXT),
    new TextNode("code", Markdown.CODE),
    new TextNode(" word", Markdown.TEXT),
  ];

  for (let i = 0; i < expectedNodes.length; i++) {
    expect(newNodes[i].toString()).toBe(expectedNodes[i].toString());
  }
});

test("split multiple bold delimiter", () => {
  const tn = new TextNode("This is text with a **bold** word and yet **another bold** word.", Markdown.TEXT);
  const newNodes = splitNodesDelimiter([tn], "**", Markdown.BOLD);

  const expectedNodes = [
    new TextNode("This is text with a ", Markdown.TEXT),
    new TextNode("bold", Markdown.BOLD),
    new TextNode(" word and yet ", Markdown.TEXT),
    new TextNode("another bold", Markdown.BOLD),
    new TextNode(" word.", Markdown.TEXT),
  ];

  for (let i = 0; i < expectedNodes.length; i++) {
    expect(newNodes[i].toString()).toBe(expectedNodes[i].toString());
  }
});

test("extract markdown images", () => {
  const text = "This is text with an ![image](https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/zjjcJKZ.png) and ![another](https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/dfsdkjfd.png)"
  const images = extractMarkdownImages(text);

  const expectedNodes = [
    new MarkdownImage("image", "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/zjjcJKZ.png"),
    new MarkdownImage("another", "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/dfsdkjfd.png"),
  ];

  for (let i = 0; i < expectedNodes.length; i++) {
    expect(images[i].toString()).toBe(expectedNodes[i].toString());
  }
});

test("extract markdown links", () => {
  const text = "This is text with an [link](https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/zjjcJKZ.png) and ![another](https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/dfsdkjfd.png)"
  const links = extractMarkdownLinks(text);

  const expectedNodes = [
    new MarkdownLink("link", "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/zjjcJKZ.png"),
    new MarkdownLink("another", "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/dfsdkjfd.png"),
  ];

  for (let i = 0; i < expectedNodes.length; i++) {
    expect(links[i].toString()).toBe(expectedNodes[i].toString());
  }
});

test("split node images", () => {
  const tn = new TextNode("This is text with an ![image](https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/zjjcJKZ.png) and another ![second image](https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/3elNhQu.png)", Markdown.TEXT);
  const images = splitNodeImages([tn]);

  const expectedNodes = [
    new TextNode("This is text with an ", Markdown.TEXT),
    new TextNode("image", Markdown.IMAGE, "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/zjjcJKZ.png"),
    new TextNode(" and another ", Markdown.TEXT),
    new TextNode("second image", Markdown.IMAGE, "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/3elNhQu.png"),
  ];

  for (let i = 0; i < expectedNodes.length; i++) {
    expect(images[i].toString()).toBe(expectedNodes[i].toString());
  }
});

test("split node links", () => {
  const tn = new TextNode("This is text with a [link](https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/zjjcJKZ.png) and another [second link](https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/3elNhQu.png)", Markdown.TEXT);
  const links = splitNodeLinks([tn]);

  const expectedNodes = [
    new TextNode("This is text with a ", Markdown.TEXT),
    new TextNode("link", Markdown.LINK, "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/zjjcJKZ.png"),
    new TextNode(" and another ", Markdown.TEXT),
    new TextNode("second link", Markdown.LINK, "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/3elNhQu.png"),
  ];

  for (let i = 0; i < expectedNodes.length; i++) {
    expect(links[i].toString()).toBe(expectedNodes[i].toString());
  }
});

test("text to text nodes", () => {
  const text = "This is **text** with an *italic* word and a `code block` and an ![image](https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/zjjcJKZ.png) and a [link](https://boot.dev)"

  const expectedNodes = [
    new TextNode("This is ", Markdown.TEXT),
    new TextNode("text", Markdown.BOLD),
    new TextNode(" with an ", Markdown.TEXT),
    new TextNode("italic", Markdown.ITALIC),
    new TextNode(" word and a ", Markdown.TEXT),
    new TextNode("code block", Markdown.CODE),
    new TextNode(" and an ", Markdown.TEXT),
    new TextNode("image", Markdown.IMAGE, "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/zjjcJKZ.png"),
    new TextNode(" and a ", Markdown.TEXT),
    new TextNode("link", Markdown.LINK, "https://boot.dev"),
  ];

  const textNodes = textToTextNodes(text);

  for (let i  = 0 ; i < expectedNodes.length ; i++) {
    expect(textNodes[i].toString()).toBe(expectedNodes[i].toString())
  }

});

test("text to text nodes with bold trail", () => {
  const text = "A word **Test bold word**"

  const expectedNodes = [
    new TextNode("A word ", Markdown.TEXT),
    new TextNode("Test bold word", Markdown.BOLD),
  ];

  const textNodes = textToTextNodes(text);

  for (let i  = 0 ; i < expectedNodes.length ; i++) {
    expect(textNodes[i].toString()).toBe(expectedNodes[i].toString())
  }

});

test("text to text nodes with one italic word", () => {
  const text = "*Test italic word*"

  const expectedNodes = [
    new TextNode("Test italic word", Markdown.ITALIC),
  ];

  const textNodes = textToTextNodes(text);

  for (let i  = 0 ; i < expectedNodes.length ; i++) {
    expect(textNodes[i].toString()).toBe(expectedNodes[i].toString())
  }

});

test("text to text nodes with one bold word", () => {
  const text = "**Test bold word**"

  const expectedNodes = [
    new TextNode("Test bold word", Markdown.BOLD),
  ];

  const textNodes = textToTextNodes(text);

  for (let i  = 0 ; i < expectedNodes.length ; i++) {
    expect(textNodes[i].toString()).toBe(expectedNodes[i].toString())
  }

});
