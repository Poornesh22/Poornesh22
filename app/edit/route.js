import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.NEXT_MONGODB_URI)


export async function POST(request) {
    try {
        let data = await request.json();
        let db = client.db(data.database);
        let collection = db.collection("Tables");
        const data1 = await collection.findOne({ name: data.name })
        if (data1) {
            return NextResponse.json(data1);
        } else {
            return NextResponse.json({ name: "not" })
        }
    } catch {
        return NextResponse.json({ name: "Something went wrong Connection failed" })
    }
}

export async function PUT(request) {
    try {
        let data = await request.json();
        let db = client.db(data.database);
        let collection = db.collection("Tables");
        let collection1 = db.collection("room_table");
        let collection2 = db.collection("teacher_table");
        let collection3 = db.collection("room_records");
        let collection4 = db.collection("department_table");
        let collection5 = db.collection("semester_table");
        let collection6 = db.collection("day_tables");
        const data1 = await collection.findOne({ name: data.name })
        for (let day in data1) {
            if (day != "name" && day != "database" && day != "_id") {
                for (let i = 0; i < data1[day].length; i++) {
                    if (data1[day][i][0] != data[day][i][0] || data1[day][i][1] != data[day][i][1] || data1[day][i][2] != data[day][i][2]) {
                        if ((data[day][i][0] == "" && data[day][i][1] == " " && data[day][i][2] == " " ) || (data[day][i][0] != "" && data[day][i][1] != "" && data[day][i][1] != " " && data[day][i][2] != "" && data[day][i][2] != " ")) {
                            console.log(data[day][i])

                            await collection.updateOne({ name: data.name }, { $set: { [`${day}.${i}`]: [data[day][i][0], data[day][i][1], data[day][i][2]] } })
                            if (data1[day][i][0] != "" && data[day][i][0] == "") {
                                await collection4.updateOne({ name: data1.name[1] }, { $pull: { [`${day}.${i}`]: [data1.name[2], data1[day][i][0], data1[day][i][1], data1[day][i][2]] } })
                                await collection5.updateOne({ name: [`S${data.name[0]}`, data.name[2]] }, { $pull: { [`${day}.${i}`]: [data1.name[1], data1[day][i][0], data1[day][i][1], data1[day][i][2]] } })
                                await collection.updateOne({ name: data1.name[0] }, { $pull: { [`${day}.${i}`]: [data1.name[1], data1.name[2], data1[day][i][0], data1[day][i][1], data1[day][i][2]] } })
                                await collection6.updateOne({ name: day }, { $set: { [`${data1[day][i][2]}.${i}`]: ["", "", "", "", ""] } })
                            } else if (data1[day][i][0] == "" && data[day][i][0] != "") {
                                await collection4.updateOne({ name: data.name[1] }, { $push: { [`${day}.${i}`]: [data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                                await collection5.updateOne({ name: [`S${data.name[0]}`, data.name[2]] }, { $push: { [`${day}.${i}`]: [data.name[1], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                                await collection.updateOne({ name: data.name[0] }, { $pull: { [`${day}.${i}`]: [data.name[1], data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                                await collection6.updateOne({ name: day }, { $set: { [`${data[day][i][2]}.${i}`]: [data.name[0], data.name[1], data.name[2], data[day][i][0], data[day][i][1]] } })
                            } else if (data1[day][i][0] != data[day][i][0] || data1[day][i][1] != data[day][i][1] || data1[day][i][2] != data[day][i][2]) {
                                await collection4.updateOne({ name: data1.name[1] }, { $pull: { [`${day}.${i}`]: [data1.name[2], data1[day][i][0], data1[day][i][1], data1[day][i][2]] } })
                                await collection4.updateOne({ name: data.name[1] }, { $push: { [`${day}.${i}`]: [data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                                await collection5.updateOne({ name: [`S${data.name[0]}`, data.name[2]] }, { $pull: { [`${day}.${i}`]: [data1.name[1], data1[day][i][0], data1[day][i][1], data1[day][i][2]] } })
                                await collection5.updateOne({ name: [`S${data.name[0]}`, data.name[2]] }, { $push: { [`${day}.${i}`]: [data.name[1], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                                await collection.updateOne({ name: data1.name[0] }, { $pull: { [`${day}.${i}`]: [data1.name[1], data1.name[2], data1[day][i][0], data1[day][i][1], data1[day][i][2]] } })
                                await collection.updateOne({ name: data.name[0] }, { $pull: { [`${day}.${i}`]: [data.name[1], data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } })
                                await collection6.updateOne({ name: day }, { $set: { [`${data1[day][i][2]}.${i}`]: ["", "", "", "", ""] } })
                                await collection6.updateOne({ name: day }, { $set: { [`${data[day][i][2]}.${i}`]: [data.name[0], data.name[1], data.name[2], data[day][i][0], data[day][i][1]] } })
                            }

                            if (data1[day][i][1] != data[day][i][1]) {
                                if (data1[day][i][1] != "" && data[day][i][1] == "") {
                                    await collection2.updateOne({ name: data1[day][i][1] }, { $set: { [`${day}.${i}`]: ["", "", ""] } })
                                    await collection2.updateOne({ name: "records" }, { $pull: { [`${day}.${i}`]: data1[day][i][1] } })
                                } else if (data1[day][i][1] == "" && data[day][i][1] != "") {
                                    await collection2.updateOne({ name: data[day][i][1] }, { $set: { [`${day}.${i}`]: [data.name[2], data[day][i][0], data[day][i][2]] } })
                                    await collection2.updateOne({ name: "records" }, { $push: { [`${day}.${i}`]: data[day][i][1] } })
                                } else {
                                    await collection2.updateOne({ name: data1[day][i][1] }, { $set: { [`${day}.${i}`]: ["", "", ""] } })
                                    await collection2.updateOne({ name: data[day][i][1] }, { $set: { [`${day}.${i}`]: [data.name[2], data[day][i][0], data[day][i][2]] } })
                                    await collection2.updateOne({ name: "records" }, { $pull: { [`${day}.${i}`]: data1[day][i][1] } })
                                    await collection2.updateOne({ name: "records" }, { $push: { [`${day}.${i}`]: data[day][i][1] } })
                                }
                            }

                            if (data1[day][i][2] != data[day][i][2]) {
                                if (data1[day][i][2] != "" && data[day][i][2] == "") {
                                    await collection1.updateOne({ name: data1[day][i][2] }, { $set: { [`${day}.${i}`]: ["", "", ""] } })
                                    await collection3.updateOne({ name: "records" }, { $pull: { [`${day}.${i}`]: data1[day][i][2] } })
                                } else if (data1[day][i][2] == "" && data[day][i][2] != "") {
                                    await collection1.updateOne({ name: data[day][i][2] }, { $set: { [`${day}.${i}`]: [data.name[1], data.name[2], data[day][i][1]] } })
                                    await collection3.updateOne({ name: "records" }, { $push: { [`${day}.${i}`]: data[day][i][2] } })
                                } else {
                                    await collection1.updateOne({ name: data1[day][i][2] }, { $set: { [`${day}.${i}`]: ["", "", ""] } })
                                    await collection1.updateOne({ name: data[day][i][2] }, { $set: { [`${day}.${i}`]: [data.name[1], data.name[2], data[day][i][1]] } })
                                    await collection3.updateOne({ name: "records" }, { $pull: { [`${day}.${i}`]: data1[day][i][2] } })
                                    await collection3.updateOne({ name: "records" }, { $push: { [`${day}.${i}`]: data[day][i][2] } })
                                }
                            }
                        }
                    }
                }
            }
        }
        return NextResponse.json({values : "Edited Successfully"});
    } catch {
        return NextResponse.json({ values: ["Something went wrong Connection failed"] })
    }

}

export async function DELETE(request) {
    try {
        let data = await request.json();
        let db = client.db(data.database);
        let collection = db.collection("Tables");
        const data1 = await collection.findOne({ name: data.name })
        if (data1) {
            return NextResponse.json({ name: "exist" })
        } else {
            return NextResponse.json({ name: "not exist" })
        }
    } catch {
        return NextResponse.json({ name: "Something went wrong Connection failed" })
    }
}