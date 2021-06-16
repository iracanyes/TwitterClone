import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {AntDesign, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import { Picker } from "@react-native-picker/picker";

const NewTweetScreen = () => {

  const [ tweet, setTweet ] = useState("");
  const [ imageUrl, setImageUrl ] = useState("");
  const [ privacy, setPrivacy ] = useState('everyone');

  const onPostTweet = () => {};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign
          name={'close'}
          size={30}
          color={Colors.light.tint}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={onPostTweet}
        >
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      {/* Input Box */}
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <ProfilePicture
            image={"https://www.fillmurray.com/640/360"}
          />
        </View>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={5}
            maxLength={250}
            autoFocus={true}
            placeholder={"What's happening?"}
            value={tweet}
            onChangeText={setTweet}

          />
          <TextInput
            style={styles.imageInput}
            placeholder={'Image URL optional'}
            value={imageUrl}
            onChangeText={setImageUrl}
          />
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Picker
          selectedValue={privacy}
          onValueChange={setPrivacy}
          style={styles.privacyPicker}
        >
          <Picker.Item
            label={"🌍 Everyone can reply"}
            value={'everyone'}
          />
          <Picker.Item
            label={"🔐 Friends only can reply"}
            value={'friends'}
          />
        </Picker>
        <View>
          <View style={styles.footerIconContainer}>
            <AntDesign name={'picture'} size={24} color={Colors.light.tint} />
            <MaterialCommunityIcons name={'gif'} size={24} color={Colors.light.tint} />
            <Ionicons name={'md-stats-chart-sharp'} size={24} color={Colors.light.tint} />
            <MaterialCommunityIcons name={'map-marker-radius'} size={24} color={Colors.light.tint} />
            <MaterialCommunityIcons name={'vector-circle-variant'} size={24} color={Colors.light.tint} />
            <Ionicons name={'add-circle'} size={24} color={Colors.light.tint} />

          </View>
          <View style={styles.footerIconContainer}>
            <AntDesign name={'picture'} size={24} color={Colors.light.tint} />
            <MaterialCommunityIcons name={'gif'} size={24} color={Colors.light.tint} />
            <Ionicons name={'md-stats-chart-sharp'} size={24} color={Colors.light.tint} />
            <MaterialCommunityIcons name={'map-marker-radius'} size={24} color={Colors.light.tint} />
            <MaterialCommunityIcons name={'vector-circle-variant'} size={24} color={Colors.light.tint} />
            <Ionicons name={'add-circle'} size={24} color={Colors.light.tint} />

          </View>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    //justifyContent: "center"
  },
  header: {
    width: '100%',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'lightgrey'
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',

  },
  imageContainer: {
    alignItems: 'flex-start',
    marginRight: 10,
  },
  inputsContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  textInput: {
    maxHeight: 300,
    width: '100%',
    marginBottom: 10,
    //fontSize: 14,
    padding: 10,
    textAlignVertical: 'top',
  },
  imageInput: {
    width: '100%',
    padding: 10,
    backgroundColor: 'yellow',
  },
  footerContainer: {
    //flex: 1,
    //height: 300,
    width: '100%',
    alignSelf: 'flex-end',
    backgroundColor: 'lightgrey'
  },
  privacyPicker: {
    width: "100%",
    height: 50
  },
  footerIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
  }
});

export default NewTweetScreen;
