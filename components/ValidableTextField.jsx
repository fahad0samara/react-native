import { useEffect, useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import warningLogo from "../assets/warning.png";
import { validateString, validateEmail, isValidPhoneNumber } from "../Utils/Validators";
import {theme} from "../Utils/Theme";

// Configuration object that feeds a form including vdator injection and validation rules.ali
export class TexfieldConfiguration {
  constructor(
    title,
    placeholder,
    validator,
    onValidationSet,
    rules,
    type = "default",
    smallFont = false
  ) {
    this.title = title;
    this.placeholder = placeholder;
    this.validator = validator;
    this.onValidationSet = onValidationSet;
    this.rules = rules;
    this.type = type;
    this.smallFont = smallFont;
  }
}

// Custom TextInput component 
// - parameters: 
//  configuration: TextFieldConfiguration
//  onValidationSet: callbackMethod allowing to pass value to its parent
export const TextField = ({ configuration, onValidationSet, value = null }) => {
  const screen = useWindowDimensions();
  // MARK: - States
  const [text, onChangeText] = useState("");
  const [isValid, setIsValid] = useState(false);

  // MARK : -Selectors
  const handleTextChange = (inputText) => {
    onChangeText(inputText);
    switch (configuration.validator) {
      case "string":
        setIsValid(validateString(inputText));
        onValidationSet(isValid, inputText);
        break;
      case "email":
        setIsValid(validateEmail(inputText));
        onValidationSet(isValid, inputText);
        break;
      case "phone":
        setIsValid(isValidPhoneNumber(inputText));
        onValidationSet(isValid, inputText);
        break;
      default:
        setIsValid(false);
    }
  };

useEffect(() => {
  if (value !== undefined && value !== null) {
    handleTextChange(value);
  }
}, [value]);

  return (
    <KeyboardAvoidingView>
      <Text style={configuration.smallFont ? styles.smallTitle : styles.text}>{configuration.title}</Text>
      <TextInput
        style={[styles.input, { width: screen.width - theme.spacing.l }]}
        placeholder={configuration.placeholder}
        onChangeText={handleTextChange}
        value={value !== ''? value : text}
        keyboardType={configuration.type}
      />
      {!isValid && (
        <View style={styles.rulesContainer}>
          <Image source={warningLogo} style={styles.warning} />
          <Text style={styles.rules}>{configuration.rules}</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: [theme.textVariants.subtitle, {
    textAlign: "center",
    marginBottom: 12,
  }],
  smallTitle: [theme.textVariants.smallTitle],
  input: {
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.m,
    height: 40,
    borderWidth: 2,
    marginBottom: 5,
    paddingHorizontal: theme.spacing.s,
  },
  rulesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.m,
  },
  warning: {
    tintColor: theme.colors.danger,
    width: 10,
    height: 10,
    resizeMode: "contain",
    marginRight: 5,
  },
  rules: {
    color: theme.colors.danger,
  },
});

export default TextField;
