import React from 'react';
import { useApp } from '../../context/AppContext';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { PresentationModeBar } from '../common/PresentationModeBar';
import { EvidenceDrawer } from '../common/EvidenceDrawer';

import { DashboardPage } from '../pages/DashboardPage';
import { ApplicationIntakePage } from '../pages/ApplicationIntakePage';
import { HistoricalComparisonPage } from '../pages/HistoricalComparisonPage';
import { RuleValidationPage } from '../pages/RuleValidationPage';
import { DocumentVerificationPage } from '../pages/DocumentVerificationPage';
import { FindingsPage } from '../pages/FindingsPage';
import { OfficerReviewPage } from '../pages/OfficerReviewPage';
import { AuditTrailPage } from '../pages/AuditTrailPage';
import { PresentationDeckPage } from '../pages/PresentationDeckPage';

export const AppShell: React.FC = () => {
  const { activeTab, presentationMode } = useApp();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'intake':
        return <ApplicationIntakePage />;
      case 'comparison':
        return <HistoricalComparisonPage />;
      case 'rules':
        return <RuleValidationPage />;
      case 'documents':
        return <DocumentVerificationPage />;
      case 'findings':
        return <FindingsPage />;
      case 'officer-review':
        return <OfficerReviewPage />;
      case 'audit-report':
        return <AuditTrailPage />;
      case 'presentation-slides':
        return <PresentationDeckPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Topbar (No print) */}
      <div className="no-print">
        <Topbar />
        <PresentationModeBar />
      </div>

      {/* Main App Layout: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Navigation Sidebar (hidden on print and optionally collapsible in presentation mode) */}
        {!presentationMode && (
          <div className="no-print hidden md:block">
            <Sidebar />
          </div>
        )}

        {/* Content Area */}
        <main className={`flex-1 overflow-y-auto ${presentationMode ? 'p-4 md:p-6 max-w-7xl mx-auto w-full' : 'p-4 md:p-6 lg:p-8 max-w-7xl'}`}>
          {renderActiveScreen()}
        </main>
      </div>

      {/* Slide-over Evidence Drawer */}
      <EvidenceDrawer />
    </div>
  );
};
