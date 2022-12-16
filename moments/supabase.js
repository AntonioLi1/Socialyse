import { createClient } from '@supabase/supabase-js'
import { setupURLPolyfill } from 'react-native-url-polyfill'
import AsyncStorage from '@react-native-async-storage/async-storage';


const SUPABASE_URL = 'https://pvwkpnxfzyaitdmcyxgp.supabase.co'
const SUPABASE_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2d2twbnhmenlhaXRkbWN5eGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA1NzUyNDAsImV4cCI6MTk4NjE1MTI0MH0.z6Q6e5TrQU8bOn8tDP1Xjdw_KbB-m8c-OYv_U5MoPVc"


setupURLPolyfill()

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLIC_KEY,
    {
      auth: {
        detectSessionInUrl: false,
        storage: AsyncStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  )


export default supabase

// const supabaseUrl = "https://nxajryhnqdissicppzlo.supabase.co"
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54YWpyeWhucWRpc3NpY3BwemxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM0OTg0ODIsImV4cCI6MTk3OTA3NDQ4Mn0.pz4nHHISZv-zLvSpU6oUWddvqdszGBOOGsRitghuuPQ"

// testing
// const supabaseUrl = 'https://pvwkpnxfzyaitdmcyxgp.supabase.co'
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2d2twbnhmenlhaXRkbWN5eGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA1NzUyNDAsImV4cCI6MTk4NjE1MTI0MH0.z6Q6e5TrQU8bOn8tDP1Xjdw_KbB-m8c-OYv_U5MoPVc"

// export const supabase = createClient(supabaseUrl, supabaseKey,
//     {
//         localStorage: AsyncStorage,
//     }
    

// )



