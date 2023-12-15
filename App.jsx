import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./Navigator/Navigator";
import { UserProvider } from "./Dependencies/UserContext";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </UserProvider>
  );
}
