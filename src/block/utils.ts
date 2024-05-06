import { HTMLLeafNode } from "../htmlnode";
import { textNodeToHTMLNode, textToTextNodes } from "../inline";

export const headingRe = /^#{1,6}\s.*$/m;
export const quoteRe = /^(>.+)$/gm;
export const ulRe = /^([*-]\s.*\n?)+$/gm;
export const olRe = /^((?:1|[2-9]\d*)\.\s.*\n?)+$/gm;
export const codeRe = /^```[\s\S]*?```$/m;
export const tableRe = /^\|\s.*?\s\|\s.*?\s\|$/gm;

export enum Block {
  HEADING = "heading",
  PARAGRAPH = "paragraph",
  CODE = "code",
  QUOTE = "quote",
  UNORDERED_LIST = "unordered_list",
  ORDERED_LIST = "ordered_list",
  TABLE = "table",
}

export function createHTMLHeading(block: string) {
  const parts = block.split(" ");
  const content = [parts[0], parts.slice(1).join(" ")];
  const headingNumber = content[0].length;

  const textNodes = textToTextNodes(content[1]);
  const leafNodes = new Array<HTMLLeafNode>();

  for (const textNode of textNodes) {
    const leafNode = textNodeToHTMLNode(textNode);
    leafNodes.push(leafNode);
  }

  let headingValue = "";

  for (const leafNode of leafNodes) {
    const leafHTML = leafNode.toHTML();
    headingValue += leafHTML;
  }

  return `<h${headingNumber}>${headingValue}</h${headingNumber}>`;
}

export function createHTMLParagraph(block: string) {
  const textNodes = textToTextNodes(block);
  const leafNodes = new Array<HTMLLeafNode>();

  for (const textNode of textNodes) {
    const leafNode = textNodeToHTMLNode(textNode);
    leafNodes.push(leafNode);
  }

  let pValue = "";

  for (const leafNode of leafNodes) {
    const leafHTML = leafNode.toHTML();
    pValue += leafHTML;
  }

  return `<p>${pValue}</p>`;
}

export function createHTMLQuote(block: string) {
  const content = block.split("\n");
  const quoteBlocks = new Array<string>();

  for (const quote of content) {
    quoteBlocks.push(quote.split("> ")[1]);
  }

  let quote = "";

  for (const quoteBlock of quoteBlocks) {
    const textNodes = textToTextNodes(quoteBlock);
    const leafNodes = new Array<HTMLLeafNode>();

    for (const textNode of textNodes) {
      const leafNode = textNodeToHTMLNode(textNode);
      leafNodes.push(leafNode);
    }

    let quoteValue = "";

    for (const leafNode of leafNodes) {
      const leafHTML = leafNode.toHTML();
      quoteValue += leafHTML;
    }

    quote += quoteValue;
  }

  return `<blockquote>${quote}</blockquote>`;
}

export function createHTMLCode(block: string) {
  const codeValue = block.slice(3,-3);
  return `<pre><code>${codeValue}</code></pre>`;
}

export function createHTMLOrderedList(block: string) {
  const items = block.split("\n");
  let listItems = "";

  for (const item of items) {
    const parts = item.split(" ");
    const content = [parts[0], parts.slice(1).join(" ")]
    let listValue = "";

    const textNodes = textToTextNodes(content[1]);
    const leafNodes = new Array<HTMLLeafNode>();

    for (const textNode of textNodes) {
      const leafNode = textNodeToHTMLNode(textNode);
      leafNodes.push(leafNode);
    }

    for (const leafNode of leafNodes) {
      const leafHTML = leafNode.toHTML();
      listValue += leafHTML;
    }

    listItems += `<li>${listValue}</li>`;
  }

  return `<ol>${listItems}</ol>`;
}

export function createHTMLUnorderedList(block: string) {
  const items = block.split("\n");
  let listItems = "";

  for (const item of items) {
    const parts = item.split(" ");
    const content = [parts[0], parts.slice(1).join(" ")]
    let listValue = "";

    const textNodes = textToTextNodes(content[1]);
    const leafNodes = new Array<HTMLLeafNode>();

    for (const textNode of textNodes) {
      const leafNode = textNodeToHTMLNode(textNode);
      leafNodes.push(leafNode);
    }

    for (const leafNode of leafNodes) {
      const leafHTML = leafNode.toHTML();
      listValue += leafHTML;
    }

    listItems += `<li>${listValue}</li>`;
  }

  return `<ul>${listItems}</ul>`;
}

export function createHTMLTable(block: string) {
  let items = block.split("\n");
  let tableItems = "";

  if (items.length < 2) {
    throw new Error("Table must have a atleast 2 lines");
  }

  if (items[1].startsWith("|---") || items[1].startsWith("| --")) {
    items.splice(1, 1);
  }
  const tableHeadings = items[0];
  const tableHeaders = tableHeadings.split("|").slice(1, -1);

  let headers = "";
  for (const tableHeader of tableHeaders) {
    const tableHeading = createHTMLHeading(`### ${tableHeader.trim()}`);
    headers += `<th>${tableHeading}</th>`;
  }

  tableItems += `<tr>${headers}</tr>`;

  items = items.slice(1);

  for (const tableRow of items) {
    let tableData = tableRow.split("|");
    tableData = tableData.slice(1, -1);
    let td = "";

    for (const data of tableData) {
      const tableDataItem = createHTMLParagraph(data.trim());
      td += `<td>${tableDataItem}</td>`;
    }

    tableItems += `<tr>${td}</tr>`;
  }

  return `<table>${tableItems}</table>`;
}
