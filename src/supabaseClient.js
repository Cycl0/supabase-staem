import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabaseAuthKey = process.env.REACT_APP_SUPABASE_AUTH_KEY

export const supabase = createClient(supabaseUrl, 
supabaseAnonKey, {
  headers: {
    Authorization: supabaseAuthKey
  }
})
