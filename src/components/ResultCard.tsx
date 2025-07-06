
import React from 'react';
import type { NftMetadata } from '../types';

interface ResultCardProps {
  content: NftMetadata;
}

export const ResultCard: React.FC<ResultCardProps> = ({ content }) => {
  const { name, description, traits, lore } = content;

  return (
    <div className="w-full h-full p-4 bg-slate-800 rounded-lg animate-fade-in space-y-6 overflow-y-auto">
      <div>
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {name}
        </h3>
      </div>
      
      <div>
        <h4 className="font-semibold text-slate-300 mb-1">Description</h4>
        <p className="text-slate-400">{description}</p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-300 mb-1">Lore</h4>
        <p className="text-slate-400 italic">"{lore}"</p>
      </div>
      
      <div>
        <h4 className="font-semibold text-slate-300 mb-2">Traits</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {traits.map((trait, index) => (
            <div key={index} className="bg-slate-700/50 rounded-md p-2 text-center">
              <p className="text-xs uppercase font-bold text-purple-300">{trait.trait_type}</p>
              <p className="text-sm font-medium text-slate-200">{trait.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};