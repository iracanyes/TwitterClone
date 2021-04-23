import React from "react";
import {
  FlatList,
  View,
  StyleSheet
} from "react-native";
import tweets from "../../data/tweets";
import Tweet from "../Tweet";

export type FeedProps = {

};

const Feed = (props: FeedProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        renderItem={({item}) => <Tweet tweet={item}/>}
        keyExtractor={ (item) => item.id }
        style={{width: '100%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Feed;
