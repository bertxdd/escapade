import { ensureSupabaseClient } from '../lib/supabase'
import type { LoginData } from '../models/authModel'

export const loginUser = async ({ user_name, password }: LoginData) => {
  const username = user_name.trim()
  const supabase = ensureSupabaseClient()

  const { data: admin, error } = await supabase
    .from('admin')
    .select('id, user_name, password')
    .eq('user_name', username)
    .maybeSingle()

//for debugging for connection only
  console.log('ADMIN:', admin)
  console.log('ERROR:', error)

  if (error) {
    console.error('Supabase login error:', error)
    throw new Error('Unable to access admin table.')
  }

  if (!admin) {
    throw new Error('Username not found.')
  }

  if (admin.password !== password) {
    throw new Error('Incorrect password.')
  }

  return {
    id: admin.id,
    user_name: admin.user_name,
  }
}