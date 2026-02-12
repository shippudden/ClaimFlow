import { useState } from "react"
import { mockTimeline } from "../data/mockTimeline"
import StatusTimeline from "../components/StatusTimeline"


export default function StatusScreen() {
  const [timeline, _setTimeline] = useState(mockTimeline)

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-2 text-center">Claim Status</h2>
      <p className="text-gray-600 mb-6 text-center">
        We'll keep you updated every step of the way.
      </p>

      <StatusTimeline timeline={timeline} />
    </div>
  )
}
