import React, { FC, useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import { TrendingTVIDContext } from "./TrendingTVs";
import Axios from "axios";
import { options } from "../../../utils/options";
import Image from "next/legacy/image";
import MoreTVInfoButton from "../../Buttons/TrendingTVs/MoreTVInfoButton";
const PlayTVVideoButton = dynamic(
  () => import("../../Buttons/TrendingTVs/PlayTVVideoButton")
);
import Skeleton from "@mui/material/Skeleton";
import FallbackButton from "../../Buttons/FallbackButton/FallbackButton";
const TVModal = dynamic(() => import("../../Modal/TVs/TVModal"));
import styles from "../../../styles/Trending/TrendingTVs/TrendingTVInfo.module.scss";

interface TVGenreProp {
  tvGenreData: {
    id: number;
    name: string;
  }[];
}

interface TrendingTVInfoProps {
  backdropPath: string;
  name: string;
  overview: string;
}

interface LanguageProps {
  languageData: {
    english_name: string;
  }[];
}

const TrendingTVInfo: FC<TrendingTVInfoProps> = ({
  backdropPath,
  name,
  overview,
}) => {
  const [trendingTVInfo, setTrendingTVInfo] = useState({
    name: "",
    overview: "",
    first_air_date: 0,
    number_of_episodes: 0,
    number_of_seasons: 0,
    status: "",
    last_air_date: 0,
    id: 0,
  });

  const [genresTV, setGenresTV] = useState<TVGenreProp["tvGenreData"]>([]);

  const [spokenLanguages, setSpokenLanguages] = useState<
    LanguageProps["languageData"]
  >([]);

  const TrendingTVID = useContext(TrendingTVIDContext);

  // Trending TV Modal Info
  const [openTrendingTVModal, setOpenTrendingTVModal] = useState(false);

  const [isMounted, setIsMounted] = useState(true);

  const handleOpenTrendingTVModal = (): void => {
    setOpenTrendingTVModal(true);
  };

  const handleCloseTrendingTVModal = (): void => {
    setOpenTrendingTVModal(false);
  };

  useEffect(() => {
    const displayTrendingTV = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/tv/${TrendingTVID}?language=en-US`,
          options
        );
        // console.log(res.data);
        if (isMounted) {
          setGenresTV(res.data.genres);
          setTrendingTVInfo(res.data);
          setSpokenLanguages(res.data.spoken_languages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayTrendingTV();

    return () => {
      setIsMounted(false);
    };
  }, [TrendingTVID, isMounted]);

  //Limiting the Words in Overview
  let limitText = (text: string, limit: number) => {
    if (text.length > limit) {
      for (let i = limit; i > 0; i--) {
        if (
          text.charAt(i) === " " &&
          (text.charAt(i - 1) != "," ||
            text.charAt(i - 1) != "." ||
            text.charAt(i - 1) != ";")
        ) {
          return text.substring(0, i) + "...";
        }
      }
      return text.substring(0, limit) + "...";
    } else return text;
  };

  return (
    <>
      <TVModal
        openTVModal={openTrendingTVModal}
        handleCloseTVInfo={handleCloseTrendingTVModal}
        overview={trendingTVInfo.overview}
        genresTV={genresTV}
        dateAired={trendingTVInfo.first_air_date}
        episodes={trendingTVInfo.number_of_episodes}
        seasons={trendingTVInfo.number_of_seasons}
        status={trendingTVInfo.status}
        lastDateAired={trendingTVInfo.last_air_date}
        name={trendingTVInfo.name}
        id={trendingTVInfo.id}
        spokenLanguages={spokenLanguages}
      />

      {backdropPath !== "" ? (
        <div className={styles["trending-tv-img"]}>
          <Image
            src={`https://image.tmdb.org/t/p/w1280/${backdropPath}`}
            alt="TV Poster"
            priority={true}
            layout="fill"
            objectFit="cover"
            objectPosition="center top"
            unoptimized={true}
          />
        </div>
      ) : (
        <>
          <Skeleton variant="rectangular" id={styles["trending-tv-skeleton"]} />
        </>
      )}
      <div className={styles["trending-tv-content"]}>
        <div className={styles["trending-tv-title"]}>
          <h1>{name}</h1>
        </div>
        <div className={styles["trending-tv-overview"]}>
          <p>{limitText(overview, 500)}</p>
        </div>
        <div className={styles["trending-tv-button-wrapper"]}>
          {trendingTVInfo.id !== 0 ? (
            <>
              <PlayTVVideoButton id={trendingTVInfo.id} />
            </>
          ) : (
            <FallbackButton />
          )}

          <MoreTVInfoButton
            handleOpenTrendingTVModal={handleOpenTrendingTVModal}
          />
        </div>
      </div>
      <div className={styles["trending-tv-gradient-shadow"]}></div>
    </>
  );
};

export default TrendingTVInfo;
