import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from "react-native";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer";
import {TweetProps} from "../../types";
import Colors from "../../constants/Colors";
import styles from "./styles";
import {Feather} from "@expo/vector-icons";

const Tweet = ({ trend }) => {
  // console.log("TweetComponent tweet\n", tweet);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ trend.name }</Text>
      <Feather name={"more-vertical"} size={24} color={"grey"} />
    </View>
  );
};



export default Tweet;
