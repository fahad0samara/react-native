import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { theme } from "../Utils/Theme";

const DishCell = (props) => {
  const image = () => {
    switch (props.item.image) {
      case "greekSalad.jpg":
        return require(`../assets/dishes/greekSalad.jpg`);
      case "pasta.jpg":
        return require(`../assets/dishes/pasta.jpg`);
      case "lemonDessert.jpg":
        return require(`../assets/dishes/lemonDessert.jpg`);
      case "grilledFish.jpg":
        return require(`../assets/dishes/grilledFish.jpg`);
      case "bruschetta.jpg":
        return require(`../assets/dishes/bruschetta.jpg`);
      default:
        // Provide a default image if none of the cases match
        return require(`../assets/dishes/greekSalad.jpg`);
    }
  };

  return (
    <View style={styles.cell}>
      <Text style={theme.textVariants.headline}>{props.item.name}</Text>
      <View style={styles.row}>
        <View style={styles.text}>
          <Text
            style={[styles.description, theme.textVariants.description]}
            numberOfLines={2}
          >
            {props.item.description}
          </Text>
          <Text style={theme.textVariants.price}>${props.item.price}</Text>
        </View>
        <Image source={image()} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    margin: theme.spacing.m,
  },
  row: {
    flexDirection: "row",
  },
  text: {
    flex: 0.7,
  },
  description: {
    marginVertical: theme.spacing.m,
  },
  image: {
    flex: 0.3,
    resizeMode: "cover",
    height: 100,
    width: 100,
    borderRadius: theme.radius.m,
    marginLeft: theme.spacing.l,
  },
});

export default DishCell;
