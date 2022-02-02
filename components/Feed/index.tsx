import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import Tweet from "../Tweet";
import {API} from "aws-amplify";
import {listTweets} from "../../graphql/queries";
import UserFleetsList from "../UserFleetsList";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api-graphql";

export type FeedProps = {

};

const Feed = (props: FeedProps) => {
  const [ tweets , setTweets] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const fetchTweets = async () => {
    setLoading(true);
    try{
      const response = await API.graphql({
        query: listTweets,
        //authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        authMode: GRAPHQL_AUTH_MODE.API_KEY
      });

      //console.log("fetchTweets listTweets\n", response);

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
        ListHeaderComponent={<UserFleetsList />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default Feed;
