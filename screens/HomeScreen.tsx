import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";
import ProfilePicture from "../components/ProfilePicture";
import Colors from "../constants/Colors";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {API, Auth} from "aws-amplify";
import {getUser} from "../graphql/queries";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api-graphql";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProfilePicture
          image={user !== null ? user.image : "http://placeimg.com/640/360/any" }
          size={50}
          onPress={() => navigation.navigate('Profile', {screen: 'Profile'})}
        />
        <View>
          <Ionicons
            name={"logo-twitter"}
            size={30}
            color={Colors.light.tint}
            style={{
              textAlign: "center"
            }}
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
      <Feed />
      <NewTweetButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: Colors.light.background
  },
});
