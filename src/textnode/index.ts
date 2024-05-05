export class TextNode {
  text: string;
  textType: string;
  url: string;

  constructor(text: string = "", textType: string = "", url: string = "") {
    this.text = text;
    this.textType = textType;
    this.url = url;
  }

  toString(): string {
    return `TextNode(${this.text}, ${this.textType}, ${this.url})`
  }

  isEqual(textNode: TextNode): boolean {
    if (this.text === textNode.text && this.textType === textNode.textType && this.url === textNode.url) {
      return true;
    } 
    return false;
  }
}
