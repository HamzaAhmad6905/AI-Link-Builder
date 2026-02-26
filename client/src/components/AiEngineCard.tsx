import { useState } from "react";
import { Send, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface AiEngineCardProps {
  name: string;
  icon: React.ReactNode;
  colorClass: string;
  delay?: number;
}

export function AiEngineCard({ name, icon, colorClass, delay = 0 }: AiEngineCardProps) {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Format URL
    let finalUrl = url.trim();
    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = "https://" + finalUrl;
    }
    
    window.open(finalUrl, "_blank", "noopener,noreferrer");
    setUrl(""); // Clear input after submission
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`glass-card rounded-2xl p-6 relative group overflow-hidden transition-all duration-300 hover:-translate-y-1 ${isFocused ? 'ring-2 ring-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)]' : ''}`}
    >
      {/* Dynamic gradient background that reveals on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${colorClass}`} />
      
      <div className="relative z-10 flex flex-col h-full gap-4">
        <div className="flex items-center gap-4 mb-2">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-2xl`}>
            {icon}
          </div>
          <h3 className="text-xl font-display font-semibold text-white tracking-wide">
            {name}
          </h3>
        </div>
        
        <p className="text-sm text-slate-400 mb-2">
          Index your URLs directly on {name}'s network architecture.
        </p>
        
        <form onSubmit={handleSubmit} className="mt-auto relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="https://your-site.com"
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-black/60 transition-all"
            />
            <button
              type="submit"
              disabled={!url}
              className="absolute right-2 p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 disabled:opacity-30 disabled:hover:bg-cyan-500/10 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
