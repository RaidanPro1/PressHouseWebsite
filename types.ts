export enum ViolationType {
  KIDNAPPING = 'اختطاف',
  ASSAULT = 'اعتداء جسدي',
  THREAT = 'تهديد',
  CENSORSHIP = 'حجب ومنع',
  KILLING = 'قتل',
  OTHER = 'أخرى'
}

export enum Governorate {
  SANAA = 'صنعاء',
  ADEN = 'عدن',
  TAIZ = 'تعز',
  HODEIDAH = 'الحديدة',
  MARIB = 'مأرب',
  HADRAMAUT = 'حضرموت',
  IBB = 'إب',
  OTHER = 'أخرى'
}

export enum Severity {
  LOW = 'منخفض',
  MEDIUM = 'متوسط',
  HIGH = 'عالي',
  CRITICAL = 'خطير جداً'
}

export interface Victim {
  id: number;
  fullName: string;
  role: string; // e.g., Journalist, Photographer
  mediaOutlet?: string;
}

export interface Violation {
  id: number;
  title: string;
  type: ViolationType;
  governorate: Governorate;
  date: string;
  severity: Severity;
  description: string;
  victimCount: number;
  victim?: Victim; // Detailed victim info
  perpetrator?: string; // The entity responsible for the violation
  videoUrl?: string;
  audioUrl?: string;
  imageUrl?: string;
  imageAltText?: string;
  imageCaption?: string;
  sourceLink?: string;
}

export interface Report {
  id: number;
  title: string;
  summary: string;
  date: string;
  pdfUrl: string;
  fileUrl?: string; // For electronic file upload
  fileAltText?: string;
  imageUrl: string;
  videoUrl?: string;
  category?: string;
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
}

export interface AnalysisResult {
  isManipulated: boolean;
  metadata: Record<string, string>;
  confidenceScore: number;
}

export interface TrainingCourse {
  id: number;
  title: string;
  description: string;
  content?: string; // For full course content
  applicationFormUrl?: string; // For application form
  date: string;
  duration: string;
  status: 'upcoming' | 'completed';
  instructor: string;
  image: string;
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
}

export interface NewsArticle {
    id: number;
    title: string;
    summary: string;
    content: string; // For full article view
    date: string;
    imageUrl: string;
    videoUrl?: string;
    category: string;
    seoTitle?: string;
    seoDescription?: string;
    slug?: string;
}

export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    imageUrl: string;
    type: 'event' | 'activity';
    seoTitle?: string;
    seoDescription?: string;
    slug?: string;
}

export interface Project {
    id: number;
    title: string;
    summary: string;
    status: 'ongoing' | 'completed';
    imageUrl: string;
    donorLogoUrl?: string;
    seoTitle?: string;
    seoDescription?: string;
    slug?: string;
}

export interface TeamMember {
    id: number;
    name: string;
    title: string;
    imageUrl: string;
    email?: string;
    phone?: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'monitor';
  status: 'active' | 'inactive';
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  subscriptionDate: string;
  status: 'subscribed' | 'unsubscribed';
}

export interface JobPosting {
  id: number;
  title: string;
  description: string;
  type: 'vacancy' | 'volunteer';
  closingDate: string;
  status: 'open' | 'closed';
  applicationFormUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
}

export interface Slide {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  button1Text?: string;
  button1Link?: string;
  button2Text?: string;
  button2Link?: string;
}

// Visual Page Editor Types
export interface PageBlock {
  id: string;
  type: string; // e.g., 'hero', 'impact_numbers', 'chart_config'
  title: string; // The name of the block in the editor
  content: any;
}

export interface Page {
  id: string;
  name: string;
  path: string;
  blocks: PageBlock[];
}

export interface MenuItem {
    id: string;
    label: string;
    path: string;
}

export type ObservatoryConfig = {
  chartType: 'radial' | 'pie' | 'bar';
};
