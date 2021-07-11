import React, { useState, useEffect} from 'react';
import { API, Auth, graphqlOperation } from "aws-amplify";
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
  const { user: { username, image } } = props;

  return (
    <View style={styles.container}>
      <ProfilePicture image={ image ?? "https://placebear.com/640/360"} size={60} styles={styles}/>
      <Text style={styles.username}>{ username }</Text>
    </View>
  );
};

export default UserFleetPreview;

