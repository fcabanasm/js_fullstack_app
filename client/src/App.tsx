import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { IPublication } from "./interfaces/IPublication";
import Publication from "./components/Publication";

function App() {
  const [publications, setPublications] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("/api/publications", {});
    setPublications(response.data);
  };

  const handleDelete = async (
    event: React.FormEvent<HTMLInputElement>,
    id: string
  ) => {
    event.preventDefault();
    const response = await axios.delete(`/api/publications/${id}`);
    if (response.data.softDeleted)
      setPublications(
        publications.filter(
          (publication: IPublication) => publication._id !== id
        )
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-4x1 text-blue-500 ">Vite Project</h1>
      {publications.map((publication) => (
        <Publication publication={publication} handleDelete={handleDelete} />
      ))}
    </>
  );
}

export default App;
