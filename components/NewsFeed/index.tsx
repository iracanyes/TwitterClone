import React, { Component, PropType, useState, useEffect} from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//+import styles from "./styles";
import NewsItem from "../NewsItem";

type NewsFeedProps = {
  news: object,
};

const NewsFeed = (props: NewsFeedProps) => {
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    const ds = new FlatView.DataSource({
      rowHasChanged: (row1, row2) => row1.title !== row2.title
    });

    setDataSource(ds.cloneWithRows(props.news));
  });

  const renderRow = (rowData: object, ...rest) => {
    const index = parseInt(rest[1], 10);
    return (
      <NewsItem
        style={styles.newsItem}
        index={ index }
        /* {...rowData}
         * équilent à écrire:
         * title={rowData.title}
         * imageUrl={rowData.imageUrl}
         * content={rowData.content}
         */
        {...rowData}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={dataSource}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={item => item.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  flatlist: {},
  newsItem: {
    marginBottom: 20
  },
});



NewsFeed.defaultProps = {
  news: [
    {
      title: 'React Native',
      imageUrl: 'https://facebook.github.io/react/img/logo_og.png',
      description: 'Build Native Mobile Apps using JavaScript and React',
      date: new Date(),
      author: 'Facebook',
      location: 'Menlo Park, California',
    },
    {
      title: 'Packt Publishing',
      imageUrl:'https://www.fillmurray.com/640/360',
      description: 'Stay Relevant',
      date: new Date(),
      author: 'Fill Murray',
      location: 'Birmingham, UK',
      url: 'https://bujamarket.iracanyes.com'
    }
  ]
};

export default NewsFeed;
