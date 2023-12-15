import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { theme } from "../Utils/Theme";

const LemonButton = (props) => {
  return (
    <View>
      {props.type == "primary" && (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: theme.colors.primary,
              opacity: pressed ? 0.8 : 1,
            },
            styles.buttonContainer,
          ]}
          onPress={props.onPress}
          disabled={props.disabled}
        >
          <Text style={styles.primaryButton}>{props.title}</Text>
        </Pressable>
      )}
      {props.type == "secondary" && (
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: theme.colors.secondary,
              opacity: pressed ? 0.8 : 1,
            },
            styles.buttonContainer,
          ]}
          onPress={props.onPress}
          disabled={props.disabled}
        >
          <Text style={styles.secondaryButton}>{props.title}</Text>
        </Pressable>
      )}
      { props.type == 'tertiary' && (
        <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? theme.colors.lightBackground
              : theme.colors.background,
          },
          styles.tertiaryButtonContainer,
        ]}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <Text style={styles.tertiaryButton}>{props.title}</Text>
      </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.radius.s,
    marginHorizontal: theme.spacing.s,
  },
  tertiaryButtonContainer: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginHorizontal: theme.spacing.s,
  },
  primaryButton: {
    textAlign: 'center',
    color: theme.colors.lightBackground,
    fontWeight: "bold",
  },
  secondaryButton: {
    textAlign: 'center',
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  tertiaryButton: {
    textAlign: 'center',
    color: "grey",
    fontWeight: "bold",
  },
});

export default LemonButton;
