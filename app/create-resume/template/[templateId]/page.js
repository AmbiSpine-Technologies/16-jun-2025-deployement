// pages/premium-template-details/[templateId].js
"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft, FiStar, FiCheck, FiUsers, FiAward, FiLock, FiShare2, FiDownload } from "react-icons/fi";

// Premium Templates Detailed Data
const premiumTemplatesData = {
  professional: {
    id: 'professional',
    name: 'Professional Pro',
    tagline: 'Executive-level design for senior professionals',
    description: 'A sophisticated template designed for executives and senior managers with focus on leadership achievements and strategic impact.',
    price: "$9.99",
    originalPrice: "$19.99",
    discount: "50% OFF",
    features: [
      "Executive Layout Design",
      "Leadership Accomplishment Sections", 
      "Custom Branding Options",
      "ATS Optimized Format",
      "Premium Color Schemes",
      "Priority Customer Support"
    ],
    specifications: {
      experienceLevel: "Senior & Executive",
      layout: "Modern Executive",
      sections: "8+ Custom Sections",
      fileFormats: "PDF, DOCX, TXT",
      compatibility: "100% ATS Friendly"
    },
    mentorRecommendations: [
      {
        name: "Sarah Johnson",
        role: "Senior HR Manager at Google",
        avatar: "/mentors/sarah.jpg",
        comment: "This template consistently performs well in executive searches. The accomplishment-focused layout helps senior candidates stand out.",
        rating: 5
      },
      {
        name: "Mike Chen", 
        role: "Career Coach at Microsoft",
        avatar: "/mentors/mike.jpg",
        comment: "Perfect for VP and Director level roles. The strategic positioning of achievements is exactly what recruiters look for.",
        rating: 5
      }
    ],
    beforeAfter: {
      before: "Standard resumes often miss leadership impact",
      after: "This template highlights strategic contributions and ROI"
    },
    suitableFor: [
      "Vice Presidents", "Directors", "Senior Managers", "Department Heads",
      "Strategy Consultants", "Business Leaders", "C-Level Executives"
    ],
    images: {
      img: "/profestional.png",
      previews: ["/modern.png", "/profestional.png", "/modern.png"]
    },
    successStats: {
      interviews: "3.2x",
      responseRate: "68%",
      satisfaction: "4.9/5"
    }
  },
   executive: {
    id: 'executive',
    name: 'Executive',
    type: 'premium',
    category: "executive",
    experienceLevel: "senior",
    layout: "minimal",
    style: "executive",
    img: "/executive.png",
    description: "Minimalist design for C-level executives",
    rating: 4.9,
    popularity: 88,
    atsFriendly: true,
    recommendedFor: ["CEO", "VP", "Director", "Senior Leadership"],
    features: ["Minimal Design", "Leadership Focus", "Board Ready"],
    price: "$12.99",
    mentorRecommended: true,
    mentorNotes: "Ideal for board presentations and executive searches",
    benefits: [
      "Executive Formatting",
      "Leadership Sections",
      "Board Presentation Ready"
    ]
  },
  
};

export default function PremiumTemplateDetails() {
  const params = useParams();
  const router = useRouter();
  console.log(params);
  
  const [selectedImage, setSelectedImage] = useState(0);
  
  const templateId = params.templateId;
  const template = premiumTemplatesData[templateId];

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Template Not Found</h1>
          <button 
            onClick={() => router.back()}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleUseTemplate = () => {
    // Navigate to resume builder with this template
    router.push(`/create-resume/resume-building?template=${templateId}`);
  };

  const handleBuyNow = () => {
    // Handle purchase logic
    alert(`Purchasing ${template.name} for ${template.price}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              Back to Templates
            </button>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <FiShare2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <FiDownload className="w-4 h-4" />
                Sample
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Template Preview */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-purple-500/30">
              <img 
                src={template.images.img} 
                alt={template.name}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>

            {/* Thumbnail Previews */}
            <div className="flex gap-4 overflow-x-auto">
              {template.images.previews.map((preview, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-24 h-32 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-purple-500' : 'border-gray-600'
                  }`}
                >
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Specifications */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <FiAward className="text-purple-400" />
                Template Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Object.entries(template.specifications).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="text-white font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Template Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <FiStar className="text-yellow-400 w-6 h-6" />
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  PREMIUM TEMPLATE
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-2">{template.name}</h1>
              <p className="text-xl text-purple-200 mb-4">{template.tagline}</p>
              <p className="text-gray-300 leading-relaxed">{template.description}</p>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6">
              <div className="flex items-end gap-3 mb-4">
                <div className="text-3xl font-bold text-white">{template.price}</div>
                <div className="text-gray-300 line-through">{template.originalPrice}</div>
                <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                  {template.discount}
                </div>
              </div>
              <p className="text-purple-200 text-sm mb-4">One-time payment • Lifetime updates • 30-day guarantee</p>
              
              <div className="flex gap-3">
                <button
                  onClick={handleUseTemplate}
                  className="flex-1 bg-white text-purple-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                >
                  Use This Template
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors border border-white/20"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Premium Features</h3>
              <div className="grid gap-3">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <FiCheck className="text-green-400 w-5 h-5 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Success Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">{template.successStats.interviews}</div>
                <div className="text-gray-400 text-sm">More Interviews</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{template.successStats.responseRate}</div>
                <div className="text-gray-400 text-sm">Response Rate</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">{template.successStats.satisfaction}</div>
                <div className="text-gray-400 text-sm">User Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Recommendations Section */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <FiUsers className="text-blue-400 w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">Mentor Recommendations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {template.mentorRecommendations.map((mentor, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-blue-500/30">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={mentor.avatar} 
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{mentor.name}</h3>
                    <p className="text-blue-300 text-sm">{mentor.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i}
                          className={`w-4 h-4 ${
                            i < mentor.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">"{mentor.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Before/After Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4 text-lg">❌ Without This Template</h3>
            <p className="text-red-200">{template.beforeAfter.before}</p>
          </div>
          <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4 text-lg">✅ With This Template</h3>
            <p className="text-green-200">{template.beforeAfter.after}</p>
          </div>
        </div>

        {/* Suitable For Section */}
        <div className="mt-12">
          <h3 className="text-white font-bold text-xl mb-6">Perfect For These Roles:</h3>
          <div className="flex flex-wrap gap-3">
            {template.suitableFor.map((role, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-full text-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}