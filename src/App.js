import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  console.log(token);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
        (<><button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommandations</button>
        <button onClick={() => logout()}>logout</button></>) :
        (<button onClick={() => setPage('login')}>login</button>)
}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <Recommendations show={page === 'recommendations'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
