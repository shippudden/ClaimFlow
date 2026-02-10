

export default function TimelineItem({ title, time, description, isCompleted, isActive }) {
  return (
    <div
      className={`p-4 rounded-lg border transition
      ${isActive
        ? 'border-blue-500 bg-blue-50'
        : isCompleted
        ? 'border-green-300 bg-green-50'
        : 'border-gray-200 bg-white'}
      `}
    >
      <h3 className="font-medium text-gray-800">
        {title}
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        {time}
      </p>
      <p className="text-sm text-gray-600 mt-1">
        {description}
      </p>
    </div>
  )
}
