import Link from "next/link";
import styles from "../../styles/LandingPage/Banner.module.scss";

const Banner = () => {
  return (
    <div className={styles["important-note"]}>
      <p>
        Note: This is just a demo application to showcase my development skills.
        Visit the GitHub repo{" "}
        <Link href="https://github.com/admiralfirefox/filmflix" target="_blank">
          Here.
        </Link>
      </p>
    </div>
  );
};

export default Banner;
