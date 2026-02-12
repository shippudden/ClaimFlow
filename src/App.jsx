import { useEffect, useState } from "react"
import StatusScreen from "./screens/StatusScreen"
import UploadScreen from "./screens/UploadScreen"
import ProcessingScreen from "./screens/ProcessingScreen"


function App() {
  const [demoScreen, setDemoScreen] = useState("upload")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)

      // Call backend submit with required data
      const response = await fetch("http://localhost:3000/api/claim/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          photos: ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg"],
          policyNumber: "POL-123456",
          description: "Vehicle damage from accident",
          customerName: "John Doe"
        })
      })

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`)
      }

      // Simulate AI processing delay (Frontend controlled)
      setDemoScreen("processing")

      setTimeout(async() => {
        setIsLoading(false)
        setDemoScreen("timeline")
      }, 3000)
    } catch (error) {
      console.error("Error submitting claim:", error)
      setIsLoading(false)
    }
  }

  // Keyboard shortcuts (Option A)
  useEffect(() => {
    const handler = (e) => {
      if(e.key.toLowerCase() === "n") {
        setDemoScreen("timeline")
      }
      if(e.key.toLowerCase() === "b") {
        setDemoScreen("upload")
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 ">
      {demoScreen === "upload" && (
        <UploadScreen 
          isLoading={isLoading}
          onSubmit = {handleSubmit}
        />
      )}
      
      {demoScreen === "processing" && (
        <ProcessingScreen />
      )}
      
      {demoScreen === "timeline" && <StatusScreen />}
    </div>
  )
}

export default App
