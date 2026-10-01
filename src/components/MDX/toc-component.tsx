"use client";

import { useHighlighted } from '@/app/hooks';
import Link from 'next/link';
import React from 'react'
import { AlignLeft } from 'lucide-react';

interface TableOfContentsProps {
  nodes: any;
}

interface Node {
  depth: 2 | 3 | 4;
  data: {
    hProperties: {
      id: string;
    };
  };
  value: string;
  children: any[]
}

const TOCLink = ({ node }: { node: Node }) => {
  const fontSizes = { 2: "base", 3: "sm", 4: "xs" };
  const id = node.data.hProperties.id;
  const { highlighted, setActiveId } = useHighlighted(id);

  return (
    <Link
      href={`#${id}`}
      className={`block transition-all duration-200 py-1.5 border-l-2 text-xs sm:text-sm leading-snug ${
        highlighted
          ? "border-cta text-cta font-bold translate-x-1"
          : "border-slate-200 dark:border-slate-800 text-softText hover:border-cta/40 hover:text-[var(--textColor)]"
      } pl-3.5`}
      style={{
        fontSize: `var(--text-${fontSizes[node.depth]})`,
        marginLeft: `${(node.depth - 2) * 10}px`,
      }}
      onClick={(e) => {
        e.preventDefault();
        setActiveId(id);
        const element = document.getElementById(id);
        if (element) {
          const offset = 100; // Account for sticky header
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }}
    >
      {node.value}
    </Link>
  );
};

function renderNodes(nodes: Node[]) {
  return (
    <div className="flex flex-col gap-0.5">
      {nodes.map((node) => (
        <React.Fragment key={node.data.hProperties.id}>
          <TOCLink node={node} />
          {node.children?.length > 0 && renderNodes(node.children)}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function TableOfContents({ nodes }: TableOfContentsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
        <AlignLeft className="w-4 h-4 text-cta" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-softText">
          On this page
        </h3>
      </div>
      {renderNodes(nodes)}
    </div>
  );
}
