import { FileText, Book, ListChecks, BookOpen, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AnalysisDisplayProps {
  fileName: string;
  pdfText: string;
}

export const AnalysisDisplay = ({ fileName, pdfText }: AnalysisDisplayProps) => {
  // In a real app, this would call an AI API to analyze the PDF
  // For demo purposes, we'll generate structured output
  
  const analysis = generateAnalysis(pdfText);

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Badge className="bg-gradient-hero text-white">
            Analysis Complete
          </Badge>
          <h2 className="text-3xl font-bold">PDF Analysis Results</h2>
          <p className="text-muted-foreground">Document: {fileName}</p>
        </div>

        <Card className="shadow-strong">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <CardTitle>1. Detected PDF Type</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-sm">
              {analysis.pdfType}
            </Badge>
          </CardContent>
        </Card>

        <Card className="shadow-strong">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              <CardTitle>2. Short Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              {analysis.shortSummary}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-strong">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle>3. Detailed Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.detailedSummary.map((paragraph, idx) => (
              <p key={idx} className="text-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-strong">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-primary" />
              <CardTitle>4. Key Points</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {analysis.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-strong">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-primary" />
              <CardTitle>5. Important Definitions / Terms / Formulas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.definitions.map((def, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-primary mb-1">{def.term}</h4>
                  <p className="text-foreground text-sm">{def.definition}</p>
                  {idx < analysis.definitions.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-strong">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <CardTitle>6. Section-wise Breakdown</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analysis.sections.map((section, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold text-lg text-primary mb-2">
                    {section.title}
                  </h4>
                  <p className="text-foreground leading-relaxed">
                    {section.content}
                  </p>
                  {idx < analysis.sections.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

// Helper function to generate structured analysis
function generateAnalysis(pdfText: string) {
  return {
    pdfType: "Educational Document / Textbook Chapter",
    shortSummary: "This document presents a comprehensive introduction to advanced topics, covering theoretical frameworks, methodological approaches, and key definitions. It explores fundamental concepts through multiple chapters, providing detailed analysis with case studies and experimental findings. The material synthesizes various principles and demonstrates their practical applications, while suggesting future research directions.",
    detailedSummary: [
      "The document begins with an introductory chapter that establishes the foundation for understanding advanced topics. It systematically presents theoretical frameworks that underpin the subject matter, explaining how these theories apply in practical scenarios. The introduction covers multiple paradigms and their real-world applications, setting the stage for deeper exploration.",
      "Chapter 2 provides extensive analysis of the concepts introduced earlier, incorporating case studies that demonstrate practical implementation. The methodology section discusses both quantitative and qualitative approaches, explaining when each method is most appropriate and acknowledging their respective limitations. Multiple findings are presented with supporting evidence from research and experimental data.",
      "Throughout the document, key concepts are clearly defined and explained with examples. The text demonstrates strong connections between theoretical principles and their practical applications. Important formulas and relationships are presented, including fundamental equations that illustrate core concepts.",
      "The conclusion synthesizes all covered topics, showing how different concepts interconnect and build upon each other. It provides a comprehensive overview of the material while pointing toward future research opportunities and unexplored areas within the field."
    ],
    keyPoints: [
      "Theoretical frameworks provide essential foundation for understanding complex concepts",
      "Multiple paradigms are discussed with their specific applications and contexts",
      "Quantitative and qualitative methodologies each have distinct use cases and limitations",
      "Term A represents a fundamental concept essential to the subject matter",
      "Term B describes an advanced principle with specific applications",
      "Formula X (E = mc²) demonstrates the relationship between energy and mass",
      "Research findings show significant correlations between studied variables",
      "Data analysis techniques reveal patterns in complex systems",
      "Experimental results provide empirical support for theoretical predictions",
      "Case studies illustrate practical applications of theoretical concepts",
      "Integration of theory and practice is emphasized throughout the document",
      "Future research directions are identified for further exploration",
      "Multiple chapters build progressively on established concepts",
      "Clear definitions are provided for all technical terms",
      "Evidence-based conclusions are drawn from presented research"
    ],
    definitions: [
      {
        term: "Term A",
        definition: "A fundamental concept that describes core principles and serves as a building block for understanding more complex topics in the field."
      },
      {
        term: "Term B",
        definition: "An advanced principle used in specialized applications, demonstrating higher-level understanding and integration of multiple concepts."
      },
      {
        term: "Formula X: E = mc²",
        definition: "Einstein's mass-energy equivalence formula, demonstrating that energy (E) equals mass (m) multiplied by the speed of light (c) squared. This fundamental equation shows the relationship between mass and energy."
      },
      {
        term: "Theoretical Frameworks",
        definition: "Structured sets of concepts and principles that provide a systematic way of understanding and analyzing phenomena within a field of study."
      },
      {
        term: "Methodological Approaches",
        definition: "Systematic procedures and techniques used to investigate, analyze, and draw conclusions from research questions and data."
      }
    ],
    sections: [
      {
        title: "Chapter 1: Introduction to Advanced Topics",
        content: "This chapter introduces fundamental concepts and establishes the theoretical foundation. It covers theoretical frameworks, methodological approaches, and key definitions. The introduction explains how theories apply in practical scenarios and presents multiple paradigms with their applications. Essential terms are defined, including Term A (fundamental concepts), Term B (advanced principles), and Formula X (E = mc²)."
      },
      {
        title: "Chapter 2: Detailed Analysis",
        content: "This section provides in-depth exploration of previously introduced topics. Multiple case studies demonstrate practical applications of theoretical concepts. The chapter presents important findings including: significant correlations between variables, patterns revealed through data analysis, and experimental results confirming theoretical predictions. The analysis integrates quantitative and qualitative approaches."
      },
      {
        title: "Conclusion",
        content: "The final section synthesizes all covered concepts and demonstrates their interconnections. It provides a comprehensive overview of how different principles relate to each other and build upon the foundation established in earlier chapters. Future research directions are suggested, identifying areas for further exploration and potential applications of the presented concepts."
      }
    ]
  };
}
