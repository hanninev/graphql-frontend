import { gql, useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'

const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born)  {
      name
      born
    }
  }
`

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBorn] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>

      <div>
        <form onSubmit={submit}>
          <div>
            name
            <select value={name} onChange={({ target }) => setName(target.value)}>
              {result.data.allAuthors.map((a) => (
                <option value={a.name}>{a.name}</option>
              ))}

            </select>
          </div>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>


  )
}

export default Authors
