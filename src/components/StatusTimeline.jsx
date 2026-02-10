

import TimelineItem from './TimelineItem'

export default function StatusTimeline({ steps, currentStep }) {
  return (
    <div className="space-y-4">
      {steps.map((step) => {
        const isCompleted = step.id < currentStep
        const isActive = step.id === currentStep

        return (
          <TimelineItem
            key={step.id}
            title={step.title}
            time={step.time}
            description={step.description}
            isCompleted={isCompleted}
            isActive={isActive}
          />
        )
      })}
    </div>
  )
}
