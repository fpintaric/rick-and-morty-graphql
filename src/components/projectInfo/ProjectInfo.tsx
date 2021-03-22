import React from "react";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons/lib";

const IMG_URLS = [
  "https://cdn.worldvectorlogo.com/logos/react-2.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg",
  "https://cdn.worldvectorlogo.com/logos/apollo-graphql-compact.svg",
];

const ProjectInfo = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h3>Start by choosing a category from the navbar</h3>
      <p>Powered by:</p>
      <div style={{ marginBottom: 20 }}>
        {IMG_URLS.map((src) => (
          <img
            style={{ margin: 5 }}
            key={src}
            src={src}
            alt="tech_logo"
            width="100"
            height="100"
          />
        ))}
      </div>
      <h4>List of all models</h4>
      <CheckCircleOutlined style={{ fontSize: 22 }} />
      <h4>Detail view of all models</h4>
      <CheckCircleOutlined style={{ fontSize: 22 }} />
      <h4>Pagination</h4>
      <CheckCircleOutlined style={{ fontSize: 22 }} />
      <h4>Loading Indicators</h4>
      <CheckCircleOutlined style={{ fontSize: 22 }} />
      <h4>Tests</h4>
      <ClockCircleOutlined style={{ fontSize: 22 }} />
    </div>
  );
};

export default ProjectInfo;
