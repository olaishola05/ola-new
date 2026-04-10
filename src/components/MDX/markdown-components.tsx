import Link from 'next/link'
import type { MDXComponents } from 'mdx/types.js'
import Image, { ImageProps } from 'next/image'
import React from 'react';
import CopyCodeButton from "@/components/MDX/copy-code-button";
import { codeMap } from "@/lib/mdx-constants";
import { Lightbulb, Info, AlertTriangle, XCircle } from 'lucide-react';
import InlineNewsletter from "@/components/Subscribe/InlineNewsletter";

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
type CalloutType = 'info' | 'tip' | 'warning' | 'error';

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CalloutType;
}

const Callout: React.FC<CalloutProps> = ({ children, className, type = 'tip', ...props }) => {
  const icons = {
    info: <Info className="w-5 h-5" />,
    tip: <Lightbulb className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
  };

  const styles: Record<CalloutType, string> = {
    info: "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-500/30 text-blue-900 dark:text-blue-100",
    tip: "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-100",
    warning: "bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-100",
    error: "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-500/30 text-red-900 dark:text-red-100",
  };

  const iconColors: Record<CalloutType, string> = {
    info: "text-blue-500",
    tip: "text-emerald-500",
    warning: "text-amber-500",
    error: "text-red-500",
  };

  return (
    <div className={`flex gap-4 p-5 my-8 rounded-2xl border backdrop-blur-sm transition-all ${styles[type]} ${className || ''}`} {...props}>
      <div className={`shrink-0 mt-0.5 ${iconColors[type]}`}>
        {icons[type]}
      </div>
      <div className="flex-1 text-sm md:text-[15px] leading-relaxed">
        {children}
      </div>
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

// Pre (Code Block Wrapper)
const Pre: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({ children, ...props }) => {
  let language = '';
  if ((props as any)['data-language']) {
    language = (props as any)['data-language'];
  } else if (props.className && props.className.includes('language-')) {
    const match = props.className.match(/language-(\w+)/);
    if (match) language = match[1];
  }

  // Extract title if rehype-pretty-code provides it as a data attribute or regular title
  const title = (props as any)['data-title'] || (props as any)['title'] || '';

  return (
    <div className="my-8 rounded-xl border border-softBg/60 bg-[#fafafa] dark:bg-[#0d1117] flex flex-col w-full relative">
      {/* OpenAI Style Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <div className="text-[13px] font-mono text-softText truncate flex-1 pr-4">
          {title}
        </div>
        <div className="flex items-center gap-4 shrink-0">
          {language && (
            <div className="flex items-center gap-1.5 text-[13px] text-textColor/70 font-mono">
              {language}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
            </div>
          )}
          <CopyCodeButton>{children}</CopyCodeButton>
        </div>
      </div>
      
      {/* Code Content */}
      <div className="relative w-full overflow-x-auto px-6 pb-6">
        <pre {...props} className={`m-0 p-0 bg-transparent min-w-full text-[13px] leading-6 text-textColor font-mono ${props.className || ''}`}>
          {children}
        </pre>
      </div>
    </div>
  );
};


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
  ol: OrderedList,
  ul: UnorderedList,
  blockquote: Blockquote,
  table: Table,
  pre: Pre,
  Callout: Callout,
  Newsletter: InlineNewsletter,
  div: (props: React.HTMLAttributes<HTMLDivElement>) => {
    if (props.className && props.className.includes('callout')) {
      return <Callout {...props} />;
    }
    if (props.className && props.className.includes('newsletter-anchor')) {
      return <InlineNewsletter />;
    }
    return <div {...props} />;
  },
  // any other components you want to use in your markdown
}
