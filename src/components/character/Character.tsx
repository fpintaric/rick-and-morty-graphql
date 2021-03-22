import React from "react";
import { Avatar } from "antd";
import { ICharacter } from "../../types/CharacterTypes";
import "./Character.css";

const Character = ({ name, image, type }: ICharacter) => {
  return (
    <div className="character-main-info">
      <Avatar src={image} />
      <div className="character-text-info">
        <span className="character-name">{name}</span>
        <span className="character-description">{type}</span>
      </div>
    </div>
  );
};

export default Character;
