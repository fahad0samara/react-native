import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, StyleSheet, Pressable } from "react-native";
import Onboarding from "../screens/Onboarding";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useUser } from "../Dependencies/UserContext";
import logo from "../assets/logo.jpg";
import back from "../assets/back.png";
import { theme } from "../Utils/Theme";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, getLoggedUser, updateUser } = useUser();

  const populateNavBar = ({ navigation }, hasBackButton = false) => {
    const headerLeftComponent = hasBackButton ? (
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: theme.colors.primary,
            opacity: pressed ? 0.8 : 1,
            borderRadius: 10,
            padding: 15,
          },
          styles.button,
        ]}
        onPress={() => navigation.goBack()}
      >
        <Image source={back} style={styles.back} />
      </Pressable>
    ) : null;
  
    return {
      headerLeft: () => headerLeftComponent
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const loggedUser = await getLoggedUser();
        if (loggedUser) {
            updateUser(loggedUser);
        }
      } catch (error) {
        console.error("Error retrieving user from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator 
    screenOptions={{
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitle: () => <Image source={logo} style={styles.logoHeader} />,
    }}>
      {(user && user.onboardingCompleted) ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={populateNavBar}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={(props) => populateNavBar(props, true)}
          />
        </>
      ) : (
        <Stack.Screen 
          name="Onboarding" 
          component={Onboarding} 
          options={populateNavBar} 
        />
    )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logoHeader: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  button: {
    width: 24,
    height: 24,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  back: {
    width: 24,
    height: 24,
    tintColor: theme.colors.background,
    resizeMode: "contain",
  },
});

export default Navigator;
