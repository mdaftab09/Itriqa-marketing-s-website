import { SEO } from '../SEO';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Phone, MapPin, Instagram, Linkedin, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '', service: 'Branding' });
  const [submitted, setSubmitted] = useState(false);

  const whatsappNumber = '919631096067';

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'faqehafatima29@gmail.com',
      link: 'mailto:faqehafatima29@gmail.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 9631096067',
      link: 'tel:+919631096067',
      description: 'Call our creative team'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Queries',
      value: '+91 9631096067',
      link: `https://wa.me/${whatsappNumber}`,
      description: 'Send your project query on WhatsApp'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      value: 'Lucknow, Uttar Pradesh',
      link: null,
      description: 'Our creative hub'
    }
  ];

  const businessHours = [
    { days: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { days: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { days: 'Sunday', hours: 'Closed' }
  ];

  const faqs = [
    {
      question: 'Why choose Irtiqa?',
      answer: 'We focus on business-oriented marketing, luxury quality design, fast turnarounds, and end-to-end solutions managed by a dedicated team.'
    },
    {
      question: 'How long does branding take?',
      answer: 'A comprehensive branding project (including logo, packaging, brand identity, and guidelines) typically takes 3 to 6 weeks depending on scale.'
    },
    {
      question: 'Do you manage Instagram?',
      answer: 'Yes, we provide end-to-end Instagram and social media management, including content planning, strategy, design, copywriting, and growth.'
    },
    {
      question: 'Do you create websites?',
      answer: 'Absolutely. We develop custom business websites, high-converting landing pages, portfolio sites, and e-commerce stores using modern tech stacks.'
    },
    {
      question: 'Can you run ads?',
      answer: 'Yes, we design and run high-ROI campaigns across Meta Ads, Google Ads, lead generation setups, and target remarketing campaigns.'
    },
    {
      question: 'What industries do you work with?',
      answer: 'We partner with healthcare, restaurants, hotels, education, fashion, beauty, real estate, construction, startups, travel, and corporate brands.'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = [
      'Hello Irtiqa Marketing, I would like to discuss a project.',
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      `Service: ${formState.service}`,
      `Query: ${formState.message}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setTimeout(() => {
      setFormState({ name: '', email: '', message: '', service: 'Branding' });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
      <SEO 
        title="Contact Us | Book Consultation"
        description="Get in touch with Irtiqa Marketing. Book your free marketing & branding consultation. Let’s build something great together."
        canonical="/contact"
        keywords="contact irtiqa, book consultation, marketing contact, branding agency contact"
      />

      <div className="bg-background pt-24 pb-16 overflow-hidden text-foreground">
        
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 text-center relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold block mb-4">
                Get In Touch
              </span>
              <h1 className="text-4xl sm:text-6xl font-heading mb-6 tracking-wide leading-tight">
                Let’s Build Something <br />Great Together
              </h1>
              <div className="luxury-divider" />
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
            
            {/* Left Columns - Contact Info & Map */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 bg-card rounded-2xl border border-border space-y-6">
                <h2 className="text-2xl font-heading tracking-wide mb-6">Contact Channels</h2>
                
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.title} className="flex gap-4">
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">{method.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1 font-body">{method.description}</p>
                        {method.link ? (
                          <a href={method.link} className="text-accent font-semibold hover:underline font-body break-all">
                            {method.value}
                          </a>
                        ) : (
                          <span className="text-accent font-semibold font-body">
                            {method.value}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Business Hours */}
              <div className="p-8 bg-card rounded-2xl border border-border">
                <h2 className="text-xl font-heading tracking-wide mb-6">Business Hours</h2>
                <div className="space-y-3">
                  {businessHours.map((bh) => (
                    <div key={bh.days} className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                      <span className="text-muted-foreground font-body">{bh.days}</span>
                      <span className="text-foreground font-semibold font-body">{bh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Channels */}
              <div className="p-8 bg-card rounded-2xl border border-border text-center">
                <h2 className="text-lg font-heading tracking-wide mb-4">Connect Socially</h2>
                <div className="flex justify-center gap-4">
                  <a href="https://www.instagram.com/irtiqamarketing/" target="_blank" rel="noopener" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/company/irtiqamarketing/" target="_blank" rel="noopener" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://www.facebook.com/irtiqamarketing/" target="_blank" rel="noopener" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.youtube.com/@irtiqamarketing" target="_blank" rel="noopener" className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Columns - Form & Map Embed */}
            <div className="lg:col-span-7 space-y-8">
              <div className="p-8 bg-card rounded-2xl border border-border shadow-sm">
                <h2 className="text-2xl font-heading tracking-wide mb-6">Send a Message</h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body font-semibold">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary/50 rounded-xl border border-border focus:border-accent focus:outline-none font-body text-sm text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body font-semibold">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary/50 rounded-xl border border-border focus:border-accent focus:outline-none font-body text-sm text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body font-semibold">Select Service</label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary/50 rounded-xl border border-border focus:border-accent focus:outline-none font-body text-sm text-foreground"
                    >
                      <option>Branding</option>
                      <option>Graphic Design</option>
                      <option>Social Media Marketing</option>
                      <option>Video Production</option>
                      <option>Photography</option>
                      <option>Website Development</option>
                      <option>SEO</option>
                      <option>Performance Marketing</option>
                      <option>AI Solutions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-body font-semibold">Your Message</label>
                    <textarea 
                      rows={4}
                      required 
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-secondary/50 rounded-xl border border-border focus:border-accent focus:outline-none font-body text-sm text-foreground resize-none"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full py-4 bg-accent text-accent-foreground hover:bg-accent/90 transition-all font-semibold uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2"
                  >
                    Submit Query <ArrowRight className="w-4 h-4" />
                  </button>

                  {submitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="p-4 bg-green-500/10 border border-green-500/30 text-green-600 rounded-xl text-center text-sm font-semibold font-body"
                    >
                      Your query has been prepared for WhatsApp. Please continue the conversation there.
                    </motion.div>
                  )}
                </form>
              </div>

              {/* Google Map Placeholder / Embed */}
              <div className="rounded-2xl overflow-hidden border border-border h-80 relative bg-secondary flex items-center justify-center p-4">
                {/* Embed a placeholder style premium map component */}
                <iframe 
                  title="Irtiqa Marketing Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.425895781488!2d78.4744!3d17.385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb978a6e!2sIndia!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  className="absolute inset-0"
                />
              </div>
            </div>

          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 px-4 sm:px-6 bg-secondary/20 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-lg font-heading tracking-wide mb-2 text-foreground">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-body">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
