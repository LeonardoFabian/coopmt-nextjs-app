import styles from "./Video.module.scss";
import ReactPlayer from "react-player";

export function Video(props) {
  const { url } = props;
  return (
    <>
      <ReactPlayer
        url={url}
        className={styles.video}
        width="100%"
        height="100%"
      />
    </>
  );
}
