import { useState } from 'react';
import SubscribeForm from './components/SubscribeForm';

export default function NovaVentureLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const investmentThemes = [
    {
      title: "Artificial Intelligence & Agents",
      description: "Investing in next-generation AI systems that enhance human capabilities and automate complex tasks across industries."
    },
    {
      title: "Data Infrastructure",
      description: "Supporting foundational technologies that enable secure, scalable, and efficient data management and processing."
    },
    {
      title: "Public Blockchains & Tokenized Economies",
      description: "Backing innovative blockchain solutions that create new economic models and digital asset ecosystems."
    },
    {
      title: "Robotics & Autonomy",
      description: "Funding advanced robotics and autonomous systems that transform manufacturing, logistics, and service industries."
    },
    {
      title: "Digital Wallets & Stablecoins",
      description: "Investing in financial infrastructure that enables seamless cross-border transactions and digital asset management."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#0A0F24] to-[#000814] text-white min-h-screen font-sans">

      {/* 
        # NovaVenture
        Welcome to NovaVenture, your gateway to the frontier of innovation and global opportunity.
        NovaVenture bridges transformative technology investment with strategic cross-border advisory,
        empowering the next wave of AI-driven growth and globalization.
      */}

      {/* Header */}
      <header className="fixed w-full bg-[#0A0F24]/90 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-[#490314]">
          <h1 className="text-2xl font-bold">NovaVenture</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('investment')} className="hover:text-[#FF6B35] transition-colors">Investment</button>
            <button onClick={() => scrollToSection('advisory')} className="hover:text-[#FF6B35] transition-colors">Advisory</button>
            <button onClick={() => scrollToSection('insights')} className="hover:text-[#FF6B35] transition-colors">Insights</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#FF6B35] transition-colors">Contact</button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0A0F24] border-t border-[#490314]">
            <nav className="flex flex-col space-y-4 px-6 py-4">
              <button onClick={() => scrollToSection('investment')} className="hover:text-[#FF6B35] transition-colors text-left">Investment</button>
              <button onClick={() => scrollToSection('advisory')} className="hover:text-[#FF6B35] transition-colors text-left">Advisory</button>
              <button onClick={() => scrollToSection('insights')} className="hover:text-[#FF6B35] transition-colors text-left">Insights</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-[#FF6B35] transition-colors text-left">Contact</button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="text-center py-32 px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-[#FF6B35] mb-6 animate-fade-in">
            Navigating the Edge of Innovation
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            To identify, invest in, and accelerate world-changing technologies — and to support visionary companies
            navigating cross-border expansion across Asia, the Middle East, and Southeast Asia.
          </p>
          <button className="bg-[#490314] hover:bg-[#FF6B35] text-white py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
            Join Our Syndicate
          </button>
        </section>

        {/* Section Divider */}
        <div className="h-[2px] bg-[#490314] w-full"></div>

        {/* Investment Section */}
        <section id="investment" className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl font-bold text-[#00C2A8] mb-12">Frontier Investment</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {investmentThemes.map((theme, index) => (
                <div key={index} className="p-8 border border-[#490314] rounded-xl hover:border-[#FF6B35] transition-colors">
                  <h4 className="text-2xl font-semibold text-[#FF6B35] mb-4">{theme.title}</h4>
                  <p className="text-lg text-gray-300">{theme.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="h-[2px] bg-[#490314] w-full"></div>

        {/* Advisory Section */}
        <section id="advisory" className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl font-bold text-[#00C2A8] mb-12">Global Advisory</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-8 border border-[#490314] rounded-xl hover:border-[#FF6B35] transition-colors">
                <h4 className="text-2xl font-semibold text-[#FF6B35] mb-4">Go Global: Outbound China</h4>
                <p className="text-lg text-gray-300">
                  Helping Chinese and Southeast Asian companies:
                  Connect with investors and strategic partners,
                  Navigate legal and regulatory frameworks,
                  Land and expand in MENA, Singapore, and more.
                </p>
              </div>
              <div className="p-8 border border-[#490314] rounded-xl hover:border-[#FF6B35] transition-colors">
                <h4 className="text-2xl font-semibold text-[#FF6B35] mb-4">Fundraising Advisory</h4>
                <p className="text-lg text-gray-300">
                  From pitch to close, we offer capital strategy, investor outreach,
                  and support for negotiations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="h-[2px] bg-[#490314] w-full"></div>

        {/* Insights Section */}
        <section id="insights" className="px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-[#00C2A8] mb-8">Insights & Briefings</h3>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Explore investment theses, policy updates, and global tech briefings delivered directly to your inbox.
            </p>
            <SubscribeForm />
          </div>
        </section>

        {/* Section Divider */}
        <div className="h-[2px] bg-[#490314] w-full"></div>

        {/* Footer */}
        <footer id="contact" className="px-6 py-16">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xl mb-4">Contact us: jeremy@thenovaventure.com</p>
            <p className="text-lg mb-4">Abu Dhabi | Singapore</p>
            <p className="text-sm text-gray-400">© 2025 NovaVenture. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
