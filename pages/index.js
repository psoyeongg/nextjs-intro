import { useState, useEffect } from "react";
import Seo from "../components/Seo";


export default function Home() {
  const [movies, setMovies] = useState();

  useEffect(() => {
    // async 부분이 익명 함수(재사용 불가)로 작성되었고, 익명 함수는 즉시 실행해야하기 때문에 ()를 이용해 익명 함수를 바로 호출
    (async () => {
      const { results } = await ( 
        await fetch('/api/movies')
        ).json();
      setMovies(results);
    })();
  }, []);

  return (
    <div className='container'>
      <Seo title="Home" />
      {!movies && <h4>Loading...</h4>}
      {movies && movies.map((movie) => (
        <div className='movie' key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
