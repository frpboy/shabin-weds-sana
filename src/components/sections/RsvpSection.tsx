import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionContainer from '../ui/layout/SectionContainer';
import SectionTitle from '../ui/layout/SectionTitle';
import { BiCheck, BiX, BiSend, BiMinus, BiPlus, BiLoaderAlt, BiCheckCircle } from 'react-icons/bi';
import { MdFavorite } from 'react-icons/md';
import { content } from '../../content';

interface RsvpEntry {
  fullName?: string;
  full_name?: string;
  attendance: string;
  guestCount?: string | number;
  guest_count?: string | number;
  dietaryOrNotes?: string;
  dietary_or_notes?: string;
  created_at: string;
}

// Frosted-glass panel style (matches reference dark luxury card treatment)
const themeCard = 'relative rounded-2xl bg-white/[0.035] backdrop-blur-xl border border-primary/35 shadow-[0_18px_48px_rgba(0,0,0,0.5)] overflow-hidden';

const getVisibleWishCount = (entries: RsvpEntry[]) => {
  const newest = entries.slice(0, 8);
  const longest = newest.reduce((max, entry) => Math.max(max, (entry.dietaryOrNotes || entry.dietary_or_notes || '').length), 0);
  if (longest > 260) return 2;
  if (longest > 140) return 3;
  return 4;
};

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    attendance: 'yes',
    guestCount: 1,
    dietaryOrNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  const [fetching, setFetching] = useState(true);
  const [wishStartIndex, setWishStartIndex] = useState(0);
  const [isWishWallPaused, setIsWishWallPaused] = useState(false);

  useEffect(() => {
    fetch('/api/rsvp')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setEntries(data); })
      .catch(console.error)
      .finally(() => setFetching(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, guestCount: String(formData.guestCount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit RSVP');
      const newEntry: RsvpEntry = {
        fullName: formData.fullName,
        attendance: formData.attendance,
        guestCount: String(formData.guestCount),
        dietaryOrNotes: formData.dietaryOrNotes,
        created_at: new Date().toISOString(),
      };
      setEntries((prev) => [newEntry, ...prev]);
      setSubmitted(true);
      setFormData({ fullName: '', attendance: 'yes', guestCount: 1, dietaryOrNotes: '' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to connect. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestChange = (delta: number) =>
    setFormData((p) => ({ ...p, guestCount: Math.max(1, Math.min(10, p.guestCount + delta)) }));

  const getName = (e: RsvpEntry) => e.fullName || e.full_name || 'Guest';
  const getNote = (e: RsvpEntry) => e.dietaryOrNotes || e.dietary_or_notes || '';
  const visibleWishCount = getVisibleWishCount(entries);

  useEffect(() => {
    if (isWishWallPaused || entries.length <= 1) return;
    const timer = setInterval(() => {
      setWishStartIndex((prev) => (prev + 1) % entries.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [entries.length, isWishWallPaused]);

  useEffect(() => {
    if (wishStartIndex >= entries.length) {
      setWishStartIndex(0);
    }
  }, [entries.length, wishStartIndex]);

  const slidingWishes =
    entries.length <= visibleWishCount
      ? entries
      : Array.from({ length: visibleWishCount }, (_, idx) => entries[(wishStartIndex + idx) % entries.length]);

  return (
    <SectionContainer id="rsvp" className="relative z-10 py-12 md:py-24">
      <SectionTitle title={content.rsvp.sectionTitle} subtitle={content.rsvp.sectionSubtitle} />

      {/* 3-col grid on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:[grid-template-columns:repeat(2,420px)] md:justify-center gap-5 items-stretch max-w-5xl mx-auto">

        {/* ══════════════════════════
            Column 1 — RSVP Form
            ══════════════════════════ */}
        <div className={`${themeCard} p-7 h-full md:h-[560px]`}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-10 min-h-[300px]"
              >
                <BiCheckCircle size={52} className="text-primary mb-4" />
                <h3 className="font-cinzel text-2xl text-accent font-medium mb-2 tracking-wide">Shukran!</h3>
                <p className="font-poppins text-sm text-text/70 mb-6 leading-relaxed max-w-xs">
                  Your RSVP was beautifully received. We can't wait to celebrate with you!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="border border-primary/50 text-primary font-poppins text-xs px-5 py-2.5 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/30 text-red-500 text-xs text-center">{errorMsg}</div>
                )}

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block font-poppins text-[10px] uppercase tracking-widest text-primary font-semibold">Your Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="w-full bg-black/35 backdrop-blur-sm border border-primary/30 rounded-xl px-4 py-3 text-sm text-text placeholder-text/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all"
                  />
                </div>

                {/* Attendance Toggle */}
                <div className="space-y-2">
                  <label className="block font-poppins text-[10px] uppercase tracking-widest text-primary font-semibold">Will You Be Attending?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'yes', label: 'Joyfully Accepts', Icon: BiCheck },
                      { value: 'no', label: 'Regretfully Declines', Icon: BiX },
                    ].map(({ value, label, Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setFormData({ ...formData, attendance: value })}
                        className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border transition-all duration-300 font-poppins text-xs font-medium cursor-pointer ${
                          formData.attendance === value
                            ? 'border-primary bg-primary/15 text-accent shadow-[0_0_12px_rgba(199,169,127,0.15)]'
                            : 'border-primary/20 bg-black/30 text-text/60 hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`text-base ${formData.attendance === value ? 'text-primary' : 'text-text/40'}`} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guest Stepper */}
                <AnimatePresence>
                  {formData.attendance === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1.5 overflow-hidden"
                    >
                      <label className="block font-poppins text-[10px] uppercase tracking-widest text-primary font-semibold">Number of Guests</label>
                      <div className="flex items-center gap-4 bg-black/30 backdrop-blur-sm border border-primary/30 rounded-xl p-2.5 w-fit">
                        <button type="button" onClick={() => handleGuestChange(-1)} className="w-8 h-8 rounded-lg border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors cursor-pointer text-sm">
                          <BiMinus />
                        </button>
                        <span className="font-cinzel text-xl text-accent font-semibold min-w-[1.5rem] text-center">{formData.guestCount}</span>
                        <button type="button" onClick={() => handleGuestChange(1)} className="w-8 h-8 rounded-lg border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors cursor-pointer text-sm">
                          <BiPlus />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Blessing */}
                <div className="space-y-1.5">
                  <label className="block font-poppins text-[10px] uppercase tracking-widest text-primary font-semibold">
                    Blessing / Message <span className="text-text/40 lowercase tracking-normal font-normal">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write your heartfelt wishes..."
                    value={formData.dietaryOrNotes}
                    onChange={(e) => setFormData({ ...formData, dietaryOrNotes: e.target.value })}
                    className="w-full bg-black/35 backdrop-blur-sm border border-primary/30 rounded-xl p-4 text-sm text-text placeholder-text/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-primary hover:bg-accent text-secondary font-poppins font-semibold text-base flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_8px_24px_rgba(199,169,127,0.3)] hover:shadow-[0_12px_32px_rgba(199,169,127,0.5)] disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting
                    ? <><BiLoaderAlt size={18} className="animate-spin" /><span>Sending...</span></>
                    : <><BiSend size={18} /><span>Send RSVP</span></>
                  }
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* ══════════════════════════
            Column 2 — Wishes Wall
            ══════════════════════════ */}
        <div
          className={`${themeCard} p-7 flex flex-col h-full md:h-[560px]`}
          onMouseEnter={() => setIsWishWallPaused(true)}
          onMouseLeave={() => setIsWishWallPaused(false)}
        >
          <h3 className="font-cinzel text-xs text-primary tracking-[0.2em] uppercase mb-4 flex items-center gap-2 flex-shrink-0 font-semibold">
            <MdFavorite className="text-primary/60" /> Wishes & Prayers
          </h3>

          <div className="flex-1 min-h-0 overflow-hidden space-y-3 pr-0.5">
            {fetching && (
              <div className="flex justify-center pt-8">
                <BiLoaderAlt className="animate-spin text-primary text-xl" />
              </div>
            )}
            {!fetching && entries.length === 0 && (
              <p className="text-center text-text/40 font-poppins text-xs pt-8 leading-relaxed">
                Wishes will appear here<br />after RSVPs are submitted.
              </p>
            )}

            <AnimatePresence initial={false} mode="popLayout">
              {slidingWishes.map((entry, i) => (
                <motion.div
                  layout
                  key={`${entry.created_at}-${i}-${wishStartIndex}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35 }}
                  className="p-3.5 rounded-xl bg-black/28 backdrop-blur-sm border border-primary/25 shadow-sm space-y-1.5 overflow-hidden"
                >
                  <span className={`flex items-center gap-1.5 text-[10px] font-poppins font-semibold uppercase tracking-wider ${
                    entry.attendance === 'yes' ? 'text-emerald-600' : 'text-text/40'
                  }`}>
                    {entry.attendance === 'yes'
                      ? <><BiCheckCircle className="text-sm" /> Attending</>
                      : <><BiX className="text-sm" /> Unable to attend</>
                    }
                  </span>
                  {getNote(entry) && (
                    <p className="font-cormorant italic text-text/80 text-sm leading-snug break-words [overflow-wrap:anywhere] [hyphens:auto]" lang="en">
                      &ldquo;{getNote(entry)}&rdquo;
                    </p>
                  )}
                  <p className="font-poppins text-primary text-[11px] tracking-wide font-medium break-words [overflow-wrap:anywhere]">— {getName(entry)}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </SectionContainer>
  );
}
