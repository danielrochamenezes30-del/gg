import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import NewsCard from './components/NewsCard';
import NewsDetail from './components/NewsDetail';
import Stats from './components/Stats';
import { categories, mockNews } from './data/mockNews';
import { NewsArticle } from './types/news';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const filteredNews = useMemo(() => {
    let filtered = mockNews;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort by verification score and date
    return filtered.sort((a, b) => {
      // Prioritize verified articles
      if (a.isVerified && !b.isVerified) return -1;
      if (!a.isVerified && b.isVerified) return 1;
      
      // Then by viral status
      if (a.isViral && !b.isViral) return -1;
      if (!a.isViral && b.isViral) return 1;
      
      // Finally by date
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Stats />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-gray-400 text-2xl">📰</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-gray-500">Tente ajustar seus filtros ou pesquisa.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onClick={setSelectedArticle}
              />
            ))}
          </div>
        )}
        
        {/* Loading simulation for new content */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
            IA buscando novas notícias...
          </div>
        </div>
      </main>

      {selectedArticle && (
        <NewsDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}

export default App;