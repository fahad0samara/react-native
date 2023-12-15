import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { theme } from "../Utils/Theme";

const Check = (props) => {
  const [isSelected, setSelection] = useState(false);
  const handleSelection = () => {
    props.onToggle();
    setSelection(!isSelected);
  };
  useEffect(() => {
    setSelection(props.isSelected);
  }, []);

  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={isSelected}
        onValueChange={handleSelection}
        style={styles.checkbox}
        color={theme.colors.primary}
      />
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.m,
    marginHorizontal: theme.spacing.m,
  },
  checkbox: {
    alignSelf: "center",
    marginRight: theme.spacing.m,
  },
  title: theme.textVariants.smallTitle,
});

export default Check;
