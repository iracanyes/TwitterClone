import React from "react";
import { StyleSheet } from "react-native";
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center'

  },
  profileButton: {
    backgroundColor: Colors.light.background,
    padding: 5,
    borderColor: "#1683e2",
    borderWidth: 3,
    borderRadius: 50
  },
  profileImage: {
    backgroundColor: Colors.light.tint,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#606060",
    marginTop: 5,
  }
});

export default styles;
