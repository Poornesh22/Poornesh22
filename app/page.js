"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Page = () => {
    const router = useRouter();
    const [type, settype] = useState("password");
    const [show1, setshow1] = useState(true);
    const [first, setfirst] = useState()


    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        seterror,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        const func1 = async () => {
            let a = await fetch("/check", { method: "DELETE", header: { "content-type": "application/json" } })
            let res = await a.json();
            if (res.value == "1") {
                setshow1(false);
            } else {
                setshow1(true);
            }
        }

        func1();
    }, [])

    const Show = (e) => {
        if (type == "password") {
            settype("text")
        } else if (type == "text") {
            settype("password")
        }
    }

    const onSubmit = async (data) => {
        data.username = data.username.trim();
        let a = await fetch("/server", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
        let res = await a.json();
        if (res.name == "login successful") {
            router.push(`/main/${data.username}`);
        } else {
            alert("Login Unsuccessful");
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center px-4 py-8">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(https://hislopcollege.ac.in/wp-content/uploads/2020/10/3-2-624x468.jpeg)'
                }}
            ></div>

            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-purple-900/85 to-indigo-900/85"></div>

            {/* Additional pattern overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.08) 0%, transparent 50%),
                                     radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 0%, transparent 50%)`
                }}></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="mb-4">
                        <img
                            src="https://hislopcollege.ac.in/wp-content/uploads/2020/10/logo.png"
                            alt="Hislop College Logo"
                            className="w-16 h-16 object-contain mx-auto shadow-lg"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Hislop College, Nagpur</h1>
                    <p className="text-blue-100 text-lg font-medium drop-shadow-sm">Comprehensive Planning and Scheduling</p>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-3 rounded-full"></div>
                </div>

                {/* Login Form */}
                <div className="backdrop-blur-xl bg-white bg-opacity-15 rounded-2xl shadow-2xl border border-white border-opacity-30 p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-white text-center mb-2 drop-shadow-lg">Welcome Back</h2>
                        <p className="text-blue-100 text-center drop-shadow-sm">Sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-white">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    {...register("username", { required: true })}
                                    placeholder='Enter your username'
                                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-40 rounded-xl text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 backdrop-blur-sm shadow-lg"
                                />
                            </div>
                            {errors.username && <p className="text-red-300 text-sm">Username is required</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-white">
                                    Password
                                </label>
                                <Link href="/forget" className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={type}
                                    {...register("password", { required: true })}
                                    placeholder='Enter your password'
                                    className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-40 rounded-xl text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 backdrop-blur-sm shadow-lg"
                                />
                            </div>
                            {errors.password && <p className="text-red-300 text-sm">Password is required</p>}
                        </div>

                        {/* Show Password Checkbox */}
                        <div className="flex items-center">
                            <input
                                onChange={Show}
                                type="checkbox"
                                id="show_password"
                                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded bg-white bg-opacity-20"
                            />
                            <label htmlFor="show_password" className="ml-2 text-sm text-blue-200 cursor-pointer">
                                Show password
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="space-y-4">
                            {isSubmitting && (
                                <div className="flex items-center justify-center space-x-2 text-blue-200">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span className="font-medium">Signing in...</span>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    {/* Create Account Link */}
                    {show1 && (
                        <div className="mt-8 text-center">
                            <p className="text-blue-200">
                                First time here?{' '}
                                <Link
                                    href="/createnew"
                                    className="font-semibold text-white hover:text-blue-200 transition-colors duration-200 underline underline-offset-2"
                                >
                                    Create New Account
                                </Link>
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-blue-300 text-sm">
                        © 2024 Hislop College, Nagpur. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Page