"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Globe, Sparkles, Zap, Star, Rocket, Users, Shield } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/3 rounded-full blur-3xl"></div>
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
          <Link href="/signup">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500">
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Hero content */}
          <div className="flex-1 max-w-lg">
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-gray-400 text-sm ml-2">Trusted by 10,000+ creators</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Create Your
                <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent block">
                  Personal
                </span>
                <span className="text-4xl lg:text-5xl text-gray-300">Website ⚡</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Build stunning personal websites to showcase yourself, your work, or your passion.
                <span className="text-white font-semibold"> Perfect for everyone.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl flex items-center justify-center border border-gray-600">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Quick Setup</h3>
                  <p className="text-gray-400 text-sm">Get your website online in minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center border border-gray-500">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Beautiful Designs</h3>
                  <p className="text-gray-400 text-sm">Professional layouts for any purpose</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-700 rounded-xl flex items-center justify-center border border-gray-400">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Easy Sharing</h3>
                  <p className="text-gray-400 text-sm">Share with QR codes and social links</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>10,000+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Enterprise security</span>
              </div>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full max-w-md">
            <Card className="bg-white/10 backdrop-blur-xl border border-gray-700 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl text-white mb-2">Welcome Back</CardTitle>
                <CardDescription className="text-gray-300">Sign in to your Sitezy account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  variant="outline"
                  className="w-full h-12 bg-white hover:bg-gray-100 text-gray-900 border-0 font-medium"
                  onClick={() => (window.location.href = "/dashboard")}
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

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-6">
                <Button
                  className="w-full h-12 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-semibold shadow-lg border border-gray-600"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Sign In →
                </Button>
                <div className="text-center text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-white hover:text-gray-300 font-medium hover:underline">
                    Sign up for free
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
