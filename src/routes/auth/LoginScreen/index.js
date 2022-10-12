import LinearGradient from 'react-native-linear-gradient';

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Image,
  Animated,
  Easing
} from "react-native";
import { Text } from 'react-native-paper';

import { colors } from '@styles';
import {
  Loader,
  ModalInfo,
  FlatList,
} from '@components'
import {
  actionBancosListaObtener,
  actionLimpiarEstado
} from '@core/store/ACCIONES';
import styles from './style'

import SplashScreen from 'react-native-splash-screen'
import { User } from '@hocs';
import AsyncStorage from '@react-native-community/async-storage';

const companyLogo = require('@assets/images/companylogo.png');

class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModalInfo: false,
      spinValue: new Animated.Value(0),
      banksList: [],
    }
    this.spinValue = new Animated.Value(0)
  }

  componentWillMount() {
    SplashScreen.hide();
  }

  async componentDidMount() {
    this.getIfFirstTime()
    //this.props.navigation.addListener('willFocus', () => this.getUserLog());
  }

  componentDidUpdate(prevProps) {

    if (this.props.apiRespuesta) {
      switch (this.props.estado) {
        case "LISTADO":
          console.log("bancos listados", this.props.bancos);
          this.setState({
            banksList: this.props.bancos
          }, () => {
            this.setBanksFromDB();
          })
          
          break;
        case "ERROR":
          console.log("Error: ", this.props.error)
          break;
        default:
          break;
      }
      this.props.actionLimpiarEstado()
      //this.props.actionBancosListaObtener({})
    }

  }

  getIfFirstTime = async () => {
    const getIfFirstTimeUser = await AsyncStorage.getItem("firsTime")
    console.log("getIfFirstTimeUser", getIfFirstTimeUser)
    if (getIfFirstTimeUser === "false") {
      this.getBanksFromDB();
    } else {
      this.props.actionBancosListaObtener({});
    }
  }

  setBanksFromDB = async () => {
    try {
      await firestore()
        .collection('Banks')
        .doc("ListofBanks")
        .update('items', this.props.bancos)
        .then(async (res) => {
          await AsyncStorage.setItem('firsTime', "false")
        })
    } catch (error) {
      // document not exists, do nothing  
    }
  }

  getBanksFromDB = async () => {
    firestore()
      .collection('Banks')
      .doc("ListofBanks")
      .onSnapshot(documentSnapshot => {
        this.setState({
          banksList: documentSnapshot.data().items
        }, () => {
          console.log("Data from db", documentSnapshot.data().items)
        })
        return documentSnapshot.data();
      });
  }

  StartImageRotateFunction = () => {
    this.spinValue.setValue(0)
    // First set up animation 
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => this.StartImageRotateFunction());
    // Next, interpolate beginning and end values (in this case 0 and 1)
  }




  render() {
    const { isWaiting } = this.props
    const {
      showModalInfo } = this.state
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 0.75, y: 0 }}
        colors={colors.linearGradient} style={{ ...styles.linearGradient }}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, display: "flex" }}
            nestedScrollEnabled={true}
          >
            <KeyboardAvoidingView style={{ flex: 1, display: "flex" }} behavior="padding" enabled={false}>
              <View style={styles.pagina}>

                <View style={styles.logo}>
                  <Image style={styles.icon} resizeMode="contain" source={companyLogo} />
                </View>
                <View style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  marginVertical: 0
                }}>

                </View>
                <View style={styles.formulario}>
                  <View style={{ width: "100%", marginTop: 0 }}>
                    <FlatList
                      Results={this.state.banksList}
                    />
                  </View>
                </View>
              </View>
              <Loader isLoading={this.props.isWaiting} />

              {this.state.showModalInfo ?
                <ModalInfo
                  {...this.props}
                  icon={"information-outline"}
                  text={"Ha ocurrido un error. Por favor intente otra vez"}
                  //text2={"¿Esta seguro que desea continuar?"}                
                  showModal={this.state.showModalInfo}
                  showCancel={false}
                  onConfirm={() => this.setState({
                    showModalInfo: false,
                  })}
                />
                : null}
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );

  }
};


const mapStateToProps = ({ reducerBancos }) => ({
  isWaiting: reducerBancos.waiting,
  bancos: reducerBancos.data,
  estado: reducerBancos.estado,
  apiRespuesta: reducerBancos.apiRespuesta,
  error: reducerBancos.mensaje,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  actionBancosListaObtener,
  actionLimpiarEstado
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
