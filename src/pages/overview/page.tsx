import OverviewView from '@/sections/overview/overview-view';

/**
 * Overview page component
 * Main landing page for the application
 */
export default function OverviewPage() {
  return (
    <div className="w-full max-w-full p-2 sm:p-4 lg:p-6 overflow-x-hidden">
      <OverviewView />
    </div>
  );
}
