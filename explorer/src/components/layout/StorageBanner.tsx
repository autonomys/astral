import { EXTERNAL_ROUTES } from '@/constants/routes';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const StorageBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-lg p-6 py-16">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="space-y-4">          
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Join Auto Drive &
            <span className="block mt-1 bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">
              Experience the Future of Storage!
            </span>
          </h1>
          
          <p className="max-w-xl mx-auto text-sm text-blue-100">
          Sign in, to Auto Drive now to store, share, and download your files securely with Autonomys Network decentralized permanent storage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'End-to-End Encryption', desc: 'Secure your data with end-to-end encryption', route:EXTERNAL_ROUTES.autoDrive},
            { title: 'Create API Keys', desc: 'API keys to access decentralized storage', route:EXTERNAL_ROUTES.autoDrive },
            { title: 'NPM Support', desc: 'Auto-Drive\'s secure storage via @autonomys/auto-drive', route:EXTERNAL_ROUTES.autoDrivePackage },
            { title: 'Auto-DAG Data Structure', desc: 'Uses the Auto-DAG data structure to store data on chain', route:EXTERNAL_ROUTES.autoDagPackage }
          ].map((feature, i) => (
            <Link key={i} href={feature.route} target="_blank" rel="noopener noreferrer">
              <div 
                className="p-4 transition-all duration-200 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 border border-white/10"
              >
                <h3 className="text-sm font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs text-blue-100">
                  {feature.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-6 sm:flex-row">
          <Link href={EXTERNAL_ROUTES.autoDrive} target="_blank" rel="noopener noreferrer">
            <button
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-blue-600 transition-all duration-200 bg-white rounded-lg hover:bg-blue-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Get Started With Auto Drive 
              <ArrowRightIcon stroke='#1949D2' className='size-5 ml-2' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StorageBanner;
