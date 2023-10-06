import { RoutesApp } from "./config/Security/Routes/RoutesApp"
import Layout from "./components/Layout/Layout"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({

  uri: "http://localhost/graphql",

  cache: new InMemoryCache()
})


const App = () => {

  return (
    <>
      <ApolloProvider client={client}>
        <Layout>
          <RoutesApp />
        </Layout>
      </ApolloProvider>
    </>
  )
}

export default App
