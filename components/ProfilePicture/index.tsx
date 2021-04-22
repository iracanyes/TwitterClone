import React from "react";
import { Image } from "react-native";
import { ProfilePictureProps } from "../../types";

const ProfilePicture = ({ image, size = 50}: ProfilePictureProps) => (
  <Image
    source={{ uri : image}}
    style={{
      width: size,
      height: size,
      borderRadius: 50
    }}
  />
);

export default ProfilePicture;
