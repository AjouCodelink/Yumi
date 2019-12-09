import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
  Linking,
  StatusBar
} from "react-native";
import { Icon } from "native-base";
import SupContentsWrapper from "./SupportersContents/SupContentsWrapper";

export default class SupportersTab extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="paper" style={{ color: "#FF007F" }} />
    ),
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      supporter_info:[]
    }
  }

  componentWillMount() { // 서포터즈 정보 싹 다 가져옴
    var url = "http://101.101.160.185:3000/supporter/list";
    fetch(url, {
        method: "GET",
        headers: new Headers({"Content-Type": "application/json"})
    })  
        .then(response => response.json())
        .catch(error => console.error("Error: ", error))
        .then(responseJson => {
            console.log(responseJson);
            responseJson.sort((a, b) => {
              var dateA = new Date(a.time), dateB = new Date(b.time);
              return dateB - dateA;
            });
            this.setState({supporter_info: responseJson});
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={{ width: "100%", backgroundColor: "#20B2AA" }}>
          <Text
            style={{
              fontSize: 16,
              margin: 15,
              fontWeight: "bold",
              color: "#fff"
            }}
          >
            Supporters
          </Text>
        </View>
        <SupContentsWrapper supporter_info={this.state.supporter_info}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    marginTop: StatusBar.currentHeight,
    width: "100%"
  }

  /******** card **************/
});
