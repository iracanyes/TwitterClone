import {StyleSheet} from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: 'center'
  },
  headerMoreAction: {
    alignSelf: 'flex-end'
  },
  headerName: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginRight: 5,
  },
  headerUsername: {
    color: 'grey',
    fontSize: 13,
    marginRight: 5,
  },
  headerDate:{
    fontSize: 13,
  },
  content: {
    paddingHorizontal: 10,
    fontSize: 12,
    lineHeight: 20
  },
  tweetImage:{
    width: 250,
    height: 200,
    borderRadius: 15,
    //resizeMode: 'cover',
    //overflow: 'hidden',
    marginVertical: 5
  },

});

export default styles;
