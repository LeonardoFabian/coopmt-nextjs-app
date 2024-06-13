import styles from "./Title.module.scss";

export function Title(props) {
  const { text, tagName, align } = props;

  const titleStyles = { textAlign: align };

  switch (tagName) {
    case "h1":
      return <h1 style={titleStyles}>{text}</h1>;
      break;
    case "h2":
      return <h2 style={titleStyles}>{text}</h2>;
      break;
    case "h3":
      return <h3 style={titleStyles}>{text}</h3>;
      break;
    case "h4":
      return <h4 style={titleStyles}>{text}</h4>;
      break;
    case "h5":
      return <h5 style={titleStyles}>{text}</h5>;
      break;
    case "h6":
      return <h6 style={titleStyles}>{text}</h6>;
      break;
    default:
      return <h5 style={titleStyles}>{text}</h5>;
      break;
  }

  return <div></div>;
}
