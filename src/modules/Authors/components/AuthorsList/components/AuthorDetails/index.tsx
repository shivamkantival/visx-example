import { FC, useCallback } from "react";
import { Post } from "typeDefs/posts";
import { User } from "typeDefs/users";
import { Card, CardActionArea, CardHeader } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  getUserEmail,
  getUserId,
  getUserName,
} from "utils/entityReaders/users";
import Heatmap from "components/graphsLibrary/Heatmap";
import { createWeaklyHeatmapData } from "utils/graphsDataMassagers/heatmap/weeklyHeatmap";
import {
  getMaxCreatedAtAcrossPosts,
  getNumericCreatedAtEpoch,
} from "utils/entityReaders/posts";
import useStyle from "modules/Authors/components/AuthorsList/components/AuthorDetails/styles";

const AuthorDetails: FC<{
  author: User;
  posts: Array<Post>;
  onSelectAuthor: (authorId: string) => void;
}> = ({ author, posts, onSelectAuthor }) => {
  const { heatmapContainer, authorCardContainer } = useStyle();
  const onClick = useCallback(() => {
    onSelectAuthor(getUserId(author));
  }, [author, onSelectAuthor]);

  return (
    <Card className={authorCardContainer}>
      <CardHeader
        title={getUserName(author)}
        avatar={<AccountCircleIcon />}
        subheader={getUserEmail(author)}
      />
      <CardActionArea onClick={onClick}>
        <Heatmap
          data={createWeaklyHeatmapData<Post>(posts, {
            numberOfDaysToPrepareDataFor: 60,
            endDateEpoch: getMaxCreatedAtAcrossPosts(posts),
            dataGetter: getNumericCreatedAtEpoch,
          })}
          uniqueKey={`${getUserId(author)}-heatmap`}
          className={heatmapContainer}
        />
      </CardActionArea>
    </Card>
  );
};

export default AuthorDetails;
