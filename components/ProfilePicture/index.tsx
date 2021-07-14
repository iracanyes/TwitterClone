import React from "react";
import { useNavigation } from "@react-navigation/native";
import {Image, TouchableOpacity, View} from "react-native";
import { ProfilePictureProps } from "../../types";
import {S3Image} from "aws-amplify-react-native";

const ProfilePicture = ({ image, size = 50, styles, onPress}: ProfilePictureProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles && !!styles.profileButton ? styles.profileButton : null}
    >
      {image.includes('http')
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

        )
      }

    </TouchableOpacity>

  );
};

export default ProfilePicture;
