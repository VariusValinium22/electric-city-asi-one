import React from 'react';
import { KioskLayout } from '../components/KioskLayout';

export const StartPage: React.FC = () => {
  return (
    <KioskLayout>
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
        <h2 className="text-4xl font-bold text-center">
          Electric City Aquarium
        </h2>
        <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-2xl">🦈</span>
        </div>
      </div>
    </KioskLayout>
  );
};