import React from "react";
import {
  View,
  Text,
} from "../../Themed";
import {
  StyleSheet,
  SafeAreaView, Image
} from "react-native";
import {MainContainerProps} from "../../../types";
import { DateTime } from "luxon";
import Colors from "../../../constants/Colors";
import {
  AntDesign,
  Ionicons,
  EvilIcons
} from '@expo/vector-icons';
import styles from "./styles";
import FooterContainer from "./FooterContainer";


const MainContainer = (props: MainContainerProps) => {
  const { tweet } = props;
  return (
    <SafeAreaView style={styles.container}>
      {/* username */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerName}>{ tweet.user.name }</Text>
          <Text style={styles.headerUsername}>{ tweet.user.username }</Text>
          <Text style={styles.headerDate}>{ DateTime.fromISO(tweet.createdAt).toRelative()}</Text>
        </View>
        <Ionicons name={'chevron-down'} size={24} color={'grey'} />

      </View>
      {/* content */}
      <View style={styles.content}>
        <Text>{ tweet.content }</Text>
        {!!tweet.image
          && <Image source={{uri: tweet.image}} style={styles.tweetImage}/>
        }
      </View>
      {/* social links */}
      <FooterContainer tweet={tweet}/>
    </SafeAreaView>
  );
}



export default MainContainer;
