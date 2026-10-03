import { useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'
import type { CrewWithEscapeTime } from '../models/crewModel'

interface CrewModalProps {
  crew: CrewWithEscapeTime | null
  onClose: () => void
  onSave: (crewName: string, escapeTime: number) => Promise<void>
}

const CrewModal = ({
  crew,
  onClose,
  onSave,
}: CrewModalProps) => {
  const [crewName, setCrewName] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (crew) {
      setCrewName(crew.crew_name)

      const totalSeconds = crew.escape_time ?? 0

      setMinutes(String(Math.floor(totalSeconds / 60)))
      setSeconds(String(totalSeconds % 60))
    } else {
      setCrewName('')
      setMinutes('')
      setSeconds('')
    }
  }, [crew])

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!crewName.trim()) {
      return
    }

    const minuteValue = Number(minutes || 0)
    const secondValue = Number(seconds || 0)

    if (
      !Number.isInteger(minuteValue) ||
      !Number.isInteger(secondValue) ||
      minuteValue < 0 ||
      secondValue < 0 ||
      secondValue > 59
    ) {
      return
    }

    const totalSeconds =
      minuteValue * 60 + secondValue

    setLoading(true)

    try {
      await onSave(crewName, totalSeconds)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#010206]/80 px-6 backdrop-blur-md">

      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#11151C]/90 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-['Orbitron'] text-xl font-bold text-[#FDFDFB]">
              {crew ? 'Edit Crew' : 'Add Crew'}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {crew
                ? 'Update the crew information.'
                : 'Add a crew and their escape time.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-gray-500 transition hover:text-[#FDFDFB]"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block font-['Michroma'] text-xs tracking-wider text-gray-300">
              Crew Name
            </label>

            <input
              type="text"
              value={crewName}
              onChange={(e) => setCrewName(e.target.value)}
              placeholder="Enter crew name"
              className="w-full rounded-md border border-white/10 bg-[#181D25]/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-[#1D232D]/80 focus:ring-1 focus:ring-white/10"
            />
          </div>

          <div>
            <label className="mb-2 block font-['Michroma'] text-xs tracking-wider text-gray-300">
              Escape Time
            </label>

            <div className="grid grid-cols-2 gap-3">

              <div>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  placeholder="Minutes"
                  className="w-full rounded-md border border-white/10 bg-[#181D25]/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-[#1D232D]/80 focus:ring-1 focus:ring-white/10"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Minutes
                </p>
              </div>

              <div>
                <input
                  type="number"
                  min="0"
                  max="59"
                  step="1"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  placeholder="Seconds"
                  className="w-full rounded-md border border-white/10 bg-[#181D25]/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-[#1D232D]/80 focus:ring-1 focus:ring-white/10"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Seconds (0–59)
                </p>
              </div>

            </div>
          </div>

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-md border border-white/10 bg-white/5 px-5 py-3 font-['Space_Grotesk'] text-sm text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-[#FDFDFB]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#FDFDFB] px-5 py-3 font-['Space_Grotesk'] text-sm font-semibold text-[#010206] transition hover:bg-[#FFFDEE] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Crew'}
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default CrewModal