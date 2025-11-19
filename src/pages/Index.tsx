import { useState, useRef } from "react";
import { HeroSection } from "@/components/HeroSection";
import { PdfUploader } from "@/components/PdfUploader";
import { AnalysisDisplay } from "@/components/AnalysisDisplay";

const Index = () => {
  const [pdfData, setPdfData] = useState<any | null>(null);
  const uploaderRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    uploaderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePdfAnalyze = (data: any) => {
    setPdfData(data);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onGetStarted={handleGetStarted} />
      
      <div ref={uploaderRef}>
        <PdfUploader onPdfAnalyze={handlePdfAnalyze} />
      </div>

      {pdfData && (
        <AnalysisDisplay 
          fileName={pdfData.fileName} 
          analysisData={pdfData.analysis} 
        />
      )}

      <footer className="py-8 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 ULTRA LEXIPDF OMEGA - Advanced AI PDF Analysis Engine</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
