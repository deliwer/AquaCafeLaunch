import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HandHeart, Users, TrendingUp, Award, DollarSign, Target, Briefcase, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Partnership() {
  const [activeTab, setActiveTab] = useState("affiliate");
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "",
    experience: "",
    motivation: ""
  });

  const { toast } = useToast();

  const applicationMutation = useMutation({
    mutationFn: async (data: typeof applicationForm) => {
      const response = await apiRequest("POST", "/api/affiliates", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted Successfully",
        description: "We'll review your application and contact you within 48 hours with next steps.",
      });
      setApplicationForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        type: "",
        experience: "",
        motivation: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Application Failed",
        description: error.message || "Please try again or contact our support team.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationForm.name || !applicationForm.email || !applicationForm.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    applicationMutation.mutate({ ...applicationForm, type: activeTab });
  };

  const partnershipTypes = {
    affiliate: {
      title: "Affiliate Agent Program",
      subtitle: "Build your network and earn commissions",
      icon: <Briefcase className="h-8 w-8" />,
      color: "emerald",
      benefits: [
        "30% commission on every iPhone trade-in",
        "Access to exclusive AquaCafe pricing",
        "Marketing support & training materials",
        "AI marketing automation tools",
        "Build your own community network",
        "Monthly performance bonuses",
        "Professional certification program"
      ],
      earning: "AED 2,970+ monthly potential",
      requirements: [
        "Strong communication skills",
        "Basic understanding of environmental issues",
        "Social media presence or network",
        "Commitment to 10+ hours per week"
      ]
    },
    restaurant: {
      title: "Restaurant Partnership",
      subtitle: "Join our lunch credit ecosystem",
      icon: <Store className="h-8 w-8" />,
      color: "blue",
      benefits: [
        "Access to loyal AquaCafe customer base",
        "Monthly guaranteed credit redemptions",
        "Digital marketing promotion",
        "Exclusive restaurant network status",
        "Customer acquisition program",
        "Performance-based incentives",
        "Brand co-marketing opportunities"
      ],
      earning: "AED 5,000+ monthly revenue",
      requirements: [
        "Licensed restaurant in Dubai",
        "Healthy/sustainable food focus",
        "Capacity for 50+ monthly customers",
        "Digital payment capabilities"
      ]
    },
    corporate: {
      title: "Corporate Partnership",
      subtitle: "Enterprise environmental solutions",
      icon: <Users className="h-8 w-8" />,
      color: "purple",
      benefits: [
        "Bulk water filtration solutions",
        "Employee wellness programs",
        "Corporate sustainability reporting",
        "Custom implementation support",
        "Executive dashboard analytics",
        "Team building environmental challenges",
        "CSR impact documentation"
      ],
      earning: "AED 15,000+ project value",
      requirements: [
        "50+ employees organization",
        "Sustainability focus or initiative",
        "Decision-making authority",
        "Long-term partnership interest"
      ]
    }
  };

  const currentPartnership = partnershipTypes[activeTab as keyof typeof partnershipTypes];

  const successStories = [
    {
      name: "Sarah Al-Mahmoud",
      type: "Affiliate Agent",
      achievement: "Earned AED 4,200 in first month",
      quote: "The support and training made it easy to start earning while helping Dubai families access clean water."
    },
    {
      name: "Green Garden Cafe",
      type: "Restaurant Partner",
      achievement: "300+ new customers via credit program",
      quote: "The lunch credit program brought us environmentally conscious customers who love our healthy menu."
    },
    {
      name: "TechCorp Dubai",
      type: "Corporate Partner",
      achievement: "Achieved 40% plastic reduction goal",
      quote: "Our employees love the clean water, and we've significantly reduced our environmental footprint."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 text-lg">
                <HandHeart className="h-4 w-4 mr-2" />
                Partnership Programs
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Partner with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Planet Heroes</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join Dubai's leading environmental initiative and build a sustainable business 
                while making a positive impact on our planet.
              </p>
            </div>

            {/* Partnership Type Selection */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-800 p-1 rounded-lg">
                {Object.entries(partnershipTypes).map(([key, type]) => (
                  <Button
                    key={key}
                    variant={activeTab === key ? "default" : "ghost"}
                    onClick={() => setActiveTab(key)}
                    className={`px-6 py-3 ${activeTab === key ? 'bg-emerald-600 text-white' : 'text-gray-300'}`}
                  >
                    {type.icon}
                    <span className="ml-2 hidden sm:inline">{type.title}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Partnership Details */}
              <Card className={`bg-gradient-to-br from-${currentPartnership.color}-900/20 to-slate-900/50 border-${currentPartnership.color}-500/50`}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r from-${currentPartnership.color}-600 to-${currentPartnership.color}-700 rounded-full flex items-center justify-center text-white`}>
                      {currentPartnership.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-white">{currentPartnership.title}</CardTitle>
                      <p className="text-gray-400">{currentPartnership.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Earning Potential */}
                  <Card className={`bg-gradient-to-r from-${currentPartnership.color}-900/30 to-${currentPartnership.color}-800/30 border-${currentPartnership.color}-500/30`}>
                    <CardContent className="p-4 text-center">
                      <DollarSign className={`h-8 w-8 text-${currentPartnership.color}-400 mx-auto mb-2`} />
                      <div className={`text-2xl font-bold text-${currentPartnership.color}-400 mb-1`}>
                        {currentPartnership.earning}
                      </div>
                      <div className="text-sm text-gray-400">Earning potential</div>
                    </CardContent>
                  </Card>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-emerald-400" />
                      Partnership Benefits
                    </h3>
                    <ul className="space-y-2">
                      {currentPartnership.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-400" />
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {currentPartnership.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-gray-300">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Application Form */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Apply for Partnership</CardTitle>
                  <p className="text-gray-400">Join thousands of successful partners across Dubai</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                        <Input
                          id="name"
                          value={applicationForm.name}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, name: e.target.value }))}
                          className="bg-slate-700 border-slate-600"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={applicationForm.email}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                          className="bg-slate-700 border-slate-600"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                        <Input
                          id="phone"
                          value={applicationForm.phone}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-gray-300">Company/Restaurant Name</Label>
                        <Input
                          id="company"
                          value={applicationForm.company}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, company: e.target.value }))}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="experience" className="text-gray-300">Relevant Experience</Label>
                      <Select 
                        value={applicationForm.experience} 
                        onValueChange={(value) => setApplicationForm(prev => ({ ...prev, experience: value }))}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No experience</SelectItem>
                          <SelectItem value="basic">Basic (1-2 years)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                          <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="motivation" className="text-gray-300">Why do you want to partner with us?</Label>
                      <Textarea
                        id="motivation"
                        value={applicationForm.motivation}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, motivation: e.target.value }))}
                        className="bg-slate-700 border-slate-600"
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={applicationMutation.isPending}
                      className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 py-3 text-lg font-semibold"
                    >
                      {applicationMutation.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Success Stories */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-white">Partner Success Stories</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {successStories.map((story, index) => (
                  <Card key={index} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {story.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{story.name}</h3>
                          <p className="text-sm text-gray-400">{story.type}</p>
                        </div>
                      </div>
                      <div className="text-emerald-400 font-semibold mb-3">{story.achievement}</div>
                      <p className="text-gray-300 italic">"{story.quote}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-500/50 text-center">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-emerald-400">Ready to Start Your Partnership Journey?</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Join a movement that's transforming Dubai's environmental landscape while building a profitable business.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 px-8 py-3 text-lg font-semibold">
                    Schedule Consultation
                  </Button>
                  <Button variant="outline" className="px-8 py-3 border-emerald-500/50 hover:border-emerald-500 text-emerald-400">
                    Download Partnership Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}