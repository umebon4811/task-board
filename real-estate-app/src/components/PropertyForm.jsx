import { useState } from 'react'

// 間取りの入力候補
const LAYOUT_OPTIONS = ['1R', '1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3LDK', '4LDK']

// 新規登録・編集で共通の物件フォーム
export default function PropertyForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [rent, setRent] = useState(initialValues?.rent?.toString() ?? '')
  const [area, setArea] = useState(initialValues?.area ?? '')
  const [layout, setLayout] = useState(initialValues?.layout ?? '')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // 入力内容を整えて親に渡す。保存に失敗したらエラーを表示する
  async function submitProperty(e) {
    e.preventDefault()
    setErrorMessage('')
    setSubmitting(true)
    const error = await onSubmit({
      name: name.trim(),
      rent: Number(rent),
      area: area.trim(),
      layout: layout.trim(),
    })
    setSubmitting(false)
    if (error) {
      setErrorMessage('保存に失敗しました：' + error.message)
    }
  }

  return (
    <form className="property-form" onSubmit={submitProperty}>
      <label>
        物件名
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
      </label>
      <label>
        家賃（円）
        <input
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          min={0}
          step={1}
          required
        />
      </label>
      <label>
        エリア名
        <input value={area} onChange={(e) => setArea(e.target.value)} maxLength={100} required />
      </label>
      <label>
        間取り
        <input
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          list="layout-options"
          placeholder="例：1LDK"
          maxLength={20}
          required
        />
        <datalist id="layout-options">
          {LAYOUT_OPTIONS.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </label>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="form-buttons">
        <button type="submit" className="primary-button" disabled={submitting}>
          {submitting ? '保存中…' : submitLabel}
        </button>
        <button type="button" className="secondary-button" onClick={onCancel} disabled={submitting}>
          キャンセル
        </button>
      </div>
    </form>
  )
}
