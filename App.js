import React from "react";
import Login from "./components/Login";
import Main from "./components/Main";
import SelectIssue from "./components/SelectIssue";
import NewIssue from "./components/NewIssue";
import SignUp from "./components/SignUp";
import ForgotPwd from "./components/ForgotPwd";
import GoogleLogIn from "./components/GoogleLogIn";
import Map from "./components/Map";
import showComplaintMarkers from "./components/showComplaintMarkers";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ShowPieChart from "./components/ShowPieChart";
import ProfileScreen from "./components/ProfileScreen";
import UpdateComplain from "./components/UpdateComplain";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "",
            headerStyle: { backgroundColor: "#003f5c" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" }
          }}
        ></Stack.Screen>
        <Stack.Screen name="GoogleLogIn" component={GoogleLogIn}></Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>

        <Stack.Screen name="ForgotPwd" component={ForgotPwd}></Stack.Screen>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: "",
            headerStyle: { backgroundColor: "#003f5c" },
            headerTintColor: "#003f5c",
            headerTitleStyle: { fontWeight: "bold" }
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="showComplaintMarkers"
          component={showComplaintMarkers}
        ></Stack.Screen>

        <Stack.Screen
          name="ShowComplainUpdater"
          component={UpdateComplain}
        ></Stack.Screen>

        <Stack.Screen
          name="ShowPieChart"
          component={ShowPieChart}
        ></Stack.Screen>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
        ></Stack.Screen>

        <Stack.Screen
          name="SelectIssue"
          component={SelectIssue}
          options={{ title: "Select Issue" }}
        ></Stack.Screen>

        <Stack.Screen
          name="NewIssue"
          component={NewIssue}
          options={{ title: "New Issue" }}
        ></Stack.Screen>
        <Stack.Screen name="Map" component={Map}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
