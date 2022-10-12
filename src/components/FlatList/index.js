import React, { Component } from "react";

import {
  ButtonGradient,
  InputField,
  Button as ButtonComponent,
} from '@components';
import { h, w, totalSize } from '@utils/Dimensiones';
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from '@styles';
import { Text } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ImagePicker from '@connectedbits/react-native-image-picker';


export default class FlatList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewModal: false,
      index: null
    }
  }

  selectItem = async (index) => {
    console.log("index: ", index)

  };

  openMenu = (data, index) => {
    this.setState({
      viewModal: true,
      index: index
    })
  }

  closeMenu = () => {
    this.setState({
      viewModal: false,
      index: null
    })
  }

  render() {
    const { state, icon, iconName, Results } = this.props;
    const { viewModal } = this.state;
    return (
      <View
        style={{ ...styles.buttonGradient, marginBottom: viewModal ? 100 : 0 }}>
        <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
          <View style={{ width: w(30) }}>
            <Text style={styles.titles}>Nombre</Text>
          </View>

          <View style={{ width: w(30) }}>
            <Text style={styles.titles}>Descripcion</Text>
          </View>

          <View style={{ width: w(30) }}>
            <Text style={styles.titles}>Logo</Text>
          </View>

          <View style={{ width: w(10) }}>
          </View>
        </View>
        {Results.map((data, index) => {
          return (
            <View
              key={index}
              style={styles.buttonGradient}>

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    viewModal: false,
                    index: null
                  })
                }}
                activeOpacity={1}
              >
                {data != ''
                  ?
                  <View style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    alignContent: "center",
                    borderBottomColor: colors.borderColor,
                    borderBottomWidth: 1,
                    paddingVertical: 5,
                  }}>
                    <View style={{ width: w(30) }}>
                      <Text style={styles.subtitles}>{data.bankName}</Text>
                    </View>

                    <View style={{ width: w(30) }}>
                      <Text style={styles.subtitles}>{data.description}</Text>
                    </View>

                    <View style={{ width: w(35) }}>
                      <Image  resizeMode="contain" style={{height: 40}} source={{uri: data.url}}/>
                    </View>
                  </View>
                  :
                  null
                }

              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonGradient: {
    width: "100%",
    alignContent: "center",
    marginBottom: 15
  },
  titles: {
    color: colors.titleColor,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
    width: "100%"
  },
  subtitles: {
    color: colors.titleColor,
    fontSize: 11,
    textAlign: "left",
  },

  icon: {
    marginRight: 10,
    fontWeight: "bold"
  },
  photoContainer: {
    width: "100%",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  buttonGradientView: {
    width: "100%",
    alignContent: "center",
    alignSelf: "center",
    elevation: 10,
  },
  itemMenu: {
    width: "100%",
    padding: 5,
    marginTop: 5,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 0.5
  }
})