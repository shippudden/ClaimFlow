

export default function PrimaryButton({children, onClick, isComplete, isLoading}) {
  return (
    <div>
        <button 
            onClick={onClick}
            disabled={isLoading}
            // disabled={!isComplete}
            className={`w-full py-3 rounded-lg font-medium transition
                ${isComplete 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
                    : 'bg-gray-300 text-white cursor-not-allowed'}`}
            >
                {isLoading ? "Analazing damage..." : children}
        </button>
    </div>
  )
}
