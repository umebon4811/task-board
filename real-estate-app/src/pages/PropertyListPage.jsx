import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import PropertyCard from '../components/PropertyCard.jsx'
import PropertyForm from '../components/PropertyForm.jsx'

// 画面で使う列だけを取得する
const PROPERTY_COLUMNS = 'id, name, rent, area, layout, created_at'

export default function PropertyListPage({ session }) {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [adding, setAdding] = useState(false)

  // 一覧の取得（SELECT）。RLS により自分が登録した物件だけが返る
  useEffect(() => {
    async function fetchProperties() {
      const { data, error } = await supabase
        .from('properties')
        .select(PROPERTY_COLUMNS)
        // RLS と同じ条件を付けておくと、データベース側の検索が速くなる
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
      if (error) {
        setErrorMessage('物件の取得に失敗しました：' + error.message)
      } else {
        setProperties(data)
      }
      setLoading(false)
    }
    fetchProperties()
  }, [session.user.id])

  // 新規登録（INSERT）。user_id はデータベース側でログイン中のユーザーが自動で入る
  async function addProperty(values) {
    const { data, error } = await supabase
      .from('properties')
      .insert(values)
      .select(PROPERTY_COLUMNS)
      .single()
    if (error) return error
    setProperties((prev) => [data, ...prev])
    setAdding(false)
    return null
  }

  // 編集（UPDATE）。成功したら一覧の該当物件を差し替える
  async function updateProperty(id, values) {
    const { data, error } = await supabase
      .from('properties')
      .update(values)
      .eq('id', id)
      .select(PROPERTY_COLUMNS)
      .single()
    if (error) return error
    setProperties((prev) => prev.map((p) => (p.id === id ? data : p)))
    return null
  }

  // 削除（DELETE）。誤操作を防ぐため確認ダイアログを出す
  async function deleteProperty(property) {
    if (!window.confirm(`「${property.name}」を削除しますか？`)) return
    setErrorMessage('')
    const { error } = await supabase.from('properties').delete().eq('id', property.id)
    if (error) {
      setErrorMessage('削除に失敗しました：' + error.message)
      return
    }
    setProperties((prev) => prev.filter((p) => p.id !== property.id))
  }

  // ログアウト処理。App 側でセッションが消えたことを検知してログイン画面へ戻る
  async function logoutUser() {
    await supabase.auth.signOut()
  }

  return (
    <div className="property-page">
      <header className="header">
        <h1>物件一覧</h1>
        <div className="header-user">
          <span className="user-email">{session.user.email}</span>
          <button type="button" className="secondary-button" onClick={logoutUser}>
            ログアウト
          </button>
        </div>
      </header>

      {adding ? (
        <div className="add-panel">
          <h2>物件の新規登録</h2>
          <PropertyForm submitLabel="登録する" onSubmit={addProperty} onCancel={() => setAdding(false)} />
        </div>
      ) : (
        <button type="button" className="primary-button add-button" onClick={() => setAdding(true)}>
          ＋ 物件を登録
        </button>
      )}

      {errorMessage && <p className="error page-error">{errorMessage}</p>}

      {loading ? (
        <p className="empty">読み込み中…</p>
      ) : properties.length === 0 ? (
        <p className="empty">登録された物件はまだありません。</p>
      ) : (
        <ul className="property-list">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onUpdate={updateProperty}
              onDelete={deleteProperty}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
