import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Table from "../table/Table";

const LOCATIONS = gql`
  query Episodes($page: Int!) {
    locations(page: $page) {
      info {
        pages
        count
        next
        prev
      }
      results {
        id
        name
        type
        dimension
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
  { title: "Type", dataIndex: "type", key: "type" },
  { title: "Dimension", dataIndex: "dimension", key: "dimension" },
];

const LocationList = () => {
  const [page, setPage] = useState(1);
  const { loading, data = {} } = useQuery(LOCATIONS, {
    variables: {
      page,
    },
  });
  const { locations = {} } = data;
  const { info = {}, results = [] } = locations;

  return (
    <Table
      loading={loading}
      title="Locations"
      columns={columns}
      dataSource={results}
      currentPage={page}
      totalItems={info.count}
      onChangePage={(page) => setPage(page)}
    />
  );
};

export default LocationList;
