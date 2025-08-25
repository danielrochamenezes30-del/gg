import React from 'react';
import { Globe, Vote, Cpu, Trophy, TrendingUp, MapPin } from 'lucide-react';
import { NewsCategory } from '../types/news';

const iconMap = {
  Globe,
  Vote,
  Cpu,
  Trophy,
  TrendingUp,
  MapPin
};

interface CategoryFilterProps {
  categories: NewsCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 py-4 overflow-x-auto">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`
                  flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 transform hover:scale-105
                  ${isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;