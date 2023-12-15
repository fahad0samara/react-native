import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { theme } from "../Utils/Theme";
import heroImage from "../assets/hero.jpg";

const Hero = () => {
  return (
    <View style={styles.hero}>
      <Text style={styles.title}>Little Lemon</Text>
      <View style={styles.row}>
        <View style={styles.heroColumn}>
          <Text style={theme.textVariants.whiteTitle}>Chicago</Text>
          <Text style={styles.claim}>
            We are a family owned Mediterraean restaurant, focused on
            traditional recipes served with modern twist.
          </Text>
        </View>
        <Image source={heroImage} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.primary,
  },
  row: {
    flexDirection: "row",
  },
  heroColumn: {
    flexDirection: "column",
    flex: 0.6,
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    color: theme.colors.secondary,
  },
  image: {
    marginTop: theme.spacing.m,
    flex: 0.4,
    height: 150,
    borderRadius: theme.radius.m,
  },
  claim: {
    marginTop: theme.spacing.m,
    marginRight: theme.spacing.l,
    color: theme.colors.background,
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Hero;
