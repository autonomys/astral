import { ArrowRightIcon } from '@heroicons/react/20/solid';
import React from 'react';

const StorageBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-lg p-6">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20">
            <span className="text-xs font-medium text-white">✨ New: Auto Drive</span>
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Join Us Today &
            <span className="block mt-1 bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">
              Experience the Future of Storage!
            </span>
          </h1>
          
          <p className="max-w-xl mx-auto text-sm text-blue-100">
          Sign in now to store, share, and download your files securely with Autonomys Network decentralized permanent storage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'End-to-End Encryption', desc: 'Secure your data with end-to-end encryption' },
            { title: 'Create API Keys', desc: 'API keys to access decentralized storage' },
            { title: 'NPM Support', desc: 'Auto-Drive\'s secure storage via @autonomys/auto-drive' },
            { title: 'Auto-DAG Data Structure', desc: 'Uses the Auto-DAG data structure' }
          ].map((feature, i) => (
            <div 
              key={i}
              className="p-4 transition-all duration-200 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 border border-white/10"
            >
              <h3 className="text-sm font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-1 text-xs text-blue-100">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-6 sm:flex-row">
          <button
            onClick={() => window.open('https://ai3.storage', '_blank')}
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-blue-600 transition-all duration-200 bg-white rounded-lg hover:bg-blue-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            Get Started With Auto Drive 
            <ArrowRightIcon stroke='#1949D2' className='size-5 ml-2' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorageBanner;
