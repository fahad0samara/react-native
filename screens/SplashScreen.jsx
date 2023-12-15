import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {theme} from '../Utils/Theme';
import logo from '../assets/logo.jpg';

const SpashScreen = () => {
  return (
    <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
      <Text style={styles.title}>Your italian restaurant</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    logo: {
        width: '80%',
        resizeMode: 'contain'
    },
    title: theme.textVariants.title
});

export default SpashScreen;
