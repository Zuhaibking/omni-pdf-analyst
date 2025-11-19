import { FileText, Book, ListChecks, BookOpen, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AnalysisData {
  pdfType: string;
  shortSummary: string;
  detailedSummary: string[];
  keyPoints: string[];
  definitions: Array<{ term: string; definition: string }>;
  sections: Array<{ title: string; summary: string }>;
}

interface AnalysisDisplayProps {
  fileName: string;
  analysisData: AnalysisData;
}

export const AnalysisDisplay = ({ fileName, analysisData }: AnalysisDisplayProps) => {
  const analysis = {
    pdfType: analysisData.pdfType,
    shortSummary: analysisData.shortSummary,
    detailedSummary: Array.isArray(analysisData.detailedSummary) 
      ? analysisData.detailedSummary 
      : [analysisData.detailedSummary],
    keyPoints: analysisData.keyPoints || [],
    definitions: analysisData.definitions || [],
    sections: analysisData.sections || [],
  };

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
                    {section.summary}
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
