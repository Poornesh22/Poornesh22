// pages/index.js
"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { set } from 'react-hook-form';

const Table = (props) => {
  const router = useRouter();
  const [columns, setcolumns] = useState(0);
  const [tableVisible, setTableVisible] = useState(false);
  const [value1, setvalue1] = useState("");
  const [value2, setvalue2] = useState("");
  const [value3, setvalue3] = useState("");
  const [value4, setvalue4] = useState("");
  const [value5, setvalue5] = useState("");
  const [section1, setsection1] = useState([""]);
  const [department1, setdepartment1] = useState([""]);
  const [subject1, setsubject1] = useState([""]);
  const [stream1, setstream1] = useState([""]);
  const [semester1, setsemester1] = useState([""]);
  const [teacher1, setteacher1] = useState([""]);
  const [room1, setroom1] = useState([""]);
  const [roomd, setroomd] = useState([""]);
  const [teacherd, setteacherd] = useState([""]);
  const [table1, settable1] = useState("");
  const [columnshow, setcolumnshow] = useState(true);
  const [table12, settable12] = useState([""]);


  const getdata = async (name1, name, msg = "", collection) => {
    if (name == "" || name == "S") {
      alert(msg)
    } else {
      let data = {
        name: name,
        database: props.database,
        collection: collection,
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
      } else if (name1 == "section") {
        if (res.values == "") {
          alert("No any semester found")
        } else {
          setsection1(res.values)
        }
      } else if (name1 == "department") {
        if (res.values == "") {
          alert("No any department found")
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
      } else if (name1 == "subject") {
        if (res.values == "") {
          alert("No any subject found")
          setcolumns(0)
          setTableVisible(false);
        } else {
          setsubject1(res.values)
        }
      } else if (name1 == "teacher") {
        if (res.values == "") {
          alert("No any teacher name found")
          setcolumns(0)
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
          setteacher1(course_d)
        }
      } else if (name1 == "room") {
        if (res.values == " ") {
          alert("No any room found")
          setcolumns(0)
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
      } else {
        settable12(res.values)
      }
    }

  }


  const testing1 = () => {
    settable1({
      database: props.database,
      name: [value1, value2, value3, value4],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    })

    settable1((prevState) => {
      // Loop to add empty arrays in each day
      const updatedState = { ...prevState };

      for (let i = 0; i < columns; i++) {
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
    let str1 = value3;
    let match1 = str1.match(/\d+$/)
    if (parseInt(match1[0]) % 2 === 0) {
      let data = {
        rec: "even",
        database: props.database,
        name: "room",
      };
      let a = await fetch("/t_values", { method: "POST", headers: { "contect-type": "application/json" }, body: JSON.stringify(data) })
      let res = await a.json();
      setroomd(res);
    } else {
      if (parseInt(match1[0]) === 11) {
        let data = {
          rec: "even",
          database: props.database,
          name: "room",
        };
        let a = await fetch("/t_values", { method: "POST", headers: { "contect-type": "application/json" }, body: JSON.stringify(data) })
        let res = await a.json();
        setroomd(res);
      } else {
        let data = {
          rec: "odd",
          database: props.database,
          name: "room",
        };
        let a = await fetch("/t_values", { method: "POST", headers: { "contect-type": "application/json" }, body: JSON.stringify(data) })
        let res = await a.json();
        setroomd(res);
      }
    }
  };

  const teacher_d = async () => {
    let str1 = value3;
    let match1 = str1.match(/\d+$/)
    if (parseInt(match1[0]) % 2 === 0) {
      let data = {
        rec: "even",
        database: props.database,
        name: "teacher",
      };
      let a = await fetch("/t_values", { method: "POST", headers: { "contect-type": "application/json" }, body: JSON.stringify(data) })
      let res = await a.json();
      setteacherd(res);
    } else {
      if (parseInt(match1[0]) === 11) {
        let data = {
          rec: "even",
          database: props.database,
          name: "teacher",
        };
        let a = await fetch("/t_values", { method: "POST", headers: { "contect-type": "application/json" }, body: JSON.stringify(data) })
        let res = await a.json();
        setteacherd(res);
      } else {
        let data = {
          rec: "odd",
          database: props.database,
          name: "teacher",
        };
        let a = await fetch("/t_values", { method: "POST", headers: { "contect-type": "application/json" }, body: JSON.stringify(data) })
        let res = await a.json();
        setteacherd(res);
      }
    }
  };




  const handleCreateTable = async () => {
    if (value1 == "") {
      alert("Please select a stream");
    } else if (value2 == "") {
      alert("Please select a course");
    } else if (value3 == "") {
      alert("Please select a Semester")
    } else if (value4 == "") {
      alert("please select a section")
    } else if (value5 != "") {
      let val1 = value5.split(",")
      console.log(val1);
      let data = {
        database: props.database,
        name: val1
      }
      let data1 = {
        database: props.database,
        name: [value1, value2, value3, value4],
      };
      let a = await fetch("/edit", { method: "DELETE", headers: { "contect-type": "application/json" }, body: JSON.stringify(data1) })
      let res = await a.json();
      if (res.name == "exist") {
        alert("Table is already exist")
      } else {
        let a1 = await fetch("/edit", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
        let b = await a1.json();
        settable1(b);
        setcolumns(b?.Monday?.length);
        setTableVisible(true);
        { room_d() };
        { teacher_d() };
        { getdata("subject", [`S${value1}`, value3], "First select a semester", "clg_data") }
        { getdata("teacher", "teacher", "select a teacher name", "clg_data") };
        { getdata("room", "room", "select a room number", "clg_data") };
      }

    }
    else if (columns > 0) {
      let data = {
        database: props.database,
        name: [value1, value2, value3, value4],
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
    settable1((prevState) => {
      const updatedState = { ...prevState };
      updatedState.name = [value1, value2, value3, value4];
      return updatedState;
    });

    let a = await fetch("/t_values", { method: "PUT", header: { "content-type": "application/json" }, body: JSON.stringify(table1) })
    let res = await a.json();
    if (res.name == "successful") {
      alert("Table add successfully")
      setTableVisible(false);

    } else {
      alert("Wait, Work in progress")
    }
  };


  const handleColumnChange = (e) => {
    setcolumns(parseInt(e.target.value) || 0);
    { getdata("teacher", "teacher", "select a teacher name", "clg_data") };
    { getdata("room", "room", "select a room number", "clg_data") };
  };

  const check = (e) => {
    setvalue5(e.target.value)
    if (e.target.value == "") {
      setcolumnshow(true)
    } else {
      setcolumnshow(false)
    }
  }

  const normal = () => {
    setvalue1("");
    setvalue2("");
    setvalue3("");
    setvalue4("");
    setcolumns(0);

    setTableVisible(false)
  };


  const renderTable = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
      <>
        {columnshow ? (<div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-transparent'>
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
                        <select onChange={(e) => testing(day, j, 0, e.target.value)} onClick={() => getdata("subject", [`S${value1}`, value3], "First select a semester", "clg_data")} className="w-full px-2 py-1 border border-gray-300 rounded">
                          {subject1.map(sub => <option key={sub} value={sub} >{sub}</option>)}
                        </select>
                        <select onChange={(e) => testing(day, j, 1, e.target.value)} onClick={() => { getdata("teacher", "teacher", "select a teacher name", "clg_data") }} className="w-full px-2 py-1 border border-gray-300 rounded">
                          {teacher1.filter((teacher) => {
                            let c1 = 0
                            let x2 = teacher.split("+")
                            let c = x2.length - 1;
                            for (let k = 0; k <= c; k++) {
                              if (x2[k] != " ") {
                                x2[k] = x2[k].trim();
                              }
                              if (teacherd?.[day]?.[j]?.includes(x2[k])) {
                                c1 += 1
                              }
                            }
                            return c1 === 0
                          }).map(sub => <option key={sub} value={sub} >{sub}</option>)}
                        </select>
                        <select onChange={(e) => testing(day, j, 2, e.target.value)} onClick={() => { getdata("room", "room", "select a room number", "clg_data") }} className="w-full px-2 py-1 border border-gray-300 rounded">
                          {room1.filter((room) => !roomd?.[day]?.[j]?.includes(room)).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                        </select>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>) : (<>
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
                          <select onChange={(e) => testing(day, j, 0, e.target.value)} value={allvalues[0]} onClick={() => { getdata("subject", [`S${value1}`, value3], "First select a semester", "clg_data") }} className="w-full px-2 py-1 border border-gray-300 rounded">
                            {subject1.map(sub => <option key={sub} value={sub} >{sub}</option>)}
                          </select>
                          <select onChange={(e) => testing(day, j, 1, e.target.value)} value={allvalues[1]} onClick={() => { getdata("teacher", "teacher", "select a teacher name", "clg_data") }} className="w-full px-2 py-1 border border-gray-300 rounded">
                            {teacher1.filter((teacher) => {
                              let c1 = 0
                              let x2 = teacher.split("+")
                              let c = x2.length - 1;
                              for (let k = 0; k <= c; k++) {
                                if (teacherd?.[day]?.[j]?.includes(x2[k])) {
                                  c1 += 1
                                }
                              }
                              return (c1 === 0 || teacher == allvalues[1])
                            }).map(sub => <option key={sub} value={sub} >{sub}</option>)}
                          </select>
                          <select onChange={(e) => testing(day, j, 2, e.target.value)} value={allvalues[2]} onClick={() => { getdata("room", "room", "select a room number", "clg_data") }} className="w-full px-2 py-1 border border-gray-300 rounded">
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
        </>)}
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
            <select onClick={() => getdata("stream", "stream", "something gets wrong", "clg_data")} onChange={(e) => { setvalue1(e.target.value) }} value={value1} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {stream1.map(st => <option key={st} value={st} >{st}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select a Department</label>
            <select onChange={(e) => { setvalue2(e.target.value) }} onClick={() => getdata("department", value1, "First select a stream", "clg_data")} value={value2} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {department1.map(ch => <option key={ch} value={ch} >{ch}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select a Semester</label>
            <select onChange={(e) => { setvalue3(e.target.value) }} onClick={() => getdata("semester", `S${value1}`, "First select a Stream", "clg_data")} value={value3} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {semester1.map(se => <option key={se} value={se} >{se}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select a Section</label>
            <select onChange={(e) => { setvalue4(e.target.value) }} onClick={() => getdata("section", value2, "First select a Department", "clg_data")} value={value4} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {section1.map(se => <option key={se} value={se} >{se}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Copy another table (Optional)</label>
            <select onChange={(e) => { check(e) }} onClick={() => getdata("Table", "record", "First select a collection", "Tables")} value={value5} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              {table12.map((se, i) => <option key={i} value={se} >[{se[0]}, {se[1]}, {se[2]}, {se[3]}]</option>)}
            </select>
          </div>

          {columnshow && (<div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Columns</label>
            <input
              type="number"
              onClick={() => getdata("subject", [`S${value1}`, value3], "First select a semester", "clg_data")}
              className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of columns"
              value={columns}
              onChange={handleColumnChange}
            />
          </div>)}

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
