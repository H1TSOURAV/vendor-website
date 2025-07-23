import './index.css';

function App() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center shadow-md sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-blue-600">10</div>
          <span className="font-bold text-xl tracking-tight">web.io</span>
        </div>
        <nav className="hidden md:flex gap-8 text-base font-medium">
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#pricing" className="hover:text-blue-600 transition">Pricing</a>
          <a href="#testimonials" className="hover:text-blue-600 transition">Testimonials</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </nav>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Get Started</button>
      </header>

      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between px-6 py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">AI-Powered Website Builder for Agencies & Businesses</h1>
          <p className="text-lg mb-8 text-gray-700">Build, host, and manage websites 10x faster with AI. Try for free and experience the future of web development.</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Start Free Trial</button>
        </div>
        <div className="mt-10 md:mt-0 md:ml-12 flex-1 flex justify-center">
          <div className="w-80 h-64 bg-gray-200 rounded-2xl shadow-lg flex items-center justify-center text-2xl text-gray-400">[Hero Image]</div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Features</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-2xl">⚡</div>
            <h3 className="font-semibold text-xl mb-2">AI Website Builder</h3>
            <p className="text-gray-600">Generate stunning websites in minutes using advanced AI technology.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-2xl">🚀</div>
            <h3 className="font-semibold text-xl mb-2">Fast Hosting</h3>
            <p className="text-gray-600">Lightning-fast, secure, and scalable hosting for all your sites.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-2xl">🔒</div>
            <h3 className="font-semibold text-xl mb-2">Top Security</h3>
            <p className="text-gray-600">Enterprise-grade security and daily backups keep your sites safe.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-blue-50 px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-8">
            <p className="text-gray-700 mb-4">“This platform made building websites so much easier and faster. The AI features are a game changer!”</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="font-semibold">Jane Doe</div>
                <div className="text-gray-500 text-sm">Agency Owner</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-8">
            <p className="text-gray-700 mb-4">“Hosting is super fast and reliable. I love the simple, clean UI!”</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div>
                <div className="font-semibold">John Smith</div>
                <div className="text-gray-500 text-sm">Business Owner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center border-2 border-blue-600">
            <h3 className="font-semibold text-xl mb-2">Starter</h3>
            <div className="text-3xl font-bold mb-4">$0</div>
            <ul className="text-gray-600 mb-6">
              <li>1 Website</li>
              <li>Basic AI Builder</li>
              <li>Email Support</li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Get Started</button>
          </div>
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center">
            <h3 className="font-semibold text-xl mb-2">Pro</h3>
            <div className="text-3xl font-bold mb-4">$29/mo</div>
            <ul className="text-gray-600 mb-6">
              <li>10 Websites</li>
              <li>Advanced AI Builder</li>
              <li>Priority Support</li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Get Started</button>
          </div>
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center">
            <h3 className="font-semibold text-xl mb-2">Agency</h3>
            <div className="text-3xl font-bold mb-4">$99/mo</div>
            <ul className="text-gray-600 mb-6">
              <li>Unlimited Websites</li>
              <li>Full AI Suite</li>
              <li>Dedicated Support</li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Get Started</button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-blue-50">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
        <form className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 flex flex-col gap-4">
          <input type="text" placeholder="Name" className="border rounded px-4 py-2" />
          <input type="email" placeholder="Email" className="border rounded px-4 py-2" />
          <textarea placeholder="Message" className="border rounded px-4 py-2" rows={4}></textarea>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 py-8 bg-white border-t text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} 10web.io. All rights reserved. Demo only.
      </footer>
    </div>
  );
}

export default App;
