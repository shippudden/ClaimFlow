

export default function PhotoSlot({ label, isUploaded, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`h-36 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition
      ${isUploaded
        ? 'bg-green-50 border border-green-300'
        : 'border-2 border-dashed border-gray-300 hover:border-gray-400'}
      `}
    >
      <span className={`text-2xl ${isUploaded ? 'text-green-700' : 'text-gray-400'}`}>
        {isUploaded ? '✓ Photo added' : '+'}
      </span>
      <span className="text-sm font-medium text-gray-400">
        {label}
      </span>
    </div>
  )
}
