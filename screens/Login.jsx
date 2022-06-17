import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octokit } from "@octokit/core";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import Snackbar from 'react-native-snackbar-component';
export default function Login() {
  const [token, setToken] = React.useState("");
  const [snackIsVisible, setSnackIsVisible] = React.useState(false);
  const dispatch = useDispatch()

  function validateToken(token) {
    return /ghp_([a-zA-Z0-9]*$)/.test(token) && token.length == 40;
  }
  async function loginUser() {
    if (validateToken(token)) {
      const octokit = new Octokit({
        auth: token,
        userAgent: "GHP-App",
      });
      const { data } = await octokit.request("/user");
      dispatch(setUser({
        name: data.name,
        avatar: data.avatar_url,
        token: token,
        email: data.email
      }));
    } else {
      setSnackIsVisible(true);
      console.log("Invalid token");
      setToken("");
    }
  }
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/github.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        editable={true}
        maxLength={40}
        value={token}
        onChangeText={(text) => setToken(text)}
      />
      <TouchableOpacity style={styles.button} onPress={loginUser}>
        <Text style={styles.text}>Authorize</Text>
      </TouchableOpacity>
      <Snackbar
        visible={snackIsVisible}
        textMessage="Invalid Token Entered"
        actionHandler={() => {
          setSnackIsVisible(false);
        }}
        actionText="Close"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#fafafa"
  },
  logo: {
    height: 100,
    width: 100,
  },
  input: {
    marginTop: 40,
    width: 300,
    borderColor: "#fafafa",
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#fafafa",
    padding: 10,
  },
  button: {
    width: 300,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 5,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    color: "#fafafa",
  }
});