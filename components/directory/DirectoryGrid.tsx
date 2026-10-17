'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Star, 
  ExternalLink, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Filter, 
  ShieldCheck,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Tool } from '@/lib/types';
import { TOOLS } from '@/lib/db';

export default function DirectoryGrid() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'priority' | 'rating' | 'reviews'>('priority');

  const categories = [
    'All',
    'Deal Analysis',
    'Lead Generation',
    'IDX & Websites',
    'CRM & Automation',
    'Property Management',
    'Property Data & Comps',
  ];

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      if (!tool.isActive) return false;
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = 
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(search.toLowerCase()) ||
        tool.features.some(f => f.toLowerCase().includes(search.toLowerCase()));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return b.priority - a.priority;
    });
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by software name, feature, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'priority' | 'rating' | 'reviews')}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="priority">Top Operator Pick</option>
              <option value="rating">Highest Rated (⭐)</option>
              <option value="reviews">Most Verified Reviews</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:border-emerald-500/50 transition-all hover:-translate-y-1 group"
          >
            <div>
              {/* Card Header: Category & Commission Badge */}
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-emerald-400 font-semibold tracking-wide uppercase text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {tool.category}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <strong className="text-white">{tool.rating}</strong>
                  <span>({tool.reviewCount})</span>
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                <Link href={`/tools/${tool.slug}`}>
                  {tool.name}
                </Link>
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {tool.tagline}
              </p>

              {/* Commission Transparency Box */}
              <div className="my-4 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">Starting Price</span>
                <span className="font-bold text-white">{tool.pricing.startingPrice}</span>
              </div>

              {/* Key Features */}
              <ul className="space-y-1.5 text-xs text-slate-300 my-4">
                {tool.features.slice(0, 3).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <a
                href={`/api/affiliate/redirect/${tool.slug}?source=directory_grid`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/10"
              >
                <span>Visit {tool.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center justify-between text-xs pt-1 px-1">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Read Review & Specs →
                </Link>

                <Link
                  href={`/tools/compare/${tool.slug}-vs-carrot`}
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  Compare
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-slate-400 text-sm">No real estate software matches your filter criteria.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs text-emerald-400 hover:underline font-semibold"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
