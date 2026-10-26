import { useEffect, useState } from 'react'

const STORAGE_KEY = 'task-board.tasks'

// 保存済みのタスクを読み込む（読み込めない場合は空で始める）
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [text, setText] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // 保存できなくても画面上の操作は続けられるようにする
    }
  }, [tasks])

  function addTask(e) {
    e.preventDefault()
    const title = text.trim()
    if (!title) return
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }])
    setText('')
  }

  function toggleTask(id) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const remaining = tasks.filter((t) => !t.done).length

  return (
    <main className="board">
      <h1>タスクボード</h1>

      <form className="add-form" onSubmit={addTask}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力"
          aria-label="新しいタスク"
        />
        <button type="submit" disabled={!text.trim()}>
          追加
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty">タスクはまだありません</p>
      ) : (
        <>
          <p className="summary">
            未完了 {remaining} 件 / 全 {tasks.length} 件
          </p>
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={task.done ? 'task done' : 'task'}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="title">{task.title}</span>
                </label>
                <button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`「${task.title}」を削除`}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}
