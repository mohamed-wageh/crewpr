import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

// screens
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import CategoryScreen from "./screens/CategoryScreen";
import FreelancerScreen from "./screens/FreelancerScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import ActivesOrdersScreen from "./screens/ActivesOrdersScreen";


const Stack = createNativeStackNavigator();

function AuthStack({ darkTheme }) {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: darkTheme ? Colors.primary900 : Colors.light,
        },
        headerTintColor: darkTheme ? Colors.blue : Colors.dark,
        contentStyle: {
          backgroundColor: darkTheme ? Colors.primary900 : Colors.light,
        },
      }}
    >
      <Stack.Group>
        <Stack.Screen
          options={{ headerShown: false }}
          name="WelcomeScreen"
          component={WelcomeScreen}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function AuthenticatedStack({ darkTheme }) {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: darkTheme ? Colors.primary900 : Colors.light,
        },
        headerTintColor: darkTheme ? Colors.blue : Colors.dark,
        contentStyle: {
          backgroundColor: darkTheme ? Colors.primary900 : Colors.light,
        },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={authCtx.logout}
          />
        ),
      }}
    >
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="FreelancerScreen" component={FreelancerScreen} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen
        name="ActivesOrdersScreen"
        component={ActivesOrdersScreen}
        //add model screen here
      />
    </Stack.Navigator>
  );
}

function Navigation({ darkTheme }) {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack darkTheme={darkTheme} />}
      {authCtx.isAuthenticated && <AuthenticatedStack darkTheme={darkTheme} />}
    </NavigationContainer>
  );
}

function Root({ darkTheme, toggleTheme }) {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  useEffect(() => {
    async function preventAutoHide() {
      await SplashScreen.preventAutoHideAsync();
    }

    preventAutoHide();
  }, []);

  if (isTryingLogin) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <>
      <Navigation darkTheme={darkTheme} />
      {/* <View
        style={{
          backgroundColor: darkTheme ? Colors.primary900 : Colors.light,
        }}
      >
        <IconButton
          icon="moon"
          size={24}
          onPress={toggleTheme}
          style={{ position: "absolute", top: 20, right: 20 }}
          backgroundStyle={{
            backgroundColor: darkTheme ? Colors.primary900 : Colors.light,
          }}
        />
      </View> */}
    </>
  );
}

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </AuthContextProvider>
    </>
  );
}
