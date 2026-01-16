"use client"
import React, { useState } from 'react';
import { User, Lock, Crown, X } from 'lucide-react';

// Mock data generator
const generateMockVisitors = () => {
  return [
    {
      id: 1,
      name: "Someone from Spreadnext Inc",
      position: "Marketing Head",
      avatar: null,
      profileUrl: "/profile/user1"
    },
    {
      id: 2,
      name: "Someone from Spreadnext Inc",
      position: "Marketing Head",
      avatar: null,
      profileUrl: "/profile/user2"
    },
    {
      id: 3,
      name: "Someone from Spreadnext Inc",
      position: "Marketing Head",
      avatar: null,
      profileUrl: "/profile/user3"
    },
    {
      id: 4,
      name: "Someone from Spreadnext Inc",
      position: "Marketing Head",
      avatar: null,
      profileUrl: "/profile/user4"
    },
    {
      id: 5,
      name: "Someone from Spreadnext Inc",
      position: "Marketing Head",
      avatar: null,
      profileUrl: "/profile/user5"
    },
    {
      id: 6,
      name: "Someone from Spreadnext Inc",
      position: "Marketing Head",
      avatar: null,
      profileUrl: "/profile/user6"
    }
  ];
};

// Premium Upgrade Modal
const PremiumModal = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Upgrade to Premium
          </h2>
          <p className="text-gray-600 text-sm">
            See who's viewing your profile and connect with them directly
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-gray-700">See who viewed your profile</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-gray-700">Access advanced analytics</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-gray-700">Unlimited resume templates</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-gray-700">Priority support</p>
          </div>
        </div>

        <button
          onClick={onUpgrade}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200"
        >
          Upgrade to Premium
        </button>
        <p className="text-center text-xs text-gray-500 mt-3">
          Starting at ₹399/month
        </p>
      </div>
    </div>
  );
};

// Visitor Item Component
const VisitorItem = ({ visitor, isPremium, onViewClick }) => {
  const isBlurred = !isPremium;

  return (
    <div className={`flex items-center gap-4 py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors ${isBlurred ? 'blur-[2px]' : ''}`}>
      {/* Avatar */}
      <div className={`w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 `}>
        {visitor.avatar ? (
          <img src={visitor.avatar} alt={visitor.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <User size={24} className="text-gray-400" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium text-gray-900 text-sm truncate`}>
          {isBlurred ? 'Someone from Company Inc' : visitor.name}
        </h3>
        <p className={`text-xs text-gray-500 truncate `}>
          {isBlurred ? 'Job Title' : visitor.position}
        </p>
      </div>

      {/* View Button */}
      <button
        onClick={() => onViewClick(visitor)}
        className="px-4 py-1.5 text-xs font-medium text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors flex-shrink-0"
      >
        View
      </button>

      {/* Lock Icon for non-premium */}
      {isBlurred && (
        <div className="absolute right-16 pointer-events-none">
          <Lock size={14} className="text-gray-400" />
        </div>
      )}
    </div>
  );
};

// Main Component
const ProfileVisitorsCard = ({ 
  isPremium = false,
  onUpgradeToPremium,
  visitors: externalVisitors = null 
}) => {
  const [showModal, setShowModal] = useState(false);
  const visitors = externalVisitors || generateMockVisitors();

  const handleViewClick = (visitor) => {
    if (isPremium) {
      // Redirect to profile
      console.log('Redirecting to:', visitor.profileUrl);
      // In real app: window.location.href = visitor.profileUrl;
      // Or: router.push(visitor.profileUrl);
      alert(`Redirecting to ${visitor.name}'s profile`);
    } else {
      // Show premium modal
      setShowModal(true);
    }
  };

  const handleUpgrade = () => {
    setShowModal(false);
    if (onUpgradeToPremium) {
      onUpgradeToPremium();
    } else {
      // Redirect to pricing page
      console.log('Redirecting to pricing page');
      // In real app: window.location.href = '/pricing';
      alert('Redirecting to pricing page...');
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#cccccc] p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-[#dbdbdb] pb-2">
          <h2 className="text-lg font-bold text-gray-900">
            Who is looking for you
          </h2>
          {!isPremium && (
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-full">
              <Crown size={14} className="text-yellow-600" />
              <span className="text-xs font-medium text-yellow-600">Premium</span>
            </div>
          )}
        </div>

        {/* Visitors List */}
        <div className="space-y-1 relative">
          {visitors.map((visitor) => (
            <VisitorItem
              key={visitor.id}
              visitor={visitor}
              isPremium={isPremium}
              onViewClick={handleViewClick}
            />
          ))}

          {/* Overlay for non-premium users */}
          {/* {!isPremium && (
            <div className="absolute inset-0 pointer-events-none" />
          )} */}
        </div>

        {/* CTA Button for non-premium */}
        {!isPremium && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Crown size={18} />
              Upgrade to See All Visitors
            </button>
          </div>
        )}
      </div>

      {/* Premium Modal */}
      <PremiumModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpgrade={handleUpgrade}
      />

      {/* Demo Controls */}
      {/* <div className="mt-6 max-w-md w-full">
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Demo Controls:</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-white text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Toggle Premium Status (Currently: {isPremium ? 'Premium' : 'Free'})
          </button>
        </div>
      </div> */}
    </>
  );
};

// Demo Wrapper
export default function ProfileVisitorsDemo() {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className=" bg-gray-50 flex flex-col items-center justify-center">
      <ProfileVisitorsCard 
        isPremium={isPremium}
        onUpgradeToPremium={() => {
          console.log('Upgrade clicked');
          // Simulate upgrade
          setTimeout(() => {
            setIsPremium(true);
          }, 1000);
        }}
      />
      
      {/* <div className="mt-6 max-w-md w-full">
        <div className="bg-gray-100 rounded-xl p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Demo Controls:</p>
          <button
            onClick={() => setIsPremium(!isPremium)}
            className="w-full bg-white text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Toggle Premium Status (Currently: {isPremium ? 'Premium ✓' : 'Free'})
          </button>
        </div>
      </div> */}
    </div>
  );
}