import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NativeBaseProvider,
} from "native-base";

import LoginPage from "./components/LoginPage";
import OverviewPage from "./components/OverviewPage";
import EntryPage from "./components/EntryPage";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OverviewPage">
          <Stack.Screen name="LoginPage" component={LoginPage}
            options={{ title: 'Home Page' }} />
          <Stack.Screen name="OverviewPage" component={OverviewPage}
            options={{ title: 'Overview Page' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider >

  );
}
