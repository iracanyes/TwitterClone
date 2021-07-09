import React, { useState,  } from "react";
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { UpdateProfileScreen } from "../screens";
import { View } from "react-native";
import { API, Auth } from "aws-amplify";
import { FontAwesome5 } from '@expo/vector-icons';
import {ProfileBottomTabParamList} from "../types";

const BottomTab = createBottomTabNavigator<ProfileBottomTabParamList>();

export default function ProfileBottomTabNavigator(){
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName={"Profile"}
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false
      }}
      screenOptions={{}}
    >
      <BottomTab.Screen
        name={"Profile"}
        component={UpdateProfileScreen}
        options={{
          tabBarIcon: ({color}) => <FontAwesome5 name={"user-circle"} size={30} color={color}/>
        }}
      />
      <BottomTab.Screen
        name={"UpdateProfile"}
        component={UpdateProfileScreen}
        options={{
          tabBarIcon: ({color}) => <FontAwesome5 name={"user-edit"} size={30} color={color}/>
        }}
      />
    </BottomTab.Navigator>
  );
}
