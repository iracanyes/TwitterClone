import React, { useState, useEffect} from 'react';
import { API, Auth, graphqlOperation } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Text,
  FlatList,
  View,
} from "react-native";
import styles from "./styles";
import ProfilePicture from "../ProfilePicture";
import {UserFleetPreviewProps} from "../../types";

const UserFleetPreview = (props: UserFleetPreviewProps) => {
  const { user, usersWithFleets  } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ProfilePicture
        image={ props.user.image }
        size={60} styles={styles}
        onPress={() => navigation.navigate(
          'Fleet',
          {
            userID: user.id,
            usersWithFleets
          }
        )}
      />
      {/*
        <Text style={styles.username}>
          { user.username.length > 8 ? user.username.slice(0,7) + '...' : user.username }
        </Text>
      */}

    </View>
  );
};

export default UserFleetPreview;
