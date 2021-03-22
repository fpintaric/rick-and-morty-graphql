import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import CharacterList from "./components/characterList/CharacterList";
import "./App.css";
import EpisodeList from "./components/episodeList/EpisodeList";
import LocationList from "./components/locationList/LocationList";
import ProjectInfo from "./components/projectInfo/ProjectInfo";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const { Content } = Layout;

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Layout className="layout">
          <Header />
          <Content className="content-container">
            <Switch>
              <Route exact path="/">
                <ProjectInfo />
              </Route>
              <Route path="/characters">
                <CharacterList />
              </Route>
              <Route path="/episodes">
                <EpisodeList />
              </Route>
              <Route path="/locations">
                <LocationList />
              </Route>
            </Switch>
          </Content>
          <Footer />
        </Layout>
      </ApolloProvider>
    </Router>
  );
}

export default App;
