
import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, Star, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      value: "50K+",
      label: "Professionals Helped",
      description: "Career success stories"
    },
    {
      icon: <FileText className="w-6 h-6 text-green-600" />,
      value: "100K+",
      label: "Resumes Created",
      description: "ATS-optimized documents"
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      value: "95%",
      label: "Success Rate",
      description: "Interview callbacks"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      value: "3x",
      label: "Faster Hiring",
      description: "Compared to manual resumes"
    }
  ];

  return (
    <section className="py-16 bg-white/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
