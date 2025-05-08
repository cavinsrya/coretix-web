"use client"

interface PointsToggleProps {
  points: number
  usePoints: boolean
  onToggle: () => void
}

export function PointsToggle({ points, usePoints, onToggle }: PointsToggleProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold mb-1">Point</h3>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
          <span className="text-sm">{points.toLocaleString()} Points</span>
        </div>
      </div>

      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={usePoints} onChange={onToggle} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
      </label>
    </div>
  )
}
