import { TextNode } from "../src/textnode";

test("text nodes are equal", () => {
  const tn1 = new TextNode("This is a text", "bold");
  const tn2 = new TextNode("This is a text", "bold");
  const equal = tn1.isEqual(tn2);
  expect(equal).toBe(true);
});

test("text nodes are not equal", () => {
  const tn1 = new TextNode("This is a text", "bold");
  const tn2 = new TextNode("This is a text", "italic");
  const equal = tn1.isEqual(tn2);
  expect(equal).toBe(false);
});

test("text nodes are equal with url", () => {
  const tn1 = new TextNode("This is a text", "bold", "https://example.com/");
  const tn2 = new TextNode("This is a text", "italic", "https://example.com/");
  const equal = tn1.isEqual(tn2);
  expect(equal).toBe(false);
});

test("text nodes are not equal with url", () => {
  const tn1 = new TextNode("This is a text", "bold", "https://example.com/");
  const tn2 = new TextNode(
    "This is a text",
    "italic",
    "https://different.example.com/",
  );
  const equal = tn1.isEqual(tn2);
  expect(equal).toBe(false);
});
