import React from "react";
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { store, persistor } from './src/core/store';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from './src/navigations';
import {
  requestTrackingPermission
} from 'react-native-tracking-transparency';


import { Platform, StyleSheet, AppState, Text, View } from 'react-native';


import {
  actionEstablecerTokenExpo,
  actionEstablecerSesionID,
  actionAnaliticaTraza
} from '@core/store/ACCIONES';
import uuidV4 from 'uuid/v4'
import { h, w, totalSize } from '@utils/Dimensiones';

import { LogBox } from "react-native";
import { colors } from "@styles";
//LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const AppContainer = createAppContainer(AppNavigator);



const theme = {
  ...DefaultTheme,
  roundness: totalSize(0.5),
  colors: {
    ...DefaultTheme.colors,
    primary: colors.colorPrimary,
    text: "#323232",
    error: "#d61a0c"
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  
  componentDidMount() {
   
  }

  componentWillUnmount() {

  }

  _handleNotification = (notification) => {
    this.setState({ notification: notification });
  };

  _handleAppStateChange = (nextAppState) => {
  };

  render() {

    return (
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <AppContainer/>
          </PersistGate>
        </Provider>
      </PaperProvider>
    )
  }
}
