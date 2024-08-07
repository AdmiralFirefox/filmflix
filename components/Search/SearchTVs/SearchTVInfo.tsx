import React, { FC, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import PosterFallback from "../../../assets/fallbacks/PosterFallback.jpg";
import { SearchTVIDContext } from "./SearchTVs";
import Axios from "axios";
import { options } from "../../../utils/options";
import styles from "../../../styles/Search/SearchTVs/SearchTVInfo.module.scss";
const TVModal = dynamic(() => import("../../Modal/TVs/TVModal"));

interface TVGenreProp {
  tvGenreData: {
    id: number;
    name: string;
  }[];
}

interface SearchTVInfoProps {
  posterPath: string;
  voteAverage: number;
}
interface LanguageProps {
  languageData: {
    english_name: string;
  }[];
}

const SearchTVInfo: FC<SearchTVInfoProps> = ({ posterPath, voteAverage }) => {
  const [searchTVInfo, setSearchTVInfo] = useState({
    overview: "",
    first_air_date: 0,
    number_of_episodes: 0,
    number_of_seasons: 0,
    status: "",
    last_air_date: 0,
    name: "",
    id: 0,
  });

  const [genresTV, setGenresTV] = useState<TVGenreProp["tvGenreData"]>([]);

  const [spokenLanguages, setSpokenLanguages] = useState<
    LanguageProps["languageData"]
  >([]);

  const [isMounted, setIsMounted] = useState(true);

  const SearchTVID = useContext(SearchTVIDContext);

  const [openSearchTVModal, setSearchOpenTVModal] = useState(false);

  const handleOpenSearchTVInfo = (): void => {
    setSearchOpenTVModal(true);
  };

  const handleCloseSearchTVInfo = (): void => {
    setSearchOpenTVModal(false);
  };

  useEffect(() => {
    const displayTVInfoData = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/tv/${SearchTVID}?language=en-US`,
          options
        );
        // console.log(res.data);
        if (isMounted) {
          setSearchTVInfo(res.data);
          setGenresTV(res.data.genres);
          setSpokenLanguages(res.data.spoken_languages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayTVInfoData();

    return () => {
      setIsMounted(false);
    };
  }, [SearchTVID, isMounted]);

  return (
    <>
      <TVModal
        openTVModal={openSearchTVModal}
        handleCloseTVInfo={handleCloseSearchTVInfo}
        overview={searchTVInfo.overview}
        genresTV={genresTV}
        dateAired={searchTVInfo.first_air_date}
        episodes={searchTVInfo.number_of_episodes}
        seasons={searchTVInfo.number_of_seasons}
        status={searchTVInfo.status}
        lastDateAired={searchTVInfo.last_air_date}
        name={searchTVInfo.name}
        id={searchTVInfo.id}
        spokenLanguages={spokenLanguages}
      />
      {posterPath !== "" ? (
        <>
          {posterPath !== null ? (
            <div className={styles["search-tv-container"]}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
                alt="TV Poster"
                priority={true}
                layout="responsive"
                width={350}
                height={500}
                objectFit="cover"
                unoptimized={true}
              />

              <div className={styles["search-tv-overlay"]}>
                <div className={styles["search-tv-vote-average"]}>
                  {voteAverage !== 0 ? (
                    <h1>{Math.round(voteAverage * 10) / 10}</h1>
                  ) : (
                    <h1>N/A</h1>
                  )}
                </div>
                <div
                  onClick={handleOpenSearchTVInfo}
                  className={styles["search-tv-info-icon"]}
                >
                  <i className="fas fa-info-circle"></i>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles["search-tv-container"]}>
              <Image
                src={PosterFallback}
                alt="Movie Poster"
                loading="lazy"
                layout="responsive"
                width={350}
                height={500}
                objectFit="cover"
              />

              <div className={styles["search-tv-overlay"]}>
                <div className={styles["search-tv-vote-average"]}>
                  {voteAverage !== 0 ? (
                    <h1>{Math.round(voteAverage * 10) / 10}</h1>
                  ) : (
                    <h1>N/A</h1>
                  )}
                </div>
                <div
                  onClick={handleOpenSearchTVInfo}
                  className={styles["search-tv-info-icon"]}
                >
                  <i className="fas fa-info-circle"></i>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles["search-tv-container"]}>
          <Image
            src={PosterFallback}
            alt="Movie Poster"
            loading="lazy"
            layout="responsive"
            width={350}
            height={500}
            objectFit="cover"
          />

          <div className={styles["search-tv-overlay"]}>
            <div className={styles["search-tv-vote-average"]}>
              {voteAverage !== 0 ? (
                <h1>{Math.round(voteAverage * 10) / 10}</h1>
              ) : (
                <h1>N/A</h1>
              )}
            </div>
            <div
              onClick={handleOpenSearchTVInfo}
              className={styles["search-tv-info-icon"]}
            >
              <i className="fas fa-info-circle"></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchTVInfo;
