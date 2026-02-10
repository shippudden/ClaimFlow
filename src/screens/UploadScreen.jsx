import { useState } from "react"
import PrimaryButton from "../components/PrimaryButton"
import UploadGrid from "../components/UploadGrid"


export default function UploadScreen({onSubmit, isLoading}) {
    const photoRequirements = [
        "Front view",
        "Side view",
        "Rear side",
        "Close-up of damage",
        "Optional (extra)"
    ]

const [uploadedCount, setUploadedCount] = useState(0)

const handleAddPhoto = () => {
    if (uploadedCount < photoRequirements.length) {
        setUploadedCount(uploadedCount + 1)
    }
}

const isComplete = uploadedCount >= 4 // Optional extra not required

return (
    <div className="max-w-max mx-auto p-6">

        {/* Header */}
        <h2 className="text-xl font-semibold mb-2 flex justify-center">Upload Damage Photos</h2>
        <p className="text-gray-600 mb-6 flex text-center justify-center">
            Take clear photos of your vehicle so we can assess the damage quickly.
        </p>

        <div className="bg-blue-50 border border-blue-100 text-blue-700 text-sm rounded-b-lg p-3 mb-6 ">
            Tip: Take photos in good lighting and avoid blurry images.
        </div>

        {/* Photo Grid */}
        <UploadGrid
          items={photoRequirements}
          uploadedCount={uploadedCount}
          onItemClick={handleAddPhoto}
        />

        <p className="text-sm text-gray-500 mb-4 justify-center flex text-center font-medium">
            {uploadedCount} of {photoRequirements.length} photos uploaded
        </p>

            <PrimaryButton 
                onClick={onSubmit} 
                isLoading={isLoading} 
                isComplete={isComplete}
            >
                Submit for assessment
            </PrimaryButton>
    </div>
  )
}

