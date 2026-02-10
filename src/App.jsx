import { useEffect, useState } from "react"
import StatusScreen from "./screens/StatusScreen"
import UploadScreen from "./screens/UploadScreen"


function App() {
  const [demoScreen, setDemoScreen] = useState("upload")
  const [isLoading, setIsLoading] = useState(false)

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
          onSubmit = {() => {
            setIsLoading(true)
            setTimeout(() => {
              setIsLoading(false)
              setDemoScreen("timeline")
            }, 1200)
          }}
        />
      )}
      {demoScreen === "timeline" && <StatusScreen />}
    </div>
  )
}

export default App
