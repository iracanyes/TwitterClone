import React, { useEffect, useState } from 'react';
import {useNavigation, useRoute} from "@react-navigation/native";
import {
  Alert,
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {Auth, API, graphqlOperation} from "aws-amplify";
import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import styles from "./styles";
import { getUser } from "../../graphql/queries";
import { createUser } from "../../graphql/mutations";
import { UserInputProps } from "../../types";
import BG from "../../assets/images/bg-login1.jpg";
import { showToast } from '../../widget';

type ConfirmSubscribeProps = {
};

const ConfirmSignUpScreen = (props: ConfirmSubscribeProps) => {
  const route = useRoute();
  // @ts-ignore
  const { username }  = route.params;
  const navigation = useNavigation();
  const [ user, setUser ] = useState(null);
  const [ verificationCode, setVerificationCode ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false);

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
      .then( (userData) => setUser(userData))
      .catch( (error) => console.warn("ConfirmSubscribeScreen current authenticated user :", error));
  };

  const getUserInDb = async (user: any) => {
    const response = await API.graphql(graphqlOperation(getUser, { id: user.attributes.sub}));

    //@ts-ignore
    return response.data.getUser ?? null;
  }

  const persistUser = async (user: UserInputProps) => {
    await API.graphql(graphqlOperation(createUser, { input: user} ));
  };

  const resendVerificationCode = async () => {
    try{
      await Auth.resendSignUp(username);

    }catch (e) {
      console.warn('error resending code: ', e);
    }
  }

  const confirmSignUp = async () => {

    if(!validateEmail(username)){
      return;
    }

    try{
      // On se connecte
      const confirmSignUpResponse = await Auth.confirmSignUp(username, verificationCode);



      // Vérifie si l'utilisateur existe en db sinon on le crée
      if(confirmSignUpResponse === "SUCCESS"){
        showToast("Inscription validée! Vous pouvez maintenant vous connecter à l'application.");
        navigation.navigate('Login');

      }else{
        showToast("Erreur durant la procédure de validation! Veuillez ré-essayer!");
        setVerificationCode("");
        return;
      }


    }catch(error){
      /*
        Sign In error, Object {
          "code": "UserNotFoundException",
          "message": "User does not exist.",
          "name": "UserNotFoundException",
        }
       */
      switch(error.code){
        case "UserNotFoundException":
          showToast("User doesn't exist! Please subscribe.");
          // Redirection vers la page d'inscription
          navigation.navigate('Subscribe');
          break;
        default:
          showToast(
            "An error occured during the process! Please, retry",
            {
              backgroundColor: "red"
            }
          );

          break;
      }
      console.warn('Sign In error', error);
    }

  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BG}
        style={styles.containerBackgroundImage}
      >
        <Text
          style={styles.title}
        >
          {"Valider votre inscription"}
        </Text>
        <View style={styles.mainContainer}>
          <Text style={styles.infoBox}>
            {"Veuillez consulter votre boîte de réception, vous y trouverez le code de verification envoyé afin de valider votre compte!"}
          </Text>
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, styles.inputEmail]}
              autoCorrect={false}
              onChangeText={setVerificationCode}
              keyboardType={'number-pad'}
              value={verificationCode}
              placeholder={"*** Votre code de vérification ***"}
            />

            <View style={styles.inlineButtonContainer}>
              {/**** Subscribe button ***/}
              <TouchableOpacity
                style={[styles.button, styles.inlineButton]}
                onPress={() => navigation.navigate('Subscribe')}
              >
                <MaterialCommunityIcons name="account-plus" size={24} color="black" />
                <Text style={styles.buttonText}>
                  {"Inscription"}
                </Text>
              </TouchableOpacity>
              {/**** Subscribe button ****/}
              {/**** Confirm button ****/}
              <TouchableOpacity
                style={[styles.button, styles.inlineButton, styles.confirmButton]}
                onPress={() => confirmSignUp()}
              >
                <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24} color="black" />
                <Text style={styles.buttonText}>
                  {"Confirmer"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>

            {/* Go directly to a configured identity provider */}
            <TouchableOpacity
              style={[styles.button, styles.buttonFacebook]}
              onPress={() => resendVerificationCode()}
            >
              <MaterialCommunityIcons name={"email-send"} size={24} color={"#FFF"}/>
              <Text style={styles.buttonText}>
                {"Renvoyer le code de vérification"}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </ImageBackground>

    </View>
  );
};


export default ConfirmSignUpScreen;
