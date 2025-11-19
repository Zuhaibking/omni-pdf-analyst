import { FileText, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-soft">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-muted-foreground">
              Powered by Advanced AI Analysis
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              ULTRA LEXIPDF OMEGA
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform any PDF into comprehensive, structured insights with AI-powered analysis
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-hero text-white hover:opacity-90 transition-opacity shadow-strong px-8 py-6 text-lg"
            >
              <FileText className="w-5 h-5 mr-2" />
              Analyze PDF Now
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <FeatureCard
              icon={<Brain className="w-6 h-6 text-primary" />}
              title="Smart Analysis"
              description="AI extracts key insights, definitions, and summaries"
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6 text-primary" />}
              title="Structured Output"
              description="Organized sections with clear, detailed breakdowns"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Instant Results"
              description="Fast processing of textbooks, papers, and documents"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
      <div className="mb-4 inline-flex p-3 bg-muted rounded-lg">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
