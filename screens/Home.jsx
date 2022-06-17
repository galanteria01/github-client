import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { selectUser } from '../features/user/userSlice'
import { useSelector } from 'react-redux'
import { Octokit } from '@octokit/core'
import { useEffect } from 'react'
import RepoCard from '../components/RepoCard'
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Home() {
  const { user } = useSelector(selectUser)
  const [refreshing, setRefreshing] = React.useState(false)

  const [repos, setRepos] = React.useState([])
  const octokit = new Octokit({
    auth: user.token,
    userAgent: "GHP-App",
  })

  async function getRepos() {
    const { data } = await octokit.request("/user/repos")
    setRepos(data)
  }

  useEffect(() => {
    getRepos()
  }, [])

  const onRefresh = () => {
    getRepos()
  }
  return (
    <SafeAreaView>
      <FlatList
        data={repos}
        renderItem={({ item }) => <RepoCard repo={item} />}
        keyExtractor={item => item.id}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  )
}