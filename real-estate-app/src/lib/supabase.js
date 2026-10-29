import { createClient } from '@supabase/supabase-js'

// 接続情報は .env から読み込む（.env は Git に含めない）
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('.env に VITE_SUPABASE_URL と VITE_SUPABASE_PUBLISHABLE_KEY を設定してください')
}

// アプリ全体で共有する Supabase クライアント
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
