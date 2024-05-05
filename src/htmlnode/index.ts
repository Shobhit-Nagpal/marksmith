interface Renderable {
  toString(): string;
  toHTML(): string;
}

export class HTMLNode implements Renderable {
  tag: string;
  value: string;
  children: Renderable[];
  props: Map<string, string>;

  constructor(
    tag: string = "",
    value: string = "",
    children: Renderable[] = [],
    props: Map<string, string>,
  ) {
    this.tag = tag;
    this.value = value;
    this.children = children;
    this.props = props;
  }

  toHTML(): string {
    throw new Error("Method 'toHTML' must be implemented in subclass.");
  }

  toString(): string {
    return `HTMLNode(${this.tag}, ${this.value}, ${this.children.toString()}, ${this.props})`;
  }

  propsToHTML(): string {
    if (this.props.size === 0) {
      return "";
    }

    const keys = Array.from(this.props.keys()).sort();

    let htmlAttr = "";
    for (const key of keys) {
      htmlAttr += `${key}='${this.props.get(key)}' `;
    }

    htmlAttr = htmlAttr.trimEnd();

    return htmlAttr;
  }
}

export class HTMLLeafNode extends HTMLNode {
  constructor(
    tag: string = "",
    value: string = "",
    props: Map<string, string> = new Map<string, string>(),
  ) {
    super(tag, value, [], props);
  }

  toString(): string {
    return `LeafNode(${this.tag}, ${this.value}, ${this.children}, ${this.props})`;
  }

  toHTML(): string {
    if (this.tag !== "img") {
      if (this.value === "") {
        throw new Error(
          `Leaf node ${this.tag} does not have a value. ${this.toString()}`,
        );
      }
    }

    if (this.tag === "") {
      return this.value;
    }

    const props = this.propsToHTML();
    if (props !== "") {
      return `<${this.tag} ${props}>${this.value}</${this.tag}>`;
    }

    return `<${this.tag}>${this.value}</${this.tag}>`;
  }
}

export class HTMLParentNode extends HTMLNode {
  constructor(
    tag: string = "",
    value: string = "",
    children: Renderable[] = [],
    props: Map<string, string> = new Map<string, string>(),
  ) {
    super(tag, value, children, props);
  }

  toString(): string {
    return `ParentNode(${this.tag}, ${this.value}, ${this.children}, ${this.props})`;
  }

  toHTML(): string {
    if (this.tag === "") {
      throw new Error("Parent node does not have a tag");
    }

    if (this.children.length === 0) {
      throw new Error("Parent node does not have children");
    }

    let childNodes = "";
    for (const child of this.children) {
      const childHTML = child.toHTML();
      childNodes += childHTML;
    }

    const props = this.propsToHTML();
    if (props !== "") {
      return `<${this.tag} ${props}>${childNodes}</${this.tag}>`
    }

    return `<${this.tag}>${childNodes}</${this.tag}>`
  }
}
