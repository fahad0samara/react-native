import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Pressable } from "react-native";
import { User } from "../Domain/Model/User";
import Header from "../components/Header";
import Form from "../components/Form";
import {theme} from "../Utils/Theme";
import { useUser } from "../Dependencies/UserContext";

const Onboarding = () => {

  const [isButtonActive, setButtonActive] = useState(false);
  const { login } = useUser();
  const [transitionUser, setTransitionUser] = useState(null);

  const handleSubmission = (
    isValid,
    firstname,
    email,
    notificationSettings
  ) => {
    setButtonActive(isValid);
    if (isValid) {
      setTransitionUser(
        new User(isValid, firstname, "", email, "", "", notificationSettings)
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.formContainer}>
        <Form onSubmission={handleSubmission} />
      </View>
      <View style={styles.footer}>
        <Pressable
          style={isButtonActive ? styles.activeButton : styles.inactiveButton}
          onPress={isButtonActive ? () => login(transitionUser) : null}
          disabled={!isButtonActive}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.lightBackground,
  },
  header: {
    flex: 0.1,
    backgroundColor: theme.colors.lightBackground,
  },
  formContainer: {
    flex: 0.7,
    backgroundColor: theme.colors.background,
  },
  footer: {
    flex: 0.2,
    backgroundColor: theme.colors.lightBackground,
  },
  activeButton: {
    ...commonButtonStyles(theme.colors.secondary),
  },
  inactiveButton: {
    ...commonButtonStyles(theme.colors.disabled),
  },
  buttonText: {
    ...theme.textVariants.cta,
    color: theme.colors.primary,
    padding: theme.spacing.s,
    textAlign: "center",
  },
});

const commonButtonStyles = (backgroundColor) => ({
  alignSelf: "center",
  marginTop: theme.spacing.xl,
  paddingHorizontal: theme.spacing.xl,
  paddingVertical: theme.spacing.s,
  backgroundColor,
  borderRadius: theme.spacing.m,
  position: "relative",
});


