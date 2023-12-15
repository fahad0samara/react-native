import React from "react";
import { StyleSheet, View, Image } from "react-native";
import logo from "../assets/logo.jpg";
import {theme} from "../Utils/Theme";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: theme.colors.lightBackground,
    padding: theme.spacing.m,
  },
  logo: {
    resizeMode: "contain",
    height: 50,
  },
});

export default Header;
