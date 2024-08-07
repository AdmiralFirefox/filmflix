import React, { FC, useState, useEffect } from "react";
import Axios from "axios";
import { options } from "../../utils/options";
import Image from "next/legacy/image";
import BackdropFallback from "../../assets/fallbacks/BackdropFallback.jpg";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import styles from "../../styles/TVs/TVEpisodes.module.scss";

interface EpisodeProp {
  episodeData: {
    id: number;
    still_path: string;
    episode_number: number;
    name: string;
    overview: string;
  }[];
}

interface CurrentSeasonProp {
  currentSeason: string;
  id: number;
}

const LoadMoreEpisodeButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "#0071EB",
  "&:hover": {
    backgroundColor: "hsl(211, 100%, 60%)",
  },
}));

const TVEpisodes: FC<CurrentSeasonProp> = ({ currentSeason, id }) => {
  const [episodes, setEpisodes] = useState<EpisodeProp["episodeData"]>([]);

  const [currentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = episodes.slice(indexOfFirstItem, indexOfLastItem);

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 10);
  };

  useEffect(() => {
    let isMounted = true;
    const displayEpisodesData = async () => {
      try {
        const res = await Axios.get(
          `https://api.themoviedb.org/3/tv/${id}/season/${currentSeason}?language=en-US`,
          options
        );
        // console.log(res.data);
        if (isMounted) {
          setEpisodes(res.data.episodes);
        }
      } catch (err) {
        console.log(err);
      }
    };

    displayEpisodesData();

    return () => {
      isMounted = false;
    };
  }, [id, currentSeason]);

  return (
    <>
      {currentItems.map((episode) => {
        return (
          <div key={episode.id}>
            <div className={styles["tv-episode-info"]}>
              <div>
                {episode.still_path !== null ? (
                  <div className={styles["tv-episode-image"]}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`}
                      alt={`Episode ${episode.episode_number} Poster`}
                      width={400}
                      height={200}
                      layout="responsive"
                      objectFit="cover"
                      objectPosition="center"
                      priority={true}
                      unoptimized={true}
                    />
                  </div>
                ) : (
                  <div className={styles["tv-episode-image"]}>
                    <Image
                      src={BackdropFallback}
                      alt="Fallback Poster"
                      width={400}
                      height={200}
                      layout="responsive"
                      objectFit="cover"
                      objectPosition="center"
                      priority={true}
                    />
                  </div>
                )}
              </div>

              <div className={styles["tv-episode-content"]}>
                <h2>
                  Season {currentSeason}, Episode {episode.episode_number}
                </h2>
                <h2>{episode.name}</h2>
              </div>
            </div>

            <div className={styles["tv-episode-overview"]}>
              {episode.overview === "" ? (
                <p>Overview Unvailable...</p>
              ) : (
                <p>{episode.overview}</p>
              )}
            </div>
          </div>
        );
      })}

      <div className={styles["tv-episode-button-wrapper"]}>
        <LoadMoreEpisodeButton
          variant="contained"
          onClick={handleLoadMore}
          disabled={currentItems.length === episodes.length}
        >
          Load More
        </LoadMoreEpisodeButton>
      </div>
    </>
  );
};

export default TVEpisodes;
