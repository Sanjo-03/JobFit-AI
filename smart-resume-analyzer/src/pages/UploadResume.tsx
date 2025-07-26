import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { extractText } from "@/utils/pdfExtract";

// Define keyframes for fade-in animation
const styles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
`;

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload only PDF files");
      return;
    }

    setFile(selectedFile);
    setExtractedText("");
    setIsProcessing(true);

    try {
      const extractedText = await extractText(selectedFile);
      setExtractedText(extractedText);
      localStorage.setItem('resumeText', extractedText);
      
      toast.success("Resume uploaded and text extracted!");
      navigate('/job-description');
    } catch (error) {
      console.error('Error extracting PDF text:', error);
      toast.error("Failed to process PDF file. Please try again.");
    } finally {
      setIsProcessing(false);
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
    <>
      <style>{styles}</style>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-teal-100 via-blue-100 to-lavender-100 dark:from-gray-800 dark:to-gray-900 text-foreground">
        <div className="max-w-xl mx-auto w-full space-y-8 text-center animate-fade-in-up">
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white tracking-tight">
            Optimize Your Resume with AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            Upload your resume and paste a job description to get instant feedback and a match score.
          </p>
          <Card className="p-8 space-y-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-lg rounded-2xl transition-all duration-200 hover:shadow-xl">
            <CardHeader className="p-0 text-center">
              <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white flex flex-col items-center gap-3">
                <Upload className="h-12 w-12 text-teal-500 dark:text-teal-400 animate-pulse" />
                Upload Your Resume
              </CardTitle>
              <CardDescription className="text-base text-gray-600 dark:text-gray-300 mt-2">
                Supports PDF files only. We extract the text for analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-0">
              <div className="space-y-3">
                <Label htmlFor="resume-upload" className="sr-only">Choose PDF file</Label>
                <Input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-800 dark:text-white file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600 dark:file:bg-teal-600 dark:hover:file:bg-teal-700 cursor-pointer bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-300 transition-all duration-200"
                />
              </div>
              {file && (
                <div className="flex flex-col items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <FileText className="h-5 w-5 text-teal-500 dark:text-teal-400" />
                    <span>{file.name}</span>
                  </div>
                  {isProcessing ? (
                    <div className="flex items-center gap-2 text-teal-500 dark:text-teal-400">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Extracting text...</span>
                    </div>
                  ) : extractedText && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      <span>Text extracted successfully!</span>
                    </div>
                  )}
                  {extractedText && (
                    <Button
                      onClick={handleContinue}
                      className="w-full mt-4 h-12 text-lg font-semibold bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      Proceed to Job Description
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UploadResume;