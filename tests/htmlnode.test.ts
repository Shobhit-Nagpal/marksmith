import { HTMLNode, HTMLLeafNode, HTMLParentNode } from "../src/htmlnode";

test("converts props to html", () => {
  const props = new Map<string, string>();
  props.set("href", "https://www.google.com");

  const node = new HTMLNode("p", "This is a paragraph", [], props);
  const attr = node.propsToHTML();
	const expected = "href='https://www.google.com'";

  expect(attr).toBe(expected);
});

test("converts multiple props to html", () => {
  const props = new Map<string, string>();
  props.set("href", "https://www.google.com");
  props.set("target", "_blank");
  props.set("class", "para");

  const node = new HTMLNode("p", "This is a paragraph", [], props);
  const attr = node.propsToHTML();
	const expected = "class='para' href='https://www.google.com' target='_blank'"

  expect(attr).toBe(expected);
});

test("converts leaf node to HTML", () => {
  const node = new HTMLLeafNode("a", "Just text, fam", new Map<string, string>());
  const attr = node.toHTML();
	const expected = "<a>Just text, fam</a>";

  expect(attr).toBe(expected);
});

test("converts leaf node with props to HTML", () => {
  const props = new Map<string, string>();
  props.set("href", "https://www.google.com");
  const node = new HTMLLeafNode("a", "Just text, fam", props);
  const attr = node.toHTML();
	const expected = "<a href='https://www.google.com'>Just text, fam</a>";

  expect(attr).toBe(expected);
});

test("converts leaf node without tag to HTML", () => {
  const node = new HTMLLeafNode("", "Just text, fam", new Map<string, string>());
  const attr = node.toHTML();
	const expected = "Just text, fam";

  expect(attr).toBe(expected);
});

test("converts parent node to HTML", () => {
  const props = new Map<string, string>();
  props.set("href", "https://www.google.com")
  props.set("id", "random");
  props.set("class", "anchor");

  const leaf1 = new HTMLLeafNode("", "Just text, fam", new Map<string, string>());
  const leaf2 = new HTMLLeafNode("a", "Just text, fam", props);

  const parent = new HTMLParentNode("div", "", [leaf1, leaf2], new Map<string, string>());
	const expected = "<div>Just text, fam<a class='anchor' href='https://www.google.com' id='random'>Just text, fam</a></div>"

  const node = parent.toHTML();

  expect(node).toBe(expected);
});

test("converts parent node with complex nesting to HTML", () => {
  const props = new Map<string, string>();
  props.set("href", "https://www.google.com")
  props.set("id", "random");
  props.set("class", "anchor");

  const divPProps = new Map<string, string>();
  divPProps.set("class", "new");
  divPProps.set("id", "unique");

  const leaf1 = new HTMLLeafNode("h1", "Heading 1", new Map<string, string>());
  const leaf2 = new HTMLLeafNode("h2", "Heading 2", new Map<string, string>());
  const p1 = new HTMLLeafNode("p", "Paragraph 1", new Map<string, string>());
  const divP = new HTMLLeafNode("p", "Complex content", divPProps);
  const articleDiv = new HTMLParentNode("div", "Complex content", [divP], new Map<string, string>());
  const boldLi = new HTMLLeafNode("b", "Bold text");
  const italicLi = new HTMLLeafNode("i", "Italic text");
  const codeLi = new HTMLLeafNode("code", "print('Hello, World!')");
  const li1 = new HTMLParentNode("li", "", [boldLi, italicLi], new Map<string, string>());
  const li2 = new HTMLParentNode("li", "", [codeLi], new Map<string, string>());
  const ul = new HTMLParentNode("ul", "", [li1, li2]);
  const article = new HTMLParentNode("article", "", [p1, ul, articleDiv]);
  const section = new HTMLParentNode("section", "", [leaf2, article]);
  const footerP = new HTMLLeafNode("p", "Footer text");
  const footer = new HTMLParentNode("footer", "", [footerP]);
  const parent = new HTMLParentNode("div", "", [leaf1, section, footer], new Map<string, string>());

  const expected = "<div><h1>Heading 1</h1><section><h2>Heading 2</h2><article><p>Paragraph 1</p><ul><li><b>Bold text</b><i>Italic text</i></li><li><code>print('Hello, World!')</code></li></ul><div><p class='new' id='unique'>Complex content</p></div></article></section><footer><p>Footer text</p></footer></div>"

  const node = parent.toHTML();

  expect(node).toBe(expected);
});
