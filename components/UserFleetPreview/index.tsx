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
  const { index, user, usersWithFleets  } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ProfilePicture
        image={ props.user.image }
        size={60} styles={styles}
        onPress={() => {
          if(index === 0){
            navigation.navigate('NewFleet', { userID: user.id });
          }else{
            navigation.navigate(
              'Fleet',
              {
                userID: user.id,
                usersWithFleets
              }
            )
          }
        }}
      />
      {index === 0
        ? (
          <Text style={styles.username}>
            {"Add"}
          </Text>
        )
        : (
          <Text style={styles.username}>
            { user.fleets.items.length }
          </Text>
        )
      }

    </View>
  );
};

export default UserFleetPreview;
