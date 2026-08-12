import { useEffect, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import { BackToTop } from './components/BackToTop';
import { CookieConsent } from './components/CookieConsent';

// Lazy load page components for code splitting
const Home = lazy(() => import('./components/pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./components/pages/About').then(m => ({ default: m.About })));
const Services = lazy(() => import('./components/pages/Services').then(m => ({ default: m.Services })));
const Contact = lazy(() => import('./components/pages/Contact').then(m => ({ default: m.Contact })));
const Blog = lazy(() => import('./components/pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./components/pages/BlogPost').then(m => ({ default: m.BlogPost })));
const LegalPage = lazy(() => import('./components/pages/LegalPage').then(m => ({ default: m.LegalPage })));
const NotFound = lazy(() => import('./components/pages/NotFound').then(m => ({ default: m.NotFound })));

// New Irtiqa pages
const Founder = lazy(() => import('./components/pages/Founder').then(m => ({ default: m.Founder })));
const Industries = lazy(() => import('./components/pages/Industries').then(m => ({ default: m.Industries })));
const CaseStudies = lazy(() => import('./components/pages/CaseStudies').then(m => ({ default: m.CaseStudies })));
const Process = lazy(() => import('./components/pages/Process').then(m => ({ default: m.Process })));
const WhyChooseUs = lazy(() => import('./components/pages/WhyChooseUs').then(m => ({ default: m.WhyChooseUs })));
const Clients = lazy(() => import('./components/pages/Clients').then(m => ({ default: m.Clients })));
const Team = lazy(() => import('./components/pages/Team').then(m => ({ default: m.Team })));
const FAQs = lazy(() => import('./components/pages/FAQs').then(m => ({ default: m.FAQs })));
const TestimonialsPage = lazy(() => import('./components/pages/Testimonials').then(m => ({ default: m.Testimonials })));
const Photography = lazy(() => import('./components/pages/Photography').then(m => ({ default: m.Photography })));

// Lazy load admin components
const AdminLogin = lazy(() => import('./components/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminBlogs = lazy(() => import('./components/admin/AdminBlogs').then(m => ({ default: m.AdminBlogs })));
const BlogEditor = lazy(() => import('./components/admin/BlogEditor').then(m => ({ default: m.BlogEditor })));
const AdminTestimonials = lazy(() => import('./components/admin/AdminTestimonials').then(m => ({ default: m.AdminTestimonials })));
const TestimonialEditor = lazy(() => import('./components/admin/TestimonialEditor').then(m => ({ default: m.TestimonialEditor })));
const AdminServices = lazy(() => import('./components/admin/AdminServices').then(m => ({ default: m.AdminServices })));
const ServiceEditor = lazy(() => import('./components/admin/ServiceEditor').then(m => ({ default: m.ServiceEditor })));
const AdminPortfolio = lazy(() => import('./components/admin/AdminPortfolio').then(m => ({ default: m.AdminPortfolio })));
const ProjectEditor = lazy(() => import('./components/admin/ProjectEditor').then(m => ({ default: m.ProjectEditor })));
const AdminNewsletter = lazy(() => import('./components/admin/AdminNewsletter').then(m => ({ default: m.AdminNewsletter })));
const AdminLegalPages = lazy(() => import('./components/admin/AdminLegalPages').then(m => ({ default: m.AdminLegalPages })));
const LegalPageEditor = lazy(() => import('./components/admin/LegalPageEditor').then(m => ({ default: m.LegalPageEditor })));

// Non-lazy imports for core functionality
import { AuthProvider } from './components/admin/AuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react";

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
        <span className="text-muted-foreground text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Loading...</span>
      </div>
    </div>
  );
}

// Component to handle scroll to top on route change
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

// Main site layout with navigation and footer
function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <AuthProvider>
          <Router>
            <>
                <ScrollToTop />
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute>
                          <AdminLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route path="blogs" element={<AdminBlogs />} />
                      <Route path="blogs/new" element={<BlogEditor />} />
                      <Route path="blogs/:id" element={<BlogEditor />} />
                      <Route path="testimonials" element={<AdminTestimonials />} />
                      <Route path="testimonials/new" element={<TestimonialEditor />} />
                      <Route path="testimonials/:id" element={<TestimonialEditor />} />
                      <Route path="services" element={<AdminServices />} />
                      <Route path="services/new" element={<ServiceEditor />} />
                      <Route path="services/:id" element={<ServiceEditor />} />
                      <Route path="portfolio" element={<AdminPortfolio />} />
                      <Route path="portfolio/new" element={<ProjectEditor />} />
                      <Route path="portfolio/:id" element={<ProjectEditor />} />
                      <Route path="newsletter" element={<AdminNewsletter />} />
                      <Route path="legal" element={<AdminLegalPages />} />
                      <Route path="legal/new" element={<LegalPageEditor />} />
                      <Route path="legal/:id" element={<LegalPageEditor />} />
                    </Route>

                    {/* Main Site Routes */}
                    <Route
                      path="*"
                      element={
                        <MainLayout>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/founder" element={<Founder />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/photography" element={<Photography />} />
                            <Route path="/portfolio" element={<Navigate to="/photography" replace />} />
                            <Route path="/industries" element={<Industries />} />
                            <Route path="/case-studies" element={<CaseStudies />} />
                            <Route path="/process" element={<Process />} />
                            <Route path="/why-choose-us" element={<WhyChooseUs />} />
                            <Route path="/clients" element={<Clients />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="/faqs" element={<FAQs />} />
                            <Route path="/testimonials" element={<TestimonialsPage />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:slug" element={<BlogPost />} />
                            <Route path="/legal/:slug" element={<LegalPage />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </MainLayout>
                      }
                    />
                  </Routes>
                </Suspense>
                <Analytics />
                <SpeedInsights />
              </>
          </Router>
        </AuthProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
}
