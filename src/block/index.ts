import {
  Block,
  headingRe,
  quoteRe,
  ulRe,
  olRe,
  tableRe,
  codeRe,
  createHTMLHeading,
  createHTMLParagraph,
  createHTMLTable,
  createHTMLCode,
  createHTMLQuote,
  createHTMLOrderedList,
  createHTMLUnorderedList,
  hrRe,
  createHTMLHr,
} from "./utils";

export function markdownToBlocks(markdown: string) {
  const blocks = new Array<string>();
  const mdBlocks = markdown.split("\n\n");

  for (let mdBlock of mdBlocks) {
    if (mdBlock !== "") {
      mdBlock = mdBlock.trim();
      blocks.push(mdBlock);
    }
  }

  return blocks;
}

export function blockToBlockType(block: string) {
  if (headingRe.test(block)) {
    return Block.HEADING;
  } else if (quoteRe.test(block)) {
    return Block.QUOTE;
  } else if (ulRe.test(block)) {
    return Block.UNORDERED_LIST;
  } else if (olRe.test(block)) {
    return Block.ORDERED_LIST;
  } else if (codeRe.test(block)) {
    return Block.CODE;
  } else if (tableRe.test(block)) {
    return Block.TABLE;
  } else if (hrRe.test(block)) {
    return Block.HR;
  } else {
    return Block.PARAGRAPH;
  }
}

export function markdownToHTMLNode(markdown: string) {
  let html = "<div>";

  const blocks = markdownToBlocks(markdown);

  for (const block of blocks) {
    const blockType = blockToBlockType(block);

    switch (blockType) {
      case Block.HEADING:
        const heading = createHTMLHeading(block);
        html += heading;
        break;
      case Block.PARAGRAPH:
        const paragraph = createHTMLParagraph(block);
        html += paragraph;
        break;
      case Block.CODE:
        const code = createHTMLCode(block);
        html += code;
        break;
      case Block.QUOTE:
        const quote = createHTMLQuote(block);
        html += quote;
        break;
      case Block.UNORDERED_LIST:
        const ul = createHTMLUnorderedList(block);
        html += ul;
        break;
      case Block.ORDERED_LIST:
        const ol = createHTMLOrderedList(block);
        html += ol;
        break;
      case Block.TABLE:
        const table = createHTMLTable(block);
        html += table;
        break;
      case Block.HR:
        const hr = createHTMLHr();
        html += hr;
        break;
      default:
        throw new Error("Block type not recognized");
    }
  }

  html += "</div>";
  return html;
}
