"use client"
import React, { useState } from 'react'
import * as XLSX from 'xlsx';


const Department = (props) => {
    var database = props.database;

    const [stream1, setstream1] = useState([""]);
    const [columns, setcolumns] = useState(0);
    const [department1, setdepartment1] = useState([""]);
    const [stval, setstval] = useState("");
    const [dpval, setdpval] = useState("");
    const [dptable, setdptable] = useState(false);
    const [table1, settable1] = useState([""]);

    const exportTableToExcel = () => {
        const table = document.getElementById('table-to-excel');
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });
        XLSX.writeFile(workbook, 'Department_table.xlsx');
    };

    const gettable = async (collection, name, msg = "") => {
        if (name == "") {
            alert(msg)
        } else {
            let data = {
                database: database,
                collection: collection,
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
            if (name1 == "stream") {
                setstream1(res.values)
            } else {
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
            }
        };

    };

    const normal = () =>{
        setstval("");
        setdpval("");
        setdptable(false)
    }

    const randertable = () => {
        return (
            <>
                <div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent'>
                    <table id='table-to-excel' className=" bg-white w-full border-collapse border border-gray-500 mt-4">
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
                                        <td key={j} className="border border-gray-500 px-1 py-1">
                                            <div className="flex flex-col min-w-44 w-auto min-h-20 text-xs">
                                                {allvalues.map((val, x) => (
                                                    <div key={x} className=" whitespace-nowrap text-xs border-b-[0.5px] border-black">
                                                        {[...Array(val.length)].map((_, i) => ((i+1) % 5 == 0 ? <><span key={i}>{val[i]}</span></>:<span key={i}>{val[i]}&nbsp;/&nbsp;</span>))}
                                                    </div>
                                                ))}
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
        <div className="mt-2 flex items-center justify-center bg-gray-100 p-2 mb-5">
            <div className="w-full p-4 bg-amber-300 border-t-2 border-r-4 border-amber-400 rounded-3xl shadow-xl shadow-amber-400 flex flex-col justify-normal overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
                <h2 className="text-xl font-bold mb-4">Department wise Timetable</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Stream</label>
                    <select onChange={(e) => setstval(e.target.value)} onClick={() => getdata("stream", "stream")} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {stream1.map(st => <option key={st} value={st} >{st}</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Department</label>
                    <select onChange={(e) => setdpval(e.target.value)} onClick={() => getdata("department", stval, "First select a stream")} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {department1.map(ch => <option key={ch} value={ch} >{ch}</option>)}
                    </select>
                </div>

                <button
                    onClick={() => gettable("department_table", dpval, "First select a Department")}
                    className=" self-center w-72 px-4 py-2 bg-blue-500 text-white font-semibold rounded-3xl shadow-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Get Table
                </button>
                {dptable && randertable()}
                {dptable && (<><button
                        onClick={normal}
                        className=" self-center w-60 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Back
                    </button>
                    <button
                    onClick={exportTableToExcel}
                    className=" self-center w-60 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Export to Excel
                </button></>)}
            </div>
        </div>
    )
}

export default Department
