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

const UserFleetsList = (props: UserFleetListProps) => {
  const [ fleets, setFleets ] = useState(null);

  useEffect(() => {
    const fetchUserFleets = async () => {
      const res = await API.graphql(graphqlOperation(listFleets));

      if(res.data.listFleets){
        setFleets(res.data.listFleets);
      }
    };

    fetchUserFleets();
  }, []);

  return (
    <View>
      <FlatList
        horizontal
        data={fleets}
        renderItem={(item) => <UserFleetPreview user={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default UserFleetsList;
