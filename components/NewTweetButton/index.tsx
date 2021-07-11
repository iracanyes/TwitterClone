import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  Entypo,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";


const NewTweetButton = () => {
  const navigation = useNavigation();

  const onPress = () => {
    console.warn('Create new tweet!');
    navigation.navigate('NewTweet');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={onPress}
    >
      <Entypo name={'plus'} style={styles.iconPlus} size={15} color={Colors.light.background} />
      <MaterialCommunityIcons style={styles.icon} name={"feather"} size={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button:{
    backgroundColor: Colors.light.tint,
    position: "absolute",
    bottom: 40,
    right: 35,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5
  },
  icon: {
    color: Colors.light.background,
  },
  iconPlus: {
    position: "absolute",
    top: 12,
    left: 12,
    color: Colors.light.background
  },
});
export default NewTweetButton;
