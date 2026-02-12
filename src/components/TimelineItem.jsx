

export default function TimelineItem({ time, text, active }) {
  return (
    <div
      className={`p-4 rounded-lg border transition ${
        active
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white'
      }`}
    >
      <p className="text-xs text-gray-500">
        {time}
      </p>
      <p className={`text-sm mt-2 ${
        active ? 'text-blue-600 font-medium' : 'text-gray-600'
      }`}>
        {text}
      </p>
    </div>
  )
}
