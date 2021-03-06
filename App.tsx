import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
// AWS Amplify Auth
// @ts-ignore
import Amplify, {Auth, API, Hub, graphqlOperation} from "aws-amplify";
import awsconfig from './src/aws-exports';
import {
  Platform,
  StyleSheet,
} from "react-native";
import { Entypo, AntDesign, Fontisto } from "@expo/vector-icons";
import { AppProps } from "./types";

// react-native-root-toast wrapper
import {RootSiblingParent} from "react-native-root-siblings";
import Colors from "./constants/Colors";

Amplify.configure(awsconfig);

/**
 *
 * @param props
 * @constructor
 */
function App(props: AppProps) {
  const {
    oAuthUser,
    oAuthError,
  } = props;
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [ user, setUser ] = useState(null);

  const getUser = async () => {
    return await Auth.currentAuthenticatedUser({bypassCache: true});
  };

  useEffect(() => {
    try{
      Hub.listen('auth', ({ payload: { event, data }}) => {

        switch(event){
          case 'signIn':
          case 'cognitoHostedUI':
            const user = getUser();
            //console.log("App Hub listen - Auth event", event);
            //console.log("App Hub listen - Auth data", data);
            //console.log("App Hub listen - oAuthUser", oAuthUser);
            //console.log("App Hub listen - currentAuthenticatedUser", user);
            setUser(data);
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
    }catch (e) {
      console.error("App Hub.listen error", e);
    }


    getUser().then((userData) => setUser(userData)).catch(e => console.log("CurrentAuthenticatedUser error!", e));
  });


  if (!isLoadingComplete) {
    return null;
  } else {
    return (

      <SafeAreaProvider>
        {/*user ?? console.log('App return User', user)*/}
        <SafeAreaView style={styles.container}>
          <RootSiblingParent>
            <StatusBar backgroundColor={Colors.light.tint}/>
            <Navigation colorScheme={colorScheme} />
          </RootSiblingParent>
        </SafeAreaView>
      </SafeAreaProvider>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default App;
