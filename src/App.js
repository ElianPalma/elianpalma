import React from 'react';
import DynamicCursor from './components/DynamicCursor';
import PortfolioHeader from './components/PortfolioHeader';
import HeroSlider from './components/HeroSlider';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans antialiased">
      <DynamicCursor />
      <PortfolioHeader />
      <main>
        <HeroSlider />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;

// DONE