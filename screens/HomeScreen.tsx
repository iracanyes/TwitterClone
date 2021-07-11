import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";
import UserFleetPreview from "../components/UserFleetPreview";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <UserFleetPreview
        user={{id: "007",username: "maka", image: "https://placebear.com/640/480"}}
      />
      <Feed />
      <NewTweetButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
