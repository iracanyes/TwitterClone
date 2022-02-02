import React, {useEffect, useState} from "react";
import {FlatList, View,} from "react-native";
import styles from "./styles";
import {API, Auth} from "aws-amplify";
import UserFleetPreview from "../UserFleetPreview";
import {UserFleetListProps} from "../../types";
import {IFleet} from "../../types/interfaces";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api-graphql";
import {listFleets} from "../../src/graphql/queries";

const UserFleetsList = (props: UserFleetListProps) => {
  const [ fleets, setFleets ] = useState<any|null>(null);

  const groupByUserId = (fleets: IFleet[]) => {
    let acc = [];
    let result = [];
    result = fleets.reduce((acc= [], el: any) => {

      acc[el.user.id] = acc[el.user.id] || [];
      acc[el.user.id].push(el);
      return acc;
    }, Object.create(null));

    let res = [];
    // Empty user with id = 0 for flatlist unique key
    res.push([{ id: 0, user: {id: "000"} }]);
    let a = 1;
    for(const el in result){
      res[a] = result[el];
      a++;
    }

    console.log("UserFleetsList fleets groupByUserID", res);

    return res;
  };

  const fetchFleets = async () => {
    const cognitoUser = await Auth.currentAuthenticatedUser();

    // Autres possibles:
    // Version simple: tous les fleets by date
    const res = await API.graphql({
      query: listFleets,
      // Date now
      // beginWith: new Date().toISOString().split('T')[0]
      variables: { filter: {
        createdAt: { beginsWith: "2021-07-11" },
        userID: { notContains: cognitoUser.attributes.sub }
      }},
      authMode: GRAPHQL_AUTH_MODE.API_KEY
    });


    // console.log('fetchUserFleets res', res);
    //@ts-ignore
    if(res.data.listFleets !== undefined){
      //console.log('UserFleetsList fetchFleets res', res);

      //@ts-ignore
      setFleets(groupByUserId(res.data.listFleets.items));
    }
  };

  useEffect(() => {
    fetchFleets();
    //console.log("useEffect fleets", fleets);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={fleets}
        renderItem={({item, index}) => (
          <UserFleetPreview
            index={index}
            fleet={item[0]}
            fleets={item}/>
        )}
        keyExtractor={item => item[0].user.id}
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default UserFleetsList;
