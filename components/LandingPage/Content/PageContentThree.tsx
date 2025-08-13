import React, { FC } from "react";
import Image from "next/legacy/image";
import Kids from "../../../assets/landingpage/Kids.png";
import Divider from "@mui/material/Divider";
import styles from "../../../styles/LandingPage/Content/PageContentThree.module.scss";

const PageContentThree: FC = () => {
  return (
    <>
      <div className={styles["page-content-three-wrapper"]}>
        <div className={styles["page-content-three-title"]}>
          <h1 className={styles["page-content-three-info"]}>
            Create Kid-friendly profiles.
          </h1>
          <p className={styles["page-content-three-description"]}>
            Let children explore adventures with their favorite characters in a
            safe and personalized space
          </p>
        </div>
        <div className={styles["page-content-three-image"]}>
          <Image src={Kids} alt="" width={540} height={400} objectFit="cover" />
        </div>
      </div>

      <Divider
        className={styles["content-divider"]}
        sx={{ margin: "4em 0em" }}
      />
    </>
  );
};

export default PageContentThree;
