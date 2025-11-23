import { useState, useCallback } from "react";
import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PdfUploaderProps {
  onPdfAnalyze: (data: any) => void;
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
    
    try {
      console.log('Uploading PDF for analysis...');
      
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('fileName', file.name);
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-pdf`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze PDF');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'PDF analysis failed');
      }

      console.log('PDF analysis complete:', data);
      onPdfAnalyze({ ...data, fileName: file.name });
      
      toast({
        title: "PDF Analyzed",
        description: "Your document has been processed successfully",
      });
    } catch (error) {
      console.error('Error processing PDF:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze PDF",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
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
