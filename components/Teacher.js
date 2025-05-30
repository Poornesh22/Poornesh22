"use client"
import React, { useState } from 'react'

const Teacher = (props) => {
    var database = props.database;

    const [stream1, setstream1] = useState([""]);
    const [columns, setcolumns] = useState(0);
    const [stval, setstval] = useState("");
    const [dptable, setdptable] = useState(false);
    const [table1, settable1] = useState([""]);

    const gettable = async (name, msg = "") => {
        if (name == "") {
            alert(msg)
        } else {
            let data = {
                database: database,
                collection: "teacher_table",
                name: name,
            };
            let a = await fetch("/main", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json()
            settable1(res);
            setcolumns(res?.Monday?.length);
            setdptable(true);
        }
        props.scroll();
    };


    const getdata = async (name1, name, msg = "") => {
        if (name == "") {
            alert(msg)
        } else {
            let data = {
                database: database,
                collection: "clg_data",
                name: name,
            };
            let a = await fetch("/main", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json()
            const course_d = [...res.values].sort((a, b) => {
                const isANumeric = !isNaN(a);
                const isBNumeric = !isNaN(b);

                if (isANumeric && isBNumeric) {
                    return parseInt(a) - parseInt(b);
                }

                if (!isANumeric && !isBNumeric) {
                    return a.localeCompare(b);
                }
                if (isANumeric != "" || isANumeric != " ") {
                    return isANumeric ? 1 : -1;
                }
            });
            setstream1(course_d);
        }
    }

    const normal = () => {
        setstval("");
        setdptable(false)
    }

    const randertable = () => {
        return (
            <>
                <div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent'>
                    <table className=" bg-white w-full border-collapse border border-gray-500 mt-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-500 px-4 py-2 sticky left-0 bg-purple-200">Day/Periods</th>
                                {[...Array(columns)].map((_, i) => (
                                    <th key={i} className="border border-gray-500 px-4 py-2">
                                        Period {i + 1}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(table1).filter(([days, value]) => days != "name" && days != "database" && days != "_id").map(([day, values]) => (
                                <tr key={day}>
                                    <td className="border border-gray-500 px-4 py-2 sticky left-0 bg-purple-200">{day}</td>
                                    {values.map((allvalues, j) => (
                                        <td key={j} className="border border-gray-500 px-4 py-2">
                                            <div className="flex flex-col w-28 h-28 text-sm">
                                                <div>{allvalues[0]}</div>
                                                <div>{allvalues[1]}</div>
                                                <div>{allvalues[2]}</div>
                                                <div>{allvalues[3]}</div>
                                                <div>{allvalues[4]}</div>
                                                <div>{allvalues[5]}</div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )

    }

    return (
        <div className="mt-1 flex items-center justify-center bg-gray-100 p-2 mb-5">
            <div className="w-full p-4 bg-amber-300 border-b-2 border-r-4 border-amber-400 rounded-3xl shadow-xl shadow-amber-400 flex flex-col justify-normal overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
                <h2 className="text-xl font-bold mb-4">Teacher&apos;s Timetable</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Teacher&apos;s name</label>
                    <select onChange={(e) => setstval(e.target.value)} onClick={() => getdata("teacher", "teacher")} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {stream1.filter(st =>!st.includes("+")).map(st => <option key={st} value={st} >{st}</option>)}
                    </select>
                </div>

                <button
                    onClick={() => gettable(stval, "First select a Teacher name")}
                    className=" self-center w-72 px-4 py-2 bg-blue-500 text-white font-semibold rounded-3xl shadow-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Get Table
                </button>
                {dptable && randertable()}
                {dptable && (<button
                    onClick={normal}
                    className=" self-center w-60 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back
                </button>)}
            </div>
        </div>
    )
}

export default Teacher
