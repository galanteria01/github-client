import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice';
import { Octokit } from '@octokit/core'
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';

export default function Profile() {
  const { user } = useSelector(selectUser)
  const [userData, setUserData] = React.useState({});
  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const octokit = new Octokit({
    auth: user.token,
    userAgent: "GHP-App",
  })

  async function getUserData() {
    const { data: userData } = await octokit.request("/user")
    setUserData(userData)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Image style={styles.avatar} source={{ uri: userData.avatar_url }} />
        <View style={styles.info}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.login}>{userData.login}</Text>
          <Text style={styles.bio}>{userData.bio}</Text>
        </View>
      </View>
      <View style={styles.second}>
        <View style={styles.repos}>
          <Text style={styles.value}>{userData.public_repos}</Text>
          <Text style={styles.label}>Repositories</Text>
        </View>
        <View style={styles.repos}>
          <Text style={styles.value}>{userData.public_gists}</Text>
          <Text style={styles.label}>Gists</Text>
        </View>
      </View>
      <View style={styles.second}>
        <View style={styles.repos}>
          <Text style={styles.value}>{userData.followers}</Text>
          <Text style={styles.label}>Followers</Text>
        </View>
        <View style={styles.repos}>
          <Text style={styles.value}>{userData.following}</Text>
          <Text style={styles.label}>Following</Text>
        </View>
      </View>
      <View>
        <MapView style={styles.map} >
          <Marker
            coordinate={{
              latitude: 20.5937,
              longitude: 78.9629,
            }}
            title="Marker"
          />
        </MapView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 16,
    borderColor: '#ccc',
    borderRadius: 12,
  },
  name: {
    fontSize: 20,
  },
  second: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  repos: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    width: '40%',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  map: {
    marginTop: 20,
    width: '100%',
    height: 400,
  }
})