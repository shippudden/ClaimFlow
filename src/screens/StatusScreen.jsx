import { useEffect, useState } from "react"
import { timelineSteps } from "../data/mockTimeline"
import StatusTimeline from "../components/StatusTimeline"


export default function StatusScreen() {
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    if (currentStep < timelineSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 3500)

      return () => clearTimeout(timer)
    }
  }, [currentStep])

  return (
    <div className="max-w-md mx-auto p-6">

      <h2 className="text-xl font-semibold mb-2 text-center">Claim Status</h2>
      <p className="text-gray-600 mb-6 text-center">
        We'll keep you updated every step of the way.
      </p>

      <StatusTimeline steps={timelineSteps} currentStep={currentStep} />
    </div>
  )
}
