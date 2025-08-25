import React from 'react';
import { TrendingUp, CheckCircle, Eye, Clock } from 'lucide-react';

const Stats: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">Notícias Hoje</p>
              <p className="text-2xl font-semibold text-blue-900">127</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">Verificadas</p>
              <p className="text-2xl font-semibold text-green-900">95</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
            <div className="flex-shrink-0">
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-orange-600">Visualizações</p>
              <p className="text-2xl font-semibold text-orange-900">1.2M</p>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Última Atualização</p>
              <p className="text-sm font-semibold text-purple-900">Agora há pouco</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;