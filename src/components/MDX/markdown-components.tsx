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
const Pre: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({ children, style: _style, ...props }) => {
  let language = '';
  if ((props as any)['data-language']) {
    language = (props as any)['data-language'];
  } else if (props.className && props.className.includes('language-')) {
    const match = props.className.match(/language-(\w+)/);
    if (match) language = match[1];
  }

  const title = (props as any)['data-title'] || (props as any)['title'] || '';

  // Map common language identifiers to display labels
  const langDisplay: Record<string, string> = {
    js: 'JavaScript', jsx: 'JSX', ts: 'TypeScript', tsx: 'TSX',
    py: 'Python', python: 'Python', bash: 'Bash', sh: 'Shell',
    css: 'CSS', scss: 'SCSS', html: 'HTML', json: 'JSON',
    md: 'Markdown', sql: 'SQL', yaml: 'YAML', yml: 'YAML',
  };
  const langLabel = language ? (langDisplay[language.toLowerCase()] ?? language.toUpperCase()) : '';

  return (
    <div className="group my-8 rounded-2xl overflow-hidden w-full border border-slate-200 dark:border-slate-800 shadow-sm">
      {/* Header bar — always dark (GitHub-style) */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          {/* macOS traffic-light dots */}
          <span className="w-3 h-3 rounded-full bg-[#ff5f57] opacity-80" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e] opacity-80" />
          <span className="w-3 h-3 rounded-full bg-[#28c840] opacity-80" />
          {title && (
            <span className="ml-3 text-[12px] font-mono text-[#8b949e] truncate max-w-[240px]">{title}</span>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {langLabel && (
            <span className="text-[11px] font-mono font-medium text-[#8b949e] bg-[#30363d] px-2.5 py-0.5 rounded-full tracking-wide">
              {langLabel}
            </span>
          )}
          <CopyCodeButton>{children}</CopyCodeButton>
        </div>
      </div>

      {/* Code fills the container flush — inline style from rehype-pretty-code is dropped via _style */}
      <pre
        {...props}
        style={{ backgroundColor: '#0d1117' }}
        className={`m-0 w-full overflow-x-auto px-6 py-5 text-[13px] leading-[1.75] font-mono ${props.className || ''}`}
      >
        {children}
        </pre>
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
  img: ({ src, alt, ...props }: any) => {
    if (!src) return null;
    return (
      <figure className="my-10 block">
        <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt || 'Article image'}
            loading="lazy"
            className="w-full h-auto max-h-[560px] object-cover object-center m-0 transition-transform duration-500 hover:scale-[1.01]"
            {...props}
          />
        </div>
        {alt && (
          <figcaption className="text-center text-xs text-softText mt-3 font-medium tracking-wide">
            {alt}
          </figcaption>
        )}
      </figure>
    );
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
