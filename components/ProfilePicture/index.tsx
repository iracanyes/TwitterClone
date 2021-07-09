import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import { ProfilePictureProps } from "../../types";

const ProfilePicture = ({ image, size = 50}: ProfilePictureProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile', {screen: 'Profile'})}
    >
      <Image
        source={{ uri : image}}
        style={{
          width: size,
          height: size,
          borderRadius: 50
        }}

      />
    </TouchableOpacity>

  );
}

export default ProfilePicture;
