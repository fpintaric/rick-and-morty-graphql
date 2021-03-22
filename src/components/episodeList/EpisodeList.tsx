import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Table from "../table/Table";

const EPISODES = gql`
  query Episodes($page: Int!) {
    episodes(page: $page) {
      info {
        pages
        count
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  { title: "Episode", dataIndex: "episode", key: "episode" },
  { title: "Air Date", dataIndex: "air_date", key: "air_date" },
];

const EpisodeList = () => {
  const [page, setPage] = useState(1);
  const { loading, data = {} } = useQuery(EPISODES, {
    variables: {
      page,
    },
  });
  const { episodes = {} } = data;
  const { info = {}, results = [] } = episodes;

  return (
    <Table
      loading={loading}
      title="Episodes"
      columns={columns}
      dataSource={results}
      currentPage={page}
      totalItems={info.count}
      onChangePage={(page) => setPage(page)}
    />
  );
};

export default EpisodeList;
