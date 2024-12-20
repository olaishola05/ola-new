import Link from 'next/link'
import type { MDXComponents } from 'mdx/types.js'
import Image, { ImageProps } from 'next/image'
import React from 'react';
import CopyCodeButton from "@/components/MDX/copy-code-button";
import { codeMap } from "@/app/utils/utilities";

const OrderedList: React.FC<React.HTMLAttributes<HTMLOListElement>> = ({ children, className, ...props }) => (
  <ol className={`list-decimal list-inside pl-4 my-4 ${className || ''}`} {...props}>
    {children}
  </ol>
);

// Unordered List
const UnorderedList: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({ children, className, ...props }) => (
  <ul className={`list-disc list-inside pl-4 my-4 ${className || ''}`} {...props}>
    {children}
  </ul>
);

// Blockquote
const Blockquote: React.FC<React.BlockquoteHTMLAttributes<HTMLQuoteElement>> = ({ children, className, ...props }) => (
  <blockquote className={`pl-4 my-4 border-l-4 border-gray-300 italic ${className || ''}`} {...props}>
    {children}
  </blockquote>
);

// Callout
type CalloutType = 'info' | 'warning' | 'error';

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CalloutType;
}

const Callout: React.FC<CalloutProps> = ({ children, className, type = 'info', ...props }) => {
  const styles: Record<CalloutType, string> = {
    info: "bg-blue-100 border-blue-500 text-blue-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    error: "bg-red-100 border-red-500 text-red-700",
  };

  return (
    <div className={`p-4 my-4 border-l-4 rounded-r ${styles[type]} ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

// Table
const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ children, className, ...props }) => (
  <div className="overflow-x-auto my-4">
    <table className={`min-w-full divide-y divide-gray-200 ${className || ''}`} {...props}>
      {children}
    </table>
  </div>
);


export const mdxComponents: MDXComponents = {
  a: ({ children, ...props }) => {
    return (
      <Link {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} href={props.href || ''}>
        {children}
      </Link>
    )
  },
  img: ({ children, ...props }) => {
    const { src, alt, width, height, ...rest } = props
    return <Image
      sizes="100vw"
      style={{ width: '100%', borderRadius: '8px', margin: '30px 0' }}
      {...(props as ImageProps)}
      width={500}
      height={500}
      alt={alt!}
    />
  },
  pre: ({ children, ...props }) => {
    // @ts-ignore
    const lang: string = props["data-language"] || 'shell';
    return (
      <div className="relative shadow">
        <div className="p-5 bg-editorTop rounded-t-md">
          <span className='absolute top-2 z-10 left-2 text-textColor text-base'>{codeMap.get(lang)}</span>
          <div className="absolute right-2 top-2 z-10">
            <CopyCodeButton>{children}</CopyCodeButton>
          </div>
        </div>
        <pre {...props} className='px-1 py-6 font-light text-sm md:text-base rounded-b-md'>
          {children}
        </pre>
      </div>
    )
  },
  ol: OrderedList,
  ul: UnorderedList,
  blockquote: Blockquote,
  table: Table,
  div: (props: React.HTMLAttributes<HTMLDivElement>) => {
    if (props.className && props.className.includes('callout')) {
      return <Callout {...props} />;
    }
    return <div {...props} />;
  },
  // any other components you want to use in your markdown
}
