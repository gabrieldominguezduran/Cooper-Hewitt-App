import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Header from './components/Header';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true,
    };
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <Image style={styles.images} source={{uri: item.images}} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.description}</Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    const url =
      'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&access_token=d5b4aa8389d940aa8f0bcf72e89b9b84&tag=activist-poster&per_page=30';

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        let values = [];

        responseJson.objects.map(data => {
          values.push({
            images: data.images[0].n.url,
            title: data.title,
            description: data.gallery_text,
          });
        });

        this.setState({
          dataSource: values,
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    ) : (
      <View>
        <Header />
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    width: 370,
    height: 500,
    margin: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 15,
  },
  text: {
    fontSize: 20,
    padding: 15,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
