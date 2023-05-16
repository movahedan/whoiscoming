// FavoriteHeart.tsx
import React, { FC } from "react";
import { HeartTwoTone, HeartOutlined } from "@ant-design/icons";

interface FavoriteHeartProps {
  isCurrentUser: boolean;
  isFavorite: boolean;
  id: string | number;
  setFavorite: (id: string | number, isFavorite: boolean) => void;
}

const FavoriteHeart: FC<FavoriteHeartProps> = ({
  isCurrentUser,
  isFavorite,
  id,
  setFavorite,
}) => {
  if (isCurrentUser) {
    return (
      <span style={{ fontSize: "12px", color: "#eb2f96" }}>
        Always{" "}
        <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: "12px" }} />{" "}
        yourself
      </span>
    );
  }

  return isFavorite ? (
    <HeartTwoTone
      twoToneColor="#eb2f96"
      style={{ fontSize: "24px", cursor: "pointer" }}
      onClick={() => setFavorite(id, false)}
    />
  ) : (
    <HeartOutlined
      style={{ fontSize: "24px", cursor: "pointer" }}
      onClick={() => setFavorite(id, true)}
    />
  );
};

export default FavoriteHeart;
