import React from "react";
import { View, StyleSheet } from "react-native";
import ProfilePicture from "../../ProfilePicture";
import {LeftContainerProps} from "../../../types";



const LeftContainer = (props: LeftContainerProps) => {
  const { user } = props;
  return (
    <View style={styles.container}>
      <ProfilePicture image={user.image} size={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  }
});

export default LeftContainer;
