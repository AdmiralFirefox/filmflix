import React, { FC, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { MovieIDContext } from "./MovieCarousel";
import Axios from "axios";
import { options } from "../../utils/options";
import Image from "next/legacy/image";
import PosterFallback from "../../assets/fallbacks/PosterFallback.jpg";
const MovieModal = dynamic(() => import("../Modal/Movies/MovieModal"));
import styles from "../../styles/Movies/MovieInfo.module.scss";

interface GenreProp {
  genreData: {
    id: number;
    name: string;
  }[];
}

interface MovieInfoProps {
  posterPath: string;
  voteAverage: number;
}

interface LanguageProps {
  languageData: {
    english_name: string;
  }[];
}

const MovieInfo: FC<MovieInfoProps> = ({ posterPath, voteAverage }) => {
  const [movieInfo, setMovieInfo] = useState({
    overview: "",
    release_date: 0,
    runtime: 0,
    status: "",
    title: "",
    id: 0,
  });

  const [genres, setGenres] = useState<GenreProp["genreData"]>([]);

  const [spokenLanguages, setSpokenLanguages] = useState<
    LanguageProps["languageData"]
  >([]);

  const movieID = useContext(MovieIDContext);

  const [openMovieModal, setOpenMovieModal] = useState(false);

  const [isMounted, setIsMounted] = useState(true);

  const handleOpenMovieModal = (): void => {
    setOpenMovieModal(true);
  };

  const handleCloseMovieModal = (): void => {
    setOpenMovieModal(false);
  };

  useEffect(() => {
    const displayMovieInfo = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
          options
        );
        // console.log(res.data);
        if (isMounted) {
          setMovieInfo(res.data);
          setGenres(res.data.genres);
          setSpokenLanguages(res.data.spoken_languages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayMovieInfo();

    return () => {
      setIsMounted(false);
    };
  }, [movieID, isMounted]);

  return (
    <>
      <MovieModal
        open={openMovieModal}
        handleCloseMovieModal={handleCloseMovieModal}
        overview={movieInfo.overview}
        releaseDate={movieInfo.release_date}
        genres={genres}
        runtime={movieInfo.runtime}
        status={movieInfo.status}
        title={movieInfo.title}
        id={movieInfo.id}
        spokenLanguages={spokenLanguages}
      />
      {posterPath !== null ? (
        <>
          {posterPath !== "" ? (
            <div className={styles["movie-container"]}>
              <Image
                src={`https://image.tmdb.org/t/p/w300/${posterPath}`}
                alt="Movie Poster"
                width={350}
                height={500}
                priority={true}
                unoptimized={true}
              />
              <div className={styles["movie-overlay"]}>
                <div className={styles["movie-vote-average"]}>
                  {voteAverage !== 0 ? (
                    <h1>{Math.round(voteAverage * 10) / 10}</h1>
                  ) : (
                    <h1>N/A</h1>
                  )}
                </div>
                <div
                  onClick={handleOpenMovieModal}
                  className={styles["movie-info-icon"]}
                >
                  <i className="fas fa-info-circle"></i>
                </div>
              </div>
            </div>
          ) : (
            <Image
              src={PosterFallback}
              alt="Movie Poster"
              width={350}
              height={500}
              priority={true}
            />
          )}
        </>
      ) : (
        <div className={styles["movie-container"]}>
          <Image
            src={PosterFallback}
            alt="Movie Poster"
            width={350}
            height={500}
            priority={true}
          />
          <div className={styles["movie-overlay"]}>
            <div className={styles["movie-vote-average"]}>
              {voteAverage !== 0 ? (
                <h1>{Math.round(voteAverage * 10) / 10}</h1>
              ) : (
                <h1>N/A</h1>
              )}
            </div>
            <div
              onClick={handleOpenMovieModal}
              className={styles["movie-info-icon"]}
            >
              <i className="fas fa-info-circle"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieInfo;
