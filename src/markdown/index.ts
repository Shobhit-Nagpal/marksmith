export enum Markdown {
  TEXT = "text",
  BOLD = "bold",
  ITALIC = "italic",
  CODE = "code",
  LINK = "link",
  IMAGE = "image",
}

export class MarkdownContent {
  text: string;
  url: string;

  constructor(text: string = "", url: string = "") {
    this.text = text;
    this.url = url;
  }

  isEqual(md: MarkdownContent): boolean {
    if (this.text === md.text && this.url === md.url) {
      return true;
    }
    return false;
  }
}

export class MarkdownImage extends MarkdownContent {
  constructor(text: string, url: string) {
    super(text, url);
  }

  toString(): string {
    return `MarkdownImage(${this.text}, ${this.url})`;
  }
}

export class MarkdownLink extends MarkdownContent {
  constructor(text: string, url: string) {
    super(text, url);
  }

  toString(): string {
    return `MarkdownImage(${this.text}, ${this.url})`;
  }
}
