// pages/index.js
"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { set } from 'react-hook-form';

const Table = (props) => {
  const router = useRouter();
  const [columns, setColumns] = useState(0);
  const [tableVisible, setTableVisible] = useState(false);
  const [submit, setsubmit] = useState(0)
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
          setColumns(0)
          setTableVisible(false);
        } else {
          setsubject1(res.values)
        }
      } else if (name1 == "teacher") {
        if (res.values == "") {
          alert("No any teacher name found")
          setColumns(0)
          setTableVisible(false);
        } else {
          setteacher1(res.values)
        }
      } else {
        if (res.values == " ") {
          alert("No any room found")
          setColumns(0)
          setTableVisible(false);
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
          setroom1(course_d)
        }
      }
    }

  }


  const testing1 = () => {
    settable1({
      database: props.database,
      name: [value1, value2, value3],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    })

    console.log({ columns });

    settable1((prevState) => {
      // Loop to add empty arrays in each day
      const updatedState = { ...prevState };

      for (let i = 0; i < columns; i++) {
        console.log(i)
        updatedState.Monday.push(["", "", ""]);
        updatedState.Tuesday.push(["", "", ""]);
        updatedState.Wednesday.push(["", "", ""]);
        updatedState.Thursday.push(["", "", ""]);
        updatedState.Friday.push(["", "", ""]);
        updatedState.Saturday.push(["", "", ""]);
      }

      return updatedState;
    });

  }


  const testing = async (day, period, num, val) => {
    settable1((prevState) => {
      const updatedState = { ...prevState };
      updatedState[day][period][num] = val;
      return updatedState;
    });

  }


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




  const handleCreateTable = async () => {
    if (value1 == "") {
      alert("Please select a stream");
    } else if (value2 == "") {
      alert("Please select a course");
    } else if (value3 == "") {
      alert("Please select a Semester")
    }
    else if (columns > 0) {
      let data = {
        database: props.database,
        name: [value1, value2, value3],
      };
      let a = await fetch("/edit", { method: "DELETE", headers: { "contect-type": "application/json" }, body: JSON.stringify(data) })
      let res = await a.json();
      if (res.name == "exist") {
        alert("Table is already exist")
      } else {
        setTableVisible(true);
        { testing1() };
        { room_d() };
        { teacher_d() };
      }
    } else {
      alert("column value is 0")
    }
    props.scroll();
  };

  const Submit_table = async () => {
    setsubmit(2);
    let a = await fetch("/t_values", { method: "PUT", header: { "content-type": "application/json" }, body: JSON.stringify(table1) })
    let res = await a.json();
    if (res.name == "successful") {
      alert("Table add successfully")
      setTableVisible(false);

    } else {
      alert("Table is already exist.")
    }
  };


  const handleColumnChange = (e) => {
    setColumns(parseInt(e.target.value) || 0);
    { getdata("teacher", value2) };
    { getdata("room", "room") };
  };

  const normal = () => {
    setvalue1("");
    setvalue2("");
    setvalue3("");
    setColumns(0);

    setTableVisible(false)
};


  const renderTable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
      <>
        <div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-transparent'>
          <table className="w-full border-collapse border border-gray-500 mt-4 bg-white">
            <thead>
              <tr>
                <th className="border border-gray-500 px-4 py-2 sticky left-0 bg-orange-200">Day/Periods</th>
                {[...Array(columns)].map((_, i) => (
                  <th key={i} className="border border-gray-500 px-4 py-2 min-w-40 ">
                    Period {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, i) => (
                <tr key={i}>
                  <td className="border border-gray-500 px-4 py-2 sticky left-0 bg-orange-200">{day}</td>
                  {[...Array(columns)].map((_, j) => (
                    <td key={j} className="border border-gray-500 px-4 py-2">
                      <div className="space-y-2">
                        <select onChange={(e) => testing(day, j, 0, e.target.value)} onClick={() => getdata("subject", value3, "First select a semester")} className="w-full px-2 py-1 border border-gray-300 rounded">
                          {subject1.map(sub => <option key={sub} value={sub} >{sub}</option>)}
                        </select>
                        <select onChange={(e) => testing(day, j, 1, e.target.value)} onClick={() => { getdata("teacher", value2) }} className="w-full px-2 py-1 border border-gray-300 rounded">
                          {teacher1.filter((teacher) => !teacherd?.[day]?.[j]?.includes(teacher)).map(sub => <option key={sub} value={sub} >{sub}</option>)}
                        </select>
                        <select onChange={(e) => testing(day, j, 2, e.target.value)} onClick={() => { getdata("room", "room") }} className="w-full px-2 py-1 border border-gray-300 rounded">
                          {room1.filter((room) => !roomd?.[day]?.[j]?.includes(room)).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                        </select>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 p-2 mb-10">
        <div className="w-full p-4 bg-orange-300 border-r-4 border-t-4 border-orange-400 rounded-3xl shadow-xl shadow-orange-400 flex flex-col justify-normal overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
          <h2 className="text-xl font-serif font-semibold mb-4">New Timetable</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select a Stream</label>
            <select onClick={() => getdata("stream", "stream")} onChange={(e) => { setvalue1(e.target.value) }} value={value1} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {stream1.map(st => <option key={st} value={st} >{st}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select a Department</label>
            <select onChange={(e) => { setvalue2(e.target.value) }} onClick={() => getdata("department", value1, "First select a stream")} value={value2} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {department1.map(ch => <option key={ch} value={ch} >{ch}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select a Semester</label>
            <select onChange={(e) => { setvalue3(e.target.value) }} onClick={() => getdata("semester", `S${value1}`, "First select a Stream")} value={value3} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {semester1.map(se => <option key={se} value={se} >{se}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Columns</label>
            <input
              type="number"
              onClick={() => getdata("subject", value3, "First select a semester")}
              className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of columns"
              value={columns}
              onChange={handleColumnChange}
            />
          </div>

          <button
            onClick={handleCreateTable}
            className=" self-center w-auto px-4 py-4 text-base bg-blue-500 text-white font-semibold rounded-full shadow-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Create Table
          </button>

          {tableVisible && renderTable()}

          {tableVisible && (<>
            <button
              onClick={Submit_table}
              className=" self-center mt-4 w-72 px-4 py-2 bg-green-500 text-white font-semibold rounded-3xl shadow-3xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 "
            >
              Submit
            </button>
            <button
              onClick={normal}
              className=" self-center mt-4 w-72 px-4 py-2 bg-green-500 text-white font-semibold rounded-3xl shadow-3xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 "
            >
              Back
            </button>
            </>
          )}
        </div>
      </div>
      <div>
      </div>
    </>
  );
}

export default Table
