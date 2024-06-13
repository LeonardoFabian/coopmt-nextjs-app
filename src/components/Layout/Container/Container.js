import styles from "./Container.module.scss";
import { Container as Div } from "semantic-ui-react";

export function Container(props) {
  const {
    alignItems,
    backgroundImage,
    display,
    flexDirection,
    isContainer,
    justifyContent,
    theme,
    gap,
    children,
  } = props;
  const containerStyles = {
    alignItems: `${alignItems}`,
    display: `${display}`,
    flexDirection: `${flexDirection}`,
    justifyContent: `${justifyContent}`,
    gap: `${gap}px`,
  };

  const classes = `${isContainer ? "" : "fluid"}`;

  return (
    <Div style={containerStyles} className={classes}>
      {children}
    </Div>
  );
}
