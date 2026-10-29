import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase.js'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import PropertyListPage from './pages/PropertyListPage.jsx'

// ログインしていなくても見られる画面
const PUBLIC_ROUTES = ['/login', '/signup']

// URL のハッシュ（#/login など）から現在の画面を取り出す
function getRoute() {
  return window.location.hash.replace(/^#/, '') || '/'
}

// 画面を切り替える（ハッシュを書き換えるだけ）
function navigate(path) {
  window.location.hash = path
}

export default function App() {
  const [route, setRoute] = useState(getRoute())
  const [session, setSession] = useState(null)
  // セッション確認が終わるまでは画面を出さない（一瞬ログイン画面が見えるのを防ぐ）
  const [loading, setLoading] = useState(true)

  // ハッシュの変化を監視して画面を切り替える
  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // 現在のセッションを取得し、ログイン・ログアウトを監視する
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  // ログイン状態に応じてリダイレクトする
  useEffect(() => {
    if (loading) return
    const isPublic = PUBLIC_ROUTES.includes(route)
    if (!session && !isPublic) {
      // 未ログインで保護された画面に来たらログイン画面へ
      navigate('/login')
    } else if (session && route !== '/properties') {
      // ログイン済みならログイン・登録画面は不要なので物件一覧へ
      navigate('/properties')
    }
  }, [loading, session, route])

  if (loading) {
    return <p className="loading">読み込み中…</p>
  }

  if (!session) {
    return route === '/signup' ? <SignupPage /> : <LoginPage />
  }

  return <PropertyListPage session={session} />
}
