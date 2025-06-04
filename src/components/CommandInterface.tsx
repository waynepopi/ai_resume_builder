
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  FileText, 
  Download,
  Edit3,
  Star,
  Target,
  Zap
} from 'lucide-react';
import ResumePreview from '@/components/ResumePreview';
import { toast } from 'sonner';

interface CommandInterfaceProps {
  onBack: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
  score: number;
}

interface UserProfile {
  personalInfo: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedIn?: string;
    website?: string;
  };
  careerLevel?: 'entry' | 'mid' | 'senior' | 'executive';
  targetRole?: string;
  industry?: string;
  yearsExperience?: number;
  currentStep?: string;
}

const CommandInterface = ({ onBack }: CommandInterfaceProps) => {
  const [command, setCommand] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your advanced AI resume assistant powered by intelligent questioning algorithms. I'll help you create a professional resume by gathering detailed information step by step.\n\nTo get started, I can help you with:\n\n🎯 **Complete Resume Creation** - I'll ask detailed questions about your background\n📄 **Cover Letter Writing** - Tailored to specific job applications\n⭐ **Resume Optimization** - Improve existing resumes\n\nWhat would you like to work on today? Just tell me something like:\n• 'I need a resume for a software engineer position'\n• 'Help me create a marketing resume'\n• 'I'm a recent graduate looking for my first job'",
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    personalInfo: {}
  });
  const [questionSequence, setQuestionSequence] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateIntelligentQuestions = (userInput: string, profile: UserProfile): string[] => {
    const questions: string[] = [];
    
    // Analyze user input to determine career level and needs
    const isEntryLevel = userInput.toLowerCase().includes('graduate') || userInput.toLowerCase().includes('entry') || userInput.toLowerCase().includes('first job');
    const isCareerChange = userInput.toLowerCase().includes('career change') || userInput.toLowerCase().includes('transition');
    
    // Personal Information Phase
    if (!profile.personalInfo.name) {
      questions.push("Let's start with your personal information. What's your full name?");
    }
    if (!profile.personalInfo.email) {
      questions.push("What's your professional email address?");
    }
    if (!profile.personalInfo.phone) {
      questions.push("What's your phone number?");
    }
    if (!profile.personalInfo.location) {
      questions.push("What city and state are you located in? (This helps with local job searches)");
    }
    if (!profile.personalInfo.linkedIn) {
      questions.push("Do you have a LinkedIn profile? If yes, please share the URL.");
    }
    
    // Career Level and Target Role
    if (!profile.targetRole) {
      questions.push("What specific job title or role are you targeting? (e.g., 'Senior Software Engineer', 'Marketing Manager')");
    }
    if (!profile.industry) {
      questions.push("What industry are you focusing on? (e.g., Technology, Healthcare, Finance, Education)");
    }
    if (!profile.yearsExperience) {
      questions.push("How many years of professional experience do you have in your field?");
    }
    
    // Experience Deep Dive
    questions.push("Let's talk about your work experience. Starting with your most recent position, what was your job title?");
    questions.push("What company did you work for, and what dates did you work there?");
    questions.push("What were your main responsibilities in this role?");
    questions.push("What were your biggest achievements or accomplishments? Please include specific numbers, percentages, or results if possible.");
    questions.push("What technologies, tools, or methodologies did you use in this position?");
    questions.push("Did you manage any team members or lead any projects? If so, please provide details.");
    
    // Education Deep Dive
    questions.push("Now let's cover your education. What's your highest level of education?");
    questions.push("What was your degree and major/field of study?");
    questions.push("Which school did you attend and when did you graduate?");
    questions.push("What was your GPA? (Include only if 3.5 or higher)");
    questions.push("Did you receive any honors, awards, or participate in relevant activities?");
    
    // Skills Assessment
    questions.push("What are your top technical skills? (programming languages, software, tools, etc.)");
    questions.push("What are your strongest soft skills? (leadership, communication, problem-solving, etc.)");
    questions.push("Do you have any certifications or professional licenses?");
    
    // Additional Sections
    if (isEntryLevel) {
      questions.push("Do you have any relevant internships, volunteer work, or academic projects to include?");
    }
    questions.push("Do you have any notable projects, publications, or portfolio items to showcase?");
    questions.push("Are there any awards, honors, or professional achievements you'd like to highlight?");
    
    return questions;
  };

  const generateAIResponse = (userInput: string, profile: UserProfile): string => {
    const lowerInput = userInput.toLowerCase();
    
    // Initial resume creation request
    if ((lowerInput.includes('resume') || lowerInput.includes('cv')) && questionSequence.length === 0) {
      const questions = generateIntelligentQuestions(userInput, profile);
      setQuestionSequence(questions);
      setCurrentQuestionIndex(0);
      
      return `Perfect! I'll help you create a professional resume. I'm going to ask you detailed questions to build a comprehensive profile. This ensures your resume stands out and passes ATS (Applicant Tracking System) screening.\n\n${questions[0]}`;
    }
    
    // Processing answers to questions
    if (questionSequence.length > 0 && currentQuestionIndex < questionSequence.length) {
      // Process the user's answer and move to next question
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      if (nextIndex < questionSequence.length) {
        return `Great! I've noted that information.\n\n${questionSequence[nextIndex]}`;
      } else {
        // All questions answered, generate resume
        setTimeout(() => {
          generateCompleteResume(userInput);
        }, 1500);
        return "Excellent! I have all the information I need. Let me now generate your professional resume with ATS optimization, industry-specific keywords, and achievement-focused content. This will take just a moment...";
      }
    }
    
    // Handle other requests
    if (lowerInput.includes('cover letter')) {
      return "I'll help you create a compelling cover letter. First, let me know:\n\n1. What specific job are you applying for?\n2. What company is this for?\n3. Do you have the job description? (This helps me tailor the content)\n4. What are your top 3 achievements you want to highlight?";
    }
    
    if (lowerInput.includes('improve') || lowerInput.includes('optimize')) {
      return "I can help optimize your resume for better ATS compatibility and impact. Please tell me:\n\n1. What industry are you targeting?\n2. What specific areas do you want to improve? (e.g., work experience descriptions, skills section, formatting)\n3. Are you applying for a specific role or company?";
    }
    
    return "I understand! Let me help you with that. Could you provide a bit more detail about what you're looking for? For example:\n\n• Are you creating a new resume or updating an existing one?\n• What's your target role or industry?\n• What's your experience level?\n\nThe more specific you are, the better I can assist you!";
  };

  const generateCompleteResume = (userContext: string) => {
    setTimeout(() => {
      const intelligentResume: ResumeData = {
        name: userProfile.personalInfo.name || "Professional Name",
        email: userProfile.personalInfo.email || "professional@email.com",
        phone: userProfile.personalInfo.phone || "(555) 123-4567",
        summary: generateIntelligentSummary(userContext, userProfile),
        experience: generateIntelligentExperience(userContext, userProfile),
        education: generateIntelligentEducation(userProfile),
        skills: generateIntelligentSkills(userContext, userProfile),
        score: 95
      };
      
      setResumeData(intelligentResume);
      setShowPreview(true);
      toast.success("Your AI-optimized resume is ready! Check the preview panel.");
    }, 2000);
  };

  const generateIntelligentSummary = (context: string, profile: UserProfile): string => {
    const experience = profile.yearsExperience || 3;
    const role = profile.targetRole || "Professional";
    const industry = profile.industry || "Technology";
    
    return `Results-driven ${role} with ${experience}+ years of experience in ${industry}. Proven track record of delivering high-impact solutions and driving measurable business results. Expert in cross-functional collaboration, strategic problem-solving, and implementing innovative approaches that increase efficiency by 40%+ and reduce costs. Passionate about leveraging cutting-edge technologies and best practices to exceed organizational goals and drive continuous improvement.`;
  };

  const generateIntelligentExperience = (context: string, profile: UserProfile): any[] => {
    return [
      {
        title: profile.targetRole || "Senior Professional",
        company: "Leading Technology Company",
        duration: "2022 - Present",
        description: [
          "Led cross-functional team of 8+ members to deliver critical projects 25% ahead of schedule",
          "Implemented innovative solutions resulting in 40% improvement in system performance",
          "Managed $2M+ budget and reduced operational costs by 30% through process optimization",
          "Mentored 5 junior team members, with 100% promotion rate within 18 months",
          "Collaborated with C-level executives to develop strategic initiatives increasing revenue by 15%"
        ]
      },
      {
        title: "Mid-Level Professional",
        company: "Growing Tech Startup",
        duration: "2020 - 2022",
        description: [
          "Developed and deployed scalable solutions serving 50,000+ users daily",
          "Reduced system downtime by 60% through proactive monitoring and optimization",
          "Collaborated with product and design teams to launch 3 major features",
          "Achieved 95% customer satisfaction rate through improved user experience design"
        ]
      }
    ];
  };

  const generateIntelligentEducation = (profile: UserProfile): any[] => {
    return [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Technology",
        year: "2020"
      }
    ];
  };

  const generateIntelligentSkills = (context: string, profile: UserProfile): string[] => {
    const baseSkills = ["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "AWS"];
    const softSkills = ["Leadership", "Project Management", "Strategic Planning", "Team Building"];
    return [...baseSkills, ...softSkills];
  };

  const handleSendCommand = async () => {
    if (!command.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: command,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCommand('');
    setIsProcessing(true);

    // Simulate intelligent AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage.content, userProfile);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const suggestions = [
    "Create a resume for a data scientist with 5 years experience",
    "I'm a recent graduate in computer science",
    "Help me transition from marketing to product management",
    "Create a cover letter for a senior developer role",
    "I need a resume for healthcare administration"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Resume Assistant Pro
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {resumeData && (
              <>
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>Score: {resumeData.score}/100</span>
                </Badge>
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-white shadow-sm border'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">AI Assistant Pro</span>
                    </div>
                  )}
                  <p className="whitespace-pre-line">{message.content}</p>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex justify-start">
                <div className="max-w-2xl p-4 rounded-2xl bg-white shadow-sm border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                    <span className="text-sm font-medium text-blue-600">AI Assistant Pro</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">AI is analyzing and generating...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Progress Indicator */}
          {questionSequence.length > 0 && (
            <div className="px-6 py-2 border-t bg-gray-50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Resume Building Progress</span>
                <span className="font-medium">{currentQuestionIndex}/{questionSequence.length}</span>
              </div>
              <Progress value={(currentQuestionIndex / questionSequence.length) * 100} className="mt-2" />
            </div>
          )}

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setCommand(suggestion)}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t bg-white p-6">
            <div className="flex space-x-4">
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Type your response or request here..."
                className="flex-1 text-lg py-6"
                onKeyPress={(e) => e.key === 'Enter' && handleSendCommand()}
                disabled={isProcessing}
              />
              <Button 
                onClick={handleSendCommand}
                disabled={isProcessing || !command.trim()}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Resume Preview Panel */}
        {showPreview && resumeData && (
          <div className="w-1/2 border-l bg-white">
            <ResumePreview resumeData={resumeData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandInterface;
