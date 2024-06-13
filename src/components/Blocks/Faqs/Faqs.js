import styles from "./Faqs.module.scss";
import { Shared } from "@/components/Shared";
import {
  Accordion,
  AccordionTitle,
  AccordionContent,
  Icon,
} from "semantic-ui-react";
import { map } from "lodash";
import { useState } from "react";

export function Faqs(props) {
  console.log("FAQs: ", props);
  const { title, faqs, theme } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  //   state = { activeIndex: 0 };

  //   const heading = title?.title;

  const handleClick = (e, titleProps) => {
    console.log("titleProps: ", titleProps);
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <div className={styles.faqs}>
      <Shared.Separator height={30} />
      {/* <h5 className={styles.heading}>{heading}</h5> */}
      <Shared.Title
        text={title?.text}
        tagName={title?.tagName}
        align={title?.align}
      />
      <div className={styles.wrapper}>
        <Accordion styled>
          {map(faqs, (faq, i) => (
            <>
              <AccordionTitle
                key={faq.id}
                active={activeIndex === i}
                index={i}
                onClick={handleClick}
              >
                <Icon name="dropdown" />
                <Shared.Title
                  text={faq.question.text}
                  tagName={faq.question.tagName}
                  align={faq.question.align}
                />
                {/* <p>{faq.question}</p> */}
              </AccordionTitle>
              <AccordionContent active={activeIndex === i}>
                {map(faq.answers, (answer) => (
                  <Shared.Paragraph paragraph={answer.text} />
                ))}
              </AccordionContent>
            </>
          ))}
        </Accordion>
      </div>
      <Shared.Separator height={30} />
    </div>
  );
}
