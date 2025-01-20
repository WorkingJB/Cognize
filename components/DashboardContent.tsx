"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Connected Platforms</CardTitle>
          <CardDescription>Your integrated messaging platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Slack: Connected</p>
          <p>Microsoft Teams: Not connected</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>Last 5 messages posted</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add a list of recent messages here */}
          <p>No recent messages</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>Overview of your messaging activity</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total Messages: 0</p>
          <p>Total Reactions: 0</p>
          <p>Unique Users Reached: 0</p>
        </CardContent>
      </Card>
    </div>
  )
}

