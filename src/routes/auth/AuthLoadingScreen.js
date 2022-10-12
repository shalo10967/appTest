import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import {
  StatusBar,
  StyleSheet,
  View,
  Platform
} from 'react-native';
//import { Asset } from 'expo-asset';
import { ActivityIndicator } from 'react-native-paper';
import {
  actionEmpresasListaObtener,
  actionEstablecerSesion,
} from '@core/store/ACCIONES';
import SecureStorage from '../../utils/SecureStorage';

import html from '../../assets/amcharts'
import ENV from '@config'

const { TOKEN_AUTH } = ENV()

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)

    this.libraryPath = html;

  }


  componentDidMount() {
    this.props.actionEmpresasListaObtener({
      query: true,
    })
  }

  componentDidUpdate (prevProps) {
    // Carga de todo lo requerido para la pantalla inicial del usuario
    if (this.props.usuario != prevProps.usuario) this.precargaInicial()
    // Si minimo las empresas fueron descargados, se redirecciona al inicio
    if (this.props.empresas.length > 0) this.props.navigation.navigate('App');
  }

  precargaInicial () {
    this.props.actionEmpresasListaObtener({
      query: true,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})

const mapStateToProps = ({ reducerSesion, reducerEmpresas }) => ({
  usuario: reducerSesion.usuario,
  empresas: reducerEmpresas.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  actionEmpresasListaObtener,
  actionEstablecerSesion,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
