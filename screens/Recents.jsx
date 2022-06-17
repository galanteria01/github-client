import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice';
import { Octokit } from '@octokit/core'

export default function Recents() {
  const { user } = useSelector(selectUser)
  const [events, setEvents] = React.useState([]);

  const octokit = new Octokit({
    auth: user.token,
    userAgent: "GHP-App",
  })

  async function getEvents() {
    const { data } = await octokit.request("/events")
    setEvents(data)
  }
  useEffect(() => {
    getEvents()
  }, [])
  return (
    <View>
      <Text>Recents</Text>
    </View>
  )
}