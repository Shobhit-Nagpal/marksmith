import { markdownToHTMLNode } from "./block";

export function markdownToHtml(markdown: string) {
  const html = markdownToHTMLNode(markdown);
  return html;
}
