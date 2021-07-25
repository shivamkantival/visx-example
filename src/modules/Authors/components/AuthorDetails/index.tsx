import { FC } from "react";
import { Post } from "typeDefs/posts";
import { User } from "typeDefs/users";
import { Card, CardActionArea, CardHeader } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  getUserAvatar,
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
import useStyle from "./styles";

const AuthorDetails: FC<{ author: User; posts: Array<Post> }> = ({
  author,
  posts,
}) => {
  const { heatmapContainer } = useStyle();
  return (
    <Card>
      <CardHeader
        title={getUserName(author)}
        avatar={<AccountCircleIcon />}
        subheader={getUserEmail(author)}
      />
      <CardActionArea>
        <Heatmap
          data={createWeaklyHeatmapData<Post>(posts, {
            numberOfDaysToPrepareDataFor: 30,
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
