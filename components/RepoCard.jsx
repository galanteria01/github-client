import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RepoCard({ repo }) {

  async function openUrl() {
    await Linking.openURL(repo.html_url).catch(err => console.error('An error occurred', err))
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.repoName}>{repo.name}</Text>
        <Text>{repo.visibility}</Text>
      </View>
      <View>
        <Text style={styles.repoDesc}>{repo.language ? repo.language : "Blank"}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.branch}>
          <Ionicons name="git-branch" size={20} color="#666" />
          <Text style={styles.repoBranch}>{repo.default_branch}</Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={openUrl}>
            <Ionicons color={'#666'} name="link" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  repoName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  repoDesc: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  branch: {
    flexDirection: 'row',
  },
  repoBranch: {
    color: '#666',
  }
})