"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Forget = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        seterror,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        let a = await fetch("/account", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
        let res = await a.json();
        if (!res) {
            alert("Account is not exist.");
        } else {
            alert("username : " + res.username + "\nPassword : " + res.password)
            router.replace("/")
        }

    }

    return (
        <div className='bg-emerald-100 w-screen h-screen'>
            <div className='w-screen text-center text-yellow-400 pb-1 bg-green-600 border-b-2 border-red-700'>
                <label htmlFor="header" className='text-3xl font-bold mt-10'>Forget Username or Password</label>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-emerald-100 sm:mt-4 sm:w-auto h-auto sm:flex   sm:justify-center'>
                <div className='sm:flex sm:flex-col sm:gap-2 sm:h-auto space-y-8 mt-5 mb-5 sm:bg-emerald-200 border-b-4 border-t-4 border-emerald-700 box-border pl-2 pt-2  sm:w-[50vw] sm:rounded-3xl '>
                    <div className='mt-5 sm:self-center sm:space-x-4'>
                        <label htmlFor="name" className='sm:font-semibold  sm:text-xl' >Full Name :- </label>
                        <input className='text-center rounded-t-lg border-b-2 border-red-900 p-1' type="text" placeholder='Name' {...register("name", { minLength: { value: 2, message: "min length is 2" }, required: { value: true, message: "Your name is missing" } })} />
                        {errors.name && <div className='text-xs text-red-900 pl-24'>{errors.name.message}</div>}
                    </div>
                    <div className='sm:self-center sm:space-x-8'>
                        <label htmlFor="college" className='text-xl sm:font-semibold '>College :- </label>
                        <input type="text" placeholder='College' className='text-center rounded-t-lg border-b-2 p-1 border-red-900' {...register("clg_name", { required: { value: true, message: "Your college name is missing" } })} />
                        {errors.clg_name && <div className='text-xs text-red-800 pl-24'>{errors.clg_name.message}</div>}
                    </div>
                    <div className="sm:self-center space-x-6 sm:space-x-10">
                        <label htmlFor="DOB" className=' text-xl sm:font-semibold '>DOB :- </label>
                        <input type="date" className='text-center rounded-t-lg border-b-2 border-red-900 p-1' placeholder='Date of birth' {...register("DOB", { required: { value: true, message: "Your DOB is missing" } })} />
                        {errors.DOB && <div className='text-xs text-red-800 pl-24'>{errors.DOB.message}</div>}
                    </div>
                    <div className=" sm:space-x-5 sm:self-center">
                        <label htmlFor="Phone Number" className='sm:font-semibold '>Phone Number :- </label>
                        <input type="phone" className=' w-52 text-center rounded-t-lg border-b-2 border-red-900 p-1' placeholder='Mobile Number' {...register("mobile", { required: { value: true, message: "Mobile Number is missing" }, minLength: { value: 10, message: "Please Enter a 10 digit Phone number" }, maxLength: { value: 10, message: "Invalid phone number" } })} />
                        {errors.mobile && <div className='text-xs text-red-800 pl-24'>{errors.mobile.message}</div>}
                    </div>
                    <div className='self-center space-x-10 pb-4'>
                    {isSubmitting && <div className='p-2 font-bold'>Submitting...</div>}
                    <input disabled={isSubmitting} className='sm:self-center w-32 border-2 rounded-3xl p-2 text-sm text-amber-300 bg-blue-600 hover:bg-blue-700 hover:text-white focus:bg-sky-500 active:bg-sky-300' type="submit" value="submit" />
                    <Link href="/" ><input className='w-32 border-2 rounded-3xl p-2 text-sm text-amber-300 bg-green-600 hover:bg-green-700 hover:text-white focus:bg-green-300 active:bg-green-200' type="button" value="<< Back" /></Link>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default Forget
