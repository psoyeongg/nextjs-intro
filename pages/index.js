import { useState, useEffect } from "react";
import Seo from "../components/Seo";

const  API_KEY = "f0d901061752dd9758fcd068aa9b8c3a"

export default function Home() {
  const [movies, setMovies] = useState();

  useEffect(() => {
    (async () => {
      const { results } = await ( 
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
          )
        ).json();
      setMovies(results);
    })();
  }, []);

  return (
    <div>
      <Seo title="Home" />
      {!movies && <h4>Loading...</h4>}
      {movies && movies.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  );
}
