import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    zIndex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 5
  },
  headerBackground: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  profileButton: {
    marginRight: 15
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.background
  },
  headerSubTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  headerDate: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: 3,
  },
  text: {
    color: "#eaeaea",
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 90,
    zIndex: 4,
    //backgroundColor: 'red',
    flexDirection: 'row'
  },
  prevButton: {
    width: '50%',
    height: '100%',
    //backgroundColor: 'blue'
  },
  nextButton: {
    width: '50%',
    height: '100%',
    //backgroundColor: 'yellow'
  }
});

export default styles;
