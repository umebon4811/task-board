import { useState } from 'react'
import { supabase } from '../lib/supabase.js'

// パスワードの最小文字数（Supabase の初期設定に合わせる）
const MIN_PASSWORD_LENGTH = 6

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // 会員登録処理
  async function signupUser(e) {
    e.preventDefault()
    setErrorMessage('')
    setInfoMessage('')
    setSubmitting(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // 確認メールのリンクからこのアプリに戻ってこられるようにする
      options: { emailRedirectTo: window.location.origin + window.location.pathname },
    })
    setSubmitting(false)
    if (error) {
      setErrorMessage('会員登録に失敗しました：' + error.message)
      return
    }
    // メール確認が有効な場合はセッションが返らないので案内を出す
    // （確認が無効ならそのままログイン状態になり、物件一覧へ遷移する）
    if (!data.session) {
      setInfoMessage('確認メールを送信しました。メール内のリンクを開いてからログインしてください。')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={signupUser}>
        <h1>会員登録</h1>
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
          パスワード（{MIN_PASSWORD_LENGTH}文字以上）
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={MIN_PASSWORD_LENGTH}
            required
          />
        </label>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {infoMessage && <p className="info">{infoMessage}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? '登録中…' : '登録する'}
        </button>
        <p className="auth-link">
          すでにアカウントをお持ちの方は <a href="#/login">ログイン</a>
        </p>
      </form>
    </div>
  )
}
