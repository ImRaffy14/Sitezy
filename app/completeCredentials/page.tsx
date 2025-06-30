"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe, Zap, Layout, Palette } from "lucide-react"
import axios from "axios"

export default function CompleteCredentialsPage() {
  const [formData, setFormData] = useState({
    username: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [usernameAvailability, setUsernameAvailability] = useState<{
    checking: boolean
    available: boolean | null
    message: string
  }>({ checking: false, available: null, message: "" })
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const checkUsernameAvailability = async (username: string) => {
    if (username.length < 3) return

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { username } = formData
    
    // Reset error state
    setError(null)

    // Validation
    if (!username) {
      setError("Please choose a username.")
      return
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long.")
      return
    }

    if (usernameAvailability.checking) {
      setError("Please wait while we check username availability.")
      return
    }

    if (usernameAvailability.available === false) {
      setError("Username is not available. Please choose another one.")
      return
    }

    try {
      setIsLoading(true)
      
      const response = await axios.post('/api/users/update', {
        email,
        username,
      })

      // Redirect to dashboard after successful completion
      router.push(`/dashboard/${response.data.username}`)
    } catch (err: any) {
      setIsLoading(false)
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.error) {
          setError(err.response.data.error)
        } else if (err.response?.data?.message) {
          setError(err.response.data.message)
        } else {
          setError('An error occurred while completing your registration.')
        }
      } else {
        setError('An unexpected error occurred.')
      }
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
    
    // Check username availability when typing stops
    if (field === "username") {
      const timer = setTimeout(() => {
        if (value.length >= 3) {
          checkUsernameAvailability(value)
        } else {
          setUsernameAvailability({
            checking: false,
            available: null,
            message: ""
          })
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-black rounded-xl flex items-center justify-center shadow-lg border border-gray-600">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Sitezy
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Benefits */}
          <div className="flex-1 max-w-lg">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Complete Your
                <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent block">
                  Profile
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Just a few more details to finish setting up your account.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-green-500">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">Almost There</h3>
                  <p className="text-gray-400">Complete your profile to access all features.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-500">
                  <Layout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">Personalize Your Experience</h3>
                  <p className="text-gray-400">Set up your username to make your profile unique.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-500">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">Get Started Quickly</h3>
                  <p className="text-gray-400">This will only take a moment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Complete credentials form */}
          <div className="w-full max-w-md">
            <Card className="bg-white/10 backdrop-blur-xl border border-gray-700 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl text-white mb-2">Complete Profile</CardTitle>
                <CardDescription className="text-gray-300">
                  Add your username to finish account setup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                  <p className="text-gray-300 text-sm">You're signing up with:</p>
                  <p className="text-white font-medium">{email}</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-300">
                        Username
                      </Label>
                      <Input
                        id="username"
                        placeholder="johndoe23"
                        value={formData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="h-11 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                        disabled={isLoading}
                      />
                      {formData.username.length > 0 && (
                        <div className={`text-xs ${
                          usernameAvailability.checking ? 'text-gray-400' :
                          usernameAvailability.available === true ? 'text-green-400' :
                          usernameAvailability.available === false ? 'text-red-400' :
                          'text-gray-500'
                        }`}>
                          {usernameAvailability.checking ? (
                            <span>Checking availability...</span>
                          ) : usernameAvailability.message ? (
                            <span>{usernameAvailability.message}</span>
                          ) : (
                            <span>Must be at least 3 characters</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 mt-6 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-semibold shadow-lg border border-gray-600"
                    disabled={isLoading || usernameAvailability.checking || usernameAvailability.available === false}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Completing setup...
                      </span>
                    ) : (
                      "Complete Setup →"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}