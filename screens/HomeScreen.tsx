import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import Feed from "../components/Feed";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Feed />
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
