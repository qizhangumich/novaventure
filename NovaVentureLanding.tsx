export default function NovaVentureLanding() {
    return (
      <div className="bg-gradient-to-b from-[#0A0F24] to-[#000814] text-white min-h-screen font-sans">
  
        {/*
          # NovaVenture
          Welcome to NovaVenture, your gateway to the frontier of innovation and global opportunity.
          NovaVenture bridges transformative technology investment with strategic cross-border advisory,
          empowering the next wave of AI-driven growth and globalization.
        */}
  
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-[#490314]">
          <h1 className="text-2xl font-bold">NovaVenture</h1>
          <nav className="space-x-6">
            <a href="#investment" className="hover:text-[#FF6B35]">Investment</a>
            <a href="#advisory" className="hover:text-[#FF6B35]">Advisory</a>
            <a href="#insights" className="hover:text-[#FF6B35]">Insights</a>
            <a href="#contact" className="hover:text-[#FF6B35]">Contact</a>
          </nav>
        </header>
  
        {/* Hero Section */}
        {/* 🚀 Our Mission */}
        <section className="text-center py-20 px-6">
          <h2 className="text-4xl font-bold text-[#FF6B35] mb-4">Navigating the Edge of Innovation</h2>
          <p className="text-lg max-w-2xl mx-auto">
            To identify, invest in, and accelerate world-changing technologies — and to support visionary companies
            navigating cross-border expansion across Asia, the Middle East, and Southeast Asia.
          </p>
          <button className="mt-8 bg-[#490314] hover:bg-[#FF6B35] text-white py-2 px-6 rounded-xl shadow-lg transition">
            Join Our Syndicate
          </button>
        </section>
  
        {/* 📈 Frontier Investment */}
        <section id="investment" className="px-6 py-16 border-t border-[#490314]">
          {/* ### Big Ideas & Research */}
          <h3 className="text-3xl font-bold text-[#00C2A8] mb-6">Frontier Investment</h3>
          <ul className="space-y-4 text-lg">
            <li>Artificial Intelligence & Agents</li>
            <li>Data Infrastructure</li>
            <li>Public Blockchains & Tokenized Economies</li>
            <li>Robotics & Autonomy</li>
            <li>Digital Wallets & Stablecoins</li>
          </ul>
          {/* Portfolio Highlights: Showcasing breakthrough innovators */}
          {/* Join Our Syndicate: LP network across Singapore, Abu Dhabi */}
        </section>
  
        {/* 🌏 Global Advisory */}
        <section id="advisory" className="px-6 py-16 border-t border-[#490314]">
          <h3 className="text-3xl font-bold text-[#00C2A8] mb-6">Global Advisory</h3>
          {/* ### Go Global: Outbound China */}
          <p className="max-w-3xl text-lg mb-4">
            Helping Chinese and Southeast Asian companies:
            Connect with investors and strategic partners,
            Navigate legal and regulatory frameworks,
            Land and expand in MENA, Singapore, and more.
          </p>
          {/* ### Fundraising Advisory */}
          <p className="max-w-3xl text-lg mb-4">
            From pitch to close, we offer capital strategy, investor outreach,
            and support for negotiations.
          </p>
          {/* ### Cross-Border Partnerships */}
          <p className="max-w-3xl text-lg">
            We broker real cooperation between tech innovators and global capital.
          </p>
        </section>
  
        {/* 🧠 Insights & Analysis */}
        <section id="insights" className="px-6 py-16 border-t border-[#490314]">
          <h3 className="text-3xl font-bold text-[#00C2A8] mb-6">Insights & Briefings</h3>
          <p className="max-w-3xl text-lg">
            Explore investment theses, policy updates, and global tech briefings delivered directly to your inbox.
          </p>
          <button className="mt-6 bg-[#490314] hover:bg-[#FF6B35] py-2 px-6 rounded-xl">Subscribe</button>
        </section>
  
        {/* 🌐 Contact Us */}
        <footer id="contact" className="text-center px-6 py-10 border-t border-[#490314]">
          <p>Contact us: jeremy@thenovaventure.com</p>
          <p>Abu Dhabi | Singapore</p>
          <p className="mt-4 text-sm text-gray-400">© 2025 NovaVenture. All rights reserved.</p>
        </footer>
  
      </div>
    );
  }
  