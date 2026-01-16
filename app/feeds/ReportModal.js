"use client";
import { useState, useMemo, useEffect } from "react";
import Modal from "../components/Modal";
import { Check, ChevronLeft, Flag, AlertTriangle, Shield, UserX, MessageCircle, Sparkles, Loader2, Ban, Copyright, Skull, HeartHandshake } from "lucide-react";
import Button, { Buttonborder } from "../components/Button";
import RichTextEditorInput from "../components/RichTextEditorInput";
import TextAreaField from '../components/TextAreaField';
import { GrFormNext } from "react-icons/gr";

// Enhanced policy categories with better icons
const REPORT_CATEGORIES = [
  {
    id: "harassment",
    label: "Harassment",
    icon: UserX,
    color: "bg-red-50 text-red-600 border-red-200",
    iconColor: "text-red-600",
    description: "Bullying, threats, or targeted attacks"
  },
  {
    id: "fraud",
    label: "Fraud or scam",
    icon: Ban,
    color: "bg-orange-50 text-orange-600 border-orange-200",
    iconColor: "text-orange-600",
    description: "Deceptive or fraudulent content"
  },
  {
    id: "spam",
    label: "Spam",
    icon: MessageCircle,
    color: "bg-yellow-50 text-yellow-600 border-yellow-200",
    iconColor: "text-yellow-600",
    description: "Unsolicited commercial content"
  },
  {
    id: "misinformation",
    label: "False Information",
    icon: AlertTriangle,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    iconColor: "text-purple-600",
    description: "Misleading or factually incorrect"
  },
  {
    id: "hate_speech",
    label: "Hate Speech",
    icon: Shield,
    color: "bg-pink-50 text-pink-600 border-pink-200",
    iconColor: "text-pink-600",
    description: "Discriminatory or offensive language"
  },
  {
    id: "violence",
    label: "Violence",
    icon: Skull,
    color: "bg-red-50 text-red-600 border-red-200",
    iconColor: "text-red-600",
    description: "Threats of harm or violent behavior"
  },
  {
    id: "self_harm",
    label: "Self-harm",
    icon: HeartHandshake,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    iconColor: "text-blue-600",
    description: "Content promoting self-harm"
  },
  {
    id: "graphic_content",
    label: "Graphic Content",
    icon: AlertTriangle,
    color: "bg-orange-50 text-orange-600 border-orange-200",
    iconColor: "text-orange-600",
    description: "Violent or disturbing imagery"
  },
  {
    id: "extremist",
    label: "Extremist Groups",
    icon: Ban,
    color: "bg-red-50 text-red-600 border-red-200",
    iconColor: "text-red-600",
    description: "Dangerous organizations"
  },
  {
    id: "sexual_content",
    label: "Sexual Content",
    icon: Shield,
    color: "bg-pink-50 text-pink-600 border-pink-200",
    iconColor: "text-pink-600",
    description: "Inappropriate sexual material"
  },
  {
    id: "fake_account",
    label: "Fake Account",
    icon: UserX,
    color: "bg-gray-50 text-gray-600 border-gray-200",
    iconColor: "text-gray-600",
    description: "Impersonation or fake identity"
  },
  {
    id: "hacked_account",
    label: "Hacked Account",
    icon: Shield,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    iconColor: "text-blue-600",
    description: "Compromised account activity"
  },
  {
    id: "child_exploitation",
    label: "Child Safety",
    icon: Shield,
    color: "bg-red-50 text-red-600 border-red-200",
    iconColor: "text-red-600",
    description: "Content harming minors"
  },
  {
    id: "illegal_goods",
    label: "Illegal Activities",
    icon: Ban,
    color: "bg-orange-50 text-orange-600 border-orange-200",
    iconColor: "text-orange-600",
    description: "Promotion of illegal goods/services"
  },
  {
    id: "infringement",
    label: "Copyright Issue",
    icon: Copyright,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    iconColor: "text-purple-600",
    description: "Copyright or trademark violation"
  }
];

