import { gql, useQuery } from '@apollo/client'

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

const FAVORITE_GENRE = gql`
query {
    me {
      favoriteGenre
    }
  }`

const Recommendations = (props) => {
    const me = useQuery(FAVORITE_GENRE, {});
    const result = useQuery(ALL_BOOKS, {
        variables: { genre: me?.data?.me?.favoriteGenre },
        pollInterval: 2000
      });

      console.log(me);

      if (!props.show) {
        return null
      }

    if (me?.data?.me?.favoriteGenre) {

  if (result.loading || me.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      {'books in your favorite genre ' + me.data.me.favoriteGenre}

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
    </div>
  )
}
return ('You have not favorite genre!')
}

export default Recommendations
