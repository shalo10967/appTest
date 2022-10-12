import React from "react";

import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '@routes/auth/LoginScreen';

import AuthLoadingScreen from '@routes/auth/AuthLoadingScreen';


import { Image, TouchableOpacity, Text } from "react-native";


import { h, w, totalSize } from '@utils/Dimensiones';
import LinearGradient from "react-native-linear-gradient";
import { colors } from '@styles';


const menuImage = require('@assets/icons/ic_menumdpi.png');

let navigationItems = {
  state: {
    routeName: ""
  }
};


const logoIcon = (props) => {
  return (
    // <Image
    //   style={{ height: h(4), alignSelf: "center" }}
    //   source={companyLogo}
    //   resizeMode="contain"
    // />

    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
      {
        props.navigation.state.routeName != "Inicio"
          ? props.navigation.state.routeName
          : "PREVIREPORT"
      }
    </Text>

  );
}

const menuIcon = (navigation) => {
  navigationItems = navigation;
  return (
    <TouchableOpacity
      style={{ padding: totalSize(0.9), margin: totalSize(0.9) }}
      onPress={() => navigation.toggleDrawer()}>
      <Image
        style={{ height: h(2.5) }}
        source={menuImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const NAVIGATION_OPTIONS = {
  //headerTitle: logoIcon(),
  gestureEnabled: false,
  screenOptions: { gestureEnabled: false },
  headerBackTitle: null,
  headerTitleContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
    alignContent: 'center',
    position: "absolute",
    left: 0,
    right: 0,
  },
  headerStyle: {
    paddingTop: 0,
    marginHorizontal: totalSize(0),
    borderRadius: totalSize(0.8),
    elevation: 6
  }
}



const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: NAVIGATION_OPTIONS
  }
);

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AuthNavigator,
    Auth: AuthNavigator
  },
  {
    initialRouteName: "Auth"
  }
);

export default AppNavigator;

