'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, ArrowRight, Hash, Tag } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface SearchResult {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  category: string;
  description: string;
}

export default function SearchPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const isBlogRelatedPath = pathname.startsWith('/blog') || pathname.startsWith('/admin/dashboard');

  // Fetch search index
  useEffect(() => {
    if (isOpen && posts.length === 0) {
      const fetchIndex = async () => {
        setIsLoading(true);
        try {
          const res = await fetch('/api/search-index');
          const data = await res.json();
          setPosts(data);
        } catch (error) {
          console.error('Failed to fetch search index:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchIndex();
    }
  }, [isOpen, posts.length]);

  // Optimized Filtered results
  const filteredResults = React.useMemo(() => {
    if (query.trim() === '') return [];
    const lowerQuery = query.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      post.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
  }, [query, posts]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if in blog-related path
      if (!isBlogRelatedPath) return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Selection logic
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
      e.preventDefault();
      router.push(`/blog/posts/${filteredResults[selectedIndex].slug}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  if (!isBlogRelatedPath) return null;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-softBg/50 hover:bg-softBg transition-colors border border-softBg/50 group"
      >
        <Search className="w-4 h-4 text-softText group-hover:text-cta transition-colors" />
        <span className="hidden md:block text-xs font-semibold text-softText uppercase tracking-wider">Search...</span>
        <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white dark:bg-black/20 border border-softBg text-[10px] font-bold text-softText">
          <Command className="w-2.5 h-2.5" />
          <span>K</span>
        </div>
      </button>

      {/* Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-[var(--bg)] rounded-2xl shadow-2xl border border-softBg overflow-hidden"
            >
              <div className="flex items-center px-4 py-4 border-b border-softBg">
                <Search className="w-5 h-5 text-cta" />
                <input
                  ref={inputRef}
                  autoFocus
                  type="text"
                  placeholder="Search technical posts, tags, or categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 ml-3 bg-transparent border-none outline-none text-textColor text-lg placeholder:text-softText/50"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-softBg rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-softText" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-cta/20">
                {isLoading ? (
                  <div className="p-20 text-center">
                    <div className="w-8 h-8 border-2 border-cta border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-softText animate-pulse">Indexing technical posts...</p>
                  </div>
                ) : query.trim() === '' ? (
                  <div className="p-8 text-center">
                    <div className="inline-flex p-3 rounded-2xl bg-softBg mb-4">
                      <Tag className="w-6 h-6 text-cta" />
                    </div>
                    <p className="text-softText font-medium">Type to start searching across the blog...</p>
                  </div>
                ) : filteredResults.length > 0 ? (
                  <div className="py-2">
                    <div className="px-4 py-2 text-[10px] font-bold text-softText uppercase tracking-[0.2em]">
                      Search Results ({filteredResults.length})
                    </div>
                    {filteredResults.map((post, index) => (
                      <Link
                        key={post.slug}
                        href={`/blog/posts/${post.slug}`}
                        onClick={() => {
                          setIsOpen(false);
                          setQuery('');
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-start gap-4 px-4 py-3 transition-all ${index === selectedIndex ? 'bg-softBg' : ''
                          }`}
                      >
                        <div className={`p-2 rounded-xl transition-colors ${index === selectedIndex ? 'bg-white dark:bg-black/20 text-cta' : 'bg-softBg text-softText'
                          }`}>
                          <Hash className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-textColor truncate group-hover:text-cta">{post.title}</h4>
                          <p className="text-xs text-softText line-clamp-1 mt-0.5">{post.description}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-cta/10 text-cta font-bold uppercase tracking-wider transition-all">
                              {post.category}
                            </span>
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[10px] text-softText font-medium">#{tag}</span>
                            ))}
                          </div>
                        </div>
                        {index === selectedIndex && (
                          <motion.div layoutId="arrow" className="self-center pr-2">
                            <ArrowRight className="w-4 h-4 text-cta" />
                          </motion.div>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center">
                    <p className="text-softText italic">No posts found matching &quot;{query}&quot;</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-softBg/30 border-t border-softBg flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-softText">
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-black/20 border border-softBg">↵</kbd>
                    <span>SELECT</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-softText">
                    <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-black/20 border border-softBg">↑↓</kbd>
                    <span>NAVIGATE</span>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-softText uppercase tracking-widest">
                  ESC TO CLOSE
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
