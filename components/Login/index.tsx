import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Auth, Hub } from "aws-amplify";
import { withOAuth } from "aws-amplify-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome
} from "@expo/vector-icons";
import styles from "./styles";

type LoginProps = {
  facebookSignIn: any,
  googleSignIn: any,
  amazonSignIn: any
};

const Login = (props: LoginProps) => {
  const {
    user,
    setUser,
    facebookSignIn,
    googleSignIn,
    amazonSignIn
  } = props;
  //const [ user, setUser ] = useState(null);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false);

  const getUser = () => {
    return Auth.currentAuthenticatedUser()
      .then( (userData) => setUser(userData))
      .catch( (error) => console.warn("Not Sign In :", error));
  };

  const signIn = async () => {
    try{
      const user = await Auth.signIn(email, password);
      setUser(user);
    }catch(error){
      console.warn('Sign In error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
      >
        {"Connexion à votre compte : "}
      </Text>
      <View style={styles.mainContainer}>
        <View style={styles.formContainer}>
          <TextInput
            autoFocus
            style={[styles.input, styles.inputEmail]}
            textContentType={"emailAddress"}
            onChangeText={setEmail}
            value={email}
            placeholder={"michel.andco@gmail.com"}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.inputPassword]}
              textContentType={"password"}
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
            <TouchableOpacity
              style={[styles.button, styles.inlineButton]}
              onPress={signIn}
            >
              <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24} color="black" />
              <Text style={styles.buttonText}>
                {"Confirmer"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.inlineButton]}
            >
              <MaterialCommunityIcons name="account-plus" size={24} color="black" />
              <Text style={styles.buttonText}>
                {"Annuler"}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
        {/*
          <View style={styles.buttonContainer}>
          <Button
            icon={<Entypo name={"facebook"} size={24} color={"#217CD8"}/>}
            title={"Open Facebook"}
            color={"#217CD8"}
            onPress={() => Auth.federatedSignIn({ provider: 'Facebook' })}
            accessibilityLabel="Connect with Facebook"
          />
          <Button
            title={"Open Google"}
            color={"#217CD8"}
            onPress={() => Auth.federatedSignIn({ provider: 'Google' })}
          />
          <Button
            title={"Open Hosted UI"}
            color={"orange"}
            onPress={() => Auth.federatedSignIn()}
          />
          <Button
            title={"Sign Out"}
            color={"red"}
            onPress={() => Auth.signOut()}
          />
        </View>
        */}

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
    </View>
  );
};


export default withOAuth(Login);
