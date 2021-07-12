import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Feed />
      <NewTweetButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
