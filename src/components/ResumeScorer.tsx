
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Upload,
  FileText,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

interface ResumeScorerProps {
  onBack: () => void;
}

interface ScoreBreakdown {
  formatting: number;
  atsCompatibility: number;
  keywords: number;
  experience: number;
  education: number;
  skills: number;
  overall: number;
}

interface Suggestion {
  type: 'error' | 'warning' | 'success';
  category: string;
  message: string;
}

const ResumeScorer = ({ onBack }: ResumeScorerProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setUploadedFile(file);
        analyzeResume(file);
      } else {
        toast.error('Please upload a PDF or Word document (.docx)');
      }
    }
  };

  const analyzeResume = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate file analysis
    setTimeout(() => {
      // Generate mock scores
      const scores: ScoreBreakdown = {
        formatting: Math.floor(Math.random() * 30) + 70,
        atsCompatibility: Math.floor(Math.random() * 25) + 65,
        keywords: Math.floor(Math.random() * 35) + 55,
        experience: Math.floor(Math.random() * 20) + 75,
        education: Math.floor(Math.random() * 15) + 80,
        skills: Math.floor(Math.random() * 25) + 70,
        overall: 0
      };
      
      // Calculate overall score
      scores.overall = Math.round(
        (scores.formatting * 0.2 + 
         scores.atsCompatibility * 0.25 + 
         scores.keywords * 0.20 + 
         scores.experience * 0.15 + 
         scores.education * 0.10 + 
         scores.skills * 0.10)
      );

      setScoreBreakdown(scores);

      // Generate suggestions based on scores
      const newSuggestions: Suggestion[] = [];

      if (scores.formatting < 80) {
        newSuggestions.push({
          type: 'warning',
          category: 'Formatting',
          message: 'Consider using a cleaner, more professional template with consistent spacing and fonts.'
        });
      }

      if (scores.atsCompatibility < 75) {
        newSuggestions.push({
          type: 'error',
          category: 'ATS Compatibility',
          message: 'Your resume may not pass ATS systems. Use standard section headers and avoid complex formatting.'
        });
      }

      if (scores.keywords < 70) {
        newSuggestions.push({
          type: 'warning',
          category: 'Keywords',
          message: 'Include more industry-specific keywords and skills relevant to your target role.'
        });
      }

      if (scores.experience < 80) {
        newSuggestions.push({
          type: 'warning',
          category: 'Experience',
          message: 'Add more quantifiable achievements and specific results to your work experience.'
        });
      }

      if (scores.skills < 75) {
        newSuggestions.push({
          type: 'warning',
          category: 'Skills',
          message: 'Expand your skills section with more relevant technical and soft skills.'
        });
      }

      if (scores.overall >= 85) {
        newSuggestions.push({
          type: 'success',
          category: 'Overall',
          message: 'Excellent resume! You\'re well-positioned for your job search.'
        });
      }

      setSuggestions(newSuggestions);
      setIsAnalyzing(false);
      toast.success('Resume analysis complete!');
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  const downloadImprovedResume = () => {
    toast.success('Downloading your improved resume template...');
    console.log('Downloading improved resume based on analysis');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Resume Score Checker</h1>
          </div>
          {scoreBreakdown && (
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className={`${getScoreColor(scoreBreakdown.overall)} text-lg px-3 py-1`}>
                <Star className="w-4 h-4 mr-1" />
                {scoreBreakdown.overall}/100 - {getScoreLabel(scoreBreakdown.overall)}
              </Badge>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!uploadedFile ? (
            // Upload Section
            <div className="text-center">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl">Upload Your Resume</CardTitle>
                  <p className="text-gray-600">
                    Get instant AI-powered analysis and improvement suggestions
                  </p>
                </CardHeader>
                <CardContent>
                  <div 
                    className="border-2 border-dashed border-purple-300 rounded-lg p-12 hover:border-purple-500 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Drag & Drop or Click to Upload
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Supports PDF and Word documents (.docx)
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Choose File
                    </Button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  <div className="mt-6 text-sm text-gray-500">
                    <p>✓ Your resume is analyzed locally and securely</p>
                    <p>✓ No data is stored or shared</p>
                    <p>✓ Get results in under 30 seconds</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : isAnalyzing ? (
            // Analyzing Section
            <div className="text-center">
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-12">
                  <div className="animate-pulse mb-4">
                    <FileText className="w-16 h-16 text-purple-600 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Analyzing Your Resume...
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our AI is reviewing your resume for ATS compatibility, formatting, keywords, and more.
                  </p>
                  <Progress value={66} className="mb-4" />
                  <p className="text-sm text-gray-500">
                    This usually takes 10-30 seconds
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : scoreBreakdown ? (
            // Results Section
            <div className="space-y-6">
              {/* Overall Score */}
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Resume Analysis Complete</CardTitle>
                  <div className={`text-4xl font-bold ${getScoreColor(scoreBreakdown.overall)} mt-2`}>
                    {scoreBreakdown.overall}/100
                  </div>
                  <p className="text-gray-600">{getScoreLabel(scoreBreakdown.overall)}</p>
                </CardHeader>
              </Card>

              {/* Score Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'ATS Compatibility', score: scoreBreakdown.atsCompatibility, weight: '25%' },
                    { label: 'Formatting & Design', score: scoreBreakdown.formatting, weight: '20%' },
                    { label: 'Keywords & Skills', score: scoreBreakdown.keywords, weight: '20%' },
                    { label: 'Experience Section', score: scoreBreakdown.experience, weight: '15%' },
                    { label: 'Education Section', score: scoreBreakdown.education, weight: '10%' },
                    { label: 'Skills Section', score: scoreBreakdown.skills, weight: '10%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{item.weight}</span>
                            <span className={`text-sm font-semibold ${getScoreColor(item.score)}`}>
                              {item.score}/100
                            </span>
                          </div>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle>Improvement Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {suggestions.map((suggestion, index) => {
                    const Icon = suggestion.type === 'error' ? XCircle : 
                                suggestion.type === 'warning' ? AlertCircle : CheckCircle;
                    const colorClass = suggestion.type === 'error' ? 'text-red-600' : 
                                      suggestion.type === 'warning' ? 'text-yellow-600' : 'text-green-600';
                    
                    return (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Icon className={`w-5 h-5 ${colorClass} mt-0.5`} />
                        <div>
                          <p className="font-medium text-gray-900">{suggestion.category}</p>
                          <p className="text-sm text-gray-600">{suggestion.message}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={downloadImprovedResume}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Improved Template
                </Button>
                <Button 
                  onClick={() => {
                    setUploadedFile(null);
                    setScoreBreakdown(null);
                    setSuggestions([]);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Analyze Another Resume
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ResumeScorer;
