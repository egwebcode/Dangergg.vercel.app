import React from 'react';
import { Terminal, Shield, FileText, Globe, Database } from 'lucide-react';
import { DorkTemplate } from '../types';

const COMMON_DORKS: DorkTemplate[] = [
  {
    name: "Public PDF Documents",
    description: "Find PDF files on specific domains",
    syntax: 'site:target.com filetype:pdf',
    category: 'Files'
  },
  {
    name: "Exposed Config Files",
    description: "Find exposed env or config files",
    syntax: 'filetype:env "DB_PASSWORD"',
    category: 'Vulnerability'
  },
  {
    name: "Directory Listing",
    description: "Find open server directories",
    syntax: 'intitle:"index of"',
    category: 'Network'
  },
  {
    name: "Government Data",
    description: "Search official gov portals",
    syntax: 'site:gov.* "confidential" filetype:xls',
    category: 'Files'
  }
];

interface DorkSidebarProps {
  onSelectDork: (syntax: string) => void;
}

export const DorkSidebar: React.FC<DorkSidebarProps> = ({ onSelectDork }) => {
  return (
    <div className="w-80 border-r border-slate-800 bg-slate-950 flex flex-col h-full hidden md:flex">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-2 text-cyan-400 mb-2">
          <Terminal size={24} />
          <h1 className="text-xl font-bold font-mono tracking-tighter">NEXUS_INTEL</h1>
        </div>
        <p className="text-xs text-slate-500">v2.0.4 // CONNECTED</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
          Quick Access Dorks
        </h2>
        
        <div className="space-y-3">
          {COMMON_DORKS.map((dork, idx) => (
            <button
              key={idx}
              onClick={() => onSelectDork(dork.syntax)}
              className="w-full text-left p-3 rounded-lg bg-slate-900/50 hover:bg-cyan-950/30 border border-slate-800 hover:border-cyan-800 transition-all group"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-medium text-slate-200 group-hover:text-cyan-300">
                  {dork.name}
                </span>
                {dork.category === 'Files' && <FileText size={14} className="text-slate-500" />}
                {dork.category === 'Network' && <Globe size={14} className="text-slate-500" />}
                {dork.category === 'Vulnerability' && <Shield size={14} className="text-red-500" />}
              </div>
              <code className="text-[10px] text-cyan-600 font-mono block truncate mb-1">
                {dork.syntax}
              </code>
              <p className="text-[11px] text-slate-500 line-clamp-2">
                {dork.description}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-slate-900 rounded border border-slate-800">
          <div className="flex items-center space-x-2 text-yellow-500 mb-2">
            <Shield size={16} />
            <span className="text-xs font-bold uppercase">Ethical Usage</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            This tool is for educational and authorized security research only. 
            Searching for private PII (CPFs, Credit Cards) without consent is illegal.
            Results are synthesized from public sources.
          </p>
        </div>
      </div>
    </div>
  );
};
