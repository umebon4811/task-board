import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // ログイン処理。成功すると App 側でセッションの変化を検知して物件一覧へ遷移する
  async function loginUser(e) {
    e.preventDefault()
    setErrorMessage('')
    setSubmitting(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setSubmitting(false)
    if (error) {
      setErrorMessage('ログインに失敗しました：' + error.message)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={loginUser}>
        <h1>ログイン</h1>
        <label>
          メールアドレス
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? 'ログイン中…' : 'ログイン'}
        </button>
        <p className="auth-link">
          アカウントをお持ちでない方は <a href="#/signup">会員登録</a>
        </p>
      </form>
    </div>
  )
}
