import React, {useEffect, useState} from 'react';
import {API, Auth, graphqlOperation} from "aws-amplify";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {UserInputProps} from "../types";
import {FontAwesome} from "@expo/vector-icons";
import {updateUser} from "../graphql/mutations";

const UpdateProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const user = await Auth.currentAuthenticatedUser();
        if(user){
          setUser(user);
        }
      }catch (e){
        console.warn("NewMemberScreen useEffect - User not found", e);
      }

    }

    fetchUser();
  }, []);

  const persistUser =  async (user: UserInputProps) => {
    try{
      await API.graphql(graphqlOperation(updateUser, { input: user }));
    }catch (e) {
      console.warn("Persist user error", e);
    }

  }

  const onPress= () => {
    if( user !== null ){
      // @ts-ignore
      const { attributes } = user;
      const userInfo = {
        id: attributes.sub,
        username,
        name,
        email: attributes.email,
        image: "https://placebear.com/640/360"
      };

      const response = persistUser(userInfo);
    }


  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>{"Information utilisateur"}</Text>
      <TextInput
        style={[styles.input]}
        onChangeText={setUsername}
        value={username}
        placeholder={"my_username"}
      />
      <TextInput
        style={[styles.input]}
        onChangeText={setName}
        value={name}
        placeholder={"Dubois M."}
      />
      <View style={styles.inlineButton}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.3}
          style={styles.button}
        >
          <FontAwesome name="check-square-o" size={24} color="black" />
          <Text>{"Confirmer"}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title: {
    marginTop: 10,
    padding: 10,
    fontSize: 20,

  },
  input: {},
  inlineButton: {},
  button: {},
  buttonText: {},
});
export default UpdateProfileScreen;
