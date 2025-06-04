// Import React hooks and components
import { useState } from 'react';

// Import UI components from shadcn/ui
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Import icons from Lucide React
import { 
  FileText, 
  Sparkles, 
  Download, 
  Target, 
  Star,
  ChevronRight,
  Zap,
  Award,
  Users,
  Upload,
  Edit
} from 'lucide-react';

// Import custom components
import ResumeBuilder from '@/components/ResumeBuilder';
import CoverLetterBuilder from '@/components/CoverLetterBuilder';
import ResumeScorer from '@/components/ResumeScorer';
import FeatureCard from '@/components/FeatureCard';
import StatsSection from '@/components/StatsSection';
import Logo from '../components/Logo';

/**
 * Main Index component for the application
 * Manages the active section state to show different views
 */
const Index = () => {
  // State to track which section is currently active
  const [activeSection, setActiveSection] = useState<'home' | 'resume' | 'cover' | 'score'>('home');

  // Render different components based on active section
  if (activeSection === 'resume') {
    return <ResumeBuilder onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'cover') {
    return <CoverLetterBuilder onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'score') {
    return <ResumeScorer onBack={() => setActiveSection('home')} />;
  }
  
  // Default home view with all main sections

  return (
    // Main container with gradient background
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header section with navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Logo width={40} height={40} />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Resume Builder
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Login
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero section with main call-to-action */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered Professional Resume Suite
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
              Create Professional Career Documents with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Precision
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Complete resume builder, cover letter generator, and ATS score checker. 
              Our AI guides you through every step to create documents that land interviews.
            </p>
            
            {/* Main Action Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <Card 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-500"
                onClick={() => setActiveSection('resume')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Resume Builder</CardTitle>
                  <CardDescription>
                    AI-guided step-by-step resume creation with ATS optimization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Start Building
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-green-500"
                onClick={() => setActiveSection('cover')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Edit className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Cover Letter</CardTitle>
                  <CardDescription>
                    Generate compelling cover letters tailored to specific job roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    Create Letter
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-purple-500"
                onClick={() => setActiveSection('score')}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Score Checker</CardTitle>
                  <CardDescription>
                    Upload and analyze your resume with AI-powered scoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Check Score
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics section showing user metrics */}
      <StatsSection />

      {/* Features section highlighting app capabilities */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Everything You Need for Career Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade tools that help you create documents that pass ATS systems and impress hiring managers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="AI-Guided Creation"
              description="Step-by-step guidance through every section of your resume with intelligent suggestions."
              gradient="from-blue-500 to-indigo-500"
            />
            <FeatureCard
              icon={<Target className="w-8 h-8" />}
              title="ATS Optimization"
              description="Built-in ATS checker ensures your resume passes through applicant tracking systems."
              gradient="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Professional Templates"
              description="Multiple industry-specific templates designed by hiring experts."
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Multiple Formats"
              description="Download in PDF, Word, or plain text format for any application requirement."
              gradient="from-orange-500 to-red-500"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Real-time Scoring"
              description="Instant feedback and improvement suggestions as you build your resume."
              gradient="from-yellow-500 to-orange-500"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Industry Insights"
              description="Built with knowledge from hiring managers across Fortune 500 companies."
              gradient="from-teal-500 to-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Call-to-action section to encourage user engagement */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Ready to Build Your Professional Resume?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of professionals who've accelerated their careers with our AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => setActiveSection('resume')}
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Resume Builder
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                onClick={() => setActiveSection('score')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 transition-all duration-300"
              >
                Check Existing Resume
                <Upload className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with site links and copyright */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Logo width={36} height={36} />
                <span className="text-xl font-bold">AI Resume Builder</span>
              </div>
              <p className="text-gray-400">
                Professional resume builder powered by advanced AI technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setActiveSection('resume')} className="hover:text-white transition-colors">Resume Builder</button></li>
                <li><button onClick={() => setActiveSection('cover')} className="hover:text-white transition-colors">Cover Letter</button></li>
                <li><button onClick={() => setActiveSection('score')} className="hover:text-white transition-colors">Score Checker</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
