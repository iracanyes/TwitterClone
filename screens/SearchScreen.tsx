import * as React from 'react';
import {Button, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {API, Auth} from "aws-amplify";
import {getUser} from "../graphql/queries";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api-graphql";
import Tweet from "../components/Tweet";
import UserFleetsList from "../components/UserFleetsList";
import { trends } from "../data/trends";
import Trend from "../components/Trend";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");

  const fetchUser = async () => {
    const cognitoUser = await Auth.currentAuthenticatedUser();

    if("attributes" in cognitoUser){
      const res  = await API.graphql({
        query: getUser,
        variables: { id: cognitoUser.attributes.sub },
        authMode: GRAPHQL_AUTH_MODE.API_KEY
      });
      // @ts-ignore
      if(res.data.getUser !== null) setUser(res.data.getUser);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const see_more = () => {
    console.log("Button see_more clicked!");
    //navigation.navigate();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProfilePicture
          image={user !== null ? user.image : "http://placeimg.com/640/360/any" }
          size={50}
          onPress={() => navigation.navigate('Profile', {screen: 'Profile'})}
        />
        <View>
          <TextInput
            style={styles.searchInput}
            onChangeText={setInput}
            value={input}
            placeholder={"Search on Twitter"}
          />
        </View>
        <View>
          <MaterialCommunityIcons
            name={"star-four-points-outline"}
            size={30}
            color={Colors.light.tint}
          />
        </View>
      </View>
      <FlatList
        data={trends}
        renderItem={({item}) => <Trend trend={item}/>}
        keyExtractor={ (item) => item.id }
        style={styles.list}
        // Set refresh state for the list (loading icon appears)
        //refreshing={loading}
        // Refresh method
        //onRefresh={fetchTrends}
        ListHeaderComponent={<Text style={styles.listHeader}>Trends for you</Text>}
        ListFooterComponent={
          <TouchableOpacity onPress={see_more} style={styles.footerButton}>
            <Text style={styles.footerButtonText}>See more</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: Colors.light.background
  },
  searchInput: {
    width: 250,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.light.background2,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    width: "100%",
    paddingLeft: 10
  },
  footerButton: {
    backgroundColor: "transparent",
    padding: 5,
    marginTop: 5
  },
  footerButtonText: {
    color: Colors.light.tintSecond,
    fontWeight: "bold"
  }
});
