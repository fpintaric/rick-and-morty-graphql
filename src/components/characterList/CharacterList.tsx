import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { ICharacter } from "../../types/CharacterTypes";
import "./CharacterList.css";
import Table from "../table/Table";
import Character from "../character/Character";

const CHARACTERS = gql`
  query Characters($page: Int!) {
    characters(page: $page) {
      info {
        pages
        count
        next
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
      }
    }
  }
`;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string, record: ICharacter) => (
      <Character name={text} image={record.image} type={record.type} />
    ),
  },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Species", dataIndex: "species", key: "species" },
  { title: "Gender", dataIndex: "gender", key: "gender" },
];

const CharacterList = () => {
  const [page, setPage] = useState(1);
  const { loading, data = {} } = useQuery(CHARACTERS, {
    variables: {
      page,
    },
  });
  const { characters = {} } = data;
  const { info = {}, results = [] } = characters;

  return (
    <Table
      loading={loading}
      title="Characters"
      columns={columns}
      dataSource={results}
      currentPage={page}
      totalItems={info.count}
      onChangePage={(page) => setPage(page)}
    />
  );
};

export default CharacterList;
