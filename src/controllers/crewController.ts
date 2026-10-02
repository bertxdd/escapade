import { ensureSupabaseClient } from '../lib/supabase'
import type {
  Crew,
  LeaderboardEntry,
  CrewWithEscapeTime,
} from '../models/crewModel'

export const getCrews = async (): Promise<CrewWithEscapeTime[]> => {
  const supabase = ensureSupabaseClient()

  const { data: crews, error: crewError } = await supabase
    .from('Crew')
    .select('*')
    .order('created_at', { ascending: false })

  if (crewError) {
    console.error('Crew fetch error:', crewError)
    throw new Error('Unable to load crews.')
  }

  const { data: leaderboard, error: leaderboardError } = await supabase
    .from('leaderboard')
    .select('*')

  if (leaderboardError) {
    console.error('Leaderboard fetch error:', leaderboardError)
    throw new Error('Unable to load escape times.')
  }

  return (crews as Crew[]).map((crew) => {
    const entry = (leaderboard as LeaderboardEntry[]).find(
      (item) => item.Crew_id === crew.id
    )

    return {
      ...crew,
      escape_time: entry?.escape_time ?? null,
    }
  })
}

export const addCrew = async (
  crew_name: string,
  escape_time: number
) => {
  const supabase = ensureSupabaseClient()
  const trimmedName = crew_name.trim()

  // Check if crew name already exists
  const { data: existingCrew, error: checkError } = await supabase
    .from('Crew')
    .select('id, crew_name')
    .ilike('crew_name', trimmedName)
    .maybeSingle()

  if (checkError) {
    console.error('Crew name check error:', checkError)
    throw new Error('Unable to check crew name.')
  }

  if (existingCrew) {
    throw new Error(
      `Crew name "${existingCrew.crew_name}" already exists.`
    )
  }

  const { data: crew, error: crewError } = await supabase
    .from('Crew')
    .insert([
      {
        crew_name: trimmedName,
      },
    ])
    .select()
    .single()

  if (crewError) {
    console.error('Crew insert error:', crewError)
    throw new Error('Unable to add crew.')
  }

  const { error: leaderboardError } = await supabase
    .from('leaderboard')
    .insert([
      {
        Crew_id: crew.id,
        escape_time,
      },
    ])

  if (leaderboardError) {
    console.error('Leaderboard insert error:', leaderboardError)

    await supabase
      .from('Crew')
      .delete()
      .eq('id', crew.id)

    throw new Error('Unable to save escape time.')
  }

  return crew
}

export const updateCrew = async (
  id: string,
  crew_name: string,
  escape_time: number
) => {
  const supabase = ensureSupabaseClient()
  const trimmedName = crew_name.trim()

  // Check if another crew already has this name
  const { data: existingCrew, error: checkError } = await supabase
    .from('Crew')
    .select('id, crew_name')
    .ilike('crew_name', trimmedName)
    .neq('id', id)
    .maybeSingle()

  if (checkError) {
    console.error('Crew name check error:', checkError)
    throw new Error('Unable to check crew name.')
  }

  if (existingCrew) {
    throw new Error(
      `Crew name "${existingCrew.crew_name}" already exists.`
    )
  }

  const { error: crewError } = await supabase
    .from('Crew')
    .update({
      crew_name: trimmedName,
    })
    .eq('id', id)

  if (crewError) {
    console.error('Crew update error:', crewError)
    throw new Error('Unable to update crew.')
  }

  const { data: leaderboardEntry, error: findError } = await supabase
    .from('leaderboard')
    .select('id')
    .eq('Crew_id', id)
    .maybeSingle()

  if (findError) {
    console.error('Leaderboard lookup error:', findError)
    throw new Error('Unable to find escape time.')
  }

  if (leaderboardEntry) {
    const { error: updateError } = await supabase
      .from('leaderboard')
      .update({
        escape_time,
      })
      .eq('id', leaderboardEntry.id)

    if (updateError) {
      console.error('Escape time update error:', updateError)
      throw new Error('Unable to update escape time.')
    }
  } else {
    const { error: insertError } = await supabase
      .from('leaderboard')
      .insert([
        {
          Crew_id: id,
          escape_time,
        },
      ])

    if (insertError) {
      console.error('Escape time insert error:', insertError)
      throw new Error('Unable to save escape time.')
    }
  }
}

export const deleteCrew = async (id: string) => {
  const supabase = ensureSupabaseClient()

  const { error: leaderboardError } = await supabase
    .from('leaderboard')
    .delete()
    .eq('Crew_id', id)

  if (leaderboardError) {
    console.error('Leaderboard delete error:', leaderboardError)
    throw new Error('Unable to delete escape time.')
  }

  const { error: crewError } = await supabase
    .from('Crew')
    .delete()
    .eq('id', id)

  if (crewError) {
    console.error('Crew delete error:', crewError)
    throw new Error('Unable to delete crew.')
  }
}