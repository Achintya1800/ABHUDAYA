"use client"


import { AuthLayout } from "@/components/auth-layout"
import { LoginContainer } from "@/components/login-container"

export default function Home() {
  return (
    <AuthLayout>
      <LoginContainer />
    </AuthLayout>
  )
}

