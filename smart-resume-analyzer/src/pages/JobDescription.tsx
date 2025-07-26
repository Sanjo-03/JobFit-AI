import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Briefcase, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { analyzeResume } from "@/api/analyze";

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

const JobDescription = () => {
  const [jobDescription, setJobDescription] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const resumeText = localStorage.getItem("resumeText") || "";

  const handleAnalyzeMatch = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    if (!resumeText) {
      toast.error("No resume found. Please upload a resume first.");
      navigate("/");
      return;
    }

    setIsAnalyzing(true);

    try {
      const backendResponse = await analyzeResume(resumeText, jobDescription);
      localStorage.setItem("jobDescription", jobDescription);
      localStorage.setItem("fullAnalysisResult", JSON.stringify(backendResponse));

      navigate("/results");
    } catch (error) {
      console.error('Error analyzing match:', error);
      toast.error("Failed to analyze. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSkip = () => {
    localStorage.removeItem("jobDescription");
    localStorage.removeItem("fullAnalysisResult");
    navigate("/results");
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-teal-100 via-blue-100 to-lavender-100 dark:from-gray-800 dark:to-gray-900 text-foreground">
        <div className="max-w-xl mx-auto w-full space-y-8 text-center animate-fade-in-up">
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white tracking-tight">
            Describe the Dream Job
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            Paste the job description to get a personalized match analysis for your resume.
          </p>

          <Card className="p-8 space-y-6 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-lg rounded-2xl transition-all duration-200 hover:shadow-xl">
            <CardHeader className="p-0 text-center">
              <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white flex flex-col items-center gap-3">
                <Briefcase className="h-12 w-12 text-teal-500 dark:text-teal-400 animate-pulse" />
                Job Description
              </CardTitle>
              <CardDescription className="text-base text-gray-600 dark:text-gray-300 mt-2">
                The more detailed, the better the analysis!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-0">
              <div className="space-y-2">
                <Label htmlFor="job-description" className="sr-only">Job Description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={10}
                  className="min-h-[250px] p-4 text-base bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-300 transition-all duration-200 rounded-lg"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAnalyzeMatch}
                  disabled={isAnalyzing}
                  className="flex-1 h-12 text-lg bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing Match...
                    </>
                  ) : (
                    "Analyze Resume"
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleSkip}
                  disabled={isAnalyzing}
                  className="h-12 text-lg border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-white rounded-lg transition-all duration-200"
                >
                  Skip Analysis (View Basic Results)
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={handleBack}
                className="mt-4 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" /> Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default JobDescription;