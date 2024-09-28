"use client"
import { useEffect, useState } from "react";
import Department from "@/components/Department";
import Room from "@/components/Room";
import Teacher from "@/components/Teacher";
import Semester from "@/components/Semester";
import { useForm } from 'react-hook-form';
import Stream from "@/components/Stream";
import Days from "@/components/Days";

const page = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [database, setdatabase] = useState("");
    const [d, setd] = useState(false);
    const [r, setr] = useState(false);
    const [t, sett] = useState(false);
    const [s, sets] = useState(false);
    const [st, setst] = useState(false);
    const [da, setda] = useState(false);


    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        seterror,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        data.username = data.username.trim()
        let data1 = {
            m : "a",
            n : "b",
            o : "c",
            p : "d",
            q : "e",
            r : "f",
            s : "g",
            t : "h",
            u : "i",
            v : "j",
            w : "k",
            x : "l",
            y : "m",
            z : "n",
            1 : "o",
            2 : "p",
            3 : "q",
            4 : "r",
            5 : "s",
            6 : "t",
            7 : "u",
            8 : "v",
            9 : "w",
            A : "x",
            B : "y",
            C : "z",
            D : "1",
            E : "2",
            F : "3",
            G : "4",
            H : "5",
            I : "6",
            J : "7",
            K : "8",
            L : "9",
            M : "0",
        }
        let c = Array.from(data.username);
        data.username = ""
        c.forEach((element) => {
            data.username = data.username + data1[element]
        })

        let a = await fetch("/server", { method: "DELETE", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
        let res = await a.json();
        if (res.name == "login successful") {
            setIsOpen(true);
            setdatabase(data.username);
        } else {
            alert("Key is not correct");
            setValue("username", "")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={`bg-white rounded-3xl p-2 top-0 w-72 ${isOpen ? 'hidden' : 'visible'} `} >
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Enter Key</label>
                    <div className="mt-2">
                        <input type="text" {...register("username", { required: true })} placeholder='Key' className="pl-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    {isSubmitting && <div className='p-2 font-bold px-3 py-1.5'>Submitting...</div>}
                    <button type="submit" disabled={isSubmitting} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                </div>
            </form>
            {isOpen && (<><div className='bg-amber-400 w-screen flex flex-wrap  gap-10 sm:gap-10 md:gap-20 p-5 justify-center h-auto'>
                <button onClick={() => { setda(false),setst(false); sets(false); setr(false); sett(false); setd(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-red-600 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-base sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white" >Department</button>
                <button onClick={() => { setda(false),setst(false); sets(false); setd(false); sett(false); setr(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-red-600 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-base sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">Room</button>
                <button onClick={() => { setda(false),setst(false); sets(false); setr(false); setd(false); sett(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-red-600 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-base sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">teacher</button>
                <button onClick={() => { setda(false),setst(false); sett(false); setr(false); setd(false); sets(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-red-600 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-base sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">semester</button>
                <button onClick={() => { setda(false),sett(false); setr(false); setd(false); sets(false); setst(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-red-600 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-base sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">Stream</button>
                <button onClick={() => { setst(false),sett(false); setr(false); setd(false); sets(false); setda(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-red-600 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-base sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">Days</button>
            </div> <div className="">
                    {d && <Department database={database} />}
                    {r && <Room database={database} />}
                    {t && <Teacher database={database} />}
                    {s && <Semester database={database} />}
                    {st && <Stream database={database} />}
                    {da && <Days database = {database} />}
                </div>
            </>)}
        </div>
    )
}

export default page

