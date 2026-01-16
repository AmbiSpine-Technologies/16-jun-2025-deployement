"use client";
import React, { useState } from "react";
import {
  MdSchool,
  MdVerified,
  MdDescription,
  MdLocationOn,
  MdTrendingUp,
  MdPeople,
  MdDashboard,
  MdCheckCircle,
} from "react-icons/md";
import {
  FaUniversity,
  FaCalendarAlt,
  FaUserGraduate,
  FaBriefcase,
  FaChartLine,
  FaHandshake,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { IoRocketSharp } from "react-icons/io5";

// College Onboarding Modal Component
function CollegeOnboardingModal({ onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [collegeData, setCollegeData] = useState({
    collegeName: "",
    establishedYear: "",
    affiliation: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    aboutCollege: "",
    accreditation: "",
    totalStudents: "",
    coursesOffered: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollegeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const steps = [
    { number: 1, title: "Basic Information", icon: <FaUniversity /> },
    { number: 2, title: "Contact Details", icon: <MdLocationOn /> },
    { number: 3, title: "College Details", icon: <MdSchool /> },
    { number: 4, title: "Verification", icon: <MdVerified /> },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MdVerified className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Verification Required
                  </h4>
                  <p className="text-sm text-blue-700">
                    All college accounts undergo manual verification. Please
                    provide accurate information. Fake accounts will result in
                    permanent ban.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College Name *
                </label>
                <input
                  type="text"
                  name="collegeName"
                  value={collegeData.collegeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="e.g., Delhi University"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Established Year *
                </label>
                <input
                  type="text"
                  name="establishedYear"
                  value={collegeData.establishedYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="e.g., 1922"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Affiliation University *
                </label>
                <input
                  type="text"
                  name="affiliation"
                  value={collegeData.affiliation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="e.g., Affiliated to Delhi University"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={collegeData.contactPerson}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Placement Officer Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Official Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={collegeData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="placement@college.edu"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be official college email address
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={collegeData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+91 XXXXXXXXXX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={collegeData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://www.college.edu"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                College Description *
              </label>
              <textarea
                name="aboutCollege"
                value={collegeData.aboutCollege}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your college, courses, facilities, achievements..."
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accreditation
                </label>
                <input
                  type="text"
                  name="accreditation"
                  value={collegeData.accreditation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., NAAC A+ Grade"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Students
                </label>
                <input
                  type="number"
                  name="totalStudents"
                  value={collegeData.totalStudents}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Approximate number"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MdVerified className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">
                    Ready to Submit!
                  </h4>
                  <p className="text-sm text-green-700">
                    Your application will be reviewed within 24-48 hours. You'll
                    receive email updates.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-3">
                  Required Documents (Upload Later)
                </h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    College Registration Certificate
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Affiliation Proof from University
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Authorized Representative ID Proof
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    College Letterhead with Signature
                  </li>
                </ul>
              </div>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="p-1">
                  <span className="text-yellow-600 font-bold">⚠</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-900">
                    Important Notice
                  </p>
                  <p className="text-xs text-yellow-800 mt-1">
                    Providing false information will lead to immediate account
                    suspension and legal action as per Indian IT Act.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                College Onboarding
              </h2>
              <p className="text-gray-600 mt-1">Step {currentStep} of 4</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-between mt-6">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold mb-2 transition-all duration-300 ${
                    step.number === currentStep
                      ? "bg-purple-600 text-white shadow-lg scale-110"
                      : step.number < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.number < currentStep ? "✓" : step.icon}
                </div>
                <span
                  className={`text-sm font-medium ${
                    step.number === currentStep
                      ? "text-purple-600"
                      : "text-gray-600"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          {renderStepContent()}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() =>
                currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose()
              }
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
            >
              {currentStep === 1 ? "Cancel" : "Previous"}
            </button>
            <button
              onClick={() => {
                if (currentStep < 4) {
                  setCurrentStep(currentStep + 1);
                } else {
                  console.log("Submitting college data:", collegeData);
                  onComplete();
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span>
                {currentStep === 4 ? "Submit Application" : "Next Step"}
              </span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={currentStep === 4 ? "M5 13l4 4L19 7" : "M9 5l7 7-7 7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main College Onboarding Landing Page
export default function CollegeOnboardingPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const features = [
    {
      icon: <FaUserGraduate className="w-8 h-8" />,
      title: "Student Database Access",
      description: "Connect with talented students from your institution",
    },
    {
      icon: <FaBriefcase className="w-8 h-8" />,
      title: "Placement Management",
      description: "Streamline campus recruitment and placement drives",
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Track student engagement and placement statistics",
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: "Company Partnerships",
      description: "Build relationships with leading companies",
    },
    {
      icon: <MdDashboard className="w-8 h-8" />,
      title: "Custom College Page",
      description: "Showcase your institution with a dedicated profile",
    },
    {
      icon: <MdTrendingUp className="w-8 h-8" />,
      title: "Growth Tools",
      description: "Access tools to enhance student career prospects",
    },
  ];

  const plans = [
    {
      name: "Basic",
      type: "basic",
      price: "Free",
      duration: "Forever",
      description: "Perfect for getting started",
      features: [
        "College Profile Page",
        "Up to 500 Students",
        "Basic Analytics",
        "Email Support",
        "Community Access",
      ],
      color: "from-blue-500 to-cyan-500",
      popular: false,
    },
    {
      name: "Professional",
      type: "professional",
      price: "₹4,999",
      duration: "per month",
      description: "For growing institutions",
      features: [
        "Everything in Basic",
        "Unlimited Students",
        "Advanced Analytics",
        "Priority Support",
        "Company Database Access",
        "Placement Drive Tools",
        "Custom Branding",
      ],
      color: "from-purple-500 to-pink-500",
      popular: true,
    },
    {
      name: "Enterprise",
      type: "enterprise",
      price: "Custom",
      duration: "Contact us",
      description: "For large universities",
      features: [
        "Everything in Professional",
        "Dedicated Account Manager",
        "API Access",
        "Custom Integrations",
        "White-label Solution",
        "Advanced Security",
        "Training & Onboarding",
      ],
      color: "from-orange-500 to-red-500",
      popular: false,
    },
  ];

  const handlePlanSelect = (planType) => {
    setSelectedPlan(planType);
    setShowModal(true);
  };

  const handleModalComplete = () => {
    setShowModal(false);
    alert(
      "Application submitted successfully! We'll review it within 24-48 hours."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <HiSparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">
                Trusted by 500+ Colleges
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Empower Your Institution with
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Smart Placement Solutions
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Join India's fastest-growing college network. Connect students
              with opportunities, manage placements efficiently, and boost your
              institution's success rate.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handlePlanSelect("professional")}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center gap-2"
              >
                <IoRocketSharp className="w-5 h-5" />
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
                Watch Demo
              </button>
            </div>

            <div className="flex justify-center gap-8 mt-12 text-sm">
              <div className="flex items-center gap-2">
                <MdCheckCircle className="w-5 h-5 text-green-300" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <MdCheckCircle className="w-5 h-5 text-green-300" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <MdCheckCircle className="w-5 h-5 text-green-300" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything Your College Needs
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features designed specifically for educational institutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600">
            Select the perfect plan for your institution's needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-xl border-2 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "border-purple-500 shadow-2xl"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-xl mb-6`}
              ></div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-600 ml-2">/ {plan.duration}</span>
              </div>

              <button
                onClick={() => handlePlanSelect(plan.type)}
                className={`w-full py-4 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                Get Started
              </button>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <MdCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Campus Placements?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of colleges already using our platform
          </p>
          <button
            onClick={() => handlePlanSelect("professional")}
            className="px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 inline-flex items-center gap-3"
          >
            <IoRocketSharp className="w-6 h-6" />
            Start Your Free Trial Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <CollegeOnboardingModal
          onClose={() => setShowModal(false)}
          onComplete={handleModalComplete}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
