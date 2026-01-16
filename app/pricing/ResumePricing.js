import { useState } from "react";
import { X, Check } from "lucide-react";

const SUBSCRIPTION_PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: 399,
    duration: "month",
    popular: false,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: 1099,
    duration: "3 months",
    popular: false,
  },
  {
    id: "half-yearly",
    name: "Half-Yearly",
    price: 1999,
    duration: "6 months",
    popular: true,
    badge: "Best Value",
  },
  {
    id: "annual",
    name: "Annual",
    price: 3599,
    duration: "year",
    popular: false,
  },
];

const FEATURES = [
  "Resume without watermark",
  "Access to all premium templates",
  "AI job matching",
  "ATS score analysis according to companies",
  "Free mentor consultation",
  "Priority support",
];

export default function ResumePricing({ isOpen, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState("half-yearly");
  const [currentStep, setCurrentStep] = useState("plans"); // plans, payment, success
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUnlock = () => {
    setCurrentStep("payment");
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep("success");
    }, 2000);
  };

  const handleContinueFree = () => {
    if (onClose) onClose();
  };

  const handleClose = () => {
    setCurrentStep("plans");
    setSelectedPlan("half-yearly");
    if (onClose) onClose();
  };

  const getCurrentPlan = () => SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in custom-scroll zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6 text-center">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          <div className="mb-4 flex justify-center">
            <img
              src="/downloadImg.png"
              className="mb-4 h-32"
              alt="download"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {currentStep === "plans" && "Unlock Your Resume"}
            {currentStep === "payment" && "Complete Your Payment"}
            {currentStep === "success" && "Welcome to Premium!"}
          </h1>
          <p className="text-gray-600">
            {currentStep === "plans" && (
              <>Clean exports, deeper insights, and recruiter visibility with{" "}
                <span className="font-semibold text-gray-800">Spreadnext Premium</span></>
            )}
            {currentStep === "payment" && "Secure payment powered by Razorpay"}
            {currentStep === "success" && "Your premium subscription is now active"}
          </p>
        </div>

        {/* Plans View */}
        {currentStep === "plans" && (
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Features */}
            <div className="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 px-8 py-10">
              <h2 className="text-white text-xl font-bold mb-2">SPREADNEXT PREMIUM</h2>
              <p className="text-slate-400 text-sm mb-6">Built for serious careers</p>

              <div className="space-y-4">
                {FEATURES.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-600">
                <p className="text-slate-400 text-sm font-medium mb-2">Select Plan</p>
              </div>
            </div>

            {/* Right Side - Plans */}
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 px-8 py-10">
              <h3 className="text-white text-lg font-bold mb-6">CHOOSE YOUR PLAN</h3>

              <div className="space-y-3 mb-8">
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all ${selectedPlan === plan.id
                        ? "border-amber-500 bg-amber-500/10"
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id
                            ? "border-amber-500 bg-amber-500"
                            : "border-slate-600"
                          }`}>
                          {selectedPlan === plan.id && (
                            <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{plan.name}</p>
                          <p className="text-slate-400 text-xs">/ {plan.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">₹{plan.price}</p>
                      </div>
                    </div>
                    {plan.badge && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {plan.badge}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleUnlock}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
                >
                  Unlock Premium & Continue
                </button>

                <button
                  onClick={handleContinueFree}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl transition-all"
                >
                  Continue with watermark (Free)
                </button>
              </div>

              <p className="text-center text-slate-500 text-xs mt-6">
                Secure payments • Cancel anytime • No hidden charges
              </p>
            </div>
          </div>
        )}

        {/* Payment View */}
        {currentStep === "payment" && (
          <div className="px-8 py-10 max-w-md mx-auto">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-6 mb-6">
              <h3 className="text-slate-800 font-bold text-lg mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Plan</span>
                  <span className="text-slate-800 font-semibold">{getCurrentPlan()?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Duration</span>
                  <span className="text-slate-800">{getCurrentPlan()?.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Mentor Sessions</span>
                  <span className="text-slate-800">Unlimited</span>
                </div>
              </div>

              <div className="border-t-2 border-slate-300 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-800 font-bold text-lg">Total Amount</span>
                  <span className="text-emerald-600 font-bold text-2xl">₹{getCurrentPlan()?.price}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-6 mb-6">
              <h3 className="text-slate-800 font-bold text-sm mb-4">Payment Method</h3>

              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 border-2 border-emerald-500">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-800 font-semibold">UPI / Cards / NetBanking</p>
                      <p className="text-slate-500 text-xs">Razorpay secure payment</p>
                    </div>
                    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                      <rect width="32" height="32" rx="6" fill="#0c2f54" />
                      <path d="M8 16L13 21L24 10" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Pay ₹{getCurrentPlan()?.price} Securely</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCurrentStep("plans")}
                disabled={isProcessing}
                className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 rounded-xl transition-all"
              >
                Back to Plans
              </button>
            </div>

            <p className="text-center text-slate-500 text-xs mt-6 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secured by Razorpay • 256-bit encryption
            </p>
          </div>
        )}

        {/* Success View */}
        {currentStep === "success" && (
          <div className="px-8 py-16 max-w-md mx-auto text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-slate-800 mb-3">Payment Successful!</h2>
              <p className="text-slate-600 text-lg mb-6">
                Welcome to Spreadnext Premium
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 mb-6 border-2 border-emerald-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-600 font-medium">Plan Activated</span>
                  <span className="text-emerald-600 font-bold">{getCurrentPlan()?.name}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-600 font-medium">Amount Paid</span>
                  <span className="text-slate-800 font-bold">₹{getCurrentPlan()?.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Valid For</span>
                  <span className="text-slate-800 font-bold">{getCurrentPlan()?.duration}</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-8 border border-blue-200">
                <p className="text-sm text-slate-600">
                  ✨ You now have access to all premium features including unlimited mentor consultations!
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                alert("Redirecting to dashboard...");
                handleClose();
              }}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg mb-3"
            >
              Start Using Premium
            </button>

            <button
              onClick={() => alert("Receipt sent to your email!")}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 rounded-xl transition-all"
            >
              Download Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}