import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export function LegalDialog({ title, triggerText, content }: { title: string, triggerText: string, content: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
          {triggerText}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-[#0f172a] border-white/10 text-slate-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-white">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] mt-4 pr-4">
          <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-white max-w-none">
            {content}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export const legalContents = {
  about: (
    <>
      <h3>About AI Link Indexer</h3>
      <p>We are dedicated to bridging the gap between modern websites and next-generation artificial intelligence models. As traditional search engines evolve, ensuring your digital presence is understood by AI like ChatGPT, Claude, and Perplexity is crucial.</p>
      <p>Our platform provides a frictionless, immediate bridge to submit your URLs directly into the indexing workflows of the world's most powerful AI engines.</p>
    </>
  ),
  privacy: (
    <>
      <h3>Privacy Policy</h3>
      <p>Your privacy is important to us. When you use AI Link Indexer, we do not store the URLs you submit beyond the immediate session required to facilitate the redirect to the target AI engine.</p>
      <p>If you use our contact form, we collect your name, website, and message solely for the purpose of responding to your inquiry. We do not sell, rent, or share this data with third parties.</p>
    </>
  ),
  terms: (
    <>
      <h3>Terms of Service</h3>
      <p>By using AI Link Indexer, you agree to these terms. The service is provided "as is" without warranties of any kind.</p>
      <p>We do not guarantee that AI search engines will index your submitted URLs. Our tool acts as a convenient submission gateway. The final decision to index, crawl, or display your content rests entirely with the respective AI models (OpenAI, Anthropic, Google, etc.).</p>
      <p>You agree not to use our tool to submit malicious, illegal, or harmful content to AI search engines.</p>
    </>
  ),
  refund: (
    <>
      <h3>Refund Policy</h3>
      <p>AI Link Indexer currently operates as a completely free service. As there are no payments, subscriptions, or fees involved, there is no refund policy required at this time.</p>
      <p>If we ever introduce premium features in the future, a comprehensive refund policy will be provided prior to any transaction.</p>
    </>
  ),
};
