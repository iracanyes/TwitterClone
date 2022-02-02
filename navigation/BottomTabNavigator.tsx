/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {Fontisto, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {
  HomeScreen,
  SearchScreen,
  NotificationsScreen,
  MessagesScreen
} from "../screens";
import {
  BottomTabParamList,
  HomeNavigatorParamList,
  MessagesNavigatorParamList, UserType
} from '../types';
import ProfilePicture from "../components/ProfilePicture";
import {View} from "react-native";
import {API, Auth, graphqlOperation} from "aws-amplify";
import { getUser } from "../graphql/queries";
import {IUser} from "../types/interfaces";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api-graphql";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        // Afficher le label d'une icone
        showLabel: false,
      }}
      screenOptions={{}}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => <Fontisto name="bell-alt" color={color} size={24} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-mail" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeNavigatorParamList>();

// Define HomeScreeen Navigation stack
function HomeNavigator() {
  const [user, setUser  ] = React.useState<IUser|any>(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    const fetchUser = async () => {
      try{
        // Get current cognito user
        const cognitoUser = await Auth.currentAuthenticatedUser();

        // Get User info in DB
        if(cognitoUser){
          const response = await API.graphql({
            query: getUser,
            variables: { id: cognitoUser.attributes.sub },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
          });

          // @ts-ignore
          if(response.data.getUser){
            // @ts-ignore
            setUser(response.data.getUser);
          }
        }else{
          return;
        }
      }catch(e){
        console.warn("BottomTabNavigator HomeNavigator GetUser Error", e);
      }

    };

    fetchUser();

  }, []);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => null,
        }}
      />
    </HomeStack.Navigator>
  );
}

const MessagesStack = createStackNavigator<MessagesNavigatorParamList>();

function MessagesNavigator() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{ headerTitle: 'Messages' }}
      />
    </MessagesStack.Navigator>
  );
}
