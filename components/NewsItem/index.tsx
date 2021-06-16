import React, { Component, useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

type NewsItemProps = {
  title: string;
  imageUrl: string;
  content: string;
  style: object
}

const NewsItem = (props: NewsItemProps) => {
  const { title, imageUrl, content} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>
      <Image source={{ uri: imageUrl}} style={styles.image}/>
      <Text style={styles.content}>
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {},
  image: {},
  content: {}
});

export default NewsItem;
