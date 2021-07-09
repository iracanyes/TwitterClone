import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBackgroundImage: {
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    width: 300,
    //height: 450,
    //backgroundColor: "#217CD8",
  },
  title: {
    width: 350,
    paddingVertical: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#217CD8',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#217CD8',
    borderRadius: 7,
    shadowColor: '#217CD8',
    shadowRadius: 3.84,
    shadowOpacity: 0.5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2
    }

  },
  formContainer: {
    marginVertical: 10
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#999',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5
  },

  inputEmail: {},
  inputContainer: {
    position: 'relative',
    width: 300,
    height: 50,
    //backgroundColor: 'yellow',
    backgroundColor: '#fff',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#999',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5
  },
  inputPassword: {
    position: 'absolute',
    width: 250,
    bottom: -10,
    left: 0,
    zIndex: 1,
    borderLeftWidth: 0
  },
  inputRightIcon: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    zIndex: 2
  },
  inlineButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  inlineButton: {
    width: 140,
    paddingLeft: 0,
    justifyContent: 'center'
  },
  buttonContainer: {
    width: "100%",
    //backgroundColor: "red",
    justifyContent: 'flex-start',
    alignItems: "center",
    marginBottom: 5
  },
  button: {
    width: 160,
    flexDirection: "row",
    //alignContent: "center",
    //textAlign: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 25,
    backgroundColor: '#ECECEC',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: '#FA832B'
  },
  buttonAmazon: {
    borderColor: "#FF9900",
    shadowColor: "#FF9900",
    backgroundColor: "#FF9900"
  },
  buttonCognito: {
    borderColor: "#FF9900",
    shadowColor: "#FF9900",
    backgroundColor: "#FF9900"
  },
  buttonGoogle: {
    borderColor: "#217CD8",
    shadowColor: "#217CD8",
    backgroundColor: "#217CD8"
  },
  buttonFacebook: {
    borderColor: "#217CD8",
    shadowColor: "#217CD8",
    backgroundColor: "#217CD8"
  }
});

export default styles;
