import styles from "./Pagination.module.scss";
import { Pagination as PaginationSUI } from "semantic-ui-react";
import { useRouter } from "next/router";

export function Pagination(props) {
  const { currentPage, totalPages } = props;
  const router = useRouter();

  const handleOnPageChange = (_, data) => {
    console.log("handleOnPageChange data: ", data);

    const { activePage } = data;

    router.replace({ query: { ...router.query, page: activePage } });
  };

  return (
    <div className={styles.pagination}>
      <PaginationSUI
        defaultActivePage={currentPage}
        totalPages={totalPages}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        onPageChange={handleOnPageChange}
      />
    </div>
  );
}
