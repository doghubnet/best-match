export type ScoreBand = 'excellent' | 'good' | 'fair' | 'needs-work'
export function toScoreBand(score: number): ScoreBand { if (score >= 85) return 'excellent'; if (score >= 70) return 'good'; if (score >= 50) return 'fair'; return 'needs-work' }
