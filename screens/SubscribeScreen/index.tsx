import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import {
  Alert,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {Auth, API, graphqlOperation} from "aws-amplify";
import { withOAuth } from "aws-amplify-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  FontAwesome
} from "@expo/vector-icons";
import styles from "./styles";
import { getUser } from "../../graphql/queries";
import { createUser } from "../../graphql/mutations";
import {UserInputProps} from "../../types";
import BG from "../../assets/images/bg-login1.jpg";

import { showToast } from "../../widget";

type SubscribeProps = {
  facebookSignIn: any,
  googleSignIn: any,
  amazonSignIn: any,
};

const SubscribeScreen = (props: SubscribeProps) => {
  const {
    facebookSignIn,
    googleSignIn,
    amazonSignIn
  } = props;
  const navigation = useNavigation();
  const [ user, setUser ] = useState(null);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ showPassword1, setShowPassword1 ] = useState(false);
  const [ showPassword2, setShowPassword2 ] = useState(false);

  const validateEmail = (input: string) => {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w{2,}/;
    //let reg2 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(!reg.test(input)){
      showToast("Email invalide!");
      return false;
    }else{
      return true;
    }
  };

  const getCognitoUser = async () => {
    return await Auth.currentAuthenticatedUser()
      .catch( (error) => console.warn("SubscribeScreen current authenticated user error :", error));
  };

  const getUserInDb = async (id: any) => {
    return await API.graphql(graphqlOperation(getUser, { id: id}));

  }

  const persistUser = async (user: UserInputProps) => {
    await API.graphql(graphqlOperation(createUser, { input: user} ));
  };

  const signUp = async () => {

    const signUpRequest = Auth.signUp(email, password);

    try{
      // inscription Cognito
      const signUpResponse = await signUpRequest;


      // Vérifie si l'utilisateur existe en db sinon on le crée
      if(signUpResponse.userSub !== undefined){
        showToast('Inscription confirmée!');
        navigation.navigate('ConfirmSignUp');
      }else{
        showToast("An error occured during the process of sign in");
        console.warn("An error occured during the process of sign in");
        return;
      }

    }catch(error){
      console.warn('Sign Up error', error);

      // Invalider la requête d'inscription
      API.cancel(signUpRequest, "Sign Up error occured");

      switch(true){
        case /UsernameExistsException/.test(error.code):
          showToast(`"${email}" already exists in our database`);
          break;
        case /validation error detected/.test(error.message):
          showToast(error.message.split(':').slice(1).join());
          break;

      }
    }

    setUser(user);
    setPassword('');
    setConfirmPassword('');
    setEmail('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : "height"}
      style={styles.container}>
      <ImageBackground
        source={BG}
        style={styles.containerBackgroundImage}
      >
        <Text
          style={styles.title}
        >
          {"Inscription via votre compte"}
        </Text>
        <View style={styles.mainContainer}>
          <View style={styles.formContainer}>
            <TextInput
              //autoFocus
              style={[styles.input, styles.inputEmail]}
              textContentType={"emailAddress"}
              autoCompleteType={"email"}
              keyboardType={"email-address"}
              onChangeText={setEmail}
              onEndEditing={() => validateEmail(email)}
              value={email}
              placeholder={"michel.andco@gmail.com"}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.inputPassword]}
                textContentType={"password"}
                autoCompleteType={"password"}
                secureTextEntry={!showPassword1}
                autoCorrect={false}
                onChangeText={setPassword}
                value={password}
                placeholder={"*** Votre mot de passe ***"}
              />
              <Entypo
                name={showPassword1 ? "eye" : "eye-with-line"}
                size={24}
                color={showPassword1 ? "blue" : "red" }
                onPress={() => setShowPassword1(!showPassword1)}
                style={styles.inputRightIcon}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.inputPassword,
                  {backgroundColor: password === confirmPassword && password !== "" ? '#CCFF66' : 'white'}
                ]}
                textContentType={"password"}
                autoCompleteType={"password"}
                secureTextEntry={!showPassword2}
                autoCorrect={false}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder={"*** Confirmer votre mot de passe ***"}
              />
              <Entypo
                name={showPassword2 ? "eye" : "eye-with-line"}
                size={24}
                color={showPassword2 ? "blue" : "red" }
                onPress={() => setShowPassword2(!showPassword2)}
                style={styles.inputRightIcon}
              />
            </View>

            <View style={styles.inlineButtonContainer}>

              <TouchableOpacity
                style={[styles.button, styles.inlineButton]}
                onPress={() => navigation.navigate('Login')}
              >
                <Ionicons name="log-in-outline" size={24} color="black" />
                <Text style={styles.buttonText}>
                  {"Connexion"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.inlineButton, styles.confirmButton]}
                onPress={() => signUp()}
              >
                <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24} color="black" />
                <Text style={styles.buttonText}>
                  {"Confirmer"}
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.buttonContainer}>
            {/* Go to the Cognito Hosted UI
              <TouchableOpacity
                style={[styles.button, styles.buttonCognito]}
                onPress={hostedUISignIn}
              >
                <Fontisto name={"aws"} size={24} color={"#FFF"}/>
                <Text style={styles.buttonText} >
                  {"Cognito"}
                </Text>
              </TouchableOpacity>
              */}
            {/* Go directly to a configured identity provider */}
            <TouchableOpacity
              style={[styles.button, styles.buttonFacebook]}
              onPress={facebookSignIn}
            >
              <Entypo name={"facebook"} size={24} color={"#FFF"}/>
              <Text style={styles.buttonText}>
                {"Facebook"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonGoogle]}
              onPress={googleSignIn}
              activeOpacity={0.3}
            >
              <AntDesign name={"google"} size={24} color={"#FFF"}/>
              <Text style={styles.buttonText}>
                {"Google"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonAmazon]}
              onPress={amazonSignIn}
              disabled
              activeOpacity={0.3}
            >
              <AntDesign name={"amazon"} size={24} color={"#FFF"}/>
              <Text style={styles.buttonText}>
                {"Amazon"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*
          <ImageBackground
            source={BG}
            style={styles.containerBackgroundImage}
          >

          </ImageBackground>
        */}
      </ImageBackground>



    </KeyboardAvoidingView>
  );
};


export default withOAuth(SubscribeScreen);
