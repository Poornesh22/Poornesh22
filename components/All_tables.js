"use client"
import React, { useEffect } from 'react';
import { get } from 'react-hook-form';
import { useState } from 'react';

const All_tables = (props) => {

    const [value, setvalue] = useState([""]);

    useEffect(() => {

        const gettable = async () => {
            let data = {
                database: props.database,
                collection: "Tables",
                name: "record",
            };
            let a = await fetch("/main", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json();
            let x3 = res.values.length
            alert(x3 + " Tables are created")
            setvalue(res.values);
        };

        gettable();
    }, [props.database])




    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50 ">
            <div className=" bg-white flex flex-col items-center bg-opacity-20 p-8 rounded-3xl shadow-lg">
                <ol className="self-start text-3xl list-decimal list-outside text-white h-80 overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
                    {value.map((allvalues, i) => (
                        <li key={i} className="text-base sm:text-2xl ml-16 p-2">[{allvalues[0]}, {allvalues[1]}, {allvalues[2]}]</li>
                    ))}

                </ol>

                <button
                    onClick={props.at}
                    className="self-center w-40 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl"
                >
                    Back
                </button>
            </div>
        </div>

    );
}

export default All_tables