export default function ReportModal({ open, onClose, targetType, onSubmit }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedCategory = useMemo(() => 
    REPORT_CATEGORIES.find(cat => cat.id === selected),
    [selected]
  );

  // Reset when modal opens/closes
  useEffect(() => {
    if (!open) {
      setStep(1);
      setSelected("");
      setDetails("");
      setIsSubmitting(false);
      setShowSuccess(false);
    }
  }, [open]);

  const handleNext = () => {
    if (selected) setStep(2);
  };

  const handleSubmit = async () => {
    if (!selected) return;
    
    setIsSubmitting(true);
    try {
      // Wait for onSubmit to complete and check if it was successful
      const result = await onSubmit(selected, details);
      
      // Only show success if onSubmit was successful
      if (result?.success !== false) {
        setShowSuccess(true);
        setStep(3);
        
        // Auto close after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Report submission failed:', error);
      // Don't show success step if there's an error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSelected("");
    setDetails("");
    setIsSubmitting(false);
    setShowSuccess(false);
    onClose();
  };

  // Step 1: Policy Selection
  const renderStep1 = () => (
    <div className="">
      {/* Header */}
      <div className="text-left  border-b border-gray-200 pb-4 mb-4">
        <p className="text-gray-600 text-sm">
          Let us know what's happening. Your report is anonymous.
        </p>
      </div>

      {/* Policy Grid */}
      <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2 mb-4">
        {REPORT_CATEGORIES.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selected === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setSelected(category.id)}
              className={`p-0.5  px-3 rounded-full border transition-all duration-200 group ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex-1 text-left min-w-0">
                  <div className={`text-sm ${
                    isSelected ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {category.label}
                  </div>
                </div>
                {isSelected && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex justify-end items-center pt-4 border-t border-gray-200">
        <button
          onClick={handleClose}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 rounded-lg hover:bg-gray-50 mr-3"
        >
          Cancel
        </button>
        
        <Buttonborder 
          name="Continue"
          disabled={!selected}
          onClick={handleNext}
          icon={GrFormNext}
        />
      </div>
    </div>
  );

  // Step 2: Additional Details
  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Header */}
         <div className="bg-[rgba(244,252,255,0.68)] border border-blue-200 rounded-lg p-4">
        <h4 className="text-gray-800 font-medium mb-2">Additional Information</h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          Help us understand the issue better by providing more context. This information will be reviewed by our team and kept confidential.
        </p>
        <p className="text-gray-600 text-sm mt-3 flex items-center gap-1.5">
          <span className="font-medium">Selected:</span>
          <span className="text-blue-700 font-medium">{selectedCategory?.label}</span>
        </p>
      </div>

      {/* Details Form */}
      <div className="">
        <TextAreaField 
          value={details}
          label="Additional details (optional)" 
          disabled={isSubmitting}
          onChange={setDetails}
          placeholder="Please provide specific details, context, or any information that will help us review this report effectively..."
          rows={5}
          maxLength={1000}
          showCount={true}
        />
        
        <p className="text-gray-500 text-xs flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Your report is anonymous and confidential
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-1 border-t border-gray-200">
        <button
          onClick={() => setStep(1)}
          disabled={isSubmitting}
          className="px-5 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>
        <div className="flex gap-3">
 
          <Buttonborder 
            name={
              isSubmitting ? "Submitting..." : "Submit Report"
            }
            disabled={isSubmitting}
            onClick={handleSubmit}
            icon={isSubmitting ? null : GrFormNext}
          />
        </div>
      </div>
    </div>
  );

  // Step 3: Success
  const renderStep3 = () => (
    <div className="text-center py-6 px-4">
      <div className="relative inline-block mb-6">
        <div className="w-20 h-20  rounded-2xl flex items-center justify-center border border-green-200 mx-auto">
          <img src="/spreads.svg" className="w-full h-full object-cover" alt="success" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Report Submitted
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed text-sm">
        Thank you for helping keep our community safe. We'll review your report and take appropriate action.
      </p>
      
      <div className="w-40 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden mb-2">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-2000 ease-out"
          style={{ width: '100%' }}
        />
      </div>
      <p className="text-gray-400 text-xs">Closing automatically...</p>
    </div>
  );

  return (
    <Modal 
      show={open} 
      onClose={step === 1 ? handleClose : undefined} 
      widthClass="max-w-2xl"
      bodycenter="!bg-[#02020238] !mt-0 !items-center"
      title={`Report this ${targetType}`}
    >
      <div className="p-1">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </Modal>
  );
}