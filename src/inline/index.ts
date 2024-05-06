import { HTMLLeafNode } from "../htmlnode";
import { Markdown, MarkdownImage, MarkdownLink } from "../markdown";
import { TextNode } from "../textnode";

export function textNodeToHTMLNode(node: TextNode) {
  switch (node.textType) {
    case Markdown.TEXT:
      return new HTMLLeafNode("", node.text);
    case Markdown.BOLD:
      return new HTMLLeafNode("b", node.text);
    case Markdown.ITALIC:
      return new HTMLLeafNode("i", node.text);
    case Markdown.CODE:
      return new HTMLLeafNode("code", node.text);
    case Markdown.LINK:
      const linkProps = new Map<string, string>();
      linkProps.set("href", node.url);
      return new HTMLLeafNode("a", node.text, linkProps);
    case Markdown.IMAGE:
      const imgProps = new Map<string, string>();
      imgProps.set("src", node.url);
      imgProps.set("alt", node.text);
      return new HTMLLeafNode("img", "", imgProps);
    default:
      throw new Error("Text node type is not valid");
  }
}

export function splitNodesDelimiter(
  oldNodes: TextNode[],
  delimiter: string,
  textType: string,
) {
  const textNodes = new Array<TextNode>();

  for (const oldNode of oldNodes) {
    if (oldNode.textType !== Markdown.TEXT) {
      textNodes.push(oldNode);
      continue;
    }

    if (!oldNode.text.includes(delimiter)) {
      textNodes.push(new TextNode(oldNode.text, oldNode.textType, oldNode.url));
      continue;
    }

    const strs = oldNode.text.split(delimiter);

    if (strs.length % 2 === 0) {
      throw new Error(
        `Invalid markdown syntax: ${oldNode.text} is not enclosed with ${delimiter}`,
      );
    }

    for (let i = 0; i < strs.length; i++) {
      if (strs[i] === "") {
        continue;
      }

      if (i % 2 === 0) {
        textNodes.push(new TextNode(strs[i], Markdown.TEXT));
        continue;
      }

      textNodes.push(new TextNode(strs[i], textType));
    }
  }

  return textNodes;
}

export function extractMarkdownImages(text: string) {
  const mdImages = new Array<MarkdownImage>();

  const mdImageRegex = /!\[(.*?)\]\((.*?)\)/g;

  let match;
  while ((match = mdImageRegex.exec(text)) !== null) {
    const altText = match[1];
    const url = match[2];
    mdImages.push(new MarkdownImage(altText, url));
  }

  return mdImages;
}

export function extractMarkdownLinks(text: string) {
  const mdLinks = new Array<MarkdownLink>();

  const mdLinkRegex = /\[(.*?)\]\((.*?)\)/g;

  let match;
  while ((match = mdLinkRegex.exec(text)) !== null) {
    const linkText = match[1];
    const url = match[2];
    mdLinks.push(new MarkdownLink(linkText, url));
  }

  return mdLinks;
}

export function splitNodeImages(nodes: TextNode[]) {
  const newNodes = new Array<TextNode>();

  for (const node of nodes) {
    if (node.textType !== Markdown.TEXT) {
      newNodes.push(node);
      continue;
    }

    const images = extractMarkdownImages(node.text);

    if (images.length === 0) {
      newNodes.push(node);
      continue;
    }

    let imageText = node.text;
    for (const image of images) {
      const sections = imageText.split(`![${image.text}](${image.url})`);

      if (sections.length !== 2) {
        throw new Error(
          `Invalid Markdown syntax. Image section is not closed for: ${image.text}`,
        );
      }

      if (sections[0] !== "") {
        newNodes.push(new TextNode(sections[0], Markdown.TEXT));
      }

      newNodes.push(new TextNode(image.text, Markdown.IMAGE, image.url));
      imageText = sections[1];
    }

    if (imageText !== "") {
      newNodes.push(new TextNode(imageText, Markdown.TEXT));
    }
  }
  return newNodes;
}

export function splitNodeLinks(nodes: TextNode[]) {
  const newNodes = new Array<TextNode>();

  for (const node of nodes) {
    if (node.textType !== Markdown.TEXT) {
      newNodes.push(node);
      continue;
    }

    const links = extractMarkdownLinks(node.text);

    if (links.length === 0) {
      newNodes.push(node);
      continue;
    }

    let linkText = node.text;
    for (const link of links) {
      const sections = linkText.split(`[${link.text}](${link.url})`);

      if (sections.length !== 2) {
        throw new Error(
          `Invalid Markdown syntax. Image section is not closed for: ${link.text}`,
        );
      }

      if (sections[0] !== "") {
        newNodes.push(new TextNode(sections[0], Markdown.TEXT));
      }

      newNodes.push(new TextNode(link.text, Markdown.LINK, link.url));
      linkText = sections[1];
    }

    if (linkText !== "") {
      newNodes.push(new TextNode(linkText, Markdown.TEXT));
    }
  }
  return newNodes;
}

export function textToTextNodes(text: string) {
  const node = new TextNode(text, Markdown.TEXT); 

  let newNodes = splitNodesDelimiter([node], "**", Markdown.BOLD);
  newNodes = splitNodesDelimiter(newNodes, "*", Markdown.ITALIC);
  newNodes = splitNodesDelimiter(newNodes, "```", Markdown.CODE);
  newNodes = splitNodesDelimiter(newNodes, "`", Markdown.CODE);
  newNodes = splitNodeImages(newNodes);
  newNodes = splitNodeLinks(newNodes);

  return newNodes;
}
