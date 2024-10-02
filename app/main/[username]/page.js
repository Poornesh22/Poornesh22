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
      window.scrollBy({ top: 15000, behavior: "smooth" })
    }, 200);

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
      <div className=' rounded-lg sm:w-full '>
        <NavBar nt={n_t} et={e_t} vt={v_t} dt={d_t} database={database} />
        <div className=" rounded-lg w-full flex justify-center sm:mt-10 mt-3  bg-purple-100 pb-10">
          <div className=" rounded-lg flex flex-col  sm:flex-row sm:flex-wrap sm:w-[65%] gap-12 mt-10 pt-5 ">
            <div className=" rounded-lg self-center  w-72 sm:w-96 sm:h-[100vh] md:h-[73vh] p-6 bg-blue-200 shadow-lg hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className=" rounded-lg block text-2xl font-bold mb-4">Stream</h2>
              <div className=" rounded-lg mb-4">
                <input

                  type="text"
                  value={stentry}
                  onChange={(e) => {
                    setstentry(e.target.value)
                  }}
                  className=" rounded-lg w-full mb:mt-5 px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a stream"
                />
                <button
                  onClick={() => putdata("stream", "stream", stentry)}
                  className=" rounded-lg mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className=" rounded-lg mb-4 mb:mt-10">
                <label htmlFor="added-streams" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2 sm:mb-4">
                  choose a stream to delete
                </label>
                <select
                  value={stdel}
                  onClick={() => getdata("stream", "stream")}
                  id="added-streams"
                  onChange={(e) => { setstdel(e.target.value) }}
                  className=" rounded-lg block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {stream1.map(stream => <option key={stream} value={stream}>{stream}</option>)}
                </select>
              </div>

              <button
                onClick={() => deletedata("stream", "stream", stdel)}
                className=" rounded-lg w-full px-4 py-2 bg-red-500 text-white font-semibold shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>


            <div className=" rounded-lg  self-center w-72 sm:w-96 p-6 bg-blue-200 shadow-lg hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className=" rounded-lg text-2xl font-bold mb-4">Department</h2>
              <div className=" rounded-lg mb-4">

                <div className=" rounded-lg mb-4">
                  <label htmlFor="added-streams" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2">
                    Select a Stream
                  </label>
                  <select
                    onClick={() => getdata("stream", "stream")}
                    id="added-streams"
                    value={cstdel}
                    onChange={(e) => { setcstdel(e.target.value) }}
                    className=" rounded-lg block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className=" rounded-lg w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a department"
                />
                <button
                  onClick={() => putdata("department", cstdel, dpentry)}
                  className=" rounded-lg mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className=" rounded-lg mb-4">
                <label htmlFor="added-Courses" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2">
                  choose a department to delete
                </label>
                <select
                  onClick={() => getdata("department", cstdel, "First select a stream")}
                  id="added-Courses"
                  value={dpdel}
                  onChange={(e) => setdpdel(e.target.value)}
                  className=" rounded-lg block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {department1.map(course => (<option key={course} value={course}>{course}</option>))}
                </select>
              </div>

              <button
                onClick={() => deletedata("department", cstdel, dpdel)}
                className=" rounded-lg w-full px-4 py-2 bg-red-500 text-white font-semibold shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>


            <div className=" rounded-lg  self-center w-72 sm:w-96 p-6 bg-blue-200 shadow-lg flex flex-col hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className=" rounded-lg text-2xl font-bold mb-4">Semester</h2>
              <div className=" rounded-lg mb-4">

                <div className=" rounded-lg mb-4">
                  <label htmlFor="added-streams" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2">
                    Select a Stream
                  </label>
                  <select
                    onClick={() => getdata("stream", "stream")}
                    id="added-streams"
                    value={sstdel}
                    onChange={(e) => { setsstdel(e.target.value) }}
                    className=" rounded-lg block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className=" rounded-lg w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a semester"
                />
                <button
                  onClick={() => putdata("semester", `S${sstdel}`, seentry, "First select a stream")}
                  className=" rounded-lg mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className=" rounded-lg mb-4">
                <label htmlFor="added-streams" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2">
                  choose a semester to delete
                </label>
                <select
                  onClick={() => getdata("semester", `S${sstdel}`, "First select a Stream")}
                  id="added-semesters"
                  value={sedel}
                  onChange={(e) => { setsedel(e.target.value) }}
                  className=" rounded-lg block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {semester1.map(semester => (<option key={semester} value={semester}>{semester}</option>))}
                </select>
              </div>

              <button
                onClick={() => deletedata("semester", `S${sstdel}`, sedel)}
                className=" rounded-lg w-full px-4 py-2 bg-red-500 text-white font-semibold shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>


            <div className=" rounded-lg  self-center w-72 sm:w-96 p-6 bg-blue-200 shadow-lg hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className=" rounded-lg text-2xl font-bold mb-4">Subjects</h2>
              <div className=" rounded-lg mb-4">

                <div className=" rounded-lg flex gap-3">
                  <div className=" rounded-lg mb-4">
                    <label htmlFor="added-streams" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2">
                      Select a <br className="sm:hidden" />Stream
                    </label>
                    <select
                      onClick={() => getdata("stream", "stream")}
                      id="added-streams"
                      value={sustdel}
                      onChange={(e) => { setsustdel(e.target.value) }}
                      on
                      className=" rounded-lg block w-28 sm:w-40 px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {stream1.map(stream => (<option key={stream} value={stream}>{stream}</option>))}
                    </select>
                  </div>

                  <div className=" rounded-lg mb-4">
                    <label htmlFor="added-streams" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2">
                      Select a Semester
                    </label>
                    <select
                      onClick={() => getdata("semester", `S${sustdel}`, "First select a stream")}
                      id="added-streams"
                      value={csedel}
                      onChange={(e) => { setcsedel(e.target.value) }}
                      on
                      className=" rounded-lg block w-28 sm:w-40 px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className=" rounded-lg w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter subject name"
                />
                <button
                  onClick={() => putdata("subject", [sustdel, csedel], suentry, "First select a semester")}
                  className=" rounded-lg mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className=" rounded-lg mb-4">
                <label htmlFor="added-streams" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2">
                  choose a subject to delete
                </label>
                <select
                  onClick={() => getdata("subject", [sustdel, csedel], "First select a semester")}
                  id="added-subjects"
                  value={sudel}
                  onChange={(e) => setsudel(e.target.value)}
                  className=" rounded-lg block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {subject1.map(subject => (<option key={subject} value={subject}>{subject}</option>))}
                </select>
              </div>

              <button
                onClick={() => deletedata([sustdel, csedel], sudel)}
                className=" rounded-lg w-full px-4 py-2 bg-red-500 text-white font-semibold shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>


            <div className=" rounded-lg  self-center w-72 sm:w-96  p-6 bg-blue-200 shadow-lg hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className=" rounded-lg text-2xl font-bold mb-4">Teachers</h2>
              <div className=" rounded-lg mb-4">

                <div className=" rounded-lg flex gap-3">
                  <div className=" rounded-lg mb-4">
                    <label htmlFor="added-streams" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2">
                      Select a <br className="sm:hidden" /> Stream
                    </label>
                    <select
                      onClick={() => getdata("stream", "stream")}
                      id="added-streams"
                      value={tstdel}
                      onChange={(e) => { settstdel(e.target.value) }}
                      on
                      className=" rounded-lg block w-28 sm:w-40 px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {stream1.map(stream => (<option key={stream} value={stream}>{stream}</option>))}
                    </select>
                  </div>

                  <div className=" rounded-lg mb-4">
                    <label htmlFor="added-streams" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2">
                      Select a Department
                    </label>
                    <select
                      onClick={() => getdata("department", tstdel, "First select a stream")}
                      id="added-streams"
                      value={tdpdel}
                      onChange={(e) => { settdpdel(e.target.value) }}
                      on
                      className=" rounded-lg block w-28 sm:w-40 px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className=" rounded-lg w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Teacher name"
                />
                <button
                  onClick={() => putdata("teacher", tdpdel, trentry, "First select a department")}
                  className=" rounded-lg mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className=" rounded-lg mb-4">
                <label htmlFor="added-streams" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2">
                  choose a teacher name to delete
                </label>
                <select
                  onClick={() => getdata("teacher", tdpdel, "First select a department")}
                  id="added-teachers"
                  value={trdel}
                  onChange={(e) => { settrdel(e.target.value) }}
                  className=" rounded-lg block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {teacher1.map(teacher => (<option key={teacher} value={teacher}>{teacher}</option>))}
                </select>
              </div>

              <button
                onClick={() => deletedata(tdpdel, trdel)}
                className=" rounded-lg w-full px-4 py-2 bg-red-500 text-white font-semibold shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>


            <div className=" rounded-lg  self-center w-72 sm:w-96  p-6 bg-blue-200 shadow-lg sm:h-[100vh] md:h-[73vh] hover:shadow-xl hover:shadow-blue-500 shadow-blue-600">
              <h2 className=" rounded-lg text-2xl font-bold mb-4">Room Numbers</h2>
              <div className=" rounded-lg mb-4">
                <input
                  value={rentry}
                  onChange={(e) => {
                    setrentry(e.target.value)
                  }}
                  type="text"
                  className=" rounded-lg md:mt-5 w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a room number"
                />
                <button
                  onClick={() => putdata("room", "room", rentry)}
                  className=" rounded-lg mt-2 w-full px-4 py-2 bg-blue-500 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Add
                </button>
              </div>

              <div className=" rounded-lg mb-4 md:mt-10">
                <label htmlFor="added-streams" className=" rounded-lg block text-sm font-medium text-gray-700 mb-2 sm:mb-4">
                  choose a room number to delete
                </label>
                <select
                  onClick={() => getdata("room", "room")}
                  id="added-room number"
                  value={rdel}
                  onChange={(e) => { setrdel(e.target.value) }}
                  className=" rounded-lg block w-full px-3 py-2 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {room1.map(room => (<option key={room} value={room}>{room}</option>))}
                </select>
              </div>

              <button
                onClick={() => deletedata("room", rdel)}
                className=" rounded-lg w-full px-4 py-2 bg-red-500 text-white font-semibold shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>
          </div >
        </div>
        {newtable && <Table scroll={scroll} database={database} />}
        {edittable && <Edit scroll={scroll} database={database} />}
        {viewtable && (<><div className=' rounded-lg bg-amber-400 w-full mb-5 sm:mb-7 flex flex-col gap-5 p-5 text-center h-auto'>
          <h2 className=" rounded-lg font-mono text-black font-bold text-xl [text-shadow:2px_1px_4px_rgba(0,0,0,0.5)]">Click a view point</h2>
          <div className=" rounded-lg flex flex-wrap gap-10 sm:gap-20 md:gap-20 justify-center h-auto">
            <button onClick={() => { setda(false), setst(false); sets(false); setr(false); sett(false); setd(true); scroll() }} className="rounded-full border-2 w-20 sm:w-32 border-amber-500 p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-[11px] sm:text-lg sm:p-3 sml text-gray-800 hover:shadow-blue-600 hover:bg-amber-700 hover:text-white" >Department</button>
            <button onClick={() => { setda(false), setst(false); sets(false); setd(false); sett(false); setr(true); scroll() }} className="rounded-full border-2 w-20 sm:w-32 border-amber-500 p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-xs sm:text-lg sm:p-3 sml text-gray-800 hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">Room</button>
            <button onClick={() => { setda(false), setst(false); sets(false); setr(false); setd(false); sett(true); scroll() }} className="rounded-full border-2 w-20 sm:w-32 border-amber-500 p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-xs sm:text-lg sm:p-3 sml text-gray-800 hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">Teacher</button>
            <button onClick={() => { setda(false), setst(false); sett(false); setr(false); setd(false); sets(true); scroll() }} className="rounded-full border-2 w-20 sm:w-32 border-amber-500 p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-xs sm:text-lg sm:p-3 sml text-gray-800 hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">Semester</button>
            <button onClick={() => { setda(false), sett(false); setr(false); setd(false); sets(false); setst(true); scroll() }} className="rounded-full border-2 w-20 sm:w-32 border-amber-500 p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-xs sm:text-lg sm:p-3 sml text-gray-800 hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">Stream</button>
            <button onClick={() => { setst(false), sett(false); setr(false); setd(false); sets(false); setda(true); scroll() }} className="rounded-full border-2 w-20 sm:w-32 border-amber-500 p-2 shadow-xl shadow-green-800 active:shadow-inner active:shadow-black active:bg-amber-800 active:text-white bg-amber-600 text-xs sm:text-lg sm:p-3 sml text-gray-800 hover:shadow-blue-600 hover:bg-amber-700 hover:text-white">Days</button>
          </div>
        </div> <div className=" rounded-lg mb-5">
            {d && <Department scroll={scroll} database={database} />}
            {r && <Room scroll={scroll} database={database} />}
            {t && <Teacher scroll={scroll} database={database} />}
            {s && <Semester scroll={scroll} database={database} />}
            {st && <Stream scroll={scroll} database={database} />}
            {da && <Days scroll={scroll} database={database} />}
          </div>
        </>)}
        {deletetable && <Delete scroll={scroll} database={database} />}
      </div>
    </>
  );
}

