import React from 'react';
import { CheckCircle, XCircle, Eye, Clock, ExternalLink } from 'lucide-react';
import { NewsArticle } from '../types/news';

interface NewsCardProps {
  article: NewsArticle;
  onClick: (article: NewsArticle) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick }) => {
  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora há pouco';
    if (diffInHours === 1) return '1 hora atrás';
    if (diffInHours < 24) return `${diffInHours} horas atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 dia atrás';
    return `${diffInDays} dias atrás`;
  };

  const getVerificationColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getVerificationIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="h-4 w-4" />;
    return <XCircle className="h-4 w-4" />;
  };

  return (
    <article
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] group"
      onClick={() => onClick(article)}
    >
      <div className="relative">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {article.isViral && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
            🔥 VIRAL
          </div>
        )}
        <div className="absolute top-3 right-3">
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getVerificationColor(article.verificationScore)}`}>
            {getVerificationIcon(article.verificationScore)}
            <span className="ml-1">{article.verificationScore}%</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {timeAgo(article.publishedAt)}
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h2>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <span className="font-medium">{article.author}</span>
            <span className="mx-2">•</span>
            <span>{article.source}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {article.viewCount.toLocaleString()}
            </div>
            <ExternalLink className="h-4 w-4 text-blue-500" />
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Fontes verificadas:</span>
            <div className="flex space-x-1">
              {article.sources.slice(0, 3).map((source, index) => (
                <span
                  key={index}
                  className="inline-block w-2 h-2 bg-green-400 rounded-full"
                  title={source}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;