import styles from "./Paragraph.module.scss";

export function Paragraph(props) {
  const { paragraph, align, fontStyle, transform, className } = props;

  const paragraphStyles = {
    textAlign: align,
    fontStyle: fontStyle,
    textTransform: transform,
  };

  return (
    <p className={className} style={paragraphStyles}>
      {paragraph}
    </p>
  );
}
