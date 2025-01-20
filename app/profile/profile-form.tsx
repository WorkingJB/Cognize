"use client"

import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const supabase = createClientComponentClient()

const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().optional(),
  bio: z.string().max(160, "Bio must be less than 160 characters").optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileFormProps {
  user: User
  profile: any
}

export default function ProfileForm({ user, profile }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      title: "",
      bio: "",
    },
  })

  useEffect(() => {
    form.reset({
      full_name: profile?.full_name || "",
      title: profile?.title || "",
      bio: profile?.bio || "",
    })
  }, [profile, form])

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        updated_at: new Date().toISOString(),
        ...data,
      })

      if (error) throw error
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Error updating profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Your role or professional title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>Brief description about yourself</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-6 pt-6 border-t">
          <h3 className="text-sm font-medium text-muted-foreground">Account Information</h3>
          <dl className="mt-3 space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-muted-foreground">Email</dt>
              <dd className="text-sm col-span-2">{user.email}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-muted-foreground">Account Created</dt>
              <dd className="text-sm col-span-2">{new Date(user.created_at).toLocaleDateString()}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  )
}

