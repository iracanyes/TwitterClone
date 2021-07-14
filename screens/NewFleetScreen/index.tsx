import React, { useEffect, useState } from "react";
import {API, Auth, Storage, graphqlOperation} from "aws-amplify";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createFleet } from "../../graphql/mutations";
import ProfilePicture from "../../components/ProfilePicture";
import {getUser} from "../../graphql/queries";
import styles from './styles';
import 'react-native-get-random-values';
import { v4 as uuidv4} from 'uuid';
import {AntDesign} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {showToast} from "../../widget";
import { S3Image } from "aws-amplify-react-native";

const NewFleetScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ user, setUser ] = useState(null);
  const [ fleet, setFleet ] = useState(null);
  const [ type, setType ] = useState("");
  const [ message, setMessage ] = useState('');
  const [ media, setMedia ] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const res = await API.graphql(graphqlOperation(getUser, { id: cognitoUser.attributes.sub }));

      if(res.data.getUser){
        setUser(res.data.getUser);
      }
    };

    fetchUser();
  }, []);

  const uploadFile = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(!permissionResult.granted){
      showToast("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if(!result.cancelled){
      setMedia(result.uri);
    }
  };

  const onPostFleet = async () => {
    const fleet = {
      type: media !== "" ? "Image" : "Text",
      text: media !== "" ? null : message,
      image: media !== "" ? media : null,
      userID: route.params.userID,
    };

    try{
      const res = await API.graphql(graphqlOperation(createFleet, { input: fleet }));

      if(res.data.createFleet){
        showToast('Fleet enregistré!');
        navigation.navigate('Root', { screen: 'Home'});
      }
    }catch (e) {
      console.warn("Error createFleet", e);
    }




  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.navigate('Root', { screen: 'Home'})}
        >
          <AntDesign
            name={'close'}
            size={30}
            color={Colors.light.tint}
          />
        </TouchableOpacity>
        <View>
          {user !== null && (
            <ProfilePicture
              image={user.image}
              onPress={() => navigation.navigate('Profile')}
              styles={styles}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.headerLeftButton}
          onPress={() => onPostFleet()}
        >
          <Text style={styles.buttonText}>Fleet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        {media !== "" && (
          <Image source={{ uri: media }}  style={styles.media}/>
        )}
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={40}
          numberOfLines={4}
          placeholder={"Add your text here"}
        />
        <TouchableOpacity
          onPress={() => uploadFile()}
          style={styles.uploadButton}
        >
          <Text style={styles.buttonText}>{"Add an image"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewFleetScreen;
