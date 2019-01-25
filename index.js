const { ApolloServer, gql } = require('apollo-server')
const faker = require('faker')

// console.log(faker.company.companyName(), faker.name.findName())
const books = [
  {
    title: faker.company.companyName(),
    author: faker.name.findName()
  },
  {
    title: faker.company.companyName(),
    author: faker.name.findName()
  }
]

const typeDefs = gql`
  type Book {
    title: String,
    author: String
  }

  type MockInfo {
    a: String
    b: String
  }

  type Query {
    books: [Book],
    test: MockInfo
  }

  type Mutation {
    addBook (title: String, author: String) : Book
  }
`
const resolvers = {
  Query: {
    books: () => books
    // mock: () => test
  },
  Mutation: {
    addBook: (a, book) => {
      console.log(book)
      return book
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: true,
  introspection: true,
  playground: true
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))
