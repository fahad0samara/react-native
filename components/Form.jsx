import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TexfieldConfiguration, TextField } from "./ValidableTextField";
import { useValidation } from "../Utils/Validators";
import { theme } from "../Utils/Theme";

const Form = ({ onSubmission }) => {
  // MARK: - States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [validationState, setValidation] = useValidation();
  const isFormValid =
    validationState.isFirstNameValid && validationState.isEmailValid;
  const checkboxStates = {
    orderStatus: true,
    passwordChanges: false,
    specialOffers: true,
    newsletter: false,
  };
  // MARK: - Form Configurations
  const nameConf = new TexfieldConfiguration(
    "First Name",
    "First Name",
    "string",
    handleNameValidity,
    "LastName should only contain letters"
  );

  const emailConf = new TexfieldConfiguration(
    "E-mail",
    "e-mail",
    "email",
    handleEmailValidity,
    "Please enter a valid e-mail address",
    "email-address"
  );

  const confs = [nameConf, emailConf];

  // MARK: - Form Validation
  function handleNameValidity(value, text) {
    setValidation("isFirstNameValid", value);
    setName(text);
    onSubmission(isFormValid, name, email, checkboxStates);
  }

  function handleEmailValidity(value, text) {
    setValidation("isEmailValid", value);
    setEmail(text);
    onSubmission(isFormValid, name, email, checkboxStates);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let us get to know you</Text>
      {confs.map((config, index) => (
        <TextField
          key={index}
          configuration={config}
          onValidationSet={config.onValidationSet}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.l,
    alignItems: "center",
  },
  title: [
    theme.textVariants.title,
    {
      color: theme.colors.foreground,
      padding: theme.spacing.l,
      textAlign: "center",
      marginBottom: 100,
      marginTop: 50,
    },
  ],
});

export default Form;
