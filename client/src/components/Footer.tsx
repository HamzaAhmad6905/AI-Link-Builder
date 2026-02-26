import { Link } from "wouter";
import { Brain, Twitter, Github, Linkedin } from "lucide-react";
import { LegalDialog, legalContents } from "./LegalDialogs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useCreateContact } from "@/hooks/use-contacts";
import { useState } from "react";

export function Footer() {
  const [contactOpen, setContactOpen] = useState(false);
  const { mutate: createContact, isPending } = useCreateContact();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      websiteUrl: "",
      description: "",
    }
  });

  const onSubmit = (data: InsertContact) => {
    createContact(data, {
      onSuccess: () => {
        form.reset();
        setContactOpen(false);
      }
    });
  };

  return (
    <footer className="bg-[#050B14] border-t border-white/10 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">Ai Link Indexer</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Secure your place in the algorithmic future. Instantly submit your website to the world's most powerful AI models.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <LegalDialog title="About Us" triggerText="About Us" content={legalContents.about} />
              </li>
              <li>
                <button onClick={() => document.getElementById('indexing')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                  Submit URLs
                </button>
              </li>
              <li>
                <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                  <DialogTrigger asChild>
                    <button className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
                      Contact Us
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-[#0f172a] border-white/10 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-display">Contact Us</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 block mb-1">Name</label>
                        <input 
                          {...form.register("name")}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                          placeholder="John Doe"
                        />
                        {form.formState.errors.name && (
                          <span className="text-xs text-red-400">{form.formState.errors.name.message}</span>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-300 block mb-1">Website URL</label>
                        <input 
                          {...form.register("websiteUrl")}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                          placeholder="https://yoursite.com"
                        />
                        {form.formState.errors.websiteUrl && (
                          <span className="text-xs text-red-400">{form.formState.errors.websiteUrl.message}</span>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-300 block mb-1">Message</label>
                        <textarea 
                          {...form.register("description")}
                          rows={4}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 resize-none"
                          placeholder="How can we help?"
                        />
                        {form.formState.errors.description && (
                          <span className="text-xs text-red-400">{form.formState.errors.description.message}</span>
                        )}
                      </div>
                      <button 
                        type="submit"
                        disabled={isPending}
                        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50"
                      >
                        {isPending ? "Sending..." : "Send Message"}
                      </button>
                    </form>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><LegalDialog title="Privacy Policy" triggerText="Privacy Policy" content={legalContents.privacy} /></li>
              <li><LegalDialog title="Terms of Service" triggerText="Terms of Service" content={legalContents.terms} /></li>
              <li><LegalDialog title="Refund Policy" triggerText="Refund Policy" content={legalContents.refund} /></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} AI Link Indexer. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Powered by</span>
            <span className="font-display font-semibold text-slate-300">AI SEO AUTHORITY V2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
