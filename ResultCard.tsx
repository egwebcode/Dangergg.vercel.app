import React from 'react';
import ReactMarkdown from 'react-markdown';
import { SearchResult, SearchMode } from '../types';
import { ExternalLink, Copy, Check, Search, Globe, AlertTriangle } from 'lucide-react';

interface ResultCardProps {
  result: SearchResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeColor = (mode: SearchMode) => {
    switch (mode) {
      case SearchMode.DORK_GENERATOR: return 'bg-purple-900/50 text-purple-300 border-purple-700';
      case SearchMode.DEEP_ANALYSIS: return 'bg-cyan-900/50 text-cyan-300 border-cyan-700';
      case SearchMode.INTELLIGENCE_REPORT: return 'bg-orange-900/50 text-orange-300 border-orange-700';
      default: return 'bg-slate-800 text-slate-300';
    }
  };

  if (result.isLoading) {
    return (
      <div className="w-full p-6 rounded-lg border border-slate-800 bg-slate-900/50 animate-pulse">
        <div className="flex space-x-4 mb-4">
          <div className="h-4 w-24 bg-slate-800 rounded"></div>
          <div className="h-4 w-full bg-slate-800 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-slate-800 rounded w-3/4"></div>
          <div className="h-3 bg-slate-800 rounded w-5/6"></div>
          <div className="h-3 bg-slate-800 rounded w-2/3"></div>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-800">
           <div className="h-10 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="p-4 rounded-lg border border-red-900/50 bg-red-950/20 text-red-400 flex items-center space-x-3">
        <AlertTriangle size={20} />
        <span>{result.error}</span>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-slate-900/50 shadow-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-cyan-900/50">
      {/* Header */}
      <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-3">
            <div className={`px-2 py-1 rounded text-[10px] font-bold border uppercase tracking-wider ${getBadgeColor(result.mode)}`}>
                {result.mode.replace('_', ' ')}
            </div>
            <span className="text-slate-400 text-sm font-mono truncate max-w-[200px] md:max-w-md">
                {result.query}
            </span>
        </div>
        <span className="text-xs text-slate-600 font-mono">
            {new Date(result.timestamp).toLocaleTimeString()}
        </span>
      </div>

      {/* Main Content */}
      <div className="p-6 text-slate-300 text-sm leading-relaxed font-sans">
        <ReactMarkdown 
            className="prose prose-invert prose-sm max-w-none prose-headings:text-cyan-400 prose-a:text-cyan-500 prose-code:text-orange-300 prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800"
        >
            {result.content}
        </ReactMarkdown>

        {/* Dork Action Bar (If Applicable) */}
        {result.dorkQuery && (
             <div className="mt-6 p-4 bg-slate-950 rounded border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 font-mono text-cyan-400 text-sm break-all">
                    {result.dorkQuery}
                </div>
                <div className="flex space-x-2 shrink-0">
                    <button 
                        onClick={() => handleCopy(result.dorkQuery!)}
                        className="flex items-center space-x-2 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-700 transition-colors"
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copied ? 'Copied' : 'Copy Dork'}</span>
                    </button>
                    <a 
                        href={`https://www.google.com/search?q=${encodeURIComponent(result.dorkQuery)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-2 px-3 py-1.5 rounded bg-cyan-900/20 hover:bg-cyan-900/40 text-cyan-400 text-xs border border-cyan-900/50 transition-colors"
                    >
                        <Search size={14} />
                        <span>Run on Google</span>
                    </a>
                </div>
             </div>
        )}

        {/* Sources Section */}
        {result.sources && result.sources.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-800/50">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Globe size={14} /> Intelligence Sources
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.sources.map((source, idx) => (
                        source.web && (
                            <a 
                                key={idx} 
                                href={source.web.uri} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center p-2 rounded bg-slate-950/50 hover:bg-slate-800 border border-slate-800/50 hover:border-cyan-900/30 transition-all group"
                            >
                                <ExternalLink size={12} className="text-slate-600 group-hover:text-cyan-400 mr-2 shrink-0" />
                                <span className="text-xs text-slate-400 group-hover:text-slate-200 truncate">
                                    {source.web.title}
                                </span>
                            </a>
                        )
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};