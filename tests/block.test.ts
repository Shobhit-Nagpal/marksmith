import { blockToBlockType, markdownToBlocks } from "../src/block";
import { Block } from "../src/block/utils";

test("markdown to blocks", () => {
  const markdown = `
  This is **bolded** paragraph

This is another paragraph with *italic* text here
This is the same paragraph on a new line

* This is a list
* with items
  `;

  const blocks = markdownToBlocks(markdown);
  const expected = [
    "This is **bolded** paragraph",
    "This is another paragraph with *italic* text here\nThis is the same paragraph on a new line",
    "* This is a list\n* with items",
  ];

  for (let i = 0; i < expected.length; i++) {
    expect(blocks[i]).toBe(expected[i]);
  }
});

test("markdown to blocks with extra new lines", () => {
  const markdown = `
This is **bolded** paragraph








This is another paragraph with *italic* text here
This is the same paragraph on a new line










* This is a list
* with items
  `;

  const blocks = markdownToBlocks(markdown);
  const expected = [
    "This is **bolded** paragraph",
    "This is another paragraph with *italic* text here\nThis is the same paragraph on a new line",
    "* This is a list\n* with items",
  ];

  for (let i = 0; i < expected.length; i++) {
    expect(blocks[i]).toBe(expected[i]);
  }
});

test("block to heading block type", () => {
  const text = "## Heading 2";

  const blockType = blockToBlockType(text);

  expect(blockType).toBe(Block.HEADING);
});

test("block to paragraph block type", () => {
  const text = "Classic paragraph";

  const blockType = blockToBlockType(text);

  expect(blockType).toBe(Block.PARAGRAPH);
});

test("block to quote block type", () => {
  const text =
    ">This is a whole quote\n> - Socrates probably\n> Who knows ackshually";

  const blockType = blockToBlockType(text);

  expect(blockType).toBe(Block.QUOTE);
});

test("block to unordered list block type", () => {
  const text = "- Brocolli\n- Onion";

  const blockType = blockToBlockType(text);

  expect(blockType).toBe(Block.UNORDERED_LIST);
});

test("block to ordered list block type", () => {
  const text = "1. Brocolli\n2. Onion";

  const blockType = blockToBlockType(text);

  expect(blockType).toBe(Block.ORDERED_LIST);
});

test("block to code block type", () => {
  const text = "```print('Checkmate')\nprint('Gottem')```"

  const blockType = blockToBlockType(text);

  expect(blockType).toBe(Block.CODE);
});

test("block to table block type", () => {
  const text = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |
| Row 3, Col 1 | Row 3, Col 2 | Row 3, Col 3 |
    `;

  const blockType = blockToBlockType(text);

  expect(blockType).toBe(Block.TABLE);
});
