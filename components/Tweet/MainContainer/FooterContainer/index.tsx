import React, { useEffect, useState } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createLike, deleteLike } from "../../../../graphql/mutations";
import {
  View,
  Text
} from "react-native";
import styles from "./styles";
import {
  EvilIcons,
  AntDesign,
  Feather
} from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";
import {TweetType} from "../../../../types";
import {getUser} from "../../../../graphql/queries";
import {showToast} from "../../../../widget";

export type FooterContainerProps = {
  tweet: TweetType
};

const FooterContainer = (props: FooterContainerProps) => {
  const { tweet } = props;
  const [ user, setUser ] = useState(null);
  const [ myLike, setMyLike ] = useState(null);
  let [ nbLikes , setNbLikes ] = useState(tweet.likes.items ? tweet.likes.items.length : 0 );

  useEffect(() => {
    const fetchUser = async () => {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      setUser(cognitoUser);

      if(!!tweet.like){
        const liked = tweet.likes.items.find(obj => obj.userID === cognitoUser.attributes.sub);
        if(!!liked.id){
          setMyLike(liked);
        }
      }



    }


    fetchUser();


  }, []);

  const onLike = async () => {
    console.log("Like Button pressed");
    console.log("currentUser", user);
    if(user !== null){
      console.log("currentUser", user);
      const like = {
        userID: user.attributes.sub,
        tweetID: tweet.id
      };

      try{
        const response = await API.graphql(graphqlOperation(createLike, {input: like }));
        console.log('createLike response', response);
        if(response.data.createLike){
          showToast("Like enregistré!");
          setMyLike(response.data.createLike);
          setNbLikes(nbLikes + 1);
        }
      }catch (e) {
        console.warn("CreateLike error", e);
      }


    }

  };

  const onDislike = async () => {

    try{
      const response = await API.graphql(graphqlOperation(deleteLike, { input:  { id: myLike.id} }));
      console.log("onDislike response", response);

      if(response.data.deleteLike){
        showToast('Like supprimé!');
        console.log(`Like du tweet ${tweet.id} a été supprimé!`);
        setMyLike(null);
        setNbLikes(nbLikes - 1);
      }
    }catch(e){
      console.warn(`La suppression du Like du tweet ${tweet.id} a rencontré un problème!`, e);
    }



  };

  return (
    <View style={styles.footer}>
      <View style={styles.iconWithText}>
        <Feather
          name={'message-circle'}
          size={20}
          color={Colors.light.tint}
        />
        <Text style={styles.number}>{tweet.numberOfComments}</Text>
      </View>
      <View style={styles.iconWithText}>
        <EvilIcons
          name={'retweet'}
          size={30}
          color={Colors.light.tint}
          style={{ fontWeight: "bold" }}
        />
        <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
      </View>
      <View style={styles.iconWithText}>
        {myLike ? (
          <AntDesign
            name={'heart'}
            size={24}
            color={"red"}
            onPress={() => onDislike()}
          />
        ) : (
          <AntDesign
            name={'hearto'}
            size={24}
            color={"red"}
            onPress={() => onLike()}
          />
        )}

        <Text style={styles.number}>{nbLikes}</Text>
      </View>
      <View style={styles.iconWithText}>
        <EvilIcons
          name={'share-google'}
          size={30}
          color={Colors.light.tint}
        />
      </View>




    </View>
  );
};

export default FooterContainer;
