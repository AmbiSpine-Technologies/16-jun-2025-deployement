"use client";
import React, { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  FileText,
  Target,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";

export default function ExplorePage() {
  const [activeRole, setActiveRole] = useState("student");

  const roles = [
    { id: "student", label: "Students", icon: GraduationCap },
    { id: "jobseeker", label: "Job Seekers", icon: Briefcase },
    { id: "recruiter", label: "Recruiters", icon: Users },
    { id: "college", label: "Colleges", icon: Award },
  ];

  const features = {
    student: [
      {
        icon: GraduationCap,
        title: "Skill-Based Courses",
        desc: "Learn industry-relevant skills through curated courses",
      },
      {
        icon: FileText,
        title: "Professional Resume Builder",
        desc: "Create ATS-friendly resumes in minutes",
      },
      {
        icon: Target,
        title: "Assessment Tests",
        desc: "Prove your skills with practical assessments",
      },
      {
        icon: TrendingUp,
        title: "Career Growth",
        desc: "Get matched with jobs based on your skills",
      },
    ],
    jobseeker: [
      {
        icon: Target,
        title: "Skill-Based Matching",
        desc: "Jobs matched to your actual skills, not just keywords",
      },
      {
        icon: CheckCircle,
        title: "Assessment Verification",
        desc: "Take tests to prove your capabilities to recruiters",
      },
      {
        icon: FileText,
        title: "Resume Creation",
        desc: "Build professional resumes that stand out",
      },
      {
        icon: Briefcase,
        title: "Quality Opportunities",
        desc: "Access pre-filtered job openings from top companies",
      },
    ],
    recruiter: [
      {
        icon: Users,
        title: "Filtered Candidates",
        desc: "Receive only assessment-verified candidates",
      },
      {
        icon: CheckCircle,
        title: "Skill Validation",
        desc: "Candidates pre-tested for required skills",
      },
      {
        icon: Target,
        title: "Smart Matching",
        desc: "AI matches candidates to your exact criteria",
      },
      {
        icon: TrendingUp,
        title: "Quality Hiring",
        desc: "Reduce hiring time with pre-screened talent",
      },
    ],
    college: [
      {
        icon: Award,
        title: "Student Placement",
        desc: "Help students get skilled and placed",
      },
      {
        icon: GraduationCap,
        title: "Skill Development",
        desc: "Access to industry-relevant courses for students",
      },
      {
        icon: Users,
        title: "Recruiter Connect",
        desc: "Connect your students with top recruiters",
      },
      {
        icon: TrendingUp,
        title: "Placement Analytics",
        desc: "Track and improve placement success rates",
      },
    ],
  };

  const howItWorks = [
    {
      step: 1,
      title: "Sign Up",
      desc: "Choose your role and create your profile",
    },
    {
      step: 2,
      title: "Build Skills",
      desc: "Take courses and create professional resume",
    },
    {
      step: 3,
      title: "Apply & Assess",
      desc: "Apply to jobs and complete skill assessments",
    },
    {
      step: 4,
      title: "Get Hired",
      desc: "Recruiters see verified skills and connect with you",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Partner Companies" },
    { number: "95%", label: "Success Rate" },
    { number: "2K+", label: "Courses Available" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Developer",
      company: "TCS",
      text: "Got placed in just 2 weeks! The assessment system helped me prove my skills directly to recruiters.",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "HR Manager",
      company: "Infosys",
      text: "We reduced our hiring time by 60%. Only quality, pre-screened candidates reach us now.",
      rating: 5,
    },
    {
      name: "Dr. Anjali Gupta",
      role: "Placement Head",
      company: "MIT College",
      text: "Our placement percentage increased from 65% to 92% in one year. Amazing platform!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Skill-Based Job Matching Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Skills, Your Career,
            <br />
            <span className="text-blue-600">Your Success</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect talent with opportunity through skill-based matching,
            assessments, and professional development
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold border-2 border-gray-300 hover:border-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Role-Based Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built For Everyone
            </h2>
            <p className="text-xl text-gray-600">
              Choose your role to see how we help you succeed
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                    activeRole === role.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {role.label}
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features[activeRole].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">Real people, real results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to your dream career
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-xl text-blue-100">
              Skill-first approach to hiring and career development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl">
              <Target className="w-12 h-12 mb-4" />
              <h3 className="text-2xl text-gray-800 font-semibold mb-3">
                Skill-Based Matching
              </h3>
              <p className="text-gray-800">
                We match candidates and jobs based on actual skills, not just
                keywords. Every applicant proves their abilities through
                assessments.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl">
              <CheckCircle className="w-12 h-12 mb-4" />
              <h3 className="text-2xl text-gray-800 font-semibold mb-3">
                Assessment Verification
              </h3>
              <p className="text-gray-800">
                Candidates complete skill tests before reaching recruiters. Only
                qualified, verified candidates get shortlisted.
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-xl">
              <TrendingUp className="w-12 h-12 mb-4" />
              <h3 className="text-2xl text-gray-800 font-semibold mb-3">
                Complete Ecosystem
              </h3>
              <p className=" text-gray-800">
                From learning skills to creating resumes to getting hired -
                everything you need in one platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students, job seekers, and recruiters who trust us
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-lg flex items-center gap-2">
              Sign Up Now <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition text-lg">
              View Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ===========================================
// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Briefcase,
//   GraduationCap,
//   FileText,
//   Target,
//   Users,
//   Award,
//   TrendingUp,
//   CheckCircle,
//   ArrowRight,
//   Sparkles,
//   Shield,
//   Zap,
//   Clock,
//   Star,
//   BookOpen,
//   Search,
//   Filter,
//   BarChart,
// } from "lucide-react";

// export default function ExplorePage() {
//   const [activeRole, setActiveRole] = useState("student");
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const roles = [
//     {
//       id: "student",
//       label: "Students",
//       icon: GraduationCap,
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       id: "jobseeker",
//       label: "Job Seekers",
//       icon: Briefcase,
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       id: "recruiter",
//       label: "Recruiters",
//       icon: Users,
//       color: "from-orange-500 to-red-500",
//     },
//     {
//       id: "college",
//       label: "Colleges",
//       icon: Award,
//       color: "from-green-500 to-emerald-500",
//     },
//   ];

//   const features = {
//     student: [
//       {
//         icon: BookOpen,
//         title: "Industry-Ready Courses",
//         desc: "Learn from 2000+ courses designed by industry experts to make you job-ready",
//         highlight: "2000+ Courses",
//       },
//       {
//         icon: FileText,
//         title: "AI Resume Builder",
//         desc: "Create ATS-optimized resumes in minutes with our intelligent builder",
//         highlight: "ATS Optimized",
//       },
//       {
//         icon: Target,
//         title: "Skill Assessments",
//         desc: "Validate your skills with practical tests and get certified",
//         highlight: "Get Certified",
//       },
//       {
//         icon: TrendingUp,
//         title: "Career Roadmap",
//         desc: "Get personalized learning paths based on your dream job",
//         highlight: "Personalized",
//       },
//     ],
//     jobseeker: [
//       {
//         icon: Target,
//         title: "Smart Job Matching",
//         desc: "AI matches you with jobs that fit your skills perfectly, not just keywords",
//         highlight: "AI Powered",
//       },
//       {
//         icon: CheckCircle,
//         title: "Pre-Screening Advantage",
//         desc: "Stand out with verified skills through our assessment system",
//         highlight: "Verified Skills",
//       },
//       {
//         icon: Search,
//         title: "Advanced Job Search",
//         desc: "Filter jobs by skills, location, salary, and company culture",
//         highlight: "Smart Filters",
//       },
//       {
//         icon: Zap,
//         title: "Instant Apply",
//         desc: "Apply to multiple jobs with one click using your profile",
//         highlight: "One Click",
//       },
//     ],
//     recruiter: [
//       {
//         icon: Filter,
//         title: "Pre-Filtered Talent",
//         desc: "Only receive candidates who passed skill assessments matching your criteria",
//         highlight: "Quality Guaranteed",
//       },
//       {
//         icon: Shield,
//         title: "Skill Verification",
//         desc: "Every candidate comes with verified assessment scores and skill proof",
//         highlight: "Verified",
//       },
//       {
//         icon: BarChart,
//         title: "Analytics Dashboard",
//         desc: "Track hiring metrics, candidate pipeline, and team performance",
//         highlight: "Data-Driven",
//       },
//       {
//         icon: Clock,
//         title: "Save 70% Time",
//         desc: "Reduce hiring time with pre-screened, assessment-verified candidates",
//         highlight: "70% Faster",
//       },
//     ],
//     college: [
//       {
//         icon: Award,
//         title: "Placement Success",
//         desc: "Increase placement rates with skill-verified students and direct recruiter connections",
//         highlight: "95% Success",
//       },
//       {
//         icon: GraduationCap,
//         title: "Skill Programs",
//         desc: "Access industry-aligned courses to upskill your entire student base",
//         highlight: "Industry Aligned",
//       },
//       {
//         icon: Users,
//         title: "Recruiter Network",
//         desc: "Connect with 500+ hiring partners actively looking for skilled graduates",
//         highlight: "500+ Partners",
//       },
//       {
//         icon: BarChart,
//         title: "Placement Analytics",
//         desc: "Track student progress, placement trends, and skill gaps in real-time",
//         highlight: "Real-time Insights",
//       },
//     ],
//   };

//   const howItWorks = [
//     {
//       step: 1,
//       title: "Create Profile",
//       desc: "Sign up in 2 minutes and tell us about your skills and goals",
//       icon: Users,
//       color: "bg-blue-500",
//     },
//     {
//       step: 2,
//       title: "Build Skills",
//       desc: "Take courses, create professional resume, and build your portfolio",
//       icon: GraduationCap,
//       color: "bg-purple-500",
//     },
//     {
//       step: 3,
//       title: "Apply & Prove",
//       desc: "Apply to jobs and complete skill assessments to verify your abilities",
//       icon: Target,
//       color: "bg-orange-500",
//     },
//     {
//       step: 4,
//       title: "Get Hired",
//       desc: "Recruiters see your verified profile and reach out with opportunities",
//       icon: Briefcase,
//       color: "bg-green-500",
//     },
//   ];

//   const stats = [
//     { number: "15,000+", label: "Active Users", icon: Users },
//     { number: "500+", label: "Hiring Partners", icon: Briefcase },
//     { number: "95%", label: "Success Rate", icon: TrendingUp },
//     { number: "2,000+", label: "Courses", icon: BookOpen },
//   ];

//   const testimonials = [
//     {
//       name: "Priya Sharma",
//       role: "Software Developer",
//       company: "TCS",
//       text: "Got placed in just 2 weeks! The assessment system helped me prove my skills directly to recruiters.",
//       rating: 5,
//     },
//     {
//       name: "Rahul Verma",
//       role: "HR Manager",
//       company: "Infosys",
//       text: "We reduced our hiring time by 60%. Only quality, pre-screened candidates reach us now.",
//       rating: 5,
//     },
//     {
//       name: "Dr. Anjali Gupta",
//       role: "Placement Head",
//       company: "MIT College",
//       text: "Our placement percentage increased from 65% to 92% in one year. Amazing platform!",
//       rating: 5,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Enhanced Hero Section with Animation */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-24 px-4">
//         <div className="absolute inset-0 opacity-30">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
//           <div
//             className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
//             style={{ animationDelay: "1s" }}
//           ></div>
//           <div
//             className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
//             style={{ animationDelay: "2s" }}
//           ></div>
//         </div>

//         <div className="max-w-6xl mx-auto text-center relative z-10">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
//             <Sparkles className="w-4 h-4" />
//             India's First Skill-Based Job Matching Platform
//           </div>
//           <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
//             Skills Matter More
//             <br />
//             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Than Just Degrees
//             </span>
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
//             Join 15,000+ students and job seekers who landed their dream jobs
//             through skill verification and smart matching
//           </p>
//           <div className="flex gap-4 justify-center flex-wrap mb-12">
//             <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 text-lg">
//               Start Free Today <ArrowRight className="w-6 h-6" />
//             </button>
//             <button className="bg-white text-gray-700 px-10 py-5 rounded-xl font-bold border-2 border-gray-300 hover:border-purple-600 hover:shadow-xl transition-all text-lg">
//               Watch Demo
//             </button>
//           </div>

//           {/* Floating badges */}
//           <div className="flex gap-6 justify-center flex-wrap text-sm">
//             <div className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />
//               <span className="font-semibold">100% Free to Start</span>
//             </div>
//             <div className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
//               <Shield className="w-5 h-5 text-blue-500" />
//               <span className="font-semibold">Verified Jobs Only</span>
//             </div>
//             <div className="bg-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2">
//               <Zap className="w-5 h-5 text-orange-500" />
//               <span className="font-semibold">Get Hired in 2 Weeks</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Stats Section */}
//       <section className="py-16 px-4 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, idx) => {
//               const Icon = stat.icon;
//               return (
//                 <div
//                   key={idx}
//                   className="text-center group hover:scale-110 transition-transform duration-300"
//                 >
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow">
//                     <Icon className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
//                     {stat.number}
//                   </div>
//                   <div className="text-gray-600 font-medium">{stat.label}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Role-Based Features */}
//       <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
//               Built For Your Success
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Whether you're learning, looking, hiring, or teaching - we've got
//               you covered
//             </p>
//           </div>

//           {/* Enhanced Role Tabs */}
//           <div className="flex flex-wrap justify-center gap-4 mb-16">
//             {roles.map((role) => {
//               const Icon = role.icon;
//               return (
//                 <button
//                   key={role.id}
//                   onClick={() => setActiveRole(role.id)}
//                   className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all ${
//                     activeRole === role.id
//                       ? `bg-gradient-to-r ${role.color} text-white shadow-2xl scale-110`
//                       : "bg-white text-gray-700 hover:shadow-lg hover:scale-105"
//                   }`}
//                 >
//                   <Icon className="w-6 h-6" />
//                   {role.label}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Enhanced Features Grid */}
//           <div className="grid md:grid-cols-2 gap-8">
//             {features[activeRole].map((feature, idx) => {
//               const Icon = feature.icon;
//               return (
//                 <div
//                   key={idx}
//                   className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
//                 >
//                   <div className="flex items-start gap-4 mb-4">
//                     <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
//                       <Icon className="w-7 h-7 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="text-xl font-bold text-gray-900">
//                           {feature.title}
//                         </h3>
//                         <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
//                           {feature.highlight}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 leading-relaxed">
//                         {feature.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced How It Works */}
//       <section className="py-24 px-4 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
//               Your Journey to Success
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               4 simple steps to transform your career
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-8 relative">
//             {howItWorks.map((item, idx) => {
//               const Icon = item.icon;
//               return (
//                 <div key={idx} className="text-center relative group">
//                   <div
//                     className={`w-20 h-20 ${item.color} text-white rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300`}
//                   >
//                     <Icon className="w-10 h-10" />
//                   </div>
//                   <div className="bg-white p-6 rounded-xl shadow-md group-hover:shadow-xl transition-all">
//                     <div className="text-sm font-bold text-gray-500 mb-2">
//                       STEP {item.step}
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-600 leading-relaxed">{item.desc}</p>
//                   </div>
//                   {idx < howItWorks.length - 1 && (
//                     <div className="hidden md:block absolute top-10 left-1/2 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30" />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
//               Success Stories
//             </h2>
//             <p className="text-xl text-gray-600">Real people, real results</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
//               >
//                 <div className="flex gap-1 mb-4">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-5 h-5 fill-yellow-400 text-yellow-400"
//                     />
//                   ))}
//                 </div>
//                 <p className="text-gray-700 mb-6 italic leading-relaxed">
//                   "{testimonial.text}"
//                 </p>
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
//                     {testimonial.name[0]}
//                   </div>
//                   <div>
//                     <div className="font-bold text-gray-900">
//                       {testimonial.name}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {testimonial.role} at {testimonial.company}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Key Differentiators */}
//       <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
//         </div>

//         <div className="max-w-6xl mx-auto relative z-10">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
//               Why We're Different
//             </h2>
//             <p className="text-xl text-blue-100 max-w-2xl mx-auto">
//               Not just another job portal - a complete career transformation
//               platform
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white bg-opacity-20 backdrop-blur-xl p-8 rounded-2xl hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30">
//               <Target className="w-14 h-14 mb-6" />
//               <h3 className="text-2xl font-bold mb-4">Skills Over Resumes</h3>
//               <p className="text-blue-100 leading-relaxed">
//                 We match based on what you can actually do, not what you claim.
//                 Every candidate proves their skills through practical
//                 assessments before reaching recruiters.
//               </p>
//             </div>

//             <div className="bg-white bg-opacity-20 backdrop-blur-xl p-8 rounded-2xl hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30">
//               <CheckCircle className="w-14 h-14 mb-6" />
//               <h3 className="text-2xl font-bold mb-4">Quality Guaranteed</h3>
//               <p className="text-blue-100 leading-relaxed">
//                 Only assessment-verified candidates reach recruiters. No spam
//                 applications, no time wasted. Both sides get quality matches
//                 guaranteed.
//               </p>
//             </div>

//             <div className="bg-white bg-opacity-20 backdrop-blur-xl p-8 rounded-2xl hover:bg-opacity-30 transition-all duration-300 border border-white border-opacity-30">
//               <Zap className="w-14 h-14 mb-6" />
//               <h3 className="text-2xl font-bold mb-4">Complete Ecosystem</h3>
//               <p className="text-blue-100 leading-relaxed">
//                 Learn skills, build resume, take assessments, apply to jobs -
//                 everything in one place. No need to juggle multiple platforms.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced CTA Section */}
//       <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="bg-white p-12 rounded-3xl shadow-2xl">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
//               Ready to Transform Your Career?
//             </h2>
//             <p className="text-xl text-gray-600 mb-10 leading-relaxed">
//               Join 15,000+ successful students, job seekers, and recruiters.
//               Start your journey today - completely free!
//             </p>
//             <div className="flex gap-4 justify-center flex-wrap mb-8">
//               <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all text-lg flex items-center gap-2">
//                 Get Started Free <ArrowRight className="w-6 h-6" />
//               </button>
//               <button className="bg-gray-100 text-gray-700 px-12 py-5 rounded-xl font-bold hover:bg-gray-200 hover:shadow-xl transition-all text-lg">
//                 Talk to Expert
//               </button>
//             </div>
//             <p className="text-sm text-gray-500">
//               No credit card required • Setup in 2 minutes • Cancel anytime
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Footer */}
//       <footer className="bg-gray-900 text-white py-16 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="flex flex-col items-center mb-8">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
//                 <Briefcase className="w-7 h-7" />
//               </div>
//               <span className="text-3xl font-extrabold">SkillMatch</span>
//             </div>
//             <p className="text-gray-400 text-center max-w-md">
//               Empowering careers through skill verification and smart matching
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <h4 className="font-bold mb-3">For Students</h4>
//               <div className="space-y-2 text-gray-400 text-sm">
//                 <p>Courses</p>
//                 <p>Resume Builder</p>
//                 <p>Job Search</p>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-bold mb-3">For Recruiters</h4>
//               <div className="space-y-2 text-gray-400 text-sm">
//                 <p>Post Jobs</p>
//                 <p>Find Talent</p>
//                 <p>Analytics</p>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-bold mb-3">Company</h4>
//               <div className="space-y-2 text-gray-400 text-sm">
//                 <p>About Us</p>
//                 <p>Contact</p>
//                 <p>Careers</p>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-bold mb-3">Legal</h4>
//               <div className="space-y-2 text-gray-400 text-sm">
//                 <p>Privacy Policy</p>
//                 <p>Terms of Service</p>
//                 <p>Cookie Policy</p>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
//             <p>© 2024 SkillMatch. All rights reserved. Made with ❤️ in India</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
