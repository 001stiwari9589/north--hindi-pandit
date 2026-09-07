import React from 'react';
import { Phone, CheckCircle, ArrowRight } from 'lucide-react';

export default function AboutSection({ onBookClick }) {
  return (
    <section id="about" className="pt-16 sm:pt-20 bg-[#F9FAFB] relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Image */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="/vedic_pandit_hawan.jpg"
                alt="Book North Indian Pandit In Bangalore"
                className="w-full h-[380px] sm:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column: Exact Content from Reference Site */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-vedic text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Book North Indian Pandit In Bangalore:
            </h2>

            <h3 className="text-base sm:text-lg font-bold text-orange-600">
              Best online Puja service provider in all over Bangalore.
            </h3>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              We offer various Vedic & Hindu Puja services, including all puja samagri by 20+ years experienced North Indian Pandits in Bangalore.
            </p>

            <h4 className="text-sm sm:text-base font-bold text-slate-800 pt-2">
              Book Online Pandit Ji with all Puja samagri at best price.
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed">
              In the vibrant city of Bangalore, amidst the hustle and bustle of modern life, lies a sanctuary of spirituality and devotion – North Hindi Pandit (Tathastu Puja). With their team of authentic North Indian pandits, we offer a gateway to the divine realm, where individuals can experience the profound blessings of ancient rituals and ceremonies.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onBookClick}
                className="btn-elementor-primary px-8 py-3.5 font-bold shadow-md"
              >
                <span>Book A Puja</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+917772035222"
                className="btn-elementor-outline px-6 py-3 font-bold"
              >
                <Phone className="w-4 h-4" />
                <span>Call Pandit Ji</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Exact Wave Shape Divider (Elementor Bottom Divider) */}
      <div className="wave-divider mt-12 sm:mt-16" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" className="fill-white">
          <path d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
          c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V100H0V30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
          c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z" />
        </svg>
      </div>
    </section>
  );
}
