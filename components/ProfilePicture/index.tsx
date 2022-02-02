import React from "react";
import { useNavigation } from "@react-navigation/native";
import {Image, TouchableOpacity, View} from "react-native";
import { ProfilePictureProps } from "../../types";
import {S3Image} from "aws-amplify-react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ProfilePicture = ({ image, size = 50, styles, onPress}: ProfilePictureProps) => {
  const navigation = useNavigation();

  const showImage = (image: string) => {
    return image.includes('http')
        ? (
          <Image
            source={{ uri : image }}
            style={[styles && !!styles.profileImage ? styles.profileImage : null, {
              width: size,
              height: size,
              borderRadius: 50
            }]}

          />
        )
        : (
          <View
            style={[styles && !!styles.profileImage ? styles.profileImage : null, {
              width: size,
              height: size,
              borderRadius: 50
            }]}
          >
            <S3Image
              imgKey={image}
            />
          </View>

        );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles && !!styles.profileButton ? styles.profileButton : null}
    >
      { image  ? showImage(image) : (<MaterialIcons name={"add-to-photos"} size={40} color={"grey"}  style={{ width: 55, height: 55, padding: 10 }} />) }


    </TouchableOpacity>

  );
};

export default ProfilePicture;
