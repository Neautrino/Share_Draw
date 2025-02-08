"use client";

import { useState } from 'react'

const onboardingSteps = [
  {
    title: 'Welcome to Excalidraw+',
    description: 'Create beautiful diagrams with AI-powered suggestions and real-time collaboration',
    illustration: '🎨'
  },
  {
    title: 'Real-Time Collaboration',
    description: 'Invite team members and work together seamlessly with live cursor tracking',
    illustration: '👥'
  },
  {
    title: 'Advanced Export Options',
    description: 'Export your diagrams in multiple formats including SVG, PNG, and PDF',
    illustration: '📤'
  }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 transition-all duration-300 hover:shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {onboardingSteps[currentStep]?.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {onboardingSteps[currentStep]?.description}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                </button>
              </div>
            </div>
            
            <div className="hidden md:flex items-center justify-center p-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl aspect-square">
              <span className="text-9xl">
                {onboardingSteps[currentStep]?.illustration}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}