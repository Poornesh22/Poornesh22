import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.NEXT_MONGODB_URI);

const db = client.db("test1");
const collection = db.collection("blogs");


export async function PUT(request) {
    try{
    let data = await request.json();
    const query1 = {
        username: data.username
    }
    const data2 = await collection.findOne(query1);
    if (!data2) {
        const query = {
            name: data.name,
            college_name: data.clg_name,
            DOB: data.DOB,
            phone_number: data.mobile,
            username: data.username,
            password: data.password
        }
        const data1 = await collection.insertOne(query);
        let x = client.db(data.username);
        let y = await x.createCollection("clg_data");
        await y.insertMany([{ name: "stream", values: [""] }, { name: "room", values: [" "] }]);
        let z = await x.createCollection("room_records");
        await z.insertOne({ name: "records", Monday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], Tuesday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], Wednesday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], Thursday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], Friday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], Saturday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], })
        await x.createCollection("Tables");
        let a = await x.createCollection("teacher_table");
        await a.insertOne({ name: "records", Monday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], Tuesday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], Wednesday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], Thursday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], Friday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], Saturday: [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""], [""]], })
        await x.createCollection("room_table");
        await x.createCollection("department_table");
        await x.createCollection("semester_table");
        let b = await x.createCollection("day_tables");
        await b.insertOne({ name: "Monday" });
        await b.insertOne({ name: "Tuesday" });
        await b.insertOne({ name: "Wednesday" });
        await b.insertOne({ name: "Thursday" });
        await b.insertOne({ name: "Friday" });
        await b.insertOne({ name: "Saturday" });
        return NextResponse.json({ msg: "Account Created Successfully" })
    } else {
        return NextResponse.json({ msg: "Account is already exist." })
    }
}catch{
     return NextResponse.json({msg: "Something went wrong Connection failed"})
}

}


export async function POST(request) {
    let data = await request.json();
    const query = {
        name: data.name,
        college_name: data.clg_name,
        DOB: data.DOB,
        phone_number: data.mobile
    };

    let data1 = await collection.findOne(query);
    return NextResponse.json(data1)

}

export async function DELETE(request) {
    let data = await request.json()
    await collection.deleteOne({ username: data.database });
    let db1 = client.db(data.database);
    await db1.dropDatabase();
    return NextResponse.json({ name: "successful" })
}