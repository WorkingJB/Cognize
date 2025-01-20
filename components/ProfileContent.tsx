"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProfileContentProps = {
  session: any
  profile: any
}

export default function ProfileContent({ session, profile }: ProfileContentProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> {session.user.email}
            </p>
            <p>
              <strong>Full Name:</strong> {profile?.full_name || "Not set"}
            </p>
            <p>
              <strong>Username:</strong> {profile?.username || "Not set"}
            </p>
            <p>
              <strong>Website:</strong> {profile?.website || "Not set"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

