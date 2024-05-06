# Marksmith

**Marksmith** is a lightweight npm library written in TypeScript for converting Markdown documents into HTML. It provides a simple and efficient way to seamlessly integrate Markdown parsing and HTML generation into your JavaScript or TypeScript projects.

## Features

- Convert Markdown documents to HTML with ease.
- Fully written in TypeScript for improved type safety and developer experience.
- Lightweight and dependency-free, ensuring minimal impact on your project's bundle size.

## Installation

You can install **Marksmith** via npm:

```bash
npm i @shobhit-nagpal/marksmith
```

## Usage

```typescript
import { markdownToHtml } from '@shobhit-nagpal/marksmith';

const markdownText = '# Hello, World!\n\nThis is a *Markdown* example.';
const htmlOutput = markdownToHtml(markdownText);

console.log(htmlOutput);
```

The output will be a div tag with all the markdown converted to HTML within the tag.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
