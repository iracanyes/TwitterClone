import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import { ProfilePictureProps } from "../../types";

const ProfilePicture = ({ image, size = 50, styles}: ProfilePictureProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile', {screen: 'Profile'})}
      style={styles && !!styles.profileButton ? styles.profileButton : null}
    >
      <Image
        source={{ uri : image }}
        style={[styles && !!styles.profileImage ? styles.profileImage : null, {
          width: size,
          height: size,
          borderRadius: 50
        }]}

      />
    </TouchableOpacity>

  );
}

export default ProfilePicture;