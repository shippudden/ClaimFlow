

export default function ProcessingScreen() {
  const steps = [
    { id: 1, label: 'Uploading photos', status: 'done' },
    { id: 2, label: 'Checking policy coverage', status: 'done' },
    { id: 3, label: 'Estimating repair cost', status: 'in-progress' },
    { id: 4, label: 'Contacting repair partners', status: 'pending' },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center space-y-6 max-w-lg w-full p-6">
        <div className="mx-auto w-20 h-20 flex items-center justify-center bg-linear-to-br from-blue-50 to-white rounded-full shadow-sm">
          {/* simple AI chip icon */}
          <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 9h2M3 15h2M21 9h-2M21 15h-2M9 3v2M15 3v2M9 21v-2M15 21v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="text-lg font-semibold">Analyzing Vehicle Damage</h2>

        <div className="text-sm text-gray-600 space-y-2">
          {steps.map((s) => (
            <div key={s.id} className="flex items-center justify-center gap-3">
              <span className="flex-none">
                {s.status === 'done' && (
                  <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                  </svg>
                )}

                {s.status === 'in-progress' && (
                  <svg className="w-5 h-5 text-blue-500 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
                    <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}

                {s.status === 'pending' && (
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M10 3a1 1 0 011 1v5.586l3.707 3.707a1 1 0 01-1.414 1.414L10 11.414V4a1 1 0 011-1z" />
                  </svg>
                )}
              </span>
              
              <span className={`text-sm ${s.status === 'in-progress' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          {/* prominent loader */}
          <div className="mx-auto w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 text-blue-500" viewBox="0 0 50 50" aria-hidden>
              <defs>
                <linearGradient id="g" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <circle cx="25" cy="25" r="20" stroke="rgba(99,102,241,0.1)" strokeWidth="6" fill="none" />
              <path d="M45 25a20 20 0 00-4-11" stroke="url(#g)" strokeWidth="6" strokeLinecap="round" fill="none">
                <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
          <p className="text-xs text-gray-500 mt-2" aria-live="polite">Processing — this can take a few seconds</p>
        </div>
      </div>
    </div>
  )
}
