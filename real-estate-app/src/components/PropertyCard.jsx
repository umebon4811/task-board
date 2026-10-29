import { useState } from 'react'
import PropertyForm from './PropertyForm.jsx'

// 家賃を「¥128,000」の形式にする
function formatRent(rent) {
  return '¥' + rent.toLocaleString('ja-JP')
}

// 物件1件分のカード。編集ボタンでカード内が編集フォームに切り替わる
export default function PropertyCard({ property, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)

  // 編集内容を保存し、成功したら表示モードに戻す
  async function updateProperty(values) {
    const error = await onUpdate(property.id, values)
    if (!error) setEditing(false)
    return error
  }

  if (editing) {
    return (
      <li className="property-card">
        <PropertyForm
          initialValues={property}
          submitLabel="更新する"
          onSubmit={updateProperty}
          onCancel={() => setEditing(false)}
        />
      </li>
    )
  }

  return (
    <li className="property-card">
      <h2 className="property-name">{property.name}</h2>
      <p className="property-rent">
        {formatRent(property.rent)}
        <span className="property-rent-unit"> / 月</span>
      </p>
      <p className="property-area">
        {property.area}
        <span className="property-layout">{property.layout}</span>
      </p>
      <div className="card-buttons">
        <button type="button" className="secondary-button" onClick={() => setEditing(true)}>
          編集
        </button>
        <button type="button" className="danger-button" onClick={() => onDelete(property)}>
          削除
        </button>
      </div>
    </li>
  )
}
