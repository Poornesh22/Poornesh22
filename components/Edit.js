import React, { useState } from 'react'
import { set } from 'react-hook-form';

const Edit = (props) => {

    var database = props.database;
    const [columns, setcolumns] = useState(0);
    const [tableVisible, setTableVisible] = useState(false);
    const [value1, setvalue1] = useState("");
    const [value2, setvalue2] = useState("");
    const [value3, setvalue3] = useState("");
    const [department1, setdepartment1] = useState([""]);
    const [subject1, setsubject1] = useState([""]);
    const [stream1, setstream1] = useState([""]);
    const [semester1, setsemester1] = useState([""]);
    const [teacher1, setteacher1] = useState([""]);
    const [room1, setroom1] = useState([""]);
    const [roomd, setroomd] = useState([""]);
    const [teacherd, setteacherd] = useState([""]);
    const [table1, settable1] = useState("");


    const getdata = async (name1, name, msg = "") => {
        if (name == "" || name == "S") {
            alert(msg)
        } else {
            let data = {
                name: name,
                database: props.database,
                collection: "clg_data",
            }
            let a = await fetch("/main", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json();
            if (name1 == "stream") {
                if (res.values == "") {
                    alert("No any stream found")
                } else {
                    setstream1(res.values)
                }
            } else if (name1 == "semester") {
                if (res.values == "") {
                    alert("No any semester found")
                } else {
                    setsemester1(res.values)
                }
            } else if (name1 == "department") {
                if (res.values == "") {
                    alert("No any department found")
                } else {
                    setdepartment1(res.values)
                }
            } else if (name1 == "subject") {
                if (res.values == "") {
                    alert("No any subject found")
                } else {
                    setsubject1(res.values)
                }
            } else if (name1 == "teacher") {
                if (res.values == "") {
                    alert("No any teacher name found")
                } else {
                    setteacher1(res.values)
                }
            } else {
                if (res.values == "") {
                    alert("No any room found")
                } else {
                    setroom1(res.values)
                }
            }
        }

    }


    const testing1 = async () => {
        let data = {
            database: database,
            name: [value1, value2, value3]
        };
        let a = await fetch("/edit", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
        let b = await a.json();
        if (b.name == "not") {
            alert("Table Not Found")
        } else {
            settable1(b);
            setcolumns(b?.Monday?.length);
            setTableVisible(true);
        }
        props.scroll();
    };


    const testing = async (day, period, num, val) => {
        settable1((prevState) => {
            const updatedState = { ...prevState };
            updatedState[day][period][num] = val;
            return updatedState;
        });

    };


    const room_d = async () => {
        let data = {
            database: props.database,
            name: "room",
        };
        let a = await fetch("/t_values", { method: "POST", headers: { "contect-type": "application/json" }, body: JSON.stringify(data) })
        let res = await a.json();
        setroomd(res);
    };

    const teacher_d = async () => {
        let data = {
            database: props.database,
            name: "teacher",
        };
        let a = await fetch("/t_values", { method: "POST", headers: { "contect-type": "application/json" }, body: JSON.stringify(data) })
        let res = await a.json();
        setteacherd(res);
    };


    const handleCreateTable = () => {
        if (value1 == "") {
            alert("Please select a stream");
        } else if (value2 == "") {
            alert("Please select a department");
        } else if (value3 == "") {
            alert("Please select a Semester")
        } else {
            { testing1() };
            { getdata("teacher", value2) };
            { getdata("room", "room") };
            { getdata("subject", value3) }
            { room_d() };
            { teacher_d() };
        }
    };

    const Submit_table = async () => {
        let a = await fetch("/edit", { method: "PUT", header: { "content-type": "application/json" }, body: JSON.stringify(table1) })
        alert("Table Edited Successfully");
        setTableVisible(false);
    };


    const renderTable = () => {

        return (
            <>
                <div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-transparent'>
                    <table className="w-full border-collapse border border-gray-500 mt-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-500 px-4 py-2 sticky left-0 bg-indigo-300">Day/Periods</th>
                                {[...Array(columns)].map((_, i) => (
                                    <th key={i} className="border border-gray-500 px-4 py-2 min-w-40">
                                        Period {i + 1}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(table1).filter(([days, value]) => days != "name" && days != "database" && days != "_id").map(([day, values]) => (
                                <tr key={day}>
                                    <td className="border border-gray-500 px-4 py-2 sticky left-0 bg-indigo-300">{day}</td>
                                    {values.map((allvalues, j) => (
                                        <td key={j} className="border border-gray-500 px-4 py-2">
                                            <div className="space-y-2">
                                                <select onChange={(e) => testing(day, j, 0, e.target.value)} value={allvalues[0]} className="w-full px-2 py-1 border border-gray-300 rounded">
                                                    {subject1.map(sub => <option key={sub} value={sub} >{sub}</option>)}
                                                </select>
                                                <select onChange={(e) => testing(day, j, 1, e.target.value)} value={allvalues[1]} className="w-full px-2 py-1 border border-gray-300 rounded">
                                                    {teacher1.filter((teacher) => teacher == allvalues[1] || !teacherd?.[day]?.[j]?.includes(teacher)).map(sub => <option key={sub} value={sub} >{sub}</option>)}
                                                </select>
                                                <select onChange={(e) => testing(day, j, 2, e.target.value)} value={allvalues[2]} className="w-full px-2 py-1 border border-gray-300 rounded">
                                                    {room1.filter((room) => room == allvalues[2] || !roomd?.[day]?.[j]?.includes(room)).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                                </select>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            </>
        );
    };

    return (
        <>
            <div className="mt-5 flex items-center justify-center bg-gray-100 p-2 mb-5">
                <div className="w-full p-4 bg-violet-300 border-t-4 border-l-4 border-violet-400 rounded-3xl shadow-xl shadow-violet-400 flex flex-col justify-normal overflow-x-scroll scrollbar-thin scrollbar-thumb-violet-300 scrollbar-track-transparent">
                    <h2 className="text-xl font-serif font-bold mb-4">Edit Timetable</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select a Stream</label>
                        <select onClick={() => getdata("stream", "stream")} onChange={(e) => { setvalue1(e.target.value) }} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            {stream1.map(st => <option key={st} value={st} >{st}</option>)}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select a Department</label>
                        <select onChange={(e) => { setvalue2(e.target.value) }} onClick={() => getdata("department", value1, "First select a stream")} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            {department1.map(ch => <option key={ch} value={ch} >{ch}</option>)}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select a Semester</label>
                        <select onChange={(e) => { setvalue3(e.target.value) }} onClick={() => getdata("semester", `S${value1}`, "first select a stream")} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            {semester1.map(se => <option key={se} value={se} >{se}</option>)}
                        </select>
                    </div>


                    <button
                        onClick={handleCreateTable}
                        className=" self-center w-auto px-4 py-4 text-base bg-blue-500 text-white font-semibold rounded-full shadow-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        Edit Table
                    </button>

                    {tableVisible && renderTable()}

                    {tableVisible && (
                        <button
                            onClick={Submit_table}
                            className=" self-center mt-4 w-72 px-4 py-2 bg-green-500 text-white font-semibold rounded-3xl shadow-3xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 "
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
            <div>
            </div>
        </>
    );
}

export default Edit
