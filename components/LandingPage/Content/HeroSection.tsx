import React, { FC } from "react";
import Link from "next/link";
import LandingPageRedButton from "../../Buttons/LandingPage/LandingPageRedButton";
import styles from "../../../styles/LandingPage/Content/HeroSection.module.scss";

const HeroSection: FC = () => {
  return (
    <>
      <div className={styles["hero-section-bg"]}></div>
      <div className={styles["hero-section-gradient-shadow"]}></div>
      <div className={styles["hero-section-wrapper"]}>
        <div className={styles["hero-section-titles"]}>
          <h1>Endless movies, TV shows, and entertainment await.</h1>
          <h2>Watch anywhere. Stop anytime.</h2>
          <p>
            Ready to dive in? Hit Get Started and enjoy your favorite movies and
            shows instantly.
          </p>
        </div>
        <div className={styles["hero-section-button-wrapper"]}>
          <Link href="/signin" passHref legacyBehavior>
            <span>
              <LandingPageRedButton>Get Started</LandingPageRedButton>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
