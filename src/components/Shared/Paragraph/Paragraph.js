import styles from "./Paragraph.module.scss";

export function Paragraph(props) {
  const { paragraph, align, fontStyle, transform } = props;

  const paragraphStyles = {
    textAlign: align,
    fontStyle: fontStyle,
    textTransform: transform,
  };

  return (
    <p className={styles.paragraph} style={paragraphStyles}>
      {paragraph}
    </p>
  );
}
