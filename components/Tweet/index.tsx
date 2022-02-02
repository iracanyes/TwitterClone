import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView
} from "react-native";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer";
import {TweetProps} from "../../types";
import Colors from "../../constants/Colors";
import styles from "./styles";

const Tweet = ({ tweet }: TweetProps) => {
  // console.log("TweetComponent tweet\n", tweet);
  return (
    <View style={styles.container}>
      {/* LeftContainer */}
      <LeftContainer user={ tweet.user } />
      {/* MainContainer */}
      <MainContainer tweet={ tweet } />
    </View>
  );
};



export default Tweet;
