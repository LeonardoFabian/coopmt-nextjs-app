import { BlockRenderer } from "@/components/BlockRenderer";
import styles from "./Group.module.scss";
import { Container as Div } from "semantic-ui-react";
import { Shared } from "@/components/Shared";
import classNames from "classnames";
import { map, size } from "lodash";

export function Group(props) {
  const {
    isContainer,
    blocks,
    display,
    theme,
    alignItems,
    flexDirection,
    justifyContent,
    gap,
  } = props;

  const { button, image, paragraph } = blocks;
  const hasParagraph = size(paragraph) > 0;

  const groupStyles = {
    display: `${display}`,
    alignItems: `${alignItems}`,
    flexDirection: `${flexDirection}`,
    justifyContent: `${justifyContent}`,
    gap: `${gap}px`,
  };

  const classes = `${isContainer ? null : "fluid"}`;
  return (
    <Div
      style={groupStyles}
      className={classNames(styles.group, {
        [styles.classes]: classes,
      })}
    >
      {image?.media ? <Shared.Image src={image?.media?.url} /> : null}
      {hasParagraph
        ? map(paragraph, (item) => (
            <Shared.Paragraph
              paragraph={item?.text}
              align={item?.align}
              fontStyle={item?.fontStyle}
              transform={item?.transform}
            />
          ))
        : null}
      {button?.link ? (
        <Shared.Button label={button?.link?.label} btnClass={button?.theme} />
      ) : null}
    </Div>
  );
}
