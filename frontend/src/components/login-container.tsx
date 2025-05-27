"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { OTPLoginForm } from "./otp-login-form"

export function LoginContainer() {
  const [loginMode, setLoginMode] = useState<"MPIN" | "OTP">("MPIN")

  return (
    <>
      {loginMode === "MPIN" ? (
        <LoginForm onSwitchToOTP={() => setLoginMode("OTP")} />
      ) : (
        <OTPLoginForm onSwitchToMPIN={() => setLoginMode("MPIN")} />
      )}
    </>
  )
}

