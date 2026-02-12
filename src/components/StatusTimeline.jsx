

import TimelineItem from './TimelineItem'

export default function StatusTimeline({ timeline }) {
  return (
    <div className="space-y-4">
      {timeline.map((item, index) => (
        <TimelineItem
          key={index}
          time={item.time}
          text={item.text}
          active={item.active}
        />
      ))}
    </div>
  )
}
