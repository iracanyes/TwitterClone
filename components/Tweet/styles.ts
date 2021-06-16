import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: '100%',
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgrey',
    backgroundColor: Colors.light.background,

  },
  mainContainer: {
    flex: 1
  }
});

export default styles;
