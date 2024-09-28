"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const page = () => {
    const router = useRouter();
    const [type, settype] = useState("password");

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        seterror,
        formState: { errors, isSubmitting },
    } = useForm();

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
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-28 " src="https://cdn.pixabay.com/photo/2019/04/16/08/53/work-4131218_1280.png" alt="Your Company" />
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm border-b-2 border-t-2 border-slate-600 rounded-3xl p-5 bg-slate-200">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input type="text" {...register("username", { required: true })} placeholder='Username' className="pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <Link href="/forget" className="font-semibold text-indigo-400 hover:text-indigo-600">Forgot password?</Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input type={type} {...register("password", { required: true })} placeholder='Password' className="pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>

                        <div>
                            <input onChange={Show} type="checkbox" name="my_checkbox" />
                            <label htmlFor=" to show password"> show </label>
                        </div>

                    </div>

                    <div>
                        {isSubmitting && <div className='p-2 font-bold px-3 py-1.5'>Submitting...</div>}
                        <button type="submit" disabled={isSubmitting} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    First Time Visit?
                    <Link href="/createnew" className="font-semibold leading-6 text-indigo-600 hover:text-blue-700 hover:underline text-lg">Create New Account</Link>
                </p>
            </div>
        </div>
    )
}


export default page

