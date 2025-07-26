// src/pages/UploadResume.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, FileText } from "lucide-react";
import { toast } from "sonner";
import { extractText } from "@/utils/pdfExtract";

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  // Removed states related to simulated analysis
  const navigate = useNavigate();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload only PDF files");
      return;
    }

    setFile(selectedFile);
    // Removed setIsAnalyzing(true) here

    try {
      const extractedText = await extractText(selectedFile);
      setExtractedText(extractedText);
      localStorage.setItem('resumeText', extractedText);

      // --- REMOVED THE ENTIRE SIMULATED AI ANALYSIS BLOCK ---
      // This section was generating fake analysis data.
      // Now the backend will provide real analysis.
      // setTimeout(() => { ... }, 2000);
      // --- END REMOVED BLOCK ---

      toast.success("Resume uploaded and text extracted!"); // Added success toast
      navigate('/job-description'); // Auto-navigate after successful extraction

    } catch (error) {
      console.error('Error extracting PDF text:', error);
      toast.error("Failed to process PDF file.");
      // Removed setIsAnalyzing(false) here
    }
  };

  const handleContinue = () => {
    if (extractedText) {
      navigate('/job-description');
    } else {
      toast.info("Please upload a resume first.");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Upload Your Resume</h1>
          <p className="text-xl text-muted-foreground">Get smart suggestions to improve your resume instantly.</p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Resume Upload
            </CardTitle>
            <CardDescription>Upload your resume as a PDF file for analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume-upload">Choose PDF file</Label>
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
            </div>
            {file && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{file.name}</span>
                {extractedText && (
                  <Button onClick={handleContinue} className="ml-auto">
                    Continue
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* --- REMOVED THE ENTIRE SIMULATED ANALYSIS DISPLAY SECTION --- */}
        {/* {(isAnalyzing || analysis) && (...) } */}
        {/* --- END REMOVED BLOCK --- */}
      </div>
    </div>
  );
};

export default UploadResume;