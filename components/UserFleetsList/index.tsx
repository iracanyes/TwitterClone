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
import {UserFleetListProps} from "../../types";
import { listUsersWithFleets } from "../../graphql/custom-queries";
import {IUser} from "../../types/interfaces";

const UserFleetsList = (props: UserFleetListProps) => {
  const [ usersWithFleets, setUsersWithFleets ] = useState<IUser[]|null>(null);

  useEffect(() => {
    const fetchUserFleets = async () => {

      const res = await API.graphql(graphqlOperation(listUsersWithFleets));
      console.log('fetchUserFleets res', res);
      //@ts-ignore
      if(res.data !== undefined){
        console.log('res.data.listFleets', res.data.listUsers);
        //@ts-ignore
        const usersWithFleets = res.data.listUsers.items.filter((item: IUser) => item.fleets.items.length > 0);
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
        renderItem={(item) => (
          <UserFleetPreview user={item.item} usersWithFleets={usersWithFleets}/>
        )}
        keyExtractor={item => item.id}
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UserFleetsList;
