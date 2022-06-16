import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { selectUser } from '../features/user/userSlice'
import { useSelector } from 'react-redux'
import { Octokit } from '@octokit/core'
import { useEffect } from 'react'

export default function Home() {
  const { user } = useSelector(selectUser)

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
  return (
    <ScrollView>
      {repos.map((repo, index) => (
        <Text key={index}>{repo.name}</Text>
      ))}
    </ScrollView>
  )
}