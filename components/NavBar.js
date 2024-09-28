"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NavBar = (props) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    var database = props.database;

    const sb1 = () =>{
        setIsOpen(false)
        props.nt()
    }

    const sb2 = () =>{
        setIsOpen(false)
        props.et()
    }

    const sb3 = () =>{
        setIsOpen(false)
        props.vt()
    }

    const sb4 = () =>{
        setIsOpen(false)
        props.dt()
    }
    const sb5 = () =>{
        setIsOpen(!isOpen)
    }

    const deletacc = async() =>{
        let data = {
            database : database,
        };
        let a = await fetch("/account",{method : "DELETE",header : {"content-type" : "application/json"},body : JSON.stringify(data)})
        alert("Account Deleted Permanently")
        router.push("/");

    }

    const gen2 = () =>{
        let data = {
            a : "m",
            b : "n",
            c : "o",
            d : "p",
            e : "q",
            f : "r",
            g : "s",
            h : "t",
            i : "u",
            j : "v",
            k : "w",
            l : "x",
            m : "y",
            n : "z",
            o : "1",
            p : "2",
            q : "3",
            r : "4",
            s : "5",
            t : "6",
            u : "7",
            v : "8",
            w : "9",
            x : "A",
            y : "B",
            z : "C",
            1 : "D",
            2 : "E",
            3 : "F",
            4 : "G",
            5 : "H",
            6 : "I",
            7 : "J",
            8 : "K",
            9 : "L",
            0 : "M",
        }
        let a = Array.from(database);
        let b = ""
        a.forEach((element) => {
            b = b + data[element]
        })
        alert("KEY : "+ b)
        setIsOpen(false);
    }


    const gen1 = () =>{
        let data = {
            a : "e",
            b : "f",
            c : "g",
            d : "h",
            e : "i",
            f : "j",
            g : "k",
            h : "l",
            i : "m",
            j : "n",
            k : "o",
            l : "p",
            m : "q",
            n : "r",
            o : "s",
            p : "t",
            q : "u",
            r : "v",
            s : "w",
            t : "x",
            u : "y",
            v : "z",
            w : "1",
            x : "2",
            y : "3",
            z : "4",
            1 : "5",
            2 : "6",
            3 : "7",
            4 : "8",
            5 : "9",
            6 : "A",
            7 : "B",
            8 : "C",
            9 : "D",
            0 : "E",
        }
        let a = Array.from(database);
        let b = ""
        a.forEach((element) => {
            b = b + data[element]
        })
        alert("KEY : "+ b)
        setIsOpen(false);
    }


    return (
        <>
            <div className={`fixed z-50 top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-1000 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <h2 className='text-3xl border-white border-b-2 p-3 pl-5 font-semibold'>Table</h2>
                <ul className="space-y-5 p-3 pl-5 flex flex-col">
                    <button onClick={sb1} className='self-start hover:underline text-xl text-white mr-0 ml-0 hover:text-green-400'>New Table</button>
                    <button onClick={sb2} className='self-start hover:underline text-xl text-white mr-0 ml-0 hover:text-green-400'>Edit Table</button>
                    <button onClick={sb3} className='self-start hover:underline text-xl text-white mr-0 ml-0 hover:text-green-400'>View Table</button>
                    <button onClick={sb4} className='self-start hover:underline text-xl text-white mr-0 ml-0 hover:text-green-400'>Delete Table</button>
                </ul>

                <h2 className='text-3xl border-white border-b-2 border-t-2 p-3 pl-5 font-semibold mt-10'>Account</h2>
                <ul className="space-y-5 p-3 pl-5 flex flex-col">
                    <Link href="/" className='self-start'><button className='hover:underline text-xl text-white mr-0 ml-0 hover:text-sky-400'>LogOut</button></Link>
                    <button onClick={deletacc} className='self-start hover:underline text-lg text-white mr-0 ml-0 hover:text-sky-400'>Permanent Delete Account</button>
                    <button onClick={gen1} className='self-start hover:underline text-xl text-white mr-0 ml-0 hover:text-sky-400'>Teacher's Key</button>
                    <button onClick={gen2} className='self-start hover:underline text-xl text-white mr-0 ml-0 hover:text-sky-400'>Principal Office Key</button>

                </ul>


            </div>
            <div className={`fixed z-50 bg-white rounded-3xl p-2 top-0 w-full transform transition-transform duration-1000 ease-in-out ${isOpen ? 'translate-x-[240px]' : 'translate-x-0'} `}>
                <button
                    onClick={sb5}
                    className='bg-blue-500 text-white px-4 py-2 rounded-3xl'
                >
                    {isOpen ? 'Close Sidebar' : 'Table and Account'}
                </button>
            </div>
            <h1 className={`sticky top-12 z-50 border-b-2 border-green-500 space-x-1 font-serif p-3 rounded-3xl bg-green-200 w-full text-4xl text-center font-semibold text-green-700 transform transition-transform duration-1000 ease-in-out  ${isOpen ? 'translate-x-72' : 'translate-x-0'}`}><span className='font-bold text-5xl text-green-500'>W</span>elcome <span className='font-bold text-5xl text-green-500'>I</span>n <span className='font-bold text-5xl text-green-500'>S</span>chedular</h1>
        </>
    )
}

export default NavBar
