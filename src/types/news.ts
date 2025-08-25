export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  publishedAt: Date;
  author: string;
  source: string;
  isVerified: boolean;
  verificationScore: number;
  sources: string[];
  tags: string[];
  viewCount: number;
  isViral: boolean;
}

export interface NewsCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}