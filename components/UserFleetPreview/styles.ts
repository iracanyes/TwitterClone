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
    fontSize: 14,
    fontWeight: 'bold',
    color: "grey",
    //marginTop: 5,
    padding: 5,
    textAlign: 'center',
    backgroundColor: '#F6F6F6',
  }
});

export default styles;
