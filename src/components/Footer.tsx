import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const links = {
    quickLinks: [
      { name: 'Home', path: '/' },
      { name: 'About Irtiqa', path: '/about' },
      { name: 'About Founder', path: '/founder' },
      { name: 'Services', path: '/services' },
      { name: 'Photography', path: '/photography' },
      { name: 'Industries', path: '/industries' },
      { name: 'Clients', path: '/clients' },
      { name: 'Why Choose Us', path: '/why-choose-us' },
      { name: 'Testimonials', path: '/testimonials' },
      { name: 'Contact', path: '/contact' },
    ],
    services: [
      { name: 'Branding', path: '/services' },
      { name: 'Social Media', path: '/services' },
      { name: 'Web Development', path: '/services' },
      { name: 'Photography', path: '/services' },
      { name: 'Video Production', path: '/services' },
      { name: 'Performance Marketing', path: '/services' },
    ],
    social: [
      { name: 'Instagram', url: 'https://www.instagram.com/irtiqamarketing/' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/irtiqamarketing/' },
      { name: 'Facebook', url: 'https://www.facebook.com/irtiqamarketing/' },
      { name: 'YouTube', url: 'https://www.youtube.com/@irtiqamarketing' },
    ],
  };

  return (
    <footer className="bg-[#0B0B0B] text-white border-t border-white/5" role="contentinfo" aria-label="Site footer">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center group mb-6" aria-label="Irtiqa Marketing home">
              <img
                src="/images/brand/irtiqa-logo-footer.png"
                alt="Irtiqa Marketing"
                className="w-[180px] sm:w-[230px] h-auto object-contain"
              />
            </Link>
            <p className="text-sm text-neutral-400 tracking-wider uppercase mb-6 leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}>
              Creative Agency | Branding | Digital Marketing | Website Development | Photography | Videography | Social Media | SEO | Performance Marketing
            </p>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] mb-6 text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {links.quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] mb-6 text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>
                Services
              </h4>
              <ul className="space-y-3">
                {links.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/60 hover:text-white transition-colors text-sm"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] mb-6 text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>
                Connect
              </h4>
              <ul className="space-y-3">
                {links.social.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors text-sm"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 pt-12 lg:pt-16 pb-8">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl mb-4 text-white" style={{ fontFamily: "'Cinzel', serif" }}>Get in touch</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Mail className="w-5 h-5 text-neutral-400" />
                <a
                  href="mailto:faqehafatima29@gmail.com"
                  className="text-base sm:text-lg text-white/80 hover:text-white transition-colors break-all"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  faqehafatima29@gmail.com
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Phone className="w-5 h-5 text-neutral-400" />
                <a href="tel:+919631096067" className="text-base sm:text-lg text-white/80 hover:text-white transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  +91 9631096067
                </a>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <MapPin className="w-5 h-5 text-neutral-400" />
                <span className="text-base sm:text-lg text-white/80" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Lucknow, Uttar Pradesh
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-white/40">
            <div className="space-y-1">
              <p style={{ fontFamily: "'Poppins', sans-serif" }}>© {new Date().getFullYear()} Irtiqa Marketing. All rights reserved.</p>
              <p className="text-[10px] text-white/30" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Designed and Developed by <a href="https://hitechglobals.com" target="_blank" rel="noopener noreferrer" className="hover:text-white underline transition-colors">HiTech Globals</a>
              </p>
            </div>
            <div className="flex gap-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <Link to="/legal/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/legal/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
