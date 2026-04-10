"use client";

import { useHighlighted } from '@/app/hooks';
import Link from 'next/link';
import React from 'react'

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
      className={`block transition-all duration-200 hover:text-cta py-1.5 border-l-2 ${highlighted
          ? "border-cta text-cta font-medium translate-x-1"
          : "border-softBg/30 text-softText hover:border-cta/50"
        } pl-4`}
      style={{ fontSize: `var(--text-${fontSizes[node.depth]})`, marginLeft: `${(node.depth - 2) * 12}px` }}
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
    <div className="flex flex-col gap-1">
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
    <div className='hidden md:block w-full'>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-cta rounded-full" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-textColor/70">
          On this page
        </h3>
      </div>
      {renderNodes(nodes)}
    </div>
  )
}
