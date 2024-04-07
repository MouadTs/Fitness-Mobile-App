import React from "react";
import FirstPage from './Pages/page1'; // Corrected import statement
import CreateAccount from './Pages/CreateAccount';
import Gender from "./Pages/Gender";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack= createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homepage" component={FirstPage} options={{headerShown:false}}/>
        <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown:false}} />
        <Stack.Screen name="Gender" component={Gender} options={{headerShown:false}}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

