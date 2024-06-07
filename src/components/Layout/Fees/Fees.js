import styles from "./Fees.module.scss";
import {
  Container,
  Table,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
} from "semantic-ui-react";
import { map } from "lodash";
import { Shared } from "@/components/Shared";

export function Fees(props) {
  const { heading, fees } = props;

  return (
    <div className={styles.fees}>
      <Shared.Separator height={30} />

      <h5 className={styles.heading}>{heading}</h5>
      <Table basic="very" className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody className={styles.body}>
          {map(fees, (fee) => (
            <TableRow key={fee.id} className={styles.fee}>
              <TableCell className={styles.title}>{fee.title}</TableCell>
              <TableCell className={styles.description}>
                {fee.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Shared.Separator height={30} />
    </div>
  );
}
