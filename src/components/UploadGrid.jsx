

import PhotoSlot from './PhotoSlot'

export default function UploadGrid({ items, uploadedCount, onItemClick }) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {items.map((label, index) => {
        const isUploaded = index < uploadedCount

        return (
          <PhotoSlot
            key={label}
            label={label}
            isUploaded={isUploaded}
            onClick={onItemClick}
          />
        )
      })}
    </div>
  )
}
