import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
// AWS Amplify Auth
// @ts-ignore
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from './aws-exports';
import { withOAuth } from "aws-amplify-react-native";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Entypo, AntDesign, Fontisto } from "@expo/vector-icons";
import Login from "./components/Login";

Amplify.configure(awsconfig);

type AppProps = { oAuthUser: any; oAuthError: any; hostedUISignIn: any; facebookSignIn: any; googleSignIn: any; amazonSignIn: any; };

function App(props: AppProps) {
  const {
    oAuthUser,
    oAuthError,
    hostedUISignIn,
    facebookSignIn,
    googleSignIn,
    amazonSignIn,

  } = props;
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [ user, setUser ] = useState(null);

  const getUser = () => {
    return Auth.currentAuthenticatedUser()
      .then( (userData) => userData)
      .catch( (error) => console.error('Not Sign in: ', error))
  };

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data }}) => {
      console.log("Auth data", data);
      console.log("Auth event", event);
      switch(event){
        case 'signIn':
          getUser().then( (userData) => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
          console.error('OAuth Sign in failure', oAuthError);
          console.error('Sign in failure', data);
          break;
        case 'cognitoHostedUI_failure':
          console.error('OAuth Sign in failure', oAuthError);
          console.error('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  });


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {user
          ? (
            <SafeAreaView style={styles.container}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaView>
          )
          : (
            <SafeAreaView style={styles.container}>
              <Login user={user} setUser={setUser}/>
            </SafeAreaView>
          )
        }

      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default withOAuth(App);
