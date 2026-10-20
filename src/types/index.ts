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
  status: 'Pending Discovery' | 'Reviewed' | 'Scheduled';
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
