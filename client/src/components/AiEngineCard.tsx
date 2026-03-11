import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface AiEngineCardProps {
  name: string;
  icon: React.ReactNode;
  colorClass: string;
  delay?: number;
}

export function AiEngineCard({
  name,
  icon,
  colorClass,
  delay = 0,
}: AiEngineCardProps) {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [successGlow, setSuccessGlow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) return;

    setSuccessGlow(true);
    setTimeout(() => setSuccessGlow(false), 1500);

    toast({
      title: "Success 🚀",
      description: "URL Submitted Successfully",
    });

    setUrl("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`glass-card rounded-3xl p-8 min-h-[320px] relative group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        isFocused
          ? "ring-2 ring-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.3)]"
          : ""
      } ${
        successGlow
          ? "ring-2 ring-green-400 shadow-[0_0_50px_rgba(34,197,94,0.8)]"
          : ""
      }`}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${colorClass}`}
      />

      <div className="relative z-10 flex flex-col h-full gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-2xl">
            {icon}
          </div>
          <h3 className="text-2xl font-display font-semibold text-white tracking-wide">
            {name}
          </h3>
        </div>

        <p className="text-sm text-slate-400">
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
              className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-black/60 transition-all"
            />
            <button
              type="submit"
              disabled={!url.trim()}
              className="absolute right-2 p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

        </form>
      </div>
    </motion.div>
  );
}