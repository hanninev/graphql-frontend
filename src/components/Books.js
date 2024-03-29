import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
  }
}`

const ALL_GENRES = gql`
query {
  genres
}`

const Books = (props) => {
  const [genre, setGenre] = useState('')

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
    pollInterval: 2000
  });

  const allGenres = useQuery(ALL_GENRES, {
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }

  if (result.loading || allGenres.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      {genre.length > 0 && 'in genre ' + genre}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {allGenres.data.genres.map((genre) => (
        <button onClick={() => setGenre(genre)}>{genre}</button>
        ))}
        <button onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
