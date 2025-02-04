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
  const fontSizes = { 2: "lg", 3: "base", 4: "sm" };
  const id = node.data.hProperties.id;
  const { highlighted, setActiveId } = useHighlighted(id);

  return (
    <Link
      href={`#${id}`}
      className={`block text-${fontSizes[node.depth]} font-light hover:text-cta py-1 ${highlighted && "text-cta font-semibold"}`}
      onClick={(e) => {
        e.preventDefault();
        setActiveId(id);
        document.getElementById(id)!.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {node.value}
    </Link>
  );
};

function renderNodes(nodes: Node[]) {
  return (
    <ul className='pl-4'>
      {nodes.map((node) => (
        <li key={node.data.hProperties.id} className='flex gap-2'>
          <TOCLink node={node} />
          {node.children?.length > 0 && renderNodes(node.children)}
        </li>
      ))}
    </ul>
  );
}

export default function TableOfContents({ nodes }: TableOfContentsProps) {
  if (nodes.length <= 0) {
    return null
  }

  return (
    <div className='hidden md:block w-full'>
      <h3 className='text-3xl mb-3'>{nodes.length > 0 && "Table of contents"}</h3>
      {renderNodes(nodes)}
    </div>
  )
}
