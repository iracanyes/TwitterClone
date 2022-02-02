import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgrey',
    backgroundColor: Colors.light.background,

  },
  text: {
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default styles;
