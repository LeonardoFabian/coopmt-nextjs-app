import styles from "./Title.module.scss";

export function Title(props) {
  const { text, tagName, align, className } = props;

  const titleStyles = { textAlign: align };

  switch (tagName) {
    case "h1":
      return (
        <h1 style={titleStyles} className={className}>
          {text}
        </h1>
      );
      break;
    case "h2":
      return (
        <h2 style={titleStyles} className={className}>
          {text}
        </h2>
      );
      break;
    case "h3":
      return (
        <h3 style={titleStyles} className={className}>
          {text}
        </h3>
      );
      break;
    case "h4":
      return (
        <h4 style={titleStyles} className={className}>
          {text}
        </h4>
      );
      break;
    case "h5":
      return (
        <h5 style={titleStyles} className={className}>
          {text}
        </h5>
      );
      break;
    case "h6":
      return (
        <h6 style={titleStyles} className={className}>
          {text}
        </h6>
      );
      break;
    default:
      return (
        <h5 style={titleStyles} className={className}>
          {text}
        </h5>
      );
      break;
  }

  return <div></div>;
}
