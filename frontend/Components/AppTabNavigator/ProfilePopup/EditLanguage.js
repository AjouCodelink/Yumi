import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import { Button } from "native-base";

import LanguagePicker from "../../SignUp/Language/LanguagePicker";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

export default class EditLanguage extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: this.props.token,
    display: this.props.display,
    language: "NoValue"
  };

  interAdd = (newSection, newGroup, newKey) => {
    const pervInterests = this.state.interests;
    this.setState({
      interests: pervInterests.concat({
        section: newSection,
        group: newGroup,
        key: newKey
      })
    });
  };
  interRemove = remKey => {
    const pervInterests = this.state.interests;
    this.setState({
      interests: pervInterests.filter(inter => inter.key !== remKey)
    });
  };

  _onPressCancel = () => {
    this.popupClose();
  };

  _onPressAdmit = () => {
    console.log(this.state.language);
    if (this.state.language == "NoValue") {
      ToastAndroid.show("Please select language.", ToastAndroid.SHORT);
      return;
    }
    var url =
      "http://101.101.160.185:3000/user/profile/language/" +
      this.state.language;
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        token: "token",
        "x-access-token": this.props.token
      })
    })
      .then(response => response.json())
      .catch(error => console.error("Error: ", error))
      .then(responseJson => {
        if (responseJson.result == true) {
          db.transaction(tx => {
            tx.executeSql(
              // DB에 바뀐 닉네임 저장
              "UPDATE userInfo SET language = ?",
              [this.state.language],
              null,
              (_, error) => console.error(error)
            );
          });
          //this.popupClose()
          ToastAndroid.show(
            "Your changes have been saved.",
            ToastAndroid.SHORT
          );
        } else {
          ToastAndroid.show(
            "Failed to save. Please check the network.",
            ToastAndroid.SHORT
          );
        }
      });
  };

  popupClose = () => {
    this.setState({
      language: "NoValue"
    });
    this.props.displayChange("none");
  };

  languageChange = value => {
    this.setState({
      language: value
    });
  };

  render() {
    return (
      <View style={style.container}>
        <View style={[style.backGround, { display: this.props.display }]}>
          <View style={style.content}>
            <Text style={style.font_Title}>Edit Language</Text>
            <Text style={style.font_main}>
              Language is only used in translation.
            </Text>
            <View style={{ height: 45, width: 250, margin: 10 }}>
              <LanguagePicker valueChange={this.languageChange} />
            </View>
            <View style={style.pickerContainer}>
              <TouchableOpacity>
                <Button
                  onPress={() => this._onPressCancel()}
                  style={{
                    backgroundColor: "#bbb",
                    width: 80,
                    justifyContent: "center",
                    marginRight: 20
                  }}
                >
                  <Text>Cancel</Text>
                </Button>
              </TouchableOpacity>
              <TouchableOpacity>
                <Button
                  onPress={() => this._onPressAdmit()}
                  style={{
                    backgroundColor: "#4d4",
                    width: 80,
                    justifyContent: "center",
                    marginLeft: 20
                  }}
                >
                  <Text>Admit</Text>
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 3,
    width: "100%",
    height: "100%",
    position: "absolute"
  },
  backGround: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  content: {
    width: 300,
    height: 300,
    borderRadius: 20,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center"
  },
  font_Title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ddd",
    margin: 5
  },
  font_main: {
    fontSize: 15,
    color: "#ddd",
    marginBottom: 10
  },
  pickerContainer: {
    flexDirection: "row",
    margin: 35,
    justifyContent: "center"
  }
});
