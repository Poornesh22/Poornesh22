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
            setvalue(res.values);
        };

        gettable();
    }, [])




    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50">
            <ol className="text-3xl flex flex-col items-center justify-center text-white bg-white bg-opacity-20 p-8 rounded-xl shadow-lg list-decimal list-inside">
                {value.map((allvalues, i) => (
                    <li key={i} className="text-base sm:text-2xl">[{allvalues[0]}, {allvalues[1]}, {allvalues[2]}]</li>
                ))}

                <button
                    onClick={props.at}
                    className="self-center w-40 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl"
                >
                    Back
                </button>
            </ol>
        </div>

    );
}

export default All_tables
