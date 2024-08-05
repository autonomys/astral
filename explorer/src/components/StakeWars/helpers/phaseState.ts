import { STAKE_WARS_PHASES } from '@/constants'

export const phaseState = (phase: 'phase2' | 'phase3' | 'endgame', curentBlock: number) => {
  const { start, end } = STAKE_WARS_PHASES[phase]

  if (curentBlock < start) return 'Not Started'
  if (curentBlock >= start && curentBlock <= end) return 'In Progress'
  if (curentBlock > end) return 'Ended'
}
