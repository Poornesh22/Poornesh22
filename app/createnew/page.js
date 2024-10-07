"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Page = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        seterror,
        formState: { errors, isSubmitting },
    } = useForm();

    const check1 = () => {
        let a = getValues("name")
        let b = getValues("clg_name")
        let c = getValues("DOB");
        let d = getValues("mobile");
        if (a == "") {
            alert("First Enter the name")
        } else if (b == "") {
            alert("First Enter the college name")
        } else if (c == "") {
            alert("First Enter the DOB")
        } else if (d == "") {
            alert("First Enter the Phone Number")
        }

    }

    const handlegen = () => {
        let a1 = getValues("name").split(" ")[0];
        let a = a1.toLowerCase()
        let b1 = getValues("clg_name").replaceAll(" ", "");
        let b = b1.toLowerCase()
        let c = getValues("DOB")[3];
        let d = getValues("mobile")[2];
        if (a == "") {
            alert("First Enter the name")
        } else if (b == "") {
            alert("First Enter the college name")
        } else if (c == "") {
            alert("First Enter the DOB")
        } else if (d == "") {
            alert("First Enter the Phone Number")
        } else {
            setValue("username", a + c + d + b);
        }

    }


    const onSubmit = async (data) => {
        let a = await fetch("/account", { method: "PUT", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
        let res = await a.json();
        if (res.msg == "Account is already exist.") {
            alert(res.msg);
        } else {
            alert(res.msg);
            router.push("/");
        }
    }


    return (
        <div className='bg-emerald-200 w-screen h-screen'>
            <div className='w-screen text-center text-yellow-400 pb-1 bg-green-600 border-b-2 border-red-700'>
                <label htmlFor="header" className='text-3xl font-bold mt-10'>Create New Account</label>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-emerald-200 sm:mt-4 sm:w-auto h-auto sm:flex   sm:justify-center'>
                <div className='sm:flex sm:flex-wrap sm:gap-2 sm:h-auto space-y-8 mt-5 mb-5 sm:bg-emerald-300 border-b-4 border-t-4 border-emerald-700 box-border pl-2 pt-2  sm:w-[70vw] sm:pl-20 sm:rounded-3xl '>
                    <div className='mt-5 sm:space-x-4'>
                        <label htmlFor="name" className='sm:font-semibold sm:text-amber-300 sm:text-xl' >Full Name :- </label>
                        <input className='text-center rounded-t-lg border-b-2 border-red-900 p-1' type="text" placeholder='Name' {...register("name", { minLength: { value: 2, message: "min length is 2" }, required: { value: true, message: "Your name is missing" } })} />
                        {errors.name && <div className='text-xs text-red-900 pl-24'>{errors.name.message}</div>}
                    </div>
                    <div className='sm:pl-[70px] sm:space-x-8'>
                        <label htmlFor="college" className='text-xl sm:font-semibold sm:text-amber-300'>College :- </label>
                        <input type="text" placeholder='College' className='text-center rounded-t-lg border-b-2 p-1 border-red-900' {...register("clg_name", { required: { value: true, message: "Your college name is missing" } })} />
                        {errors.clg_name && <div className='text-xs text-red-800 pl-24'>{errors.clg_name.message}</div>}
                    </div>
                    <div className=" space-x-6 sm:space-x-10">
                        <label htmlFor="DOB" className=' text-xl sm:font-semibold sm:text-amber-300'>DOB :- </label>
                        <input type="date" className='text-center rounded-t-lg border-b-2 border-red-900 p-1' placeholder='Date of birth' {...register("DOB", { required: { value: true, message: "Your DOB is missing" } })} />
                        {errors.DOB && <div className='text-xs text-red-800 pl-24'>{errors.DOB.message}</div>}
                    </div>
                    <div className=" sm:space-x-5 sm:pl-36">
                        <label htmlFor="Phone Number" className='sm:font-semibold sm:text-amber-300'>Phone Number :- </label>
                        <input type="phone" className=' w-52 text-center rounded-t-lg border-b-2 border-red-900 p-1' placeholder='Mobile Number' {...register("mobile", { required: { value: true, message: "Mobile Number is missing" }, minLength: { value: 10, message: "Please Enter a 10 digit Phone number" }, maxLength: { value: 10, message: "Invalid phone number" } })} />
                        {errors.mobile && <div className='text-xs text-red-800 pl-24'>{errors.mobile.message}</div>}
                    </div>
                    <div className="sm:pl-52 sm:space-x-2">
                        <label htmlFor="password" className='sm:font-semibold sm:text-amber-300'>Password :- </label>
                        <input type="password" onInput={handlegen} onClick={check1} className='text-center rounded-t-lg border-b-2 p-1 border-red-900' placeholder='Password'{...register("password", { required: { value: true, message: "password is missing" } })} />
                        {errors.password && <div className='text-xs text-red-800 pl-24'>{errors.password.message}</div>}
                    </div>
                    <div className="">
                        <label htmlFor="username" className='sm:pl-44 sm:font-semibold sm:text-amber-300'>Username</label><label className='text-[9px] sm:text-[12px] sm:font-semibold sm:text-amber-500'>(Don&apos;t need to enter username it&apos;s generate automatically):- </label>
                    </div>
                    <div className='pl-14 sm:pl-64'>
                        <input type="username" className='text-center rounded-t-lg p-1 border-b-2 border-red-900 bg-blue-100 text-black font-semibold' placeholder='Username' {...register("username")} readOnly />
                    </div>

                    <div className='flex justify-center gap-14 mt-3 pb-2 sm:pl-52'>
                        {isSubmitting && <div className='p-2 font-bold '>Submitting...</div>}
                        <input disabled={isSubmitting} className='w-32 border-2 rounded-3xl p-2 text-sm text-amber-300 bg-blue-600 hover:bg-blue-700 hover:text-white focus:bg-sky-500 active:bg-sky-300' type="submit" value="submit" />
                        <Link href="/" ><input className='w-32 border-2 rounded-3xl p-2 text-sm text-amber-300 bg-green-600 hover:bg-green-700 hover:text-white focus:bg-green-300 active:bg-green-200' type="button" value="<< Back" /></Link>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Page
