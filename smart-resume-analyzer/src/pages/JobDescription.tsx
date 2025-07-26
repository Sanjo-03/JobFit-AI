// src/pages/JobDescription.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Briefcase, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { analyzeResume } from "@/api/analyze"; // Correct import

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
      // The backend now returns a JSON object under 'analysis' key
      const backendResponse = await analyzeResume(resumeText, jobDescription);
      // Store the entire analysis object (stringified)
      localStorage.setItem("jobDescription", jobDescription);
      localStorage.setItem("fullAnalysisResult", JSON.stringify(backendResponse)); // <--- Store stringified JSON

      // Navigate to results page after successful analysis
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
    localStorage.removeItem("fullAnalysisResult"); // Also remove this
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="absolute left-6 top-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <h1 className="text-4xl font-bold text-primary">Paste a Job Description</h1>
          <p className="text-xl text-muted-foreground">
            Get a match score and recommendations based on a specific job.
          </p>
        </div>

        {/* Job Description Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Description Analysis
            </CardTitle>
            <CardDescription>
              Paste the job description to get a detailed match analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={10}
                className="min-h-[200px]"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAnalyzeMatch}
                disabled={isAnalyzing}
                className="flex-1"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Match...
                  </>
                ) : (
                  "Analyze Match"
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleSkip}
                disabled={isAnalyzing}
              >
                Skip This Step
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobDescription;