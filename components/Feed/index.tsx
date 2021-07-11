import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet
} from "react-native";
import tweets from "../../data/tweets";
import Tweet from "../Tweet";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listTweets } from "../../graphql/queries";

export type FeedProps = {

};

const Feed = (props: FeedProps) => {
  const [ tweets , setTweets] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const fetchTweets = async () => {
    setLoading(true);
    try{
      const response = await API.graphql(graphqlOperation(listTweets));
      console.log("Feed useEffect getTweets response",response);
      if(response.data.listTweets !== undefined){
        setTweets(response.data.listTweets.items);
      }
    }catch (e) {
      console.warn("Feed useEffect getTweets error", e);
    }finally {
      setLoading(false);
    }


  };

  useEffect(() => {


    fetchTweets();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        renderItem={({item}) => <Tweet tweet={item}/>}
        keyExtractor={ (item) => item.id }
        style={{width: '100%'}}
        // Set refresh state for the list (loading icon appears)
        refreshing={loading}
        // Refresh method
        onRefresh={fetchTweets}
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
