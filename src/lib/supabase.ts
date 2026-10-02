import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

//Checks env variables
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase environment variables are missing! Check your .env file.')
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)