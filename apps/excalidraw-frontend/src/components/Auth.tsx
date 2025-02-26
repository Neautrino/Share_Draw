"use client"

import { useState } from "react";
import Link from "next/link";

const Auth = ({type}: {type: string}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Add registration logic here
    console.log("Sign up attempt with:", { name, email, password });
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    console.log("Sign in attempt with:", { email, password });
    };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-zinc-800 rounded-xl border border-zinc-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Create an account</h2>
          <p className="text-zinc-400">Join Excalidraw today</p>
        </div>

        <form onSubmit={type === 'signup'? handleSignUp : handleSignIn} className="space-y-6 mt-8">
          {type === 'signup' &&
            <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-200">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-white rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>
          }

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-200">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-white rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-zinc-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 text-white rounded-lg focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
          >
            {type === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-zinc-400">
            {type === 'signup' ? "Already have an account?" : "Don't have an account?"}
            {" "}
            <Link href={type === 'signup' ? "/signin" : "/signup"} className="text-violet-400 hover:text-violet-300">
              {type === 'signup' ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;