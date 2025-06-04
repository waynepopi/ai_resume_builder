
// Import React hooks and UI components
import { useState, useRef } from 'react';

// Import UI components from shadcn/ui
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
// Import icons from Lucide React
import { 
  ArrowLeft, 
  ArrowRight,
  Download,
  FileText,
  User,
  GraduationCap,
  Briefcase,
  Award,
  Phone,
  Mail,
  MapPin,
  Star,
  Plus,
  Trash2
} from 'lucide-react';

// Import custom components and utilities
import ResumePreview from '@/components/ResumePreview';
import { toast } from 'sonner';

interface ResumeBuilderProps {
  onBack: () => void;
}

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  website: string;
}

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string[];
}

interface Education {
  id: string;
  degree: string;
  school: string;
  graduationYear: string;
  gpa: string;
  location: string;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  score: number;
}

/**
 * Main ResumeBuilder component
 * Handles the multi-step form for creating a resume
 */
const ResumeBuilder = ({ onBack }: ResumeBuilderProps) => {
  // Track the current step in the form
  const [currentStep, setCurrentStep] = useState(0);
  
  // State to store all resume data
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    score: 0
  });

  // Define the steps in the resume building process
  const steps = [
    { title: 'Personal Info', icon: User },
    { title: 'Summary', icon: FileText },
    { title: 'Experience', icon: Briefcase },
    { title: 'Education', icon: GraduationCap },
    { title: 'Skills', icon: Star },
    { title: 'Certifications', icon: Award }
  ];

  // Calculate the completion percentage
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: ['']
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      graduationYear: '',
      gpa: '',
      location: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, '']
    }));
  };

  const updateCertification = (index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => i === index ? value : cert)
    }));
  };

  const removeCertification = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  /**
   * Calculates a score for the resume based on completeness
   * @returns {number} A score from 0 to 100
   */
  const calculateScore = () => {
    let score = 0;
    
    // Personal info completeness (20 points)
    const personalFields = Object.values(resumeData.personalInfo).filter(val => val.trim() !== '');
    score += (personalFields.length / 6) * 20;
    
    // Summary (15 points)
    if (resumeData.summary.length > 50) score += 15;
    else if (resumeData.summary.length > 20) score += 10;
    
    // Experience (25 points)
    if (resumeData.experience.length > 0) {
      score += Math.min(resumeData.experience.length * 8, 25);
    }
    
    // Education (15 points)
    if (resumeData.education.length > 0) score += 15;
    
    // Skills (15 points)
    if (resumeData.skills.length >= 5) score += 15;
    else if (resumeData.skills.length >= 3) score += 10;
    
    // Certifications (10 points)
    if (resumeData.certifications.length > 0) score += 10;
    
    return Math.min(Math.round(score), 100);
  };

  const downloadPDF = () => {
    // Simulate PDF download
    toast.success('PDF download started! Your resume will be downloaded shortly.');
    console.log('Downloading PDF with data:', resumeData);
  };

  const downloadWord = () => {
    // Simulate Word download
    toast.success('Word document download started! Your resume will be downloaded shortly.');
    console.log('Downloading Word document with data:', resumeData);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Renders the appropriate form content based on the current step
   * @returns {JSX.Element} The form content for the current step
   */
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Let's start with your basic contact information</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <Input
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <Input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  placeholder="john.doe@email.com"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <Input
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <Input
                  value={resumeData.personalInfo.address}
                  onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                  placeholder="City, State"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                <Input
                  value={resumeData.personalInfo.linkedIn}
                  onChange={(e) => handlePersonalInfoChange('linkedIn', e.target.value)}
                  placeholder="linkedin.com/in/johndoe"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website/Portfolio</label>
                <Input
                  value={resumeData.personalInfo.website}
                  onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                  placeholder="www.johndoe.com"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      case 1: // Summary
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Summary</h2>
              <p className="text-gray-600">Write a compelling summary that highlights your key achievements and skills</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Summary (2-3 sentences recommended)
              </label>
              <Textarea
                value={resumeData.summary}
                onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Results-driven professional with 5+ years of experience in... Known for achieving... Passionate about..."
                className="min-h-32"
              />
              <p className="text-sm text-gray-500 mt-1">
                {resumeData.summary.length} characters
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 AI Tips for a Great Summary:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Start with your years of experience or key qualification</li>
                <li>• Include 2-3 specific achievements with numbers if possible</li>
                <li>• Mention your most relevant skills for the target role</li>
                <li>• Keep it between 50-150 words</li>
              </ul>
            </div>
          </div>
        );

      case 2: // Experience
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
              <p className="text-gray-600">Add your professional experience, starting with the most recent</p>
            </div>
            
            {resumeData.experience.map((exp, index) => (
              <Card key={exp.id} className="p-4">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <Input
                      value={exp.jobTitle}
                      onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Tech Company Inc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <Input
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      placeholder="MM/YYYY or 'Present'"
                      disabled={exp.current}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <Input
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">I currently work here</span>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description & Achievements
                  </label>
                  <Textarea
                    value={exp.description.join('\n')}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value.split('\n'))}
                    placeholder="• Developed and maintained web applications using React and Node.js&#10;• Improved system performance by 40% through code optimization&#10;• Led team of 3 developers on critical project delivery"
                    className="min-h-24"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use bullet points (•) to separate achievements. Include numbers and specific results.
                  </p>
                </div>
              </Card>
            ))}
            
            <Button onClick={addExperience} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Work Experience
            </Button>
          </div>
        );

      case 3: // Education
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
              <p className="text-gray-600">Add your educational background</p>
            </div>
            
            {resumeData.education.map((edu) => (
              <Card key={edu.id} className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree *</label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School/University *</label>
                    <Input
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      placeholder="University of Technology"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year *</label>
                    <Input
                      value={edu.graduationYear}
                      onChange={(e) => updateEducation(edu.id, 'graduationYear', e.target.value)}
                      placeholder="2021"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GPA (Optional)</label>
                    <Input
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="3.8/4.0"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <Input
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </Card>
            ))}
            
            <Button onClick={addEducation} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        );

      case 4: // Skills
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
              <p className="text-gray-600">List your technical and professional skills</p>
            </div>
            
            <div className="space-y-3">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    placeholder="JavaScript, React, Project Management, etc."
                    className="flex-1"
                  />
                  <Button
                    onClick={() => removeSkill(index)}
                    variant="outline"
                    size="sm"
                    className="px-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Button onClick={addSkill} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">💡 Skill Tips:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Include both technical and soft skills</li>
                <li>• List skills relevant to your target job</li>
                <li>• Be specific (e.g., "React.js" vs "Frontend Development")</li>
                <li>• Include proficiency levels if relevant</li>
              </ul>
            </div>
          </div>
        );

      case 5: // Certifications
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Certifications</h2>
              <p className="text-gray-600">Add any relevant certifications or licenses</p>
            </div>
            
            <div className="space-y-3">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={cert}
                    onChange={(e) => updateCertification(index, e.target.value)}
                    placeholder="AWS Certified Solutions Architect, PMP, Google Analytics, etc."
                    className="flex-1"
                  />
                  <Button
                    onClick={() => removeCertification(index)}
                    variant="outline"
                    size="sm"
                    className="px-3"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Button onClick={addCertification} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Certification
            </Button>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Ready to Finish!</h4>
              <p className="text-sm text-purple-800">
                You're almost done! Review your information and download your professional resume.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Calculate the current resume score based on form data
  const currentScore = calculateScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>Score: {currentScore}/100</span>
            </Badge>
            {currentScore >= 80 && (
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
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Form */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
              <Progress value={progressPercentage} className="mb-4" />
              
              {/* Step indicators */}
              <div className="flex justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center space-y-1 ${
                        index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index <= currentStep
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium">{step.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step Content */}
            <Card className="mb-6">
              <CardContent className="p-6">
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              {currentStep === steps.length - 1 ? (
                <div className="flex space-x-2">
                  <Button
                    onClick={downloadPDF}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={currentScore < 60}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    onClick={downloadWord}
                    variant="outline"
                    disabled={currentScore < 60}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Word
                  </Button>
                </div>
              ) : (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 border-l bg-white">
          <ResumePreview 
            resumeData={{
              name: resumeData.personalInfo.fullName,
              email: resumeData.personalInfo.email,
              phone: resumeData.personalInfo.phone,
              summary: resumeData.summary,
              experience: resumeData.experience.map(exp => ({
                title: exp.jobTitle,
                company: exp.company,
                duration: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
                description: exp.description.filter(desc => desc.trim() !== '')
              })),
              education: resumeData.education.map(edu => ({
                degree: edu.degree,
                school: edu.school,
                year: edu.graduationYear
              })),
              skills: resumeData.skills.filter(skill => skill.trim() !== ''),
              score: currentScore
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
