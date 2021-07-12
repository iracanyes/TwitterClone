import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
} from "react-native";
import styles from "./styles";
import { API, graphqlOperation } from "aws-amplify";
import { listFleets } from "../../graphql/queries";
import UserFleetPreview from "../UserFleetPreview";
import {UserFleetListProps, UserType} from "../../types";
import{ usersWithFleets as myUsersWithFleets } from "../../data/usersWithFleets";
import { listUsersWithFleets } from "../../graphql/custom-queries";

const UserFleetsList = (props: UserFleetListProps) => {
  const [ usersWithFleets, setUsersWithFleets ] = useState(null);

  useEffect(() => {
    const fetchUserFleets = async () => {

      const res = await API.graphql(graphqlOperation(listUsersWithFleets));
      console.log('fetchUserFleets res', res);
      if(res.data !== undefined){
        console.log('res.data.listFleets', res.data.listUsers);
        const usersWithFleets = res.data.listUsers.items.filter((item) => item.fleets.items.length > 0);
        setUsersWithFleets(usersWithFleets);
      }
    };


    fetchUserFleets();
  }, []);

  return (
    <View style={styles.container}>

      <FlatList
        horizontal
        data={usersWithFleets}
        renderItem={(item) => <UserFleetPreview user={item.item}/>}
        keyExtractor={item => item.id}
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UserFleetsList;
