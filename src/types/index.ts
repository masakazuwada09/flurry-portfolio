export type ProjectCategory = 'all' | 'branding' | 'print' | 'social' | 'art' | 'multimedia';

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface PortfolioItem {
  id: string;
  caseNumber: string;
  title: string;
  category: 'branding' | 'print' | 'social' | 'art' | 'multimedia';
  categoryLabel: string;
  badgeColorClass: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  colSpanDesktop: string; // e.g. 'lg:col-span-8', 'lg:col-span-4', etc.
  client?: string;
  timeline?: string;
  deliverables?: string[];
  swatches?: ColorSwatch[];
  typographyUsed?: string[];
  keyHighlights?: string[];
}

export interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  typicalDuration: string;
}

export type CRMLeadStatus =
  | 'Pending Discovery'
  | 'Reviewed'
  | 'Proposal Sent'
  | 'Contract Signed'
  | 'Completed'
  | 'Archived';

export interface AppointmentInquiry {
  id: string;
  clientName: string;
  email: string;
  phone?: string;
  selectedServices: string[];
  targetLaunchDate: string;
  budgetTier: string;
  estimatedTotal: number;
  projectDescription: string;
  createdAt: string;
  status: CRMLeadStatus;
  adminNotes?: string;
}

export interface ToolMastery {
  name: string;
  category: 'vector' | 'raster' | 'editorial' | 'motion' | 'all';
  proficiency: number;
  tag: string;
  description: string;
  color: string;
}

export interface Certification {
  id: string;
  badge: string;
  title: string;
  issuer: string;
  distinction: string;
  description: string;
  year: string;
  icon: string;
  accentColor: string;
}

export interface StudioMeta {
  name: string;
  tagline: string;
  director: string;
  directorShort: string;
  directorBio: string;
  email: string;
  turnaround: string;
  scope: string;
  heroBanner: string;
  directorBanner: string;
  toolsBanner: string;
  certificatesBanner: string;
  contactBanner: string;
  socialHandles: {
    instagram: string;
    behance: string;
    pinterest: string;
  };
}

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  uploadedAt: string;
  size?: string;
  type: 'image' | 'video' | 'vector';
}

export type AdminTab =
  | 'dashboard'
  | 'pages'
  | 'portfolio'
  | 'crm'
  | 'services'
  | 'media'
  | 'settings';

