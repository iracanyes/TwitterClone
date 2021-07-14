import React from "react";
import { StyleSheet } from "react-native";
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    //marginVertical: 5,
    marginHorizontal: 10,
    //justifyContent: 'center'
  },
  // ProfilePicture TouchableOpacity
  profileButton: {
    backgroundColor: Colors.light.background,
    padding: 5,
    borderColor: "#33CCFF", //"#1683e""2",
    borderWidth: 3,
    borderRadius: 50,
  },
  // ProfilePicture Image
  profileImage: {
    backgroundColor: Colors.light.tint,
  },
  username: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 14,
    fontWeight: 'bold',
    color: "grey",
    //marginTop: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
    backgroundColor: Colors.light.background,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#33CCFF"

  }
});

export default styles;
