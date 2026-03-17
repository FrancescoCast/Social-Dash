import { useState, useEffect, useMemo } from 'react'
import StatCard from './components/StatCard'
import LongestPostCard from './components/LongestPostCard'
import UsersTable from './components/UsersTable'
import UsersMobileList from './components/UsersMobileList'
import PostsModal from './components/PostsModal'
import Spinner from './components/Spinner'
import './App.css'

export default function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dark, setDark] = useState(false)
  const [sort, setSort] = useState({ key: null, dir: 'asc' })
  const [selectedUser, setSelectedUser] = useState(null)

  const postCounts = useMemo(() => {
    const counts = {}
    users.forEach(u => (counts[u.id] = 0))
    posts.forEach(p => {
      if (counts[p.userId] !== undefined) counts[p.userId]++
    })
    return counts
  }, [posts, users])

  
  const longestPost = useMemo(() => {
    if (posts.length === 0) return null
    let maxLen = 0
    let maxPost = null
    posts.forEach(p => {
      if (p.title.length > maxLen) { maxLen = p.title.length; maxPost = p }
    })
    if (!maxPost) return null
    const author = users.find(u => u.id === maxPost.userId)
    if (!author) return null
    return { post: maxPost, user: author, length: maxLen }
  }, [posts, users])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
      fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json()),
    ])
      .then(([usersData, postsData]) => {
        setUsers(usersData)
        setPosts(postsData)
        setLoading(false)
      })
      .catch(() => {
        setError('Impossibile caricare i dati. Controlla la connessione.')
        setLoading(false)
      })
  }, [])

  const handleSort = key => {
    setSort(prev =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'asc' }
    )
  }

  const sortedUsers = [...users].sort((a, b) => {
    if (!sort.key) return 0
    if (sort.key === 'posts') {
      const valA = postCounts[a.id] ?? 0
      const valB = postCounts[b.id] ?? 0
      return sort.dir === 'asc' ? valA - valB : valB - valA
    }
    const get = u => ({ name: u.name, email: u.email, city: u.address.city, company: u.company.name })[sort.key]?.toLowerCase() ?? ''
    const valA = get(a)
    const valB = get(b)
    if (valA < valB) return sort.dir === 'asc' ? -1 : 1
    if (valA > valB) return sort.dir === 'asc' ? 1 : -1
    return 0
  })

  const deleteUser = id => {
    setUsers(prev => prev.filter(u => u.id !== id))
    setPosts(prev => prev.filter(p => p.userId !== id))
    if (selectedUser?.id === id) setSelectedUser(null)
  }

  const deletePost = postId => {
    setPosts(prev => prev.filter(p => p.id !== postId))
  }

  const userPosts = selectedUser
    ? posts.filter(p => p.userId === selectedUser.id)
    : []

  const netCount = users.filter(u => u.email.endsWith('.net')).length
  const comCount = users.filter(u => u.email.endsWith('.com')).length
  const totalPosts = Object.values(postCounts).reduce((a, b) => a + b, 0)

  if (loading) return <Spinner />
  if (error) return <div className="error-state"><p>{error}</p></div>

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <div>
            <p className="app-label">Social Media Manager</p>
            <h1 className="app-title">Dashboard utenti</h1>
          </div>
          <button className="theme-toggle" onClick={() => setDark(d => !d)} aria-label="Cambia tema">
            {dark ? '☀ Light' : '☾ Dark'}
          </button>
        </div>
      </header>

      <div className="stats-grid">
        <StatCard label="Utenti attivi" value={users.length} />
        <StatCard label="Post totali" value={totalPosts} />
        <StatCard label="Email .net" value={netCount} suffix={`/ ${users.length}`} />
        <StatCard label="Email .com" value={comCount} suffix={`/ ${users.length}`} />
      </div>

      {longestPost && <LongestPostCard data={longestPost} />}

      <UsersTable
        users={sortedUsers}
        postCounts={postCounts}
        longestUserId={longestPost?.user?.id}
        onDelete={deleteUser}
        onViewPosts={setSelectedUser}
        sort={sort}
        onSort={handleSort}
      />

      <UsersMobileList
        users={sortedUsers}
        postCounts={postCounts}
        longestUserId={longestPost?.user?.id}
        onDelete={deleteUser}
        onViewPosts={setSelectedUser}
        sort={sort}
        onSort={handleSort}
      />

      {selectedUser && (
        <PostsModal
          user={selectedUser}
          posts={userPosts}
          onClose={() => setSelectedUser(null)}
          onDeletePost={deletePost}
        />
      )}
    </div>
  )
}