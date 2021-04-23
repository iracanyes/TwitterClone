import React from "react";
import {
  View,
  Text
} from "react-native";
import styles from "./styles";
import {
  EvilIcons,
  Feather
} from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";
import {TweetType} from "../../../../types";

export type FooterContainerProps = {
  tweet: TweetType
};

const FooterContainer = (props: FooterContainerProps) => {
  const { tweet } = props;
  return (
    <View style={styles.footer}>
      <View style={styles.iconWithText}>
        <Feather
          name={'message-circle'}
          size={20}
          color={Colors.light.tint}
        />
        <Text style={styles.number}>{tweet.numberOfComments}</Text>
      </View>
      <View style={styles.iconWithText}>
        <EvilIcons
          name={'retweet'}
          size={30}
          color={Colors.light.tint}
          style={{ fontWeight: "bold" }}
        />
        <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
      </View>
      <View style={styles.iconWithText}>
        <EvilIcons
          name={'heart'}
          size={30}
          color={Colors.light.tint}
        />
        <Text style={styles.number}>{tweet.numberOfLikes}</Text>
      </View>
      <View style={styles.iconWithText}>
        <EvilIcons
          name={'share-google'}
          size={30}
          color={Colors.light.tint}
        />
      </View>




    </View>
  );
};

export default FooterContainer;
