"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';


const Delete = (props) => {
    var database = props.database;

    const [stream1, setstream1] = useState([""]);
    const [semester1, setsemester1] = useState([""]);
    const [department1, setdepartment1] = useState([""]);
    const [columns, setcolumns] = useState(0);
    const [stval, setstval] = useState("");
    const [seval, setseval] = useState("");
    const [dpval, setdpval] = useState("");
    const [secval, setsecval] = useState("");
    const [dptable, setdptable] = useState(false);
    const [table1, settable1] = useState([""]);
    const [section1, setsection1] = useState([""]);

    const exportTableToExcel = () => {
        const table = document.getElementById('table-to-excel');
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });
        XLSX.writeFile(workbook, 'table.xlsx');
    };


    const gettable = async (collection, name,) => {
        if (stval == "") {
            alert("First select a stream")
        } else if (seval == "") {
            alert("First select a semester")
        } else if (dpval == "") {
            alert("First select a department")
        } else if (secval == "") {
            alert("First select a section")
        } else {
            let data = {
                database: database,
                collection: collection,
                name: name,
            };
            let a = await fetch("/main", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json()
            if (res.values == "") {
                alert("Table not exist")
            } else {
                settable1(res);
                setcolumns(res?.Monday?.length);
                setdptable(true);
            }
        }
        props.scroll()
    };


    const getdata = async (name1, name, msg = "") => {
        if (name == "" || name == "S") {
            alert(msg)
        } else {
            let data = {
                database: database,
                collection: "clg_data",
                name: name,
            };
            let a = await fetch("/main", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json()
            if (res.name == "not exist") {
                alert("Properly select all values")
            }
            else if (name1 == "stream") {
                setstream1(res.values)
            } else if (name1 == "department") {
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
                setdepartment1(course_d)
            } else if (name1 == "semester") {
                setsemester1(res.values)
            } else {
                setsection1(res.values)
            }
        };

    };

    const delete_table = async () => {
        let a = await fetch("/t_values", { method: "DELETE", header: { "content-type": "application/json" }, body: JSON.stringify(table1) })
        let res = await a.json();
        if (res.name == "successful") {
            alert("delete successfully")
            setdptable(false)
            setstval("");
            setseval("");
            setdpval("");
            setsecval("");
        } else {
            alert("Wait, work in progress")
        }

    }

    const normal = () => {
        setstval("");
        setseval("");
        setdpval("");
        setsecval("");
        setdptable(false)
    }

    const randertable = () => {
        return (
            <>
                <div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-transparent'>
                    <table id='table-to-excel' className=" w-full border-collapse border bg-bltext-black border-black mt-4 bg-white">
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2 sticky left-0 bg-pink-300">Day/Periods</th>
                                {[...Array(columns)].map((_, i) => (
                                    <th key={i} className="border border-black px-4 py-2">
                                        Period {i + 1}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(table1).filter(([days, value]) => days != "name" && days != "database" && days != "_id").map(([day, values]) => (
                                <tr key={day}>
                                    <td className="border border-black px-4 py-2 sticky left-0 bg-pink-300">{day}</td>
                                    {values.map((allvalues, j) => (
                                        <td key={j} className="border border-black px-4 py-2">
                                            <div className="flex flex-col min-w-32 w-auto min-h-20 h-auto whitespace-nowrap">
                                                <div>{allvalues[0]}</div>
                                                <div>{allvalues[1]}</div>
                                                <div>{allvalues[2]}</div>
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
        <div className=" flex items-center justify-center bg-grey-100 p-2 mb-5">
            <div className="w-full p-4 bg-red-400 border-b-2 border-l-4 border-red-500 rounded-3xl shadow-xl shadow-red-500 flex flex-col justify-normal">
                <h2 className="text-2xl font-serif text-black font-semibold mb-4">Delete Timetable</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-2">Select a Stream</label>
                    <select value={stval} onChange={(e) => setstval(e.target.value)} onClick={() => getdata("stream", "stream")} className="w-full px-3 py-2 border border-black rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {stream1.map(st => <option key={st} value={st} >{st}</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-2">Select a Department</label>
                    <select value={dpval} onChange={(e) => setdpval(e.target.value)} onClick={() => getdata("department", stval, "First select a stream")} className="w-full px-3 py-2 border border-black rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {department1.map(ch => <option key={ch} value={ch} >{ch}</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-2">Select a Semester</label>
                    <select value={seval} onChange={(e) => setseval(e.target.value)} onClick={() => getdata("semester", `S${stval}`, "First select a stream")} className="w-full px-3 py-2 border border-black rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {semester1.map(ch => <option key={ch} value={ch} >{ch}</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Section</label>
                    <select onChange={(e) => { setsecval(e.target.value) }} onClick={() => getdata("section", dpval, "First select a Department")} value={secval} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {section1.map(se => <option key={se} value={se} >{se}</option>)}
                    </select>
                </div>

                <button
                    onClick={() => gettable("Tables", [stval, dpval, seval,secval], "First select a Section")}
                    className=" self-center w-72 px-4 py-2 bg-blue-500 text-white font-semibold rounded-3xl shadow-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Get Table
                </button>
                {dptable && randertable()}
                {dptable && (<><button
                    onClick={exportTableToExcel}
                    className=" self-center w-60 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Export to Excel
                </button>
                    <button
                        onClick={delete_table}
                        className=" strcky right-0 self-center w-60 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete Table
                    </button>
                    <button
                        onClick={normal}
                        className=" self-center w-60 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Back
                    </button>
                </>)}
            </div>
        </div>
    )
}

export default Delete
