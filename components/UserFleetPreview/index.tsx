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

const UserFleetPreview = (props /*: UserFleetPreviewProps*/) => {
  const { index, fleet, fleets  } = props;
  const navigation = useNavigation();

  useEffect(() => {

    console.log("UserFleetPreview index", index);

    console.log("UserFleetPreview fleet", fleet);
    console.log("UserFleetPreview fleets", fleets);
  }, []);

  return (
    <View style={styles.container}>
      <ProfilePicture
        image={ fleet.user ? fleet.user.image : null }
        size={60} styles={styles}
        onPress={() => {
          if(index === 0){
            navigation.navigate('NewFleet', { userID: fleet.user.id });
          }else{
            navigation.navigate(
              'Fleet',
              {
                userID: fleet.user.id,
                fleets
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
            { fleets ? fleets.length : "" }
          </Text>
        )
      }

    </View>
  );
};

export default UserFleetPreview;
