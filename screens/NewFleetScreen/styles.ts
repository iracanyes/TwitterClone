import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    //paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background,
  },
  closeButton: {

  },
  profileButton: {
    backgroundColor: Colors.light.background,
    borderRadius: 50,
    borderWidth: 3,
    padding: 5,
    borderColor: Colors.light.tint
  },
  profileImage: {},
  headerLeftButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,

  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.light.background
  },
  mainContainer: {
    flex: 1,
    marginTop: 90,
    backgroundColor: Colors.light.background,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  media: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 1
  },
  messageInput: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderWidth: 3,
    borderColor: Colors.light.background,
    height: 250,
    paddingHorizontal: 20,
    fontSize: 26,
    marginBottom: 20,
    zIndex: 5
  },
  uploadButton: {
    borderWidth: 3,
    borderRadius: 15,
    borderColor: Colors.light.tint,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: Colors.light.tint,
    zIndex: 5
  }
});

export default styles;
