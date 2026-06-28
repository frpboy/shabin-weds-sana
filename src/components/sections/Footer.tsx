import { useState } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Button from '../ui/buttons/Button';
import { weddingData } from '../../config/weddingData';
import { getWhatsAppShareUrl, shareToInstagram } from '../../lib/share';

export default function Footer() {
  const [instagramToast, setInstagramToast] = useState<'copied' | null>(null);
  const webLink = 'https://shabin-weds-sana.vercel.app/';
  const rawMessage = `You are joyfully invited to the wedding celebration of Muhammed Shabin & Sana Subair on Sunday, July 19, 2026 at ${weddingData.wedding.venue}.\n\nGrand Reception: 4:30 PM Onwards\nFamily Ceremony: 6:00 PM Onwards\n\nView details & RSVP: ${webLink}`;
  
  const whatsappShareUrl = getWhatsAppShareUrl(rawMessage);


  const handleInstagramShare = async () => {
    const result = await shareToInstagram(
      `You are joyfully invited to the wedding celebration of Muhammed Shabin & Sana Subair on Sunday, July 19, 2026 at ${weddingData.wedding.venue}.\n\nGrand Reception: 4:30 PM Onwards\nFamily Ceremony: 6:00 PM Onwards`,
      webLink
    );
    if (result === 'copied') {
      setInstagramToast('copied');
      setTimeout(() => setInstagramToast(null), 3500);
    }
    // 'native' → share sheet opened, nothing else to do
    // 'failed' → user cancelled, nothing to show
  };

  return (
    <footer className="relative z-10 bg-transparent text-text pt-20 pb-24 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/8 via-secondary/16 to-secondary/22 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram */}
        <div className="w-16 h-16 rounded-full border border-primary/60 flex items-center justify-center mb-8 bg-white/5 backdrop-blur-sm shadow-inner">
          <span className="font-cinzel text-xl text-primary font-medium tracking-tighter">
            {weddingData.monogram}
          </span>
        </div>

        <h2 className="font-cinzel text-3xl md:text-5xl text-accent font-medium mb-3 leading-tight">
          <span className="block">{weddingData.groom.fullName}</span>
          <span className="block font-cormorant italic text-primary text-2xl md:text-3xl my-2 font-light">&</span>
          <span className="block">{weddingData.bride.fullName}</span>
        </h2>
        <p className="font-poppins uppercase text-xs tracking-[0.3em] text-accent/70 mb-12 font-medium">
          Sunday, July 19, 2026 | {weddingData.wedding.venue}
        </p>

        {/* Social Share Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="glass" className="flex items-center gap-2.5 px-7 py-3.5 shadow-sm border-primary/50 text-accent hover:bg-primary/15 font-medium cursor-pointer transition-all duration-300">
              <FaWhatsapp size={20} className="text-emerald-600" />
              <span className="text-xs uppercase tracking-wider font-poppins">Share on WhatsApp</span>
            </Button>
          </a>

          <Button 
            variant="glass" 
            onClick={handleInstagramShare}
            className="flex items-center gap-2.5 px-7 py-3.5 shadow-sm border-primary/50 text-accent hover:bg-primary/15 font-medium cursor-pointer transition-all duration-300"
          >
            <FaInstagram size={20} className="text-rose-600" />
            <span className="text-xs uppercase tracking-wider font-poppins">Share to Instagram</span>
          </Button>
        </div>

        {/* Toast notification */}
        <div className="h-8 flex items-center justify-center mb-8">
          {instagramToast === 'copied' && (
            <span className="font-poppins text-xs text-primary bg-primary/10 border border-primary/30 px-5 py-2 rounded-full animate-fade-in shadow-sm">
              Link copied! Open Instagram and paste into your story or DM.
            </span>
          )}
        </div>

        {/* Emotional Closing Note */}
        <div className="my-12 px-4 max-w-lg mx-auto">
          <div className="w-16 h-px bg-primary/40 mx-auto mb-6" />
          <p className="font-cormorant italic font-light text-2xl md:text-3xl text-accent/90 tracking-wide leading-relaxed">
            "With prayers, love, and gratitude, we await your presence."
          </p>
          <div className="w-16 h-px bg-primary/40 mx-auto mt-6" />
        </div>

        {/* Copyright & Credits */}
        <div className="font-poppins text-xs text-text/50 tracking-widest font-light space-y-2 mt-8">
          <p>
            Made with love & prayers by{' '}
            <a 
              href="https://github.com/frpboy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline font-medium transition-colors"
            >
              Rahul
            </a>
          </p>
          <p>© 2026 {weddingData.coupleName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
