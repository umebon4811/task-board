import { supabase } from '../lib/supabase.js'

// 表示用のダミー物件データ
const PROPERTIES = [
  { id: 1, name: 'グランメゾン渋谷', rent: 128000, area: '東京都渋谷区' },
  { id: 2, name: 'パークハイツ中野', rent: 89000, area: '東京都中野区' },
  { id: 3, name: 'リバーサイド横浜', rent: 102000, area: '神奈川県横浜市' },
  { id: 4, name: 'サンライズ大宮', rent: 76000, area: '埼玉県さいたま市' },
  { id: 5, name: 'ベイコート船橋', rent: 81000, area: '千葉県船橋市' },
  { id: 6, name: 'メゾン吉祥寺', rent: 115000, area: '東京都武蔵野市' },
]

// 家賃を「¥128,000」の形式にする
function formatRent(rent) {
  return '¥' + rent.toLocaleString('ja-JP')
}

export default function PropertyListPage({ session }) {
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
          <button type="button" className="logout-button" onClick={logoutUser}>
            ログアウト
          </button>
        </div>
      </header>
      <ul className="property-list">
        {PROPERTIES.map((property) => (
          <li key={property.id} className="property-card">
            <h2 className="property-name">{property.name}</h2>
            <p className="property-rent">
              {formatRent(property.rent)}
              <span className="property-rent-unit"> / 月</span>
            </p>
            <p className="property-area">{property.area}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
