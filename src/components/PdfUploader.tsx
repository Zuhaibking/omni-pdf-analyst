import { useState, useCallback } from "react";
import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PdfUploaderProps {
  onPdfAnalyze: (text: string, fileName: string) => void;
}

export const PdfUploader = ({ onPdfAnalyze }: PdfUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      const file = e.dataTransfer.files[0];
      if (file) {
        processFile(file);
      }
    },
    []
  );

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, []);

  const processFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate PDF text extraction
    // In a real app, you'd use a library like pdf.js or send to backend
    setTimeout(() => {
      const mockPdfText = `Sample PDF Content from: ${file.name}
      
This is a simulated PDF extraction. In a production environment, this would contain the actual extracted text from the PDF file.

CHAPTER 1: Introduction to Advanced Topics

This chapter introduces fundamental concepts that will be explored throughout this document. The main focus areas include:

1. Theoretical Frameworks
Understanding the theoretical underpinnings is crucial for applying concepts in practical scenarios. This section covers multiple paradigms and their applications.

2. Methodological Approaches  
Various methodologies are discussed, including quantitative and qualitative approaches. Each method has specific use cases and limitations.

3. Key Definitions
- Term A: A fundamental concept that describes...
- Term B: An advanced principle used in...
- Formula X: E = mc², demonstrating energy-mass equivalence

CHAPTER 2: Detailed Analysis

This section provides in-depth exploration of the topics introduced earlier. Multiple case studies are presented to illustrate practical applications.

Important Findings:
• Finding 1: Research shows significant correlation between variables
• Finding 2: Data analysis reveals patterns in complex systems
• Finding 3: Experimental results confirm theoretical predictions

CONCLUSION

The document synthesizes various concepts and demonstrates their interconnections. Future research directions are suggested for further exploration.`;

      onPdfAnalyze(mockPdfText, file.name);
      setIsProcessing(false);
      
      toast({
        title: "PDF Analyzed",
        description: "Your document has been processed successfully",
      });
    }, 1500);
  };

  return (
    <section className="py-16 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Upload Your PDF</h2>
          <p className="text-muted-foreground">
            Drop your file below or click to browse
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300
            ${isDragging 
              ? "border-primary bg-primary/5 scale-105" 
              : "border-border bg-card hover:border-primary/50"
            }
            ${isProcessing ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isProcessing}
          />

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-6 bg-gradient-hero rounded-full opacity-10">
              <Upload className="w-12 h-12" />
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">
                {isProcessing ? "Processing..." : "Drop PDF here"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse files
              </p>
            </div>

            <Button
              variant="outline"
              disabled={isProcessing}
              className="mt-4"
            >
              <FileText className="w-4 h-4 mr-2" />
              Select PDF File
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
