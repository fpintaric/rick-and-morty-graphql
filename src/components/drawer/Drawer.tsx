import React from "react";
import { Descriptions, Drawer as AntDrawer, Collapse } from "antd";
import { useQuery } from "@apollo/client";
import { getDetailsQuery } from "../../utils/QueryUtils";
import Character from "../character/Character";
import { ICharacter } from "../../types/CharacterTypes";
import "./Drawer.css";

const { Panel } = Collapse;

const SUPPORTED_ENTITIES = ["character", "location", "episode"];

interface DrawerProps {
  visible: boolean;
  entity: string;
  id: string;
  onClose: any;
}

const Drawer = ({ visible, entity, id, onClose }: DrawerProps) => {
  const { data = {} } = useQuery(getDetailsQuery(entity), {
    variables: {
      id,
    },
  });
  if (!SUPPORTED_ENTITIES.includes(entity)) {
    return null;
  }

  const details = data[entity] || {};
  const {
    name,
    status,
    species,
    origin = {},
    location = {},
    episode = [],
    air_date,
    characters = [],
    type,
    image,
    dimension,
    residents = [],
  } = details;

  const renderEntityTitle = () => {
    switch (entity) {
      case "character":
        return (
          <div>
            <Character name={name} image={image} type={type} />
          </div>
        );
      case "episode":
        return (
          <div>
            <span>{name}</span>
            <span> - </span>
            <span>{episode}</span>
          </div>
        );
      case "location":
        return (
          <div>
            <span>{name}</span>
            <span> - </span>
            <span>
              {dimension} {dimension === "unknown" ? "dimension" : ""}
            </span>
          </div>
        );
    }
  };

  const renderEntityDetails = () => {
    switch (entity) {
      case "character":
        return (
          <div>
            <EntityDescription
              title="Character Info"
              data={[
                { label: "Character Info", value: status },
                { label: "Species", value: species },
                { label: "Origin", value: origin.name },
                { label: "Location", value: location.name },
              ]}
            />
            <Collapse
              defaultActiveKey={episode.length < 5 ? "1" : ""}
              style={{ marginTop: 15 }}
            >
              <Panel header={`Episodes ${name} appears in`} key="1">
                {episode.map((ep: any, index: number) => {
                  return (
                    <span>
                      {ep.name}
                      {index < episode.length - 1 ? ", " : "."}
                    </span>
                  );
                })}
              </Panel>
            </Collapse>
          </div>
        );
      case "episode":
        return (
          <div>
            <EntityDescription
              title="Episode Info"
              data={[{ label: "Aired", value: air_date }]}
            />
            <Collapse
              defaultActiveKey={characters.length < 3 ? "chars" : ""}
              style={{ marginTop: 15 }}
            >
              <Panel header={`Characters that appear in ${name}`} key="chars">
                {characters.map((char: ICharacter) => {
                  return (
                    <div style={{ padding: 4 }}>
                      <Character
                        image={char.image}
                        name={char.name}
                        type={""}
                      />
                    </div>
                  );
                })}
              </Panel>
            </Collapse>
          </div>
        );
      case "location":
        return (
          <div>
            <EntityDescription
              title="Location Info"
              data={[{ label: "Type", value: type }]}
            />
            <Collapse
              defaultActiveKey={characters.length < 3 ? "chars_loc" : ""}
              style={{ marginTop: 15 }}
            >
              <Panel header={`Characters that live in ${name}`} key="chars_loc">
                {residents.map((char: ICharacter) => {
                  return (
                    <div style={{ padding: 4 }}>
                      <Character
                        image={char.image}
                        name={char.name}
                        type={""}
                      />
                    </div>
                  );
                })}
              </Panel>
            </Collapse>
          </div>
        );
    }
  };

  return (
    <AntDrawer
      title={renderEntityTitle()}
      width="50%"
      visible={visible}
      onClose={onClose}
    >
      {renderEntityDetails()}
    </AntDrawer>
  );
};

const EntityDescription = ({ title, data }: any) => {
  return (
    <Descriptions title={title} bordered>
      {data.map((field: any) => {
        return (
          <Descriptions.Item key={field.label} span={2} label={field.label}>
            {field.value}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
};

export default Drawer;
