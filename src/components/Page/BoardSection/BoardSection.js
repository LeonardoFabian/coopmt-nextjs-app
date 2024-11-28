import styles from "./BoardSection.module.scss";
import { Blocks } from "@/components/Blocks";
import { Shared } from "@/components/Shared";
import { fn } from "@/utils";

export function BoardSection(props) {
  console.log("block: ", props);
  const { title, groups } = props;

  return (
    <div className={styles.boardSection}>
      <h2 className={styles.title}>{title}</h2>
      {groups?.data?.map((group) => {
        const groupName = group?.attributes?.name;
        const groupDescription = group?.attributes?.description;
        const groupPositions = group?.attributes?.board_positions?.data;

        return (
          <div key={`group-${group.id}`} className={styles.group}>
            <div className={styles.header}>
              <h3>{groupName}</h3>
              <Blocks.RichText content={groupDescription} />
            </div>
            <Shared.Grid cols="3" gap="30px">
              {groupPositions?.map((item) => {
                const position = item?.attributes?.name;
                const user = item?.attributes?.user?.data;
                const firstName = user?.attributes?.firstName;
                const lastName = user?.attributes?.lastName;
                const imageUrl = user?.attributes?.image?.data?.attributes?.url;

                var userInitials = "";
                if (user) {
                  const userNameInitial = fn.getStringInitials(firstName);
                  const userLastNameInitial = fn.getStringInitials(lastName);

                  userInitials = `${userNameInitial}${userLastNameInitial}`;
                }

                return (
                  <div
                    key={`position-${position.id}`}
                    className={styles.position}
                  >
                    <div className={styles.imageWrapper}>
                      {imageUrl ? (
                        <Shared.Image src={imageUrl} />
                      ) : (
                        <div className={styles.avatar}>
                          <span className={styles.initialsAvatar}>
                            {userInitials}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className={styles.name}>
                      <span className={styles.firstName}>{firstName}</span>
                      <span className={styles.lastName}>{lastName}</span>
                    </div>
                    <span className={styles.jobTitle}>{position}</span>
                  </div>
                );
              })}
            </Shared.Grid>
          </div>
        );
      })}
    </div>
  );
}
