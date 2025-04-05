import SubscribeForm from './components/SubscribeForm';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0F24] text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-[#FF6B35] mb-4">
          NovaVenture Capital
        </h1>
        
        <p className="text-xl md:text-2xl mb-6 text-gray-300">
          Pioneering the future of technology investment
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#1A1F35] p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-[#FF6B35] mb-4">Investment Focus</h2>
            <ul className="text-left space-y-2">
              <li>• AI & Machine Learning</li>
              <li>• Quantum Computing</li>
              <li>• Climate Tech</li>
              <li>• Digital Infrastructure</li>
            </ul>
          </div>
          
          <div className="bg-[#1A1F35] p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-[#FF6B35] mb-4">Our Approach</h2>
            <ul className="text-left space-y-2">
              <li>• Deep Technical Analysis</li>
              <li>• Long-term Partnership</li>
              <li>• Global Perspective</li>
              <li>• Sustainable Growth</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#FF6B35] mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-6">
            Subscribe to receive our latest investment insights, market analysis, and tech deep-dives.
          </p>
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
} 