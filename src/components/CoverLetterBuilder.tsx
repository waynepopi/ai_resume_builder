
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Download,
  FileText,
  Send,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface CoverLetterBuilderProps {
  onBack: () => void;
}

interface CoverLetterData {
  companyName: string;
  jobTitle: string;
  hiringManager: string;
  jobDescription: string;
  yourName: string;
  content: string;
}

const CoverLetterBuilder = ({ onBack }: CoverLetterBuilderProps) => {
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    companyName: '',
    jobTitle: '',
    hiringManager: '',
    jobDescription: '',
    yourName: '',
    content: ''
  });
  
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCoverLetter = async () => {
    if (!coverLetterData.companyName || !coverLetterData.jobTitle || !coverLetterData.yourName) {
      toast.error('Please fill in the required fields (Company, Job Title, Your Name)');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = `Dear ${coverLetterData.hiringManager || 'Hiring Manager'},

I am writing to express my strong interest in the ${coverLetterData.jobTitle} position at ${coverLetterData.companyName}. With my background in professional development and proven track record of success, I am confident that I would be a valuable addition to your team.

In my previous roles, I have consistently demonstrated:
• Strong problem-solving abilities and attention to detail
• Excellent communication and collaboration skills
• The ability to work effectively in fast-paced environments
• A commitment to delivering high-quality results

${coverLetterData.jobDescription ? `Based on the job description provided, I am particularly excited about the opportunity to contribute to ${coverLetterData.companyName}'s mission and bring my expertise to help achieve your goals.` : ''}

I am eager to discuss how my skills and experience align with your needs. Thank you for considering my application. I look forward to the opportunity to speak with you further about how I can contribute to ${coverLetterData.companyName}'s continued success.

Sincerely,
${coverLetterData.yourName}`;

      setCoverLetterData(prev => ({ ...prev, content: generatedContent }));
      setIsGenerating(false);
      toast.success('Cover letter generated successfully!');
    }, 2000);
  };

  const downloadPDF = () => {
    toast.success('PDF download started! Your cover letter will be downloaded shortly.');
    console.log('Downloading cover letter PDF:', coverLetterData);
  };

  const downloadWord = () => {
    toast.success('Word document download started! Your cover letter will be downloaded shortly.');
    console.log('Downloading cover letter Word:', coverLetterData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Cover Letter Builder</h1>
          </div>
          {coverLetterData.content && (
            <div className="flex space-x-2">
              <Button onClick={downloadPDF} size="sm" className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button onClick={downloadWord} size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Word
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span>Cover Letter Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Full Name *
                  </label>
                  <Input
                    value={coverLetterData.yourName}
                    onChange={(e) => setCoverLetterData(prev => ({ ...prev, yourName: e.target.value }))}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <Input
                    value={coverLetterData.companyName}
                    onChange={(e) => setCoverLetterData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Tech Company Inc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                  </label>
                  <Input
                    value={coverLetterData.jobTitle}
                    onChange={(e) => setCoverLetterData(prev => ({ ...prev, jobTitle: e.target.value }))}
                    placeholder="Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hiring Manager Name (Optional)
                  </label>
                  <Input
                    value={coverLetterData.hiringManager}
                    onChange={(e) => setCoverLetterData(prev => ({ ...prev, hiringManager: e.target.value }))}
                    placeholder="Jane Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description (Optional)
                  </label>
                  <Textarea
                    value={coverLetterData.jobDescription}
                    onChange={(e) => setCoverLetterData(prev => ({ ...prev, jobDescription: e.target.value }))}
                    placeholder="Paste the job description here to get a more tailored cover letter..."
                    className="min-h-24"
                  />
                </div>

                <Button 
                  onClick={generateCoverLetter}
                  disabled={isGenerating}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>💡 Cover Letter Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Research the company and personalize your letter</li>
                  <li>• Highlight specific achievements with numbers</li>
                  <li>• Show enthusiasm for the role and company</li>
                  <li>• Keep it concise (3-4 paragraphs)</li>
                  <li>• Include a clear call to action</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Cover Letter Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {coverLetterData.content ? (
                  <div className="space-y-4">
                    <Textarea
                      value={coverLetterData.content}
                      onChange={(e) => setCoverLetterData(prev => ({ ...prev, content: e.target.value }))}
                      className="min-h-96 font-mono text-sm"
                    />
                    <div className="flex space-x-2">
                      <Button onClick={downloadPDF} className="bg-green-600 hover:bg-green-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button onClick={downloadWord} variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download Word
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 text-gray-500">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>Fill in the information and click "Generate Cover Letter" to see your personalized cover letter here.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterBuilder;
