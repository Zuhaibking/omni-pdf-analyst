import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as pdfjs from "npm:pdfjs-dist@4.0.379";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received PDF analysis request');
    
    const formData = await req.formData();
    const pdfFile = formData.get('pdf') as File;
    
    if (!pdfFile) {
      console.error('No PDF file provided');
      return new Response(
        JSON.stringify({ error: 'No PDF file provided' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Extracting text from PDF...');
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    
    let extractedText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      extractedText += `\n\n--- PAGE ${i} ---\n${pageText}`;
    }

    console.log(`Extracted ${extractedText.length} characters from PDF`);

    // Validate extracted text
    if (!extractedText.trim() || extractedText.trim().length < 50) {
      console.error('Insufficient text extracted from PDF');
      return new Response(
        JSON.stringify({ 
          error: 'ERROR: No readable text was extracted from this PDF. Please re-upload a PDF with readable text content.' 
        }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call Lovable AI for analysis
    console.log('Sending to AI for analysis...');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `You are ULTRA LEXIPDF OMEGA — a strictly grounded PDF analysis engine.

STRICT RULES:
• ONLY analyze the provided PDF text
• NEVER invent or fabricate content
• NEVER use generic placeholders
• If information is missing, say "Not found in the PDF text"
• Stay 100% grounded in the actual text provided

OUTPUT FORMAT (JSON):
{
  "pdfType": "textbook | notes | slides | research paper | legal document | technical handbook | story | tutorial | other",
  "shortSummary": "5-8 lines concise summary",
  "detailedSummary": "2-4 paragraphs detailed analysis",
  "keyPoints": ["point1", "point2", ...], // 10-20 bullets
  "definitions": [{"term": "...", "definition": "..."}], // ONLY if present in text
  "sections": [{"title": "...", "summary": "..."}] // ONLY if clear sections exist
}

CRITICAL: Base everything on the actual PDF text. No hallucinations.`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this PDF text:\n\n${extractedText}` }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), 
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }), 
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const analysisText = aiData.choices[0].message.content;
    
    console.log('AI analysis received, parsing JSON...');
    
    // Extract JSON from markdown code blocks if present
    let jsonText = analysisText;
    const jsonMatch = analysisText.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }
    
    const analysis = JSON.parse(jsonText);

    console.log('Analysis complete');
    return new Response(
      JSON.stringify({ 
        success: true,
        extractedText: extractedText.substring(0, 2000) + '...', // First 2000 chars for reference
        analysis 
      }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-pdf function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to analyze PDF',
        details: error instanceof Error ? error.stack : undefined
      }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
