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
  //const { tweet } = props;
  return (
    <SafeAreaView style={styles.container}>
      {/* LeftContainer */}
      <LeftContainer user={ tweet.user } />
      {/* MainContainer */}
      <MainContainer tweet={ tweet } />
    </SafeAreaView>
  );
};



export default Tweet;
