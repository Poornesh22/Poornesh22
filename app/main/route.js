import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const client = new MongoClient(process.env.NEXT_MONGODB_URI);

export async function POST(request) {
    try {
        let data1 = await request.json();
        const db = client.db(data1.database);
        const collection = db.collection(data1.collection);
        const course_d = await collection.findOne({ name: data1.name });
        if (course_d) {
            return NextResponse.json(course_d)
        } else {
            return NextResponse.json({ values: [""] })
        }
    } catch {
        return NextResponse.json({ values: ["Something went wrong Connection failed"] })
    }
}

export async function PUT(request) {
    try{
    let data = await request.json()
    let db = client.db(data.database)
    let collection = db.collection("clg_data")
    let collection1 = db.collection("room_table")
    let collection2 = db.collection("teacher_table")
    let collection3 = db.collection("department_table")
    let collection4 = db.collection("semester_table")
    let collection5 = db.collection("Tables")
    let collection6 = db.collection("day_tables")
    let f1 = 0;
    const ch = await collection.findOne({ name: data.name })
    if (ch) {
        let che = await collection.findOne({name : data.name,  values: data.value })
        if (!che) {
            await collection.updateOne({ name: data.name }, { $push: { values: data.value } })
        } else {
            f1 = f1 + 1;
        }
    }

    if (data.name1 == "room") {
        await collection1.insertOne({ name: data.value, Monday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], Tuesday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], Wednesday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], Thursday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], Friday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], Saturday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], })
        await collection6.updateOne({ name: "Monday" }, { $set: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })
        await collection6.updateOne({ name: "Tuesday" }, { $set: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })
        await collection6.updateOne({ name: "Wednesday" }, { $set: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })
        await collection6.updateOne({ name: "Thursday" }, { $set: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })
        await collection6.updateOne({ name: "Friday" }, { $set: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })
        await collection6.updateOne({ name: "Saturday" }, { $set: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })

    } else if (data.name1 == "teacher") {
        await collection2.insertOne({ name: data.value, Monday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], Tuesday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], Wednesday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], Thursday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], Friday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], Saturday: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]], })
    } else if (data.name1 == "department") {
        await collection.insertOne({ name: data.value, values: [" "]})
        await collection3.insertOne({ name: data.value, Monday: [[], [], [], [], [], [], [], [], [], [], [], []], Tuesday: [[], [], [], [], [], [], [], [], [], [], [], []], Wednesday: [[], [], [], [], [], [], [], [], [], [], [], []], Thursday: [[], [], [], [], [], [], [], [], [], [], [], []], Friday: [[], [], [], [], [], [], [], [], [], [], [], []], Saturday: [[], [], [], [], [], [], [], [], [], [], [], []], })
    } else if (data.name1 == "semester") {
        await collection.insertOne({ name: [data.name,data.value], values: [""]})
        await collection4.insertOne({ name: [data.name, data.value], Monday: [[], [], [], [], [], [], [], [], [], [], [], []], Tuesday: [[], [], [], [], [], [], [], [], [], [], [], []], Wednesday: [[], [], [], [], [], [], [], [], [], [], [], []], Thursday: [[], [], [], [], [], [], [], [], [], [], [], []], Friday: [[], [], [], [], [], [], [], [], [], [], [], []], Saturday: [[], [], [], [], [], [], [], [], [], [], [], []], })
    } else if (data.name1 == "stream") {
        await collection.insertOne({ name: data.value, values: [""] })
        await collection.insertOne({ name: `S${data.value}`, values: [""] })
        await collection5.insertOne({ name: data.value, Monday: [[], [], [], [], [], [], [], [], [], [], [], []], Tuesday: [[], [], [], [], [], [], [], [], [], [], [], []], Wednesday: [[], [], [], [], [], [], [], [], [], [], [], []], Thursday: [[], [], [], [], [], [], [], [], [], [], [], []], Friday: [[], [], [], [], [], [], [], [], [], [], [], []], Saturday: [[], [], [], [], [], [], [], [], [], [], [], []], })

    }
    if (f1 === 0) {
        return NextResponse.json({ name: "Added successfully" })
    } else {
        return NextResponse.json({ name: "Already exist" })
    }
} catch {
    return NextResponse.json({ name: "Something went wrong Connection failed" })
}
}

export async function DELETE(request) {
    try{
    let data = await request.json();
    const db = client.db(data.database);
    let collection = db.collection("clg_data")
    let collection1 = db.collection("room_table")
    let collection2 = db.collection("teacher_table")
    let collection3 = db.collection("department_table")
    let collection4 = db.collection("semester_table")
    let collection5 = db.collection("Tables")
    let collection6 = db.collection("day_tables")
    if (data.name1 == "stream") {
        await collection.updateOne({ name: data.name }, { $pull: { values: data.value } })
        await collection.deleteOne({ name: data.value })
        await collection.deleteOne({ name: `S${data.value}` })
        await collection5.deleteOne({ name: data.value })
    } else if (data.name1 == "semester") {
        await collection.updateOne({ name: data.name }, { $pull: { values: data.value } })
        await collection.deleteOne({ name : [data.name, data.value] })
        await collection4.deleteOne({ name: [data.name, data.value]})
    } else if(data.name1 == "department"){
        await collection.updateOne({name : data.name}, {$pull : {values : data.value}})
        await collection.deleteOne({name : data.value})
        await collection3.deleteOne({ name: data.value})
    } else if(data.name1 == "room"){
        await collection.updateOne({ name: data.name }, { $pull: { values: data.value } })
        await collection1.deleteOne({ name: data.value})
        await collection6.updateOne({ name: "Monday" }, { $unset: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })
        await collection6.updateOne({ name: "Tuesday" }, { $unset: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })
        await collection6.updateOne({ name: "Wednesday" }, { $unset: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })
        await collection6.updateOne({ name: "Thursday" }, { $unset: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })
        await collection6.updateOne({ name: "Friday" }, { $unset: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })
        await collection6.updateOne({ name: "Saturday" }, { $unset: { [`${data.value}`]: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]] } })

    } else if(data.name1 == "teacher"){
        await collection.updateOne({ name: data.name }, { $pull: { values: data.value } })
        await collection2.deleteOne({ name: data.value})

    }else {
        await collection.updateOne({ name: data.name }, { $pull: { values: data.value } })
    }
    return NextResponse.json({ name: "Deleted Successfully" })
} catch {
    return NextResponse.json({ name: "Something went wrong Connection failed" })
}
}