import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import OnboardingWizard from './components/OnboardingWizard';
import EntrepreneurDashboard from './components/EntrepreneurDashboard';
import OfficerDashboard from './components/OfficerDashboard';
import AdminDashboard from './components/AdminDashboard';
import SchemesExplorer from './components/SchemesExplorer';
import TrackApplicationModal from './components/TrackApplicationModal';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [userRole, setUserRole] = useState('applicant'); // 'applicant', 'officer', 'admin'
  const [selectedAppId, setSelectedAppId] = useState('MH-2026-IND-9421');
  const [initialSector, setInitialSector] = useState('Automobile & Electric Vehicles');
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  // Handlers
  const handleStartWizard = (sector = 'Automobile & Electric Vehicles') => {
    setInitialSector(sector);
    setActiveTab('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplicationSubmitted = (newApp) => {
    setSelectedAppId(newApp.id);
    setUserRole('applicant');
    setActiveTab('entrepreneur');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectApp = (appId) => {
    setSelectedAppId(appId);
    setUserRole('applicant');
    setActiveTab('entrepreneur');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyScheme = (scheme) => {
    // Directs into Onboarding Wizard pre-configured for scheme application
    setActiveTab('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header with Role Switcher */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenTrackModal={() => setTrackModalOpen(true)}
        notificationCount={3}
      />

      {/* Main Content Rendered by Tab */}
      <main style={{ flex: 1 }}>
        {activeTab === 'landing' && (
          <LandingPage 
            onStartWizard={() => handleStartWizard('Automobile & Electric Vehicles')}
            onOpenTrackModal={() => setTrackModalOpen(true)}
            onExploreSchemes={() => {
              setActiveTab('schemes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSector={(sec) => handleStartWizard(sec)}
          />
        )}

        {activeTab === 'wizard' && (
          <OnboardingWizard 
            initialSector={initialSector}
            onApplicationSubmitted={handleApplicationSubmitted}
            onCancel={() => setActiveTab('landing')}
          />
        )}

        {activeTab === 'entrepreneur' && (
          <EntrepreneurDashboard 
            selectedAppId={selectedAppId}
            onNewApplicationClick={() => handleStartWizard()}
          />
        )}

        {activeTab === 'officer' && (
          <OfficerDashboard />
        )}

        {activeTab === 'schemes' && (
          <SchemesExplorer 
            onApplyScheme={handleApplyScheme}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Quick Track Application Modal */}
      <TrackApplicationModal 
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
        onSelectApp={handleSelectApp}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
