import React, { useState } from "react";
import { default as AntTable } from "antd/lib/table";
import "./Table.css";
import Drawer from "../drawer/Drawer";

interface TableProps {
  loading: boolean;
  title: string;
  columns: Array<any>;
  dataSource: Array<any>;
  currentPage: number;
  totalItems: number;
  onChangePage: (page: number) => void;
}

const Table = ({
  loading,
  title,
  columns,
  dataSource,
  currentPage,
  totalItems,
  onChangePage,
}: TableProps) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedId, setSelectedId] = useState("");
  return (
    <>
      <AntTable
        rowKey="name"
        loading={loading}
        title={() => <span>{title}</span>}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current: currentPage,
          pageSize: 20,
          total: totalItems,
          onChange: (page) => {
            onChangePage(page);
          },
        }}
        scroll={{ y: 600 }}
        onRow={(record) => {
          return {
            onClick: () => {
              const { __typename, id } = record;
              setSelectedEntity(__typename.toLowerCase());
              setSelectedId(id);
              setShowDrawer(true);
            },
          };
        }}
      />
      {showDrawer && (
        <Drawer
          visible={showDrawer}
          entity={selectedEntity}
          id={selectedId}
          onClose={() => {
            setShowDrawer(false);
            setSelectedEntity("");
            setSelectedId("");
          }}
        />
      )}
    </>
  );
};

export default Table;
