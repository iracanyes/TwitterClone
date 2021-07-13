import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listUsersWithFleets } from "../../graphql/custom-queries";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import FleetView from "../../components/FleetView";

const FleetScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // all users with fleets
  const [ usersWithFleets, setUsersWithFleets ] = useState(route.params.usersWithFleets);

  const [ usersWithFleetsIndex, setUsersWithFleetsIndex ] = useState( route.params.usersWithFleets.findIndex( (el) => el.id === route.params.userID));

  const [ user, setUser ] = useState(  route.params.usersWithFleets[usersWithFleetsIndex]);

  const [ fleetIndex, setFleetIndex ] = useState(0);
  const [ fleet, setFleet ] = useState(user ? user.fleets.items[fleetIndex] : null);
  const [ progress, setProgress ] = useState(0);

  // Effet de bord pour la bar de progression, Timer
  useEffect(() => {
    const interval = setInterval(() => {
      if(progress < 8){
        setProgress(progress + 1);
      }else{
        // Reset timer
        setProgress(0);
        nextFleet();
        return;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [progress]);


  const nextFleet = () => {
    console.warn('next Fleet pressed!');
    // Reset timer
    setProgress(0);
    if(fleetIndex !== user.fleets.items.length - 1){
      //if fleetIndex isn't for the last one,  go to next fleet index
      setFleetIndex(fleetIndex + 1);
    }else{
      // else if usersIndex isn't the last one, go to next user
      if(usersWithFleetsIndex !== usersWithFleets.length - 1){
        setUsersWithFleetsIndex(usersWithFleetsIndex + 1);
      }else{
        // else leave FleetScreen
        navigation.navigate('Root', {screen: 'Home'});
      }
    }
  };

  const previousFleet = () => {
    console.warn('prev Fleet pressed!');
    // Reset timer
    setProgress(0);
    if(fleetIndex !== 0){
      setFleetIndex(fleetIndex - 1);
    }else{
      if(usersWithFleetsIndex !== 0){
        setUsersWithFleetsIndex(usersWithFleetsIndex - 1);
      }else{
        navigation.navigate('Root', { screen: 'Home'});
      }
    }
  };

  // Effet de bord actif à chaque modification de la valeur "fleetIndex"
  useEffect(() => {
    user !== null && setFleet(user.fleets.items[fleetIndex]);
  }, [fleetIndex]);

  // Effet de bord actif à chaque modification de la valeur "usersWithFleetsIndex"
  useEffect(() => {
    // go to next user
    usersWithFleets !== null && setUser(usersWithFleets[usersWithFleetsIndex]);
    if(fleetIndex !== 0){
      setFleetIndex(0);
    }else{
      setFleetIndex(user.fleets.items.length - 1);
    }
  }, [usersWithFleetsIndex]);


  return (
    <View style={styles.container}>
      {user !== null &&
        (<FleetView
          user={user}
          fleet={fleet}
          progress={progress}
          goToNextFleet={nextFleet}
          goToPrevFleet={previousFleet}
        />)
      }

    </View>
  );
};

export default FleetScreen;
