
export interface SocialLink {
  name: string;
  url: string;
  icon: 'instagram' | 'discord' | 'whatsapp' | 'tiktok';
}

export interface MenuBlock {
  title: string;
  image: string;
  url: string;
  label: string;
}

export enum SearchMode {
  DORK_GENERATOR = 'DORK_GENERATOR',
  DEEP_ANALYSIS = 'DEEP_ANALYSIS',
  INTELLIGENCE_REPORT = 'INTELLIGENCE_REPORT'
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface DorkTemplate {
  name: string;
  description: string;
  syntax: string;
  category: string;
}

export interface SearchResult {
  isLoading: boolean;
  error?: string;
  mode: SearchMode;
  query: string;
  timestamp: number;
  content: string;
  dorkQuery?: string;
  sources?: GroundingChunk[];
}
