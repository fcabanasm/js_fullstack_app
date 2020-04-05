import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { Container } from "@material-ui/core";
import Publications from "./components/Publications";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [publications, setPublications] = useState([]);

  const fetchData = () => {
    axios.get("/api/publications").then((res) => {
      const publications = _.filter(res.data, (publication) => {
        return publication.story_title || publication.title;
      });
      setPublications(_.orderBy(publications, ["created_at"], ["desc"]));
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/publications/${id}`).then((res) => {
      setPublications(
        _.filter(publications, (publication) => {
          return publication._id !== id;
        })
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Container>
          <main>
            <Publications
              publications={publications}
              handleDelete={handleDelete}
            />
          </main>
        </Container>
      </header>
    </div>
  );
};

export default App;
