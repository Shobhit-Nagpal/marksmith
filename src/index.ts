import { markdownToHTMLNode } from "./block";

export function markdownToHTML(markdown: string) {
  const html = markdownToHTMLNode(markdown);
  return html;
}
