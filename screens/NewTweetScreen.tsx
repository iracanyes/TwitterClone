import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Auth, API, Storage, graphqlOperation } from "aws-amplify";
import { getUser } from "../graphql/queries";
import { createTweet } from '../graphql/mutations';
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {AntDesign, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import ProfilePicture from "../components/ProfilePicture";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import 'react-native-get-random-values';
import { v4 as uuidv4} from 'uuid';


const NewTweetScreen = () => {
  const navigation = useNavigation();
  const [ user, setUser] = useState(null);
  const [ tweet, setTweet ] = useState("");
  const [ imageUrl, setImageUrl ] = useState("");
  const [ privacy, setPrivacy ] = useState('everyone');
  const [ mediaSelected, setMediaSelected ] = useState(null);

  useEffect(() => {
    const getAuthenticatedUser = async () => {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(graphqlOperation(getUser, { id: cognitoUser.attributes.sub }));
      if(response.data.getUser !== undefined ){
        setUser(response.data.getUser);
      }else{
        navigation.navigate('Login');
      }
    };

    getAuthenticatedUser();
  }, []);

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(permissionResult.granted === false){
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });


    setMediaSelected({ localUri: pickerResult.uri });

  };

  const uploadFile = async () => {
    try{
      if(mediaSelected.localUri !== undefined){
        const response = await fetch(mediaSelected.localUri);
        const blob = await response.blob();

        const urlParts = mediaSelected.localUri.split('.');
        const fileExtension = urlParts[urlParts.length - 1];


        const filename= `${uuidv4()}.${fileExtension}`;

        const storageResponse = await Storage.put(
          // random unique name for the file in S3 (filename.ext)
          filename,
          blob
        );


        return storageResponse.key;
      }


    }catch (e) {
      console.warn('File upload error', e);
    }
  };

  const onPostTweet = async () => {
    const imageURI = await uploadFile();

    const message = {
      userID: user.id,
      content: tweet,
      image: imageURI,
    };

    try{
      const response = await API.graphql(graphqlOperation(createTweet, {input: message }));

      navigation.goBack();
    }catch(e){
      console.warn("onPostTweet createTweet error", e);
    }


  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Root', { screen: 'Home'})}
        >
          <AntDesign
            name={'close'}
            size={30}
            color={Colors.light.tint}
          />
        </TouchableOpacity>

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
            image={user ? user.image : "https://www.fillmurray.com/640/360"}
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
          {/*
            <TextInput
            style={styles.imageInput}
            placeholder={'Image URL optional'}
            value={imageUrl}
            onChangeText={setImageUrl}
          />
          */}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => openImagePickerAsync()}
          >
            <Text style={styles.buttonText}>
              {"Ajouter une image/vidéo"}
            </Text>
          </TouchableOpacity>
          <Image
            source={{ uri:  mediaSelected !== null ? mediaSelected.localUri : 'https://i.imgur.com/TkIrScD.png' }}
            style={styles.imagePreview}
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

    </View>
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
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
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
