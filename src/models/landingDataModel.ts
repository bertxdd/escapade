import type {
  NavSection,
  StoryAct,
  MissionTrack,
  TicketTier,
  LeaderboardTeam,
  EventStat,
} from './types'

export const NAV_SECTIONS_MODEL: NavSection[] = [
  { id: 'home', name: 'Home', href: '/' },
  { id: 'story', name: 'Story', href: '/story' },
  { id: 'mission', name: 'Mission', href: '/mission' },
  { id: 'tickets', name: 'Tickets', href: '/tickets' },
  { id: 'leaderboard', name: 'Leaderboard', href: '/leaderboard' },
]

export const EVENT_STATS_MODEL: EventStat[] = [
  { label: 'Participating Hackers', value: '500+' },
  { label: 'Hours of Creation', value: '48H' },
  { label: 'Prize Pool', value: '$10,000' },
  { label: 'Tech Tracks', value: '04' },
]

export const STORY_ACTS_MODEL: StoryAct[] = [
  {
    id: 'act-1',
    phase: 'ACT 01',
    title: 'The Disruption',
    desc: 'An unannounced anomaly threatens digital infrastructures worldwide. Legacy systems crumble, leaving developers to forge new paths.',
    accent: 'border-l-[#00f2ff]',
  },
  {
    id: 'act-2',
    phase: 'ACT 02',
    title: 'Against All Odds',
    desc: 'Teams assemble under immense time pressure. Fueled by coffee and determination, coders battle bug after bug to build resilient systems.',
    accent: 'border-l-[#00ff88]',
  },
  {
    id: 'act-3',
    phase: 'ACT 03',
    title: 'The Escapade',
    desc: 'Solutions take flight. From autonomous AI agents to decentralized networks, participants emerge victorious into a new tech era.',
    accent: 'border-l-[#aa3bff]',
  },
]

export const MISSION_TRACKS_MODEL: MissionTrack[] = [
  {
    id: 'track-1',
    icon: '🤖',
    title: 'AI & Autonomous Agents',
    desc: 'Build smart agents, LLM pipelines, and intelligent automation systems.',
    trackNumber: 'TRACK #1',
  },
  {
    id: 'track-2',
    icon: '🌐',
    title: 'Web3 & Decentralized',
    desc: 'Construct transparent, trustless systems and next-gen blockchain apps.',
    trackNumber: 'TRACK #2',
  },
  {
    id: 'track-3',
    icon: '🛡️',
    title: 'Cyber Resilience',
    desc: 'Engineer impenetrable protocols and automated threat response tools.',
    trackNumber: 'TRACK #3',
  },
  {
    id: 'track-[#4]',
    icon: '🌱',
    title: 'Green Tech & Energy',
    desc: 'Leverage data and software to reduce carbon footprints and optimize power.',
    trackNumber: 'TRACK #4',
  },
]

export const TICKET_TIERS_MODEL: TicketTier[] = [
  {
    id: 'pass-explorer',
    name: 'Explorer Pass',
    price: 'Free',
    popular: false,
    perks: [
      'Virtual Access to Workshops',
      'Discord Community Access',
      'Digital Swag Bag',
      'Certificate of Participation',
    ],
    cta: 'Register Free',
  },
  {
    id: 'pass-hacker',
    name: 'Hacker Pass',
    price: '$25',
    popular: true,
    perks: [
      'Full 48-Hour On-site Access',
      'Mentorship & Workshop Access',
      'Official GDG T-Shirt & Swag Kit',
      'Free Meals & Drinks Provided',
      'Eligible for Main Category Prizes',
    ],
    cta: 'Get Hacker Pass',
  },
  {
    id: 'pass-vip',
    name: 'VIP Escapade Pass',
    price: '$75',
    popular: false,
    perks: [
      'Everything in Hacker Pass',
      'VIP Lounge & Quiet Pod Access',
      '1-on-1 VC & Recruiter Speed Dating',
      'Exclusive Afterparty Ticket',
      'Customized Hardware Kit',
    ],
    cta: 'Get VIP Pass',
  },
]

export const LEADERBOARD_TEAMS_MODEL: LeaderboardTeam[] = [
  {
    id: 'team-1',
    rank: '01',
    name: 'CyberSynergy',
    track: 'AI & Autonomous',
    status: 'Submitted',
    points: '2,940',
    badge: '🥇',
  },
  {
    id: 'team-2',
    rank: '02',
    name: 'Quantum Leap',
    track: 'Web3 & Decentralized',
    status: 'Final Review',
    points: '2,810',
    badge: '🥈',
  },
  {
    id: 'team-3',
    rank: '03',
    name: 'Aurora Protocol',
    track: 'Cyber Resilience',
    status: 'Submitted',
    points: '2,750',
    badge: '🥉',
  },
  {
    id: 'team-4',
    rank: '04',
    name: 'EcoGrid Hackers',
    track: 'Green Tech',
    status: 'Coding',
    points: '2,420',
    badge: '',
  },
  {
    id: 'team-5',
    rank: '05',
    name: 'Neural Knights',
    track: 'AI & Autonomous',
    status: 'Coding',
    points: '2,390',
    badge: '',
  },
]
