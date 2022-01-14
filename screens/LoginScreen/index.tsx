import React, {useEffect, useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {ImageBackground, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {withOAuth} from "aws-amplify-react-native";
import {AntDesign, Entypo, MaterialCommunityIcons} from "@expo/vector-icons";
import styles from "./styles";
import {getUser, listTweets} from "../../graphql/queries";
import {createUser} from "../../graphql/mutations";
import {UserInputProps} from "../../types";
import BG from "../../assets/images/bg-login1.jpg";
import {showToast} from '../../widget';
import clientAppSync from "../../config/appsync_client";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api-graphql";

type LoginProps = {
  facebookSignIn: any,
  googleSignIn: any,
  amazonSignIn: any,
};

const LoginScreen = (props: LoginProps) => {
  const {
    facebookSignIn,
    googleSignIn,
    amazonSignIn
  } = props;
  const navigation = useNavigation();
  const [ user, setUser ] = useState(null);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false);

  const getUserInDB = async (cognitoUser: any) => {
    try{
      //const response = await API.graphql(graphqlOperation(getUser, {id : cognitoUser.attributes.sub }));

      const response =  await clientAppSync.query({
        // @ts-ignore
        query: graphqlOperation(listTweets),
        //variables: { id: cognitoUser.attributes.sub }
      });
      console.log("getUserInDB clientAppSync response", response);
      // @ts-ignore
      return response ? response : null;

    }catch (e) {
      console.error("getUserInDB error\n",e );
    }
  };

  const createUserInDB = async (cognitoUser: any, res: any) => {
    try{
      if(res === undefined || res.data.getUser === null){
        console.log("\nUser is null\n");
        console.log("\nUser is null\n");
        console.log("\nUser is null\n");
        // Create User if he doesn't exist in DB
        console.log("\nUser.username is null\n");
        const user = {
          id: cognitoUser.attributes.sub,
          username: '@' + cognitoUser.attributes.email.split('@')[0],
          name: cognitoUser.attributes.email.split('@')[0],
          email: cognitoUser.attributes.email,
          image: "https://placebear.com/640/360",
          status: "Hello world!"
        };

        const res = await persistUser(user);
        console.log("SUCCESS persistUser res\n", res);

        navigation.navigate('Root', {screen: 'Home'});
      }
    }catch (e) {
      console.error("createUserInDB error\n", e);
    }
  };

  /**
   * Get Authenticated user on first load
   */
  useEffect(() => {

    const getAuthenticatedUser = async () => {
      const cognitoUser = await Auth.currentAuthenticatedUser({ bypassCache: true});

      if(!('attributes' in cognitoUser)) return;

      console.log("login cognitoUser\n", cognitoUser);

      const res = await getUserInDb(cognitoUser);

      console.log("useEffect getUserInDb response", res);

      if(res === undefined || res.data.getUser === null){
        await createUserInDB(cognitoUser, res);
      }else{
        showToast(`Welcome ${res.data.getUser.username}!`);
        navigation.navigate('Root', { screen: 'Home' })
      }

    };

    getAuthenticatedUser();
  }, []);

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
    try{
      return await Auth.currentAuthenticatedUser();
    }catch( error){
      console.warn("LoginScreen current authenticated user :", error )
    }

  };

  const getUserInDb = async (user: any) => {
    try{
      const response = await API.graphql({
        query: getUser,
        variables: { id: user.attributes.sub},
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log("getUserInDb response\n", response);
      //@ts-ignore
      return response.data.getUser !== undefined ? response.data.getUser :  null;
    }catch(e){
      console.warn("Error getUserInDb", e);
    }

  }

  const persistUser = async (user: UserInputProps) => {
    try{
      const res = await API.graphql({
        // @ts-ignore
        mutation: createUser,
        variables: { input: user},
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });

      console.log("persistUser res\n", res);
    }catch (e) {
      console.error("persistUser error\n", e);
    }

  };

  const signIn = async () => {
    if(!validateEmail(email)){
      return;
    }

    try{
      // authentification Cognito
      const cognitoUser = await Auth.signIn(email, password);



      // Vérifie si l'utilisateur existe en db sinon on le crée
      if(cognitoUser.attributes !== undefined){
        const res = await getUserInDb(cognitoUser);

        // Create User if he doesn't exist in DB
        if(res.data.getUser.username === undefined){
          const userInput = {
            id: cognitoUser.attributes.sub,
            username: '@' + cognitoUser.attributes.email.split('@')[0],
            name: cognitoUser.attributes.email.split('@')[0],
            email: cognitoUser.attributes.email,
            image: "https://placebear.com/640/360",
            status: "Hello world!"
          };

          await persistUser(userInput);

        }else{
          showToast(`Welcome ${res.data.getUser.username}`);
        }

        // Redirection vers la page d'accueil
        navigation.navigate('Root', { screen: 'Home' });
      }else{
        showToast("User doesn't exitst ! Please subscribe.");
        navigation.navigate('Subscribe');
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
        case "UserNotConfirmedException":
          showToast('Inscription non-validé!\nVisitez votre boite email pour accéder au code de verification.');
          // Redirection vers la page de confirmation d'inscription
          navigation.navigate('ConfirmSignUp', { username: email});
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

    setPassword('');
    setEmail('');
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
          {"Connexion à votre compte"}
        </Text>
        <View style={styles.mainContainer}>
          <View style={styles.formContainer}>
            <TextInput
              //autoFocus
              style={[styles.input, styles.inputEmail]}
              textContentType={"emailAddress"}
              keyboardType={'email-address'}
              autoCompleteType={"email"}
              inlineImageLeft={"mail_icon"}
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
                secureTextEntry={!showPassword}
                autoCorrect={false}
                onChangeText={setPassword}
                value={password}
                placeholder={"*** Votre mot de passe ***"}
              />
              <Entypo
                name={showPassword ? "eye" : "eye-with-line"}
                size={24}
                color={showPassword ? "blue" : "red" }
                onPress={() => setShowPassword(!showPassword)}
                style={styles.inputRightIcon}
              />
            </View>

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
                onPress={() => signIn()}
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
      </ImageBackground>

    </View>
  );
};


export default withOAuth(LoginScreen);
