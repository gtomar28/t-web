import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Clock, 
  Building2, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowRight,
  ExternalLink,
  Zap,
  Lock,
  MessageSquare
} from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { AmbientParticles } from './AmbientParticles';
import { SiteSettings } from '../types';
import { soundEngine } from '../utils/audioEngine';

interface CtaContactSectionProps {
  settings: SiteSettings;
  scrollProgress: number;
}

export const CtaContactSection: React.FC<CtaContactSectionProps> = ({
  settings,
  scrollProgress,
}) => {
  const [inquiryType, setInquiryType] = useState<'erp' | 'custom' | 'partnership'>('erp');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    scale: '1000-5000',
    selectedSlot: 'Tomorrow 10:00 AM IST',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const slotOptions = [
    'Tomorrow 10:00 AM IST',
    'Tomorrow 2:30 PM IST',
    'Thursday 11:30 AM IST',
    'Custom Time via Calendly',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    soundEngine.playClick('sharp');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randomTicket = `TRK-${Math.floor(1000 + Math.random() * 9000)}-${inquiryType.toUpperCase()}`;
      setSubmittedTicket(randomTicket);
      soundEngine.playSuccessChord();
    }, 900);
  };

  const handleCopyTicket = () => {
    if (!submittedTicket) return;
    soundEngine.playClick('soft');
    navigator.clipboard.writeText(`Meeting Confirmation ID: ${submittedTicket} | Trevyk Technologies`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-36 bg-[#1E1024] text-[#F8F6FB] overflow-hidden"
    >
      {/* Ambient Floating Particles */}
      <AmbientParticles
        count={settings.reducedMotion ? 0 : 30}
        reducedMotion={settings.reducedMotion}
        colorScheme="brand"
      />

      {/* Atmospheric Radial Spotlights for Maximum Contrast */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central High-Intensity Radial Glow behind CTA */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-b from-[#6B4A87]/30 via-[#E8A9C2]/20 to-transparent blur-[130px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-[#6B4A87]/25 via-transparent to-transparent blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#241428 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Ribbon & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1E1024] border border-[#E8A9C2]/50 text-[#6B4A87] font-mono-accent text-xs mb-5 shadow-[0_0_25px_rgba(232,169,194,0.25)]">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>START WITH ZERO UPFRONT LICENSING</span>
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-[#F8F6FB] tracking-tight leading-[1.08]">
            Let’s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A9C2] via-[#B9A6D1] to-[#241428]">
              Remarkably Reliable.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#B9A6D1]/85 leading-relaxed max-w-2xl mx-auto font-sans">
            Whether you want a 30-minute interactive walkthrough of the Kiduart School ERP (kiduart.com) or require custom distributed cloud engineering, our senior architects are ready.
          </p>
        </div>

        {/* Main Interactive Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Value Propositions & Fast Channels (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Value Pillar Card */}
            <div className="p-7 rounded-3xl bg-[#1E1024]/90 border border-[#6B4A87]/40 shadow-[0_20px_50px_rgba(107,74,135,0.12)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8A9C2]/10 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="font-heading font-bold text-xl text-[#F8F6FB] mb-4 flex items-center space-x-2">
                <span>The Trevyk Guarantee</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8A9C2]/15 border border-[#E8A9C2]/30 flex items-center justify-center text-[#E8A9C2] shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-heading font-bold text-[#F8F6FB]">
                      48-Hour Rapid Onboarding
                    </div>
                    <div className="text-xs text-[#B9A6D1]/75 mt-0.5">
                      Full student roster & fee schema migration in under 2 working days.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#B9A6D1]/15 border border-[#B9A6D1]/30 flex items-center justify-center text-[#B9A6D1] shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-heading font-bold text-[#F8F6FB]">
                      Zero Upfront Setup Cost
                    </div>
                    <div className="text-xs text-[#B9A6D1]/75 mt-0.5">
                      Pay only when live, tested, and actively loved by teachers & parents.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#6B4A87]/30 border border-[#6B4A87]/50 flex items-center justify-center text-[#E8A9C2] shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-heading font-bold text-[#F8F6FB]">
                      100% Data Sovereignty
                    </div>
                    <div className="text-xs text-[#B9A6D1]/75 mt-0.5">
                      Export your complete relational database schema anytime with zero penalties.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="p-7 rounded-3xl bg-[#1E1024]/80 border border-[#6B4A87]/30 space-y-5">
              <div className="text-xs font-mono-accent uppercase tracking-widest text-[#B9A6D1]">
                DIRECT ENGINEERING HOTLINES
              </div>

              <div className="space-y-3">
                <a
                  href="mailto:contact@trevyk.com"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-[#2A1830]/60 border border-[#6B4A87]/30 hover:border-[#E8A9C2]/50 hover:bg-[#2A1830] transition-all group interactive-target"
                  data-cursor-label="EMAIL"
                >
                  <Mail className="w-4 h-4 text-[#E8A9C2] group-hover:scale-110 transition-transform" />
                  <div className="text-xs sm:text-sm font-mono-accent text-[#F8F6FB]">
                    contact@trevyk.com
                  </div>
                </a>

                <a
                  href="tel:+919876543210"
                  className="flex items-center space-x-3 p-3 rounded-xl bg-[#2A1830]/60 border border-[#6B4A87]/30 hover:border-[#E8A9C2]/50 hover:bg-[#2A1830] transition-all group interactive-target"
                  data-cursor-label="CALL"
                >
                  <Phone className="w-4 h-4 text-[#B9A6D1] group-hover:scale-110 transition-transform" />
                  <div className="text-xs sm:text-sm font-mono-accent text-[#F8F6FB]">
                    +91 (080) 4920-8800 (HQ)
                  </div>
                </a>

                <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#2A1830]/60 border border-[#6B4A87]/30 text-xs sm:text-sm font-mono-accent text-[#B9A6D1]/80">
                  <MapPin className="w-4 h-4 text-[#6B4A87] shrink-0" />
                  <span className="truncate">Tech Corridor 4, Indiranagar, Bengaluru, India</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Booking & Form Interface (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-3xl bg-[#1E1024] border border-[#6B4A87]/50 shadow-[0_25px_60px_rgba(107,74,135,0.18)] relative overflow-hidden">
              
              {/* Top Accent Gradient Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B4A87] via-[#E8A9C2] to-[#B9A6D1]" />

              <AnimatePresence mode="wait">
                {!submittedTicket ? (
                  <motion.form
                    key="booking-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Inquiry Type Segmented Switcher */}
                    <div>
                      <label className="block text-xs font-mono-accent uppercase tracking-wider text-[#B9A6D1] mb-2.5">
                        Select Inquiry Track
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setInquiryType('erp')}
                          className={`p-3 rounded-xl border text-xs font-mono-accent flex flex-col items-center justify-center space-y-1 transition-all ${
                            inquiryType === 'erp'
                              ? 'bg-[#E8A9C2]/20 border-[#E8A9C2] text-[#F8F6FB] shadow-[0_0_15px_rgba(232,169,194,0.2)]'
                              : 'bg-[#2A1830]/70 border-[#6B4A87]/40 text-[#B9A6D1] hover:border-[#6B4A87]'
                          }`}
                        >
                          <GraduationCap className="w-4 h-4 text-[#E8A9C2]" />
                          <span className="font-bold">Kiduart ERP Demo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setInquiryType('custom')}
                          className={`p-3 rounded-xl border text-xs font-mono-accent flex flex-col items-center justify-center space-y-1 transition-all ${
                            inquiryType === 'custom'
                              ? 'bg-[#B9A6D1]/20 border-[#B9A6D1] text-[#F8F6FB] shadow-[0_0_15px_rgba(185,166,209,0.2)]'
                              : 'bg-[#2A1830]/70 border-[#6B4A87]/40 text-[#B9A6D1] hover:border-[#6B4A87]'
                          }`}
                        >
                          <Building2 className="w-4 h-4 text-[#B9A6D1]" />
                          <span className="font-bold">Custom Software</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setInquiryType('partnership')}
                          className={`p-3 rounded-xl border text-xs font-mono-accent flex flex-col items-center justify-center space-y-1 transition-all ${
                            inquiryType === 'partnership'
                              ? 'bg-[#6B4A87]/25 border-[#6B4A87] text-[#F8F6FB]'
                              : 'bg-[#2A1830]/70 border-[#6B4A87]/40 text-[#B9A6D1] hover:border-[#6B4A87]'
                          }`}
                        >
                          <Sparkles className="w-4 h-4 text-[#E8A9C2]" />
                          <span className="font-bold">Partnership / Other</span>
                        </button>
                      </div>
                    </div>

                    {/* 2-Column Name & Email Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label 
                          htmlFor="contact-name"
                          className="block text-xs font-mono-accent text-[#B9A6D1]/90 mb-1.5"
                        >
                          Your Name <span className="text-[#E8A9C2]">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Dr. S. Roy / Alex Vance"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/50 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-sm focus:outline-none focus:border-[#E8A9C2] transition-colors"
                        />
                      </div>

                      <div>
                        <label 
                          htmlFor="contact-email"
                          className="block text-xs font-mono-accent text-[#B9A6D1]/90 mb-1.5"
                        >
                          Official / Work Email <span className="text-[#E8A9C2]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="dean@school.edu / cto@org.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/50 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-sm focus:outline-none focus:border-[#E8A9C2] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Organization & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label 
                          htmlFor="contact-org"
                          className="block text-xs font-mono-accent text-[#B9A6D1]/90 mb-1.5"
                        >
                          School / Company Name
                        </label>
                        <input
                          id="contact-org"
                          type="text"
                          placeholder="e.g. Oakridge Academy"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/50 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-sm focus:outline-none focus:border-[#E8A9C2] transition-colors"
                        />
                      </div>

                      <div>
                        <label 
                          htmlFor="contact-phone"
                          className="block text-xs font-mono-accent text-[#B9A6D1]/90 mb-1.5"
                        >
                          Phone / WhatsApp Hotline
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/50 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-sm focus:outline-none focus:border-[#E8A9C2] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Preferred Slot Selector */}
                    <div>
                      <label className="block text-xs font-mono-accent text-[#B9A6D1]/90 mb-1.5">
                        Preferred Walkthrough Slot
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {slotOptions.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setFormData({ ...formData, selectedSlot: slot })}
                            className={`px-3.5 py-2.5 rounded-xl border text-xs font-mono-accent text-left flex items-center justify-between transition-all ${
                              formData.selectedSlot === slot
                                ? 'bg-[#E8A9C2]/20 border-[#E8A9C2] text-[#F8F6FB]'
                                : 'bg-[#2A1830]/60 border-[#6B4A87]/30 text-[#B9A6D1] hover:border-[#6B4A87]'
                            }`}
                          >
                            <span className="truncate">{slot}</span>
                            {formData.selectedSlot === slot && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#E8A9C2] shrink-0 ml-1" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label 
                        htmlFor="contact-notes"
                        className="block text-xs font-mono-accent text-[#B9A6D1]/90 mb-1.5"
                      >
                        Project Scope / Key Questions (Optional)
                      </label>
                      <textarea
                        id="contact-notes"
                        rows={3}
                        placeholder="Tell us about your campus size, current SIS/ERP bottlenecks, or microservice roadmap..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#2A1830]/80 border border-[#6B4A87]/50 text-[#F8F6FB] placeholder-[#B9A6D1]/45 text-sm focus:outline-none focus:border-[#E8A9C2] transition-colors resize-none"
                      />
                    </div>

                    {/* Primary Magnetic CTA Button (wow #5) */}
                    <div className="pt-2">
                      <MagneticButton
                        id="cta-submit-button"
                        type="submit"
                        disabled={isSubmitting}
                        magneticStrength={0.25}
                        variant="custom"
                        className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-[#6B4A87] via-[#8558A5] to-[#B9A6D1] text-white font-heading font-bold text-base sm:text-lg shadow-[0_10px_35px_rgba(232,169,194,0.45)] hover:shadow-[0_15px_45px_rgba(232,169,194,0.65)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer interactive-target"
                        cursorLabel="DISPATCH"
                        reducedMotion={settings.reducedMotion}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <span className="w-4 h-4 border-2 border-[#241428] border-t-transparent rounded-full animate-spin" />
                            <span>Securing Dedicated Slot...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Book Free Demo & Architecture Session</span>
                            <ArrowRight className="w-5 h-5 ml-1" />
                          </div>
                        )}
                      </MagneticButton>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-center text-[11px] font-mono-accent text-[#B9A6D1]/75">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zero spam • NDA protected • Instant calendar invite generated</span>
                    </div>

                  </motion.form>
                ) : (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#F8F6FB]">
                        Session Reserved Successfully!
                      </h3>
                      <p className="text-sm text-[#B9A6D1]/80 mt-2 max-w-md mx-auto">
                        Thank you, <span className="text-[#E8A9C2] font-semibold">{formData.name}</span>. A senior Trevyk architect has locked in your walkthrough for <span className="text-[#B9A6D1] font-semibold">{formData.selectedSlot}</span>.
                      </p>
                    </div>

                    {/* Confirmation Ticket Badge */}
                    <div className="p-4 rounded-2xl bg-[#2A1830] border border-[#6B4A87]/50 max-w-sm mx-auto flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-[10px] font-mono-accent uppercase tracking-wider text-[#B9A6D1]">
                          Meeting Ticket ID
                        </div>
                        <div className="font-mono-accent text-sm font-bold text-[#E8A9C2]">
                          {submittedTicket}
                        </div>
                      </div>

                      <button
                        onClick={handleCopyTicket}
                        className="px-3 py-1.5 rounded-lg bg-[#1E1024] border border-[#6B4A87]/40 text-xs font-mono-accent text-[#F8F6FB] hover:border-[#E8A9C2] transition-colors flex items-center space-x-1.5"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setSubmittedTicket(null);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            organization: '',
                            scale: '1000-5000',
                            selectedSlot: 'Tomorrow 10:00 AM IST',
                            message: '',
                          });
                        }}
                        className="text-xs font-mono-accent text-[#B9A6D1] hover:text-[#F8F6FB] underline underline-offset-4 transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
