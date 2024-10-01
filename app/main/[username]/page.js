"use client"
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar.js";
import Table from "@/components/Table.js";
import { useRouter } from "next/navigation";
import Edit from "@/components/Edit";
import Department from "@/components/Department";
import Room from "@/components/Room";
import Teacher from "@/components/Teacher";
import Semester from "@/components/Semester";
import Delete from "@/components/Delete";
import Stream from "@/components/Stream";
import Days from "@/components/Days";

export default function Home({ params }) {
  const router = useRouter();

  var database = params.username;


  const [stream1, setstream1] = useState([""]);
  const [department1, setdepartment1] = useState([""]);
  const [semester1, setsemester1] = useState([""]);
  const [subject1, setsubject1] = useState([""]);
  const [teacher1, setteacher1] = useState([""]);
  const [room1, setroom1] = useState([""]);
  const [stentry, setstentry] = useState("");
  const [stdel, setstdel] = useState("");
  const [dpentry, setdpentry] = useState("");
  const [dpdel, setdpdel] = useState("");
  const [seentry, setseentry] = useState("");
  const [sedel, setsedel] = useState("");
  const [suentry, setsuentry] = useState("");
  const [sudel, setsudel] = useState("");
  const [trentry, settrentry] = useState("");
  const [trdel, settrdel] = useState("");
  const [rentry, setrentry] = useState("");
  const [rdel, setrdel] = useState("");
  const [cstdel, setcstdel] = useState("");
  const [csedel, setcsedel] = useState("");
  const [sstdel, setsstdel] = useState("");
  const [sustdel, setsustdel] = useState("");
  const [tstdel, settstdel] = useState("");
  const [tdpdel, settdpdel] = useState("");
  const [newtable, setnewtable] = useState(false);
  const [edittable, setedittable] = useState(false);
  const [viewtable, setviewtable] = useState(false);
  const [deletetable, setdeletetable] = useState(false);
  const [d, setd] = useState(false);
  const [r, setr] = useState(false);
  const [t, sett] = useState(false);
  const [s, sets] = useState(false);
  const [st, setst] = useState(false);
  const [da, setda] = useState(false);




  const putdata = async (name1, name, value, msg = "") => {
    if (value == "") {
      alert("Please enter a value")
    } else if (name == "" || name == "S") {
      alert(msg)
    } else {
      let data = {
        name1: name1,
        name: name,
        value: value,
        database: database
      };
      setstentry("");
      setseentry("");
      setrentry("");
      setsuentry("");
      settrentry("");
      setdpentry("");
      let a = await fetch("/main", { method: "PUT", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
      let res = await a.json()
      alert(res.name)
    }
    setsedel("");
    setdpdel("");
    setsudel("");
    settrdel("");
    setrdel("");
  };


  const getdata = async (name1, name, msg = "") => {
    if (name == "" || name == "S") {
      alert(msg)
    } else {
      let data = {
        database: database,
        name: name,
        collection: "clg_data",
      };
      let a = await fetch("/main", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
      let res = await a.json()
      console.log(res)
      if (res) {
        if (name1 == "stream") {
          setstream1(res.values)
          setcsedel("");
          setsedel("");
          setdpdel("");
          setsudel("");
          settrdel("");
          setrdel("");

        } else if (name1 == "department") {
          setdepartment1(res.values)
          setcsedel("");
          setsedel("");
          setsudel("");
          settrdel("");
          setrdel("");
          setsustdel("");
          setsstdel("");
        } else if (name1 == "semester") {
          setsemester1(res.values)
          setcstdel("");
          settstdel("");
          settdpdel("");
          setdpdel("");
          setsudel("");
          settrdel("");
          setrdel("");

        } else if (name1 == "subject") {
          setsubject1(res.values)
          settdpdel("");
          setdpdel("");
          settrdel("");
          setrdel("");
        } else if (name1 == "teacher") {
          setteacher1(res.values)
          setcsedel("");
          setsedel("");
          setsudel("");
          setrdel("");
          setsustdel("");
          setsstdel("");
        } else {
          setroom1(res.values)
          setcstdel("");
          setcsedel("");
          settstdel("");
          settdpdel("");
          setsedel("");
          setdpdel("");
          setsudel("");
          settrdel("");
          setsustdel("");
          setsstdel("");
        }
      }
    }
  };


  const deletedata = async (name1 = "", name, val) => {
    if (val == "") {
      alert("First select a value")
    } else {
      let data = {
        database: database,
        value: val,
        name: name,
        name1: name1,
      };

      if (name1 != "") {
        let y = window.confirm("Warning : The table related to this value is also deleted")
        if (y) {
          let a = await fetch("/main", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify(data) })
          let res = await a.json();
          alert("Deleted Successfully");
          setstdel("");
          setsedel("");
          setdpdel("");
          setsudel("");
          settrdel("");
          setrdel("");
          setsstdel("");
          settstdel("");
          settdpdel("");
          setsustdel("");
        }
      }
    }
  };

  const n_t = () => {
    setedittable(false);
    setviewtable(false);
    setdeletetable(false);
    setnewtable(true);
    scroll();
  }

  const e_t = () => {

    setnewtable(false);
    setviewtable(false);
    setdeletetable(false);
    setedittable(true);
    scroll();
  }

  const v_t = () => {
    setedittable(false);
    setnewtable(false);
    setdeletetable(false);
    setviewtable(true);
    scroll();

  };

  const d_t = () => {
    setedittable(false);
    setnewtable(false);
    setviewtable(false);
    setdeletetable(true);
    scroll();
  }

  const scroll = () => {
    setTimeout(() => {
      window.scrollBy({ top: 5000, behavior: "smooth" })
    }, 500);

  }


  useEffect(() => {
    const check = async () => {
      let data = {
        username: database,
      }
      let a = await fetch("/server", { method: "PUT", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
      let res = await a.json()
      if (res.name == "not login user") {
        router.push("/")
      }
    }

    check();


  }, [router,database])



  return (
    <>
      <div className='w-[74vh] sm:w-full '>
        <NavBar nt={n_t} et={e_t} vt={v_t} dt={d_t} database={database} />
        <div className="sm:w-full sm:flex sm:justify-center mt-10  bg-purple-100 pb-10">
          <div className="flex flex-col  sm:flex-row sm:flex-wrap sm:w-[65%] gap-12 mt-10 pt-5 ">
            <div className="self-center flex flex-col gap-7 w-96 p-6 bg-blue-200 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className="block text-2xl font-bold mb-4">Stream</h2>
              <div className="mb-4">
                <input

                  type="text"
                  value={stentry}
                  onChange={(e) => {
                    setstentry(e.target.value)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter stream name"
                />
                <button
                  onClick={() => putdata("stream", "stream", stentry)}
                  className="mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-sm shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className="mb-4">
                <label htmlFor="added-streams" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose stream to delete
                </label>
                <select
                  value={stdel}
                  onClick={() => getdata("stream", "stream")}
                  id="added-streams"
                  onChange={(e) => { setstdel(e.target.value) }}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {stream1.map(stream => <option key={stream} value={stream}>{stream}</option>)}
                </select>
              </div>

              <button
                onClick={() => deletedata("stream", "stream", stdel)}
                className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-sm shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>


            <div className=" self-center w-96 p-6 bg-blue-200 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className="text-2xl font-bold mb-4">Department</h2>
              <div className="mb-4">

                <div className="mb-4">
                  <label htmlFor="added-streams" className="block text-sm font-medium text-gray-700 mb-2">
                    Select a Stream
                  </label>
                  <select
                    onClick={() => getdata("stream", "stream")}
                    id="added-streams"
                    value={cstdel}
                    onChange={(e) => { setcstdel(e.target.value) }}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {stream1.map(stream => (<option key={stream} value={stream}>{stream}</option>))}
                  </select>
                </div>



                <input
                  type="text"
                  onClick={() => {
                    if (cstdel == "") {
                      alert("First select a stream")
                    }
                  }}
                  value={dpentry}
                  onChange={(e) => { setdpentry(e.target.value) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter course name"
                />
                <button
                  onClick={() => putdata("department", cstdel, dpentry)}
                  className="mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-sm shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className="mb-4">
                <label htmlFor="added-Courses" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose department to delete
                </label>
                <select
                  onClick={() => getdata("department", cstdel, "First select a stream")}
                  id="added-Courses"
                  value={dpdel}
                  onChange={(e) => setdpdel(e.target.value)}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {department1.map(course => (<option key={course} value={course}>{course}</option>))}
                </select>
              </div>

              <button
                onClick={() => deletedata("department", cstdel, dpdel)}
                className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-sm shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>


            <div className=" self-center w-96 p-6 bg-blue-200 rounded-lg shadow-lg flex flex-col hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className="text-2xl font-bold mb-4">Semester</h2>
              <div className="mb-4">

                <div className="mb-4">
                  <label htmlFor="added-streams" className="block text-sm font-medium text-gray-700 mb-2">
                    Select a Stream
                  </label>
                  <select
                    onClick={() => getdata("stream", "stream")}
                    id="added-streams"
                    value={sstdel}
                    onChange={(e) => { setsstdel(e.target.value) }}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {stream1.map(stream => (<option key={stream} value={stream}>{stream}</option>))}
                  </select>
                </div>


                <input
                  value={seentry}
                  onChange={(e) => {
                    setseentry(e.target.value)
                  }}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Semester"
                />
                <button
                  onClick={() => putdata("semester", `S${sstdel}`, seentry, "First select a stream")}
                  className="mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-sm shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className="mb-4">
                <label htmlFor="added-streams" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose semester to delete
                </label>
                <select
                  onClick={() => getdata("semester", `S${sstdel}`, "First select a Stream")}
                  id="added-semesters"
                  value={sedel}
                  onChange={(e) => { setsedel(e.target.value) }}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {semester1.map(semester => (<option key={semester} value={semester}>{semester}</option>))}
                </select>
              </div>

              <button
                onClick={() => deletedata("semester", `S${sstdel}`, sedel)}
                className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-sm shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>


            <div className=" self-center w-96 p-6 bg-blue-200 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className="text-2xl font-bold mb-4">Subjects</h2>
              <div className="mb-4">

                <div className="flex gap-3">
                  <div className="mb-4">
                    <label htmlFor="added-streams" className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Stream
                    </label>
                    <select
                      onClick={() => getdata("stream", "stream")}
                      id="added-streams"
                      value={sustdel}
                      onChange={(e) => { setsustdel(e.target.value) }}
                      on
                      className="block w-40 px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {stream1.map(stream => (<option key={stream} value={stream}>{stream}</option>))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="added-streams" className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Semester
                    </label>
                    <select
                      onClick={() => getdata("semester", `S${sustdel}`, "First select a stream")}
                      id="added-streams"
                      value={csedel}
                      onChange={(e) => { setcsedel(e.target.value) }}
                      on
                      className="block w-40 px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {semester1.map(course => (<option key={course} value={course}>{course}</option>))}
                    </select>
                  </div>

                </div>

                <input
                  onClick={() => {
                    if (csedel == "") {
                      alert("First select a semester")
                    }
                  }}
                  value={suentry}
                  onChange={(e) => {
                    setsuentry(e.target.value)
                  }}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter subject name"
                />
                <button
                  onClick={() => putdata("subject", [sustdel, csedel], suentry, "First select a semester")}
                  className="mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-sm shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className="mb-4">
                <label htmlFor="added-streams" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose subject to delete
                </label>
                <select
                  onClick={() => getdata("subject", [sustdel, csedel], "First select a semester")}
                  id="added-subjects"
                  value={sudel}
                  onChange={(e) => setsudel(e.target.value)}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {subject1.map(subject => (<option key={subject} value={subject}>{subject}</option>))}
                </select>
              </div>

              <button
                onClick={() => deletedata([sustdel, csedel], sudel)}
                className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-sm shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>


            <div className=" self-center w-96 p-6 bg-blue-200 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className="text-2xl font-bold mb-4">Teachers</h2>
              <div className="mb-4">

                <div className="flex gap-3">
                  <div className="mb-4">
                    <label htmlFor="added-streams" className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Stream
                    </label>
                    <select
                      onClick={() => getdata("stream", "stream")}
                      id="added-streams"
                      value={tstdel}
                      onChange={(e) => { settstdel(e.target.value) }}
                      on
                      className="block w-40 px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {stream1.map(stream => (<option key={stream} value={stream}>{stream}</option>))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="added-streams" className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Department
                    </label>
                    <select
                      onClick={() => getdata("department", tstdel, "First select a stream")}
                      id="added-streams"
                      value={tdpdel}
                      onChange={(e) => { settdpdel(e.target.value) }}
                      on
                      className="block w-40 px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {department1.map(course => (<option key={course} value={course}>{course}</option>))}
                    </select>
                  </div>

                </div>

                <input
                  value={trentry}
                  onChange={(e) => {
                    settrentry(e.target.value)
                  }}
                  onClick={() => {
                    if (tdpdel == "") {
                      alert("First select a Department")
                    }
                  }}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Teacher name"
                />
                <button
                  onClick={() => putdata("teacher", tdpdel, trentry, "First select a department")}
                  className="mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-sm shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className="mb-4">
                <label htmlFor="added-streams" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose teacher name to delete
                </label>
                <select
                  onClick={() => getdata("teacher", tdpdel, "First select a department")}
                  id="added-teachers"
                  value={trdel}
                  onChange={(e) => { settrdel(e.target.value) }}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {teacher1.map(teacher => (<option key={teacher} value={teacher}>{teacher}</option>))}
                </select>
              </div>

              <button
                onClick={() => deletedata(tdpdel, trdel)}
                className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-sm shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>


            <div className=" self-center w-96 p-6 bg-blue-200 rounded-lg shadow-lg flex flex-col gap-7 hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className="text-2xl font-bold mb-4">Room Numbers</h2>
              <div className="mb-4">
                <input
                  value={rentry}
                  onChange={(e) => {
                    setrentry(e.target.value)
                  }}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a room number"
                />
                <button
                  onClick={() => putdata("room", "room", rentry)}
                  className="mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-sm shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className="mb-4">
                <label htmlFor="added-streams" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose room number to delete
                </label>
                <select
                  onClick={() => getdata("room", "room")}
                  id="added-room number"
                  value={rdel}
                  onChange={(e) => { setrdel(e.target.value) }}
                  className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {room1.map(room => (<option key={room} value={room}>{room}</option>))}
                </select>
              </div>

              <button
                onClick={() => deletedata("room", rdel)}
                className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-sm shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>
          </div >
        </div>
        {newtable && <Table database={database} />}
        {edittable && <Edit database={database} />}
        {viewtable && (<><div className='bg-amber-400 w-full flex flex-wrap gap-10 sm:gap-20 md:gap-20 text-xl p-5 justify-center h-auto'>
          <button onClick={() => { setda(false),setst(false);sets(false); setr(false); sett(false); setd(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-lg sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white" >Department</button>
          <button onClick={() => { setda(false),setst(false);sets(false); setd(false); sett(false); setr(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-lg sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">Room</button>
          <button onClick={() => { setda(false),setst(false);sets(false); setr(false); setd(false); sett(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-lg sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">teacher</button>
          <button onClick={() => { setda(false),setst(false);sett(false); setr(false); setd(false); sets(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-lg sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">semester</button>
          <button onClick={() => { setda(false),sett(false); setr(false); setd(false); sets(false);setst(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-lg sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">stream</button>
          <button onClick={() => { setst(false),sett(false); setr(false); setd(false); sets(false);setda(true); scroll() }} className="border-2 border-amber-500 rounded-2xl p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-base sm:text-lg sm:p-3 sm:rounded-3xl text-black hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">Days</button>
        </div> <div className="">
            {d && <Department database={database} />}
            {r && <Room database={database}/>}
            {t && <Teacher database={database} />}
            {s && <Semester database={database} />}
            {st && <Stream database = {database}/>}
            {da && <Days database = {database}/>}
          </div>
        </>)}
        {deletetable && <Delete database={database} />}
      </div>
    </>
  );
}

