import React, { FC } from "react";
import Image from "next/image";
import Watch from "../../../assets/landingpage/Watch.gif";
import styles from "../../../styles/LandingPage/Content/PageContentTwo.module.scss";

const PageContentTwo: FC = () => {
  return (
    <div className={styles["page-content-two-wrapper"]}>
      <div className={styles["page-content-two-title"]}>
        <h1 className={styles["page-content-two-info"]}>Watch everywhere.</h1>
        <p className={styles["page-content-two-description"]}>
          Stream unlimited movies and TV shows on your phone, tablet, laptop,
          and TV.
        </p>
      </div>
      <div className={styles["page-content-two-image"]}>
        <Image src={Watch} alt="" width={460} height={350} objectFit="cover" />
      </div>
    </div>
  );
};

export default PageContentTwo;
