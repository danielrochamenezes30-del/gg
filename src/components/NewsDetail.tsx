import React from 'react';
import { X, CheckCircle, XCircle, Eye, Clock, ExternalLink, Share2 } from 'lucide-react';
import { NewsArticle } from '../types/news';

interface NewsDetailProps {
  article: NewsArticle;
  onClose: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ article, onClose }) => {
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
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getVerificationIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="h-5 w-5" />;
    return <XCircle className="h-5 w-5" />;
  };

  const getVerificationText = (score: number) => {
    if (score >= 90) return 'Altamente Verificado';
    if (score >= 70) return 'Verificado';
    return 'Não Verificado';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Detalhes da Notícia</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="relative mb-6">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            {article.isViral && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                🔥 VIRAL
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-500 text-sm">
                <Eye className="h-4 w-4 mr-1" />
                {article.viewCount.toLocaleString()} visualizações
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {timeAgo(article.publishedAt)}
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="h-4 w-4 text-blue-500" />
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
          
          <div className="flex items-center justify-between mb-6 p-4 rounded-lg border-2 bg-gray-50">
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-2">Por:</span>
              <span className="text-gray-900">{article.author}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-600">{article.source}</span>
            </div>
            <div className={`flex items-center px-3 py-2 rounded-lg border ${getVerificationColor(article.verificationScore)}`}>
              {getVerificationIcon(article.verificationScore)}
              <span className="ml-2 font-medium">
                {getVerificationText(article.verificationScore)} ({article.verificationScore}%)
              </span>
            </div>
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 font-medium mb-4">{article.summary}</p>
            <div className="text-gray-700 leading-relaxed">
              {article.content}
              <br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              <br /><br />
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verificação por IA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Fontes Verificadas:</h4>
                <ul className="space-y-2">
                  {article.sources.map((source, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;