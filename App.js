import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
  } from 'react-native'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: []
    }
  }

  renderItem = ({ item }) => {
    return(
      <View>
        <Image
        style={{width: 250, height: 250, margin: 10,}}
        source={{ uri: item.images }}/>
        <View>
          <Text>
            {item.title}
          </Text>
          <Text>
            {item.description}
          </Text>
        </View>
    </View>
    )
    
  }

  componentDidMount() {
    const url = 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.exhibitions.getObjects&access_token=d5b4aa8389d940aa8f0bcf72e89b9b84&tag=activist-poster&per_page=30'

    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {

      let values = []

      responseJson.objects.map((data) => {
        values.push({images: data.images[0].n.url, title: data.title, description: data.description})    
      })
      
        this.setState({
          dataSource: values
        })
    })
    .catch((error) => {
      console.log(error)
      
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})