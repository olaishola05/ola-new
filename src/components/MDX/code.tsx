import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';
import moonlightTheme from './../../../assets/moonlight-ii.json'

function extractCodeString(children: React.ReactNode): string {
  // Handle different types of children
  if (typeof children === 'string') return children;

  if (React.isValidElement(children)) {
    // If it's a React element, try to extract its children
    if (typeof children.props.children === 'string') {
      return children.props.children;
    }

    // If children is an array, recursively extract
    if (Array.isArray(children.props.children)) {
      return children.props.children
        .map((child: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined) => extractCodeString(child))
        .join('');
    }
  }

  // If it's an array of children
  if (Array.isArray(children)) {
    return children
      .map(child => extractCodeString(child))
      .join('');
  }

  return '';
}

export async function Code({ code, language, ...props }: { code: React.ReactNode, language: string }) {
  const codeString = extractCodeString(code).trim();
  console.log(codeString)
  try {
    const highlightedCode = await highlightCode(codeString);
    return (
      <section
        {...props}
        className="px-5 py-6 font-light text-sm md:text-base"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    );
  } catch (error) {
    console.error('Code highlighting error:', error);

    // Fallback to rendering the original code
    return (
      <pre className="bg-gray-100 p-4 rounded">
        <code>{codeString}</code>
      </pre>
    );
  }
}

let highlighterInstance: any | null = null;

async function getHighlighterInstance() {
  if (!highlighterInstance) {
    highlighterInstance = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePrettyCode, {
        theme: JSON.parse(JSON.stringify(moonlightTheme)),
      })
      .use(rehypeStringify)
  }

  return highlighterInstance;
}

async function highlightCode(code: string) {
  const highlighterInstance = await getHighlighterInstance();
  const file = await highlighterInstance.process(code);
  return String(file);
}


