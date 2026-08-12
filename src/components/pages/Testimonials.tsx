import { SEO } from '../SEO';
import { Testimonials as TestimonialsSlider } from '../Testimonials';

export function Testimonials() {
  return (
    <>
      <SEO 
        title="Client Reviews & Testimonials | Irtiqa Marketing"
        description="Read what our clients say about Irtiqa Marketing. We completely transform social media, branding, and websites for our clients."
        canonical="/testimonials"
        keywords="testimonials, client reviews, irtiqa marketing reviews"
      />

      <div className="bg-background pt-24 pb-16 overflow-hidden text-foreground">
        <TestimonialsSlider />
      </div>
    </>
  );
}
