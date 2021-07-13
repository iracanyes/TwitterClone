import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import styles  from './styles';
import {
  View,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {IFleetViewProps} from "../../types/interfaces";
import { S3Image } from "aws-amplify-react-native";
import ProfilePicture from "../ProfilePicture";
import { DateTime } from "luxon";
import * as Progress from "react-native-progress";

const FleetView = (props: IFleetViewProps) => {
  const { user, fleet, progress, goToPrevFleet, goToNextFleet } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#152d48',"#0e263f", '#0b223a','#0e263f', '#152d48']}
        style={styles.background}
      >
        <View style={styles.header}>
          {user && (
            <LinearGradient
              colors={['#eaeaea','transparent','transparent','#eaeaea']}
              locations={[0,0.12,0.9,1]}
              style={styles.headerBackground}
            >
              <ProfilePicture
                image={user.image}
                onPress={() => navigation.navigate('Profile')}
                styles={styles}
              />
              <View style={styles.headerText}>
                <Text style={styles.headerName}>{user.name}</Text>
                <View style={styles.headerSubTitle}>
                  <Text style={styles.headerUsername}>
                    {user.username}
                  </Text>
                  <Text style={styles.headerDate}>
                    {DateTime.fromISO(fleet.createdAt).toRelative()}
                  </Text>
                </View>
              </View>

            </LinearGradient>
          )}

        </View>
        {/* Progress bar */}
        <Progress.Circle
          progress={(8 - progress) / 8}
          size={50}
          showsText={true}
          formatText={() => (8 - progress) + 'sec'}
          style={styles.progressBar}
        />
        {fleet.type === "Text"
          ? (
            <Text style={styles.text}>
              {fleet.text}
            </Text>
          )
          : (<S3Image imgKey={fleet.image} style={styles.image}/>)
        }

      </LinearGradient>
      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback onPress={() => goToPrevFleet()}>
          <View style={styles.prevButton}/>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => goToNextFleet()}>
          <View style={styles.nextButton}/>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default FleetView;
