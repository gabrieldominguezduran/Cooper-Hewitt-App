import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/logo-white.png')}
      />
      <View>
        <Text style={styles.text}>Activist Poster Collection</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 75,
    padding: 5,
    marginBottom: 20,
    backgroundColor: '#000',
    color: '#fff',
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    margin: 10,
  },
});

export default Header;
