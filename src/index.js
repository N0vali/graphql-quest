import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ApolloClient,ApolloProvider, InMemoryCache, useQuery, gql } from '@apollo/client';


const LAUNCHES = gql`
query Getlaunches {
  launches(limit: 5) {
    launch_success
    rocket {
      rocket_name
    }
    links {
      video_link
    }
    details
  }
}
`;

function Launches() {
  const { loading, error, data } = useQuery(LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.launches.map(({ launch, rocket,i }) => (
    <div key={i}>
      <p>
        {launch}: {rocket.rocket_name}
      </p>
    </div>
  ));
}
const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      query Getlaunches {
        launches(limit: 5) {
          launch_success
          rocket {
            rocket_name
          }
          links {
            video_link
          }
          details
        }
      }
    `
  })
  .then(result => console.log(result));
  
  
  function App() {
    return (
      <div>
        <h2>My first Apollo app 🚀</h2>
      </div>
    );
  }
ReactDOM.render(
  <ApolloProvider client={client}>
  <App />
  <Launches/>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
