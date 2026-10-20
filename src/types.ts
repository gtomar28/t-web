export interface SiteSettings {
  reducedMotion: boolean;
  highQuality3D: boolean;
  soundEnabled: boolean;
}

export interface CubeTransform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  cubeIndex: number;
  role: string;
  tech: string[];
  description: string;
  color: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  category: 'custom-software' | 'web-mobile' | 'cloud-devops' | 'ai-ml' | 'erp-crm' | 'ui-ux' | 'it-consulting' | 'cybersecurity' | 'growth' | 'core' | 'product' | 'cloud' | 'data' | 'security';
  badge?: string;
  tech: string[];
  metrics: { label: string; value: string };
  color: string;
  iconName: string;
  includes: string[];
  fitsFor: string;
  deliverables?: string[];
}

export type TechCategory = 'all' | 'frontend' | 'backend' | 'cloud' | 'testing' | 'ai' | 'data' | 'databases';

export interface TechCapabilityItem {
  id: string;
  name: string;
  category: TechCategory;
  usageNote: string;
  badge: string;
  tag: string;
  color: string;
  iconType: string;
}
