import React, { useEffect, useState } from "react";

function Movie() {
  const [input, setInput] = useState("");
  const [movie, setMovie] = useState("");
  const [data, setData] = useState(null);

  const find = () => {
    setMovie(input);
    setInput("");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!movie) return;

      const response = await fetch(
        `https://www.omdbapi.com/?t=${movie}&apikey=8259a81f`,
      );
      const result = await response.json();
      setData(result);
      console.log(result);
    };

    fetchData();
  }, [movie]);

  return (
    <>
      <div className="input-con">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter movie name"
        />
        <button onClick={find}>Search movie</button>
      </div>
      <div className="movie-con">
        {data && data.Response === "True" && (
          <div className="movie-info">
            <img src={data.Poster} /> <br /> <br />
            <h1>{data.Title}</h1> <br />
            <h2>{data.Language}</h2>
            <br />
            <h4>Released Date: {data.Released}</h4>
          </div>
        )}

        {data && data.Response === "False" && <p>{data.Error}</p>}
      </div>
    </>
  );
}

export default Movie;
