"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Globe, ArrowLeft, Zap, Layout, Palette } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (err) {
      setError("Failed to sign in with Google")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, username, email, password, confirmPassword, agreeToTerms } = formData
    
    // Reset error state
    setError(null)

    // Validation
    if (!name || !username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }
    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions.")
      return
    }

    try {
      setIsLoading(true)
      
      // Make API call to register user
      const response = await axios.post('/api/auth/register', {
        name,
        username,
        email,
        password
      })

      // If registration is successful, sign in the user
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (signInResult?.error) {
        setError(signInResult.error)
      } else {
        router.push('/dashboard')
      }
    } catch (err: any) {
      // Handle different error cases
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.error) {
          setError(err.response.data.error)
        } else if (err.response?.data?.message) {
          setError(err.response.data.message)
        } else {
          setError('An error occurred during registration.')
        }
      } else {
        setError('An unexpected error occurred.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
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
          <Link href="/" className="flex items-center space-x-3 group">
            <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-black rounded-xl flex items-center justify-center shadow-lg border border-gray-600">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Sitezy
              </span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Benefits */}
          <div className="flex-1 max-w-lg">
            <div className="mb-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Join Our
                <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent block">
                  Creative
                </span>
                <span className="text-gray-300">Community</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Start building your personal website today.
                <span className="text-white font-semibold"> Join thousands of people</span> who trust Sitezy.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-green-500">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">Free Forever Plan</h3>
                  <p className="text-gray-400">Start with our generous free tier. No credit card required.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-500">
                  <Layout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">Multiple Layouts</h3>
                  <p className="text-gray-400">Choose from various beautiful layouts and customize every detail.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-500">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2">Full Customization</h3>
                  <p className="text-gray-400">Customize every aspect of your website with our intuitive editor.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Sign up form */}
          <div className="w-full max-w-md">
            <Card className="bg-white/10 backdrop-blur-xl border border-gray-700 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl text-white mb-2">Create Account</CardTitle>
                <CardDescription className="text-gray-300">
                  Join thousands of creators building amazing websites
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-300 text-sm">
                    {error}
                  </div>
                )}
                
                <Button
                  variant="outline"
                  className="w-full h-12 bg-white hover:bg-gray-100 text-gray-900 border-0 font-medium"
                  onClick={handleGoogleSignIn}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-900 px-3 text-gray-400">Or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="h-11 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                      />
                    </div>
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
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="h-11 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="h-11 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor="confirmPassword" className="text-gray-300">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="h-11 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                    />
                  </div>

                  <div className="flex items-start space-x-3 mt-6">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                      className="border-gray-500 data-[state=checked]:bg-gray-700 data-[state=checked]:border-gray-600"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                      I agree to the{" "}
                      <Link href="#" className="text-white hover:text-gray-300 underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-white hover:text-gray-300 underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 mt-6 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-semibold shadow-lg border border-gray-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account →"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-6">
                <div className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link href="/" className="text-white hover:text-gray-300 font-medium hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}