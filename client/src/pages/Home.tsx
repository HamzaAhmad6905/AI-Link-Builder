import { NetworkBackground } from "@/components/NetworkBackground";
import { AiEngineCard } from "@/components/AiEngineCard";
import { Footer } from "@/components/Footer";
import { Brain, ChevronRight, CheckCircle2, Sparkles, Globe, Cpu, Zap, Network, Bot } from "lucide-react";
import { SiOpenai, SiGoogle, SiX, SiAnthropic, SiPerplexity } from "react-icons/si";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const aiEngines = [
  { id: "chatgpt", name: "ChatGPT", icon: <SiOpenai />, colorClass: "from-emerald-500/20 to-teal-500/5", delay: 0.1 },
  { id: "claude", name: "Claude", icon: <SiAnthropic />, colorClass: "from-amber-500/20 to-orange-500/5", delay: 0.2 },
  { id: "grok", name: "Grok", icon: <SiX />, colorClass: "from-slate-500/20 to-gray-500/5", delay: 0.3 },
  { id: "copilot", name: "MS Copilot", icon: <Bot />, colorClass: "from-blue-500/20 to-cyan-500/5", delay: 0.4 },
  { id: "perplexity", name: "Perplexity", icon: <SiPerplexity />, colorClass: "from-cyan-500/20 to-blue-500/5", delay: 0.5 },
  { id: "gemini", name: "Gemini", icon: <SiGoogle />, colorClass: "from-purple-500/20 to-pink-500/5", delay: 0.6 },
  { id: "deepseek", name: "Deepseek", icon: <Network />, colorClass: "from-indigo-500/20 to-blue-500/5", delay: 0.7 },
  { id: "meta", name: "Meta AI", icon: <Globe />, colorClass: "from-blue-600/20 to-indigo-600/5", delay: 0.8 },
];

const faqs = [
  { q: "What is AI Link Indexing?", a: "AI link indexing is the process of actively submitting your website URLs to Large Language Models (LLMs) and AI search engines so that they can learn about your content and include it in their generated answers." },
  { q: "How long does it take for AI models to index my site?", a: "While we submit your links instantly, the actual ingestion depends on the specific AI model's training and updating cycle. Some AI search engines like Perplexity update in real-time, while core LLMs may take longer." },
  { q: "Which AI search engines do you support?", a: "We support direct submission endpoints for all major AI models including ChatGPT, Claude, Grok, MS Copilot, Perplexity, Gemini, and Deepseek." },
  { q: "Is AI indexing different from Google SEO?", a: "Yes. Traditional SEO focuses on ranking in list-based search results via keywords and backlinks. AI Indexing focuses on providing contextual facts and data directly to AI models so they cite your brand in conversational answers." },
  { q: "Will this improve my traditional search rankings?", a: "While designed for AI models, many modern traditional search engines (like Google with AI Overviews) use similar technology. Indexing for AI often indirectly benefits overall search visibility." },
  { q: "Do I need to submit every single page of my website?", a: "It's best to submit your most important pillar pages, product pages, and definitive guides. AI models are excellent at extrapolating context from your core content." },
  { q: "Is there a limit to how many URLs I can submit?", a: "Our free tier currently allows unlimited manual submissions. Simply enter each URL you want indexed." },
  { q: "How does the free indexing tool work?", a: "We provide direct, curated gateways to the submission and interaction endpoints of top AI engines. By submitting your URL through our platform, you trigger an immediate contextual review by the target AI." },
  { q: "What happens after I submit my URL?", a: "The URL is opened in the target AI's ingestion or interaction environment, prompting the AI to read, summarize, or cache the contents of your page for future reference." },
  { q: "Do AI models cache my website content immediately?", a: "Web-connected AIs (like Perplexity or Copilot) cache immediately. Static LLMs will queue the data for their next knowledge-base refresh." },
  { q: "Can I update my indexed content later?", a: "Yes. If you make significant changes to your website, simply resubmit the URL to prompt the AI models to crawl the updated version." },
  { q: "How do I know if my site has been successfully indexed?", a: "The best way to check is to go directly to the AI model (e.g., ChatGPT) and ask it specific questions about your brand or the unique content on the page you submitted." },
  { q: "Is my website data safe when submitted to these models?", a: "Yes, you are only submitting publicly available URLs. The AI models will read your site exactly as a normal human visitor would." },
  { q: "Does this work for new websites without domain authority?", a: "Absolutely! In fact, AI indexing is often faster for new websites to gain visibility than traditional SEO, which relies heavily on historical domain authority." },
  { q: "Do I need coding skills to use this platform?", a: "None at all. If you can copy and paste a URL and click a button, you can use our AI indexing tools." },
  { q: "Why is AI indexing becoming more important than traditional SEO?", a: "User behavior is shifting from searching for links to asking AIs for direct answers. If your business isn't in the AI's knowledge base, you simply won't exist in the next generation of search." },
];

export default function Home() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500/30">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold text-white tracking-tight">
              Ai Link Indexer
            </span>
          </div>

          <div className="flex items-center gap-4">

            <Link href="/news">
              <button className="px-6 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm font-medium text-cyan-300 hover:bg-cyan-500/20 transition-all">
                Newsletter
              </button>
            </Link>

            <button 
              onClick={() => scrollTo('indexing')}
              className="hidden md:flex px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all items-center gap-2 group"
            >
              Get Started
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        <NetworkBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            AI SEO AUTHORITY V2.0
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-extrabold text-white tracking-tight mb-8 leading-tight"
          >
            Index Your Website on <br className="hidden md:block" />
            <span className="text-gradient animate-float inline-block">AI Search Engines</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12"
          >
            Secure your place in the algorithmic future. Submit your links to the world's most powerful AI models instantly.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => scrollTo('indexing')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start Indexing Free
              <Zap className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scrollTo('about')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Learn About AIO
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Free AI Indexing Grid */}
      <section id="indexing" className="py-24 relative z-10 bg-[#060A14]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 flex items-center justify-center gap-3">
              Free AI Indexing
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30 align-middle">
                Pro Tier
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Submit your URLs directly to the top AI models. Enter your website below to initialize the indexing protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {aiEngines.map((engine) => (
              <AiEngineCard key={engine.id} {...engine} />
            ))}
          </div>
        </div>
      </section>

      {/* Why AI Indexing Matters */}
      <section id="about" className="py-24 relative z-10 bg-background overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12 border-t border-l border-white/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-8 shadow-lg shadow-purple-500/20">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8">
              Why AI Indexing Matters in the Digital Era
            </h2>
            
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-light">
              <p>
                In the rapidly evolving digital landscape, traditional search engines are being bypassed in favor of AI-driven conversational agents. When users want answers, they no longer search for links; they ask ChatGPT, Claude, and Perplexity.
              </p>
              <p>
                These AI models act as the new gatekeepers of information. If your website's content, brand facts, and core offerings aren't explicitly indexed within their neural networks, your digital presence effectively doesn't exist for the next generation of internet users.
              </p>
              <p>
                Don't get left behind. AI Optimization (AIO) is the new SEO. By proactively submitting your URLs to these models, you ensure that when the world asks an AI about your industry, your authority is the answer it generates.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Instant Visibility', 'Future-Proof SEO', 'Brand Authority', 'Direct Answers'].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 relative z-10 bg-[#060A14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400">Everything you need to know about AI Link Indexing.</p>
          </div>
          
          <div className="glass-card rounded-2xl p-4 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10 last:border-0">
                  <AccordionTrigger className="text-left text-base md:text-lg text-slate-200 hover:text-cyan-400 hover:no-underline py-4 font-medium transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 text-base leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
