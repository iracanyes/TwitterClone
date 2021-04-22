import React from "react";
import {View} from "react-native";
import ProfilePicture from "../index";

export type TweetProps = {

};

const Tweet = (props: TweetProps) => {
  return (
    <View>
      <View>
        <ProfilePicture image={"https://www.fillmurray.com/640/360"} size={40} />
      </View>
      <View>
        
      </View>
    </View>
  );
};
