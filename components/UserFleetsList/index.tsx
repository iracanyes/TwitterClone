import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
} from "react-native";
import styles from "./styles";
import { API, Auth, graphqlOperation } from "aws-amplify";
import UserFleetPreview from "../UserFleetPreview";
import {UserFleetListProps} from "../../types";
import { listUsersWithFleets } from "../../graphql/custom-queries";
import {IUser} from "../../types/interfaces";

const UserFleetsList = (props: UserFleetListProps) => {
  const [ usersWithFleets, setUsersWithFleets ] = useState<IUser[]|null>(null);

  useEffect(() => {
    const fetchUserFleets = async () => {
      const cognitoUser = await Auth.currentAuthenticatedUser();

      // Autres possibles:
      // Modifier le schéma pour permettre de requérir les utilisateurs ayant des fleets
      // + getUser pour l'utilisateur authentifié.
      const res = await API.graphql(graphqlOperation(listUsersWithFleets));
      //console.log('fetchUserFleets res', res);
      //@ts-ignore
      if(res.data !== undefined){

        res.data.listUsers.items.sort((a,b) => {
          if(a.id === cognitoUser.attributes.sub && b.id !== cognitoUser.attributes.sub){
            return -1;
          }
          if(a.id !== cognitoUser.attributes.sub && b.id === cognitoUser.attributes.sub){
            return 1;
          }

          return 0;
        });

        console.log('UserFleetList res.data.listUsers sorted', res.data.listUsers);

        //@ts-ignore
        const usersWithFleets = res.data.listUsers.items.filter(
          (item: IUser) => item.fleets.items.length > 0 || item.id === cognitoUser.attributes.sub
        );




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
        renderItem={({item, index}) => (
          <UserFleetPreview
            index={index}
            user={item}
            usersWithFleets={usersWithFleets}/>
        )}
        keyExtractor={item => item.id}
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UserFleetsList;
