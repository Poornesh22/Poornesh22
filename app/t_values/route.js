import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const client = new MongoClient(process.env.NEXT_MONGODB_URI);

export async function POST(request) {
    try {
        let data = await request.json();
        let db = client.db(data.database);
        if (data.name == "room") {
            let collection = db.collection("room_records");
            const data1 = await collection.findOne({ name: "records" })
            return NextResponse.json(data1)
        } else {
            let collection1 = db.collection("teacher_table");
            const data1 = await collection1.findOne({ name: "records" });
            return NextResponse.json(data1)
        }
    } catch {
        return NextResponse.json({ values: ["Something went wrong Connection failed"] })
    }
}

export async function PUT(request) {
    let data = await request.json();
    let db = client.db(data.database);
    let collection = db.collection("Tables");
    let collection1 = db.collection("room_table");
    let collection2 = db.collection("teacher_table");
    let collection3 = db.collection("room_records");
    let collection4 = db.collection("department_table");
    let collection5 = db.collection("semester_table");
    let collection6 = db.collection("day_tables");
    let c12 = await collection.findOne(data);
    if (!c12) {
        await collection.insertOne(data)
        for (let day in data) {
            if (day != "name" && day != "database") {
                for (let i = 0; i < data[day].length; i++) {
                    if (data[day][i][2] != "" && data[day][i][1] != "" && data[day][i][0] != "") {
                        await collection3.updateOne({ name: "records" }, { $push: { [`${day}.${i}`]: data[day][i][2] } })
                        await collection2.updateOne({ name: "records" }, { $push: { [`${day}.${i}`]: data[day][i][1] } })
                        await collection1.updateOne({ name: data[day][i][2] }, { $set: { [`${day}.${i}`]: [data.name[1], data.name[2], data[day][i][1]] } })
                        await collection2.updateOne({ name: data[day][i][1] }, { $set: { [`${day}.${i}`]: [data.name[2], data[day][i][0], data[day][i][2]] } })
                        await collection4.updateOne({ name: data.name[1] }, { $push: { [`${day}.${i}`]: [data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                        await collection5.updateOne({ name: [`S${data.name[0]}`, data.name[2]] }, { $push: { [`${day}.${i}`]: [data.name[1], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                        await collection.updateOne({ name: data.name[0] }, { $push: { [`${day}.${i}`]: [data.name[1], data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                        await collection6.updateOne({ name: day }, { $set: { [`${data[day][i][2]}.${i}`]: [data.name[0], data.name[1], data.name[2], data[day][i][0], data[day][i][1]] } })
                    }
                    else {
                        await collection.updateOne({ name: data.name }, { $set: { [`${day}.${i}`]: ["", "", ""] } })
                    }
                }
            }

        }
        return NextResponse.json({ name: "successful" })
    }
    return NextResponse.json({ name: "unsuccessful" })
}


export async function DELETE(request) {
    let data = await request.json();
    let db = client.db(data.database);
    let collection = db.collection("Tables");
    let collection1 = db.collection("room_table");
    let collection2 = db.collection("teacher_table");
    let collection3 = db.collection("room_records");
    let collection4 = db.collection("department_table");
    let collection5 = db.collection("semester_table");
    let collection6 = db.collection("day_tables");
    console.log(data)

    const data1 = await collection.findOne({ name: data.name })
    console.log(data1)

    await collection.deleteOne({ name: data.name })
    for (let day in data) {
        if (day != "name" && day != "database" && day != "_id") {
            for (let i = 0; i < data[day].length; i++) {
                if (data[day][i][2] != "" && data[day][i][1] != "" && data[day][i][0] != "") {
                    await collection3.updateOne({ name: "records" }, { $pull: { [`${day}.${i}`]: data[day][i][2] } })
                    await collection2.updateOne({ name: "records" }, { $pull: { [`${day}.${i}`]: data[day][i][1] } })
                    await collection1.updateOne({ name: data[day][i][2] }, { $set: { [`${day}.${i}`]: ["", "", ""] } })
                    await collection2.updateOne({ name: data[day][i][1] }, { $set: { [`${day}.${i}`]: ["", "", ""] } })
                    await collection4.updateOne({ name: data.name[1] }, { $pull: { [`${day}.${i}`]: [data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                    await collection5.updateOne({ name: [`S${data.name[0]}`, data.name[2]] }, { $pull: { [`${day}.${i}`]: [data.name[1], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                    await collection.updateOne({ name: data.name[0] }, { $pull: { [`${day}.${i}`]: [data.name[1], data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                    await collection6.updateOne({ name: day }, { $set: { [`${data[day][i][2]}.${i}`]: ["", "", "", "", ""] } })

                }
            }
        }

    }
    return NextResponse.json({ name: "successful" })
}


