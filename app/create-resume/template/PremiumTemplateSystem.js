import React, { useState } from "react";
import {
  Crown,
  Check,
  X,
  Lock,
  Star,
  Calendar,
  Video,
  Clock,
  Award,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Shield,
  User,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// Subscription Plans
const SUBSCRIPTION_PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: 399,
    duration: "month",
    popular: false,
    mentorSessions: 1 // or 999 for unlimited

  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: 1099,
    duration: "3 months",
    popular: false,
    mentorSessions: 2 // or 999 for unlimited

  },
  {
    id: "half-yearly",
    name: "Half-Yearly",
    price: 1999,
    duration: "6 months",
    popular: true,
    badge: "Best Value",
    mentorSessions: 3 // or 999 for unlimited

  },
  {
    id: "annual",
    name: "Annual",
    price: 3599,
    duration: "year",
    popular: false,
    mentorSessions: 4 // or 999 for unlimited

  },
];

const FEATURES = [
  "Access to all premium templates",
  "Free mentor consultation session",
  "Priority support",
  "AI will suggest you jobs that matches your profile",
  "Download resume without watermark",
  "ATS score analysis according to companies",
];

// Mentors Data
const MENTORS = [
  {
    id: "mentor-1",
    name: "Rajesh Kumar",
    title: "Senior Career Mentor",
    expertise: ["Resume Review", "Career Guidance", "Interview Prep"],
    experience: "12+ Years",
    sessions: "800+",
    rating: 4.9,
    avatar: "👨‍💼",
    specialization: "Tech & Business",
    bio: "Former FAANG recruiter with expertise in tech and business careers",
  },
  {
    id: "mentor-2",
    name: "Priya Sharma",
    title: "Creative Career Coach",
    expertise: ["Portfolio Review", "Personal Branding", "Design Careers"],
    experience: "10+ Years",
    sessions: "650+",
    rating: 4.8,
    avatar: "👩‍💼",
    specialization: "Creative & Design",
    bio: "Specialized in helping designers and creative professionals land dream jobs",
  },
  {
    id: "mentor-3",
    name: "Amit Patel",
    title: "Executive Leadership Coach",
    expertise: ["Leadership Development", "C-Level Transitions", "Strategy"],
    experience: "15+ Years",
    sessions: "1000+",
    rating: 5.0,
    avatar: "👨‍💻",
    specialization: "Executive & Leadership",
    bio: "Helping senior professionals transition to executive roles",
  },
  {
    id: "mentor-4",
    name: "Sneha Reddy",
    title: "HR & Talent Specialist",
    expertise: ["ATS Optimization", "HR Insights", "Job Search Strategy"],
    experience: "8+ Years",
    sessions: "500+",
    rating: 4.9,
    avatar: "👩‍💻",
    specialization: "HR & Recruitment",
    bio: "Former HR Director sharing insider tips for job applications",
  },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

function TemplateDescriptionView({ template, onSubscribe, onClose }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Preview Card */}
      <div className="relative rounded-2xl overflow-hidden border border-gray-700 bg-gray-900/70">
        {/* Premium Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1.5 bg-amber-500/90 text-black text-xs font-semibold rounded-full flex items-center gap-1">
            <Crown className="w-4 h-4" />
            Premium
          </span>
        </div>

        <div className="p-14 text-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-gray-300 font-medium">
            {template.name} Preview
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Locked premium template
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-4 text-center">
          <Star className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <div className="text-lg font-semibold text-white">
            {template.rating}
          </div>
          <div className="text-xs text-gray-400">Rating</div>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-4 text-center">
          <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
          <div className="text-lg font-semibold text-white">15K+</div>
          <div className="text-xs text-gray-400">Users</div>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-4 text-center">
          <Award className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <div className="text-lg font-semibold text-white">Verified</div>
          <div className="text-xs text-gray-400">Mentor</div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-2xl border border-gray-700 bg-gray-900/60 p-6">
        <h3 className="text-white font-semibold mb-2">
          About this template
        </h3>
        <p className="text-sm text-gray-300 leading-relaxed">
          {template.description}
        </p>
      </div>

      {/* Premium Features */}
      <div>
        <h3 className="text-white font-semibold mb-3">
          What you’ll get with Premium
        </h3>

        <div className="grid gap-3">
          {[
            "Mentor-approved design",
            "ATS-optimized formatting",
            "Executive-level presentation",
            "Premium typography",
            "Multi-page support",
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-900/60 p-4"
            >
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-200">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-2">
        <button
          onClick={onSubscribe}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
        >
          <Lock className="w-5 h-5" />
          Unlock Premium
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-xs text-gray-500 mt-3">
          Premium required to download without watermark
        </p>
      </div>
    </div>
  );
}


// Subscription Plans View
function SubscriptionPlansView({ onSelectPlan, onBack }) {
  const [selectedPlan, setSelectedPlan] = useState(
    SUBSCRIPTION_PLANS.find(p => p.popular) || SUBSCRIPTION_PLANS[0]
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          Unlock Your Premium Services
        </h2>
        <p className="text-gray-400">
          Clean exports, deeper insights, and recruiter visibility with{" "}
          <span className="font-semibold text-white">Spreadnext Premium</span>
        </p>
      </div>

      {/* Card */}
      <div className="grid md:grid-cols-2 gap-6 bg-gray-900/70 border border-gray-700 rounded-2xl p-6">
        {/* LEFT – FEATURES */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            SPREADNEXT PREMIUM
            <span className="block text-sm text-gray-400 font-normal">
              Built for serious careers
            </span>
          </h3>

          <ul className="space-y-3">
            {FEATURES.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT – PLANS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3">
            CHOOSE YOUR PLAN
          </h3>

          <div className="space-y-3">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const isActive = selectedPlan.id === plan.id;

              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left transition
                    ${isActive
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                        ${isActive ? "border-amber-500" : "border-gray-500"}`}
                    >
                      {isActive && (
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      )}
                    </div>

                    <div>
                      <div className="text-white font-medium">
                        {plan.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        ₹{plan.price} / {plan.duration}
                      </div>
                    </div>
                  </div>

                  {plan.popular && (
                    <span className="text-xs font-semibold text-amber-400">
                      Best Value
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <button
          onClick={() => onSelectPlan(selectedPlan)}
          className="w-full max-w-xl mx-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition"
        >
          Unlock Premium & Continue
        </button>

        <button
          onClick={onBack}
          className="w-full max-w-xl mx-auto bg-slate-600 hover:bg-slate-700 text-white font-semibold mt-2 py-3 rounded-xl transition"
        >
          Back
        </button>
        <p className="mt-4 text-xs text-gray-500">
          Secure payments • Cancel anytime • No hidden charges
        </p>
      </div>
    </div>
  );
}

// Payment View
export function PaymentView({ plan, onSuccess, onBack }) {
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onSuccess(plan);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Complete Payment</h2>
        <p className="text-gray-400">Subscribe to {plan.name}</p>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Plan</span>
          <span className="text-white font-semibold">{plan.name}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Duration</span>
          <span className="text-white">{plan.duration}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Mentor Sessions</span>
          <span className="text-white">
            {plan.mentorSessions === 999 ? "Unlimited" : plan.mentorSessions}
          </span>
        </div>
        <div className="border-t border-gray-700 my-3 pt-3">
          <div className="flex justify-between">
            <span className="text-white font-bold">Total Amount</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              ₹{plan.price}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={processing}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mb-3"
      >
        {processing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          <>
            <Shield className="w-5 h-5" />
            Pay Securely
          </>
        )}
      </button>

      <button
        onClick={onBack}
        disabled={processing}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        Back
      </button>

      <p className="text-center text-gray-500 text-xs mt-4">
        🔒 Secured by Razorpay • Your payment is safe
      </p>
    </div>
  );
}

// Success View
function SuccessView({ plan, onClose, onBookMentor }) {
 if (!plan) {
  return <p className="text-white text-center">Loading...</p>;
}

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">
        Payment Successful!
      </h2>
      <p className="text-gray-300 mb-6">
        You now have premium access with{" "}
        {plan.mentorSessions === 999 ? "unlimited" : plan.mentorSessions} mentor
        session{plan.mentorSessions > 1 ? "s" : ""}!
      </p>

      <div className="space-y-3">
        <button
          onClick={onBookMentor}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Video className="w-5 h-5" />
          Book Mentor Session
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all"
        >
          Start Building Resume
        </button>
      </div>
    </div>
  );
}

// Mentor Selection View
function MentorSelectionView({ availableSessions, onSelectMentor, onBack }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
            <Video className="w-7 h-7 text-white" />
          </div>
          Choose Your Mentor
        </h2>
        <p className="text-gray-400 mt-2">
          Select an expert mentor for your consultation
        </p>
        {availableSessions && (
          <p className="text-amber-400 text-sm mt-1 font-semibold">
            💎 You have {availableSessions} session
            {availableSessions > 1 ? "s" : ""} available
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {MENTORS.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer group"
            onClick={() => onSelectMentor(mentor)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                {mentor.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  {mentor.name}
                </h3>
                <p className="text-gray-400 text-sm mb-2">{mentor.title}</p>
                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                    {mentor.experience}
                  </span>
                  <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded border border-green-500/20">
                    {mentor.sessions} Sessions
                  </span>
                  <span className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">
                    ⭐ {mentor.rating}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {mentor.bio}
            </p>

            <div className="mb-4">
              <span className="text-xs font-semibold text-gray-400 mb-2 block">
                SPECIALIZATION
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full border border-purple-500/20">
                {mentor.specialization}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-xs font-semibold text-gray-400 mb-2 block">
                EXPERTISE
              </span>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group-hover:scale-105 shadow-lg">
              <Calendar className="w-4 h-4" />
              Book Session with {mentor.name.split(" ")[0]}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="w-full max-w-md mx-auto block bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        Back
      </button>
    </div>
  );
}

// Mentor Booking View
function MentorBookingView({ mentor, onBookSlot, onBack }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [topic, setTopic] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split("T")[0];
  });

  const handleBook = () => {
    if (
      selectedDate &&
      selectedTime &&
      topic &&
      userName &&
      userEmail &&
      userPhone
    ) {
      onBookSlot({
        mentor,
        date: selectedDate,
        time: selectedTime,
        topic,
        userName,
        userEmail,
        userPhone,
      });
    }
  };

  const isFormValid =
    selectedDate && selectedTime && topic && userName && userEmail && userPhone;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-3">
          <Video className="w-7 h-7 text-blue-500" />
          Book Session with {mentor.name}
        </h2>
        <p className="text-gray-400 mt-1">Schedule your 1-on-1 consultation</p>
      </div>

      {/* Mentor Info */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-5 border border-blue-500/20">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
            {mentor.avatar}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{mentor.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{mentor.title}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/20">
                {mentor.experience}
              </span>
              <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">
                {mentor.sessions} Sessions
              </span>
              <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded border border-amber-500/20">
                ⭐ {mentor.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="space-y-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          Your Details
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Select Date */}
      <div>
        <label className="block text-white font-bold mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Select Date
        </label>
        <div className="grid grid-cols-4 gap-3">
          {availableDates.map((date) => {
            const dateObj = new Date(date);
            const isSelected = selectedDate === date;
            return (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime("");
                }}
                className={`p-3 rounded-lg border-2 transition-all ${isSelected
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                  }`}
              >
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">
                    {dateObj.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className="text-white text-sm font-bold">
                    {dateObj.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Select Time */}
      {selectedDate && (
        <div>
          <label className="block text-white font-bold mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Select Time Slot
          </label>
          <div className="grid grid-cols-4 gap-3">
            {TIME_SLOTS.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border-2 transition-all ${isSelected
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                    }`}
                >
                  <Clock className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                  <div className="text-white text-sm font-semibold">{time}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Topic */}
      <div>
        <label className="block text-white font-bold mb-3 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          What would you like to discuss? *
        </label>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="E.g., Resume review, Career guidance, Interview preparation..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
          rows="4"
        />
      </div>

      {/* Book Button */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleBook}
          disabled={!isFormValid}
          className="flex-[2] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:shadow-none"
        >
          <CheckCircle className="w-5 h-5" />
          Confirm Booking
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-gray-400 text-sm">
        📧 You'll receive a Google Meet link via email after booking
      </p>
    </div>
  );
}

// Booking Success View
function BookingSuccessView({ bookingData, onClose }) {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Booking Confirmed!</h2>
      <p className="text-gray-300 mb-6">
        Your session with {bookingData.mentor.name} is confirmed! Meeting link
        has been sent to {bookingData.userEmail}
      </p>

      <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700 text-left">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl">
            {bookingData.mentor.avatar}
          </div>
          <div>
            <h4 className="text-white font-bold">{bookingData.mentor.name}</h4>
            <p className="text-gray-400 text-sm">{bookingData.mentor.title}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-4 h-4 text-blue-400" />
            {new Date(bookingData.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-4 h-4 text-blue-400" />
            {bookingData.time}
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            {bookingData.topic}
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-xl transition-all"
      >
        Start Building Resume
      </button>
    </div>
  );
}

// Main Component
export default function PremiumTemplateSystem({
  template,
  onClose,
  onSubscriptionComplete,
}) {
  const [currentStep, setCurrentStep] = useState("description");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const onSubscribe = () => {
    setPaymentSuccess(true);
  };
  const handleSubscribe = () => {
    setCurrentStep("plans");
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCurrentStep("payment");
  };

  const handlePaymentSuccess = (plan) => {
    setIsPremiumUser(true);
    setSelectedPlan(plan);
    onSubscriptionComplete(plan, template);
    setCurrentStep("success");
  };

  const handleBookMentor = () => {
    setCurrentStep("mentorSelection");
  };

  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
    setCurrentStep("mentorBooking");
  };

  const handleBookSlot = (data) => {
    const generatedLink = `https://meet.google.com/${Math.random()
      .toString(36)
      .substring(7)}`;
    setBookingData({
      ...data,
      meetingLink: generatedLink,
      id: Date.now(),
    });
    setCurrentStep("bookingSuccess");
  };

  const getRemainingSessions = () => {
    if (!selectedPlan) return 0;
    if (selectedPlan.mentorSessions === 999) return 999;
    return selectedPlan.mentorSessions;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-500/20">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/98 backdrop-blur-md border-b border-gray-700/50 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg">
              <Crown className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{template.name}</h2>
              <p className="text-amber-400 text-sm font-semibold">
                Premium Template
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === "description" && (
            <TemplateDescriptionView
              template={template}
              onSubscribe={handleSubscribe}
              onClose={onClose}
            />
          )}

          {currentStep === "plans" && (
            <SubscriptionPlansView
              onSelectPlan={handlePlanSelect}
              onBack={() => setCurrentStep("description")}
            />
          )}

          {currentStep === "payment" && (
            <PaymentView
              plan={selectedPlan}
              onSuccess={handlePaymentSuccess}
              onBack={() => setCurrentStep("plans")}
            />
          )}

          {currentStep === "success" && (
            <SuccessView
              plan={selectedPlan}
              onClose={onClose}
              onBookMentor={handleBookMentor}
            />
          )}

          {currentStep === "mentorSelection" && (
            <MentorSelectionView
              availableSessions={getRemainingSessions()}
              onSelectMentor={handleMentorSelect}
              onBack={() => setCurrentStep("success")}
            />
          )}

          {currentStep === "mentorBooking" && (
            <MentorBookingView
              mentor={selectedMentor}
              onBookSlot={handleBookSlot}
              onBack={() => setCurrentStep("mentorSelection")}
            />
          )}

          {currentStep === "bookingSuccess" && (
            <BookingSuccessView bookingData={bookingData} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
