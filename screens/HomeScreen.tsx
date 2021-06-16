import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView
} from 'react-native';

import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Feed />
      <NewTweetButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
