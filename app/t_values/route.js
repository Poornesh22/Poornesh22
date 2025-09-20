import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const client = new MongoClient(process.env.NEXT_MONGODB_URI);

export async function POST(request) {
    try {
        let data = await request.json();
        let db = client.db(data.database);
        if (data.name == "room") {
            let collection = db.collection("room_records");
            if (data.rec === "even") {
                const data1 = await collection.findOne({ name: "even_records" })
                return NextResponse.json(data1)
            } else {
                const data1 = await collection.findOne({ name: "odd_records" })
                return NextResponse.json(data1)
            }
        } else {
            let collection1 = db.collection("teacher_table");
            if (data.rec === "even") {
                const data1 = await collection1.findOne({ name: "even_records" });
                return NextResponse.json(data1)
            } else {
                const data1 = await collection1.findOne({ name: "odd_records" });
                return NextResponse.json(data1)
            }
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
    let collection7 = db.collection("section_table");
    delete data._id; 
    let c12 = await collection.findOne({name : data.name});

if (!c12) {
    // ✅ Safe insert with upsert (no duplicate key error)
    await collection.updateOne(
        { name: data.name },       // filter by a unique field (e.g., name)
        { $set: data },            // update with new data
        { upsert: true }           // insert if not exists
    );

    await collection.updateOne(
        { name: "record" },
        { $push: { values: data.name } },
        { upsert: true }
    );

    let str1 = data.name[2];
    let match1 = str1.match(/\d+$/);

    if (parseInt(match1[0]) % 2 === 0) {
        for (let day in data) {
            if (day !== "name" && day !== "database") {
                for (let i = 0; i < data[day].length; i++) {
                    if (data[day][i][2] !== "" && data[day][i][1] !== "" && data[day][i][0] !== "") {
                        let c = 0;
                        let x1 = data[day][i][1];
                        let x2 = x1.split("+");
                        for (let j = 0; j < data[day][i][1].length; j++) {
                            if (x1[j] === "+") c += 1;
                        }
                        for (let k = 0; k <= c; k++) {
                            x2[k] = x2[k].trim();
                            await collection2.updateOne(
                                { name: "even_records" },
                                { $push: { [`${day}.${i}`]: x2[k] } },
                                { upsert: true }
                            );
                            await collection2.updateOne(
                                { name: x2[k] },
                                { $set: { [`${day}.${i}`]: [data.name[0], data.name[1], data.name[2], data.name[3], data[day][i][0], data[day][i][2]] } },
                                { upsert: true }
                            );
                        }

                        await collection1.updateOne(
                            { name: data[day][i][2] },
                            { $set: { [`${day}.${i}`]: [data.name[1], data.name[2], x1] } },
                            { upsert: true }
                        );
                        await collection6.updateOne(
                            { name: day },
                            { $set: { [`${data[day][i][2]}.${i}`]: [data.name[0], data.name[1], data.name[2], data.name[3], data[day][i][0], x1] } },
                            { upsert: true }
                        );
                        await collection.updateOne(
                            { name: data.name[0] },
                            { $push: { [`${day}.${i}`]: [data.name[1], data.name[2], data.name[3], data[day][i][0], x1, data[day][i][2]] } },
                            { upsert: true }
                        );
                        await collection5.updateOne(
                            { name: [`S${data.name[0]}`, data.name[2]] },
                            { $push: { [`${day}.${i}`]: [data.name[1], data.name[3], data[day][i][0], x1, data[day][i][2]] } },
                            { upsert: true }
                        );
                        await collection4.updateOne(
                            { name: data.name[1] },
                            { $push: { [`${day}.${i}`]: [data.name[2], data.name[3], data[day][i][0], x1, data[day][i][2]] } },
                            { upsert: true }
                        );
                        await collection3.updateOne(
                            { name: "even_records" },
                            { $push: { [`${day}.${i}`]: data[day][i][2] } },
                            { upsert: true }
                        );
                        await collection7.updateOne(
                            { name: data.name[3] },
                            { $push: { [`${day}.${i}`]: [data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } },
                            { upsert: true }
                        );
                    } else {
                        await collection.updateOne(
                            { name: data.name },
                            { $set: { [`${day}.${i}`]: ["", "", ""] } },
                            { upsert: true }
                        );
                    }
                }
            }
        }
    } else {
        for (let day in data) {
            if (day !== "name" && day !== "database") {
                for (let i = 0; i < data[day].length; i++) {
                    if (data[day][i][2] !== "" && data[day][i][1] !== "" && data[day][i][0] !== "") {
                        let c = 0;
                        let x1 = data[day][i][1];
                        let x2 = x1.split("+");
                        for (let j = 0; j < data[day][i][1].length; j++) {
                            if (x1[j] === "+") c += 1;
                        }
                        for (let k = 0; k <= c; k++) {
                            x2[k] = x2[k].trim();
                            if (parseInt(match1[0]) === 11) {
                                await collection2.updateOne(
                                    { name: "even_records" },
                                    { $push: { [`${day}.${i}`]: x2[k] } },
                                    { upsert: true }
                                );
                            } else {
                                await collection2.updateOne(
                                    { name: "odd_records" },
                                    { $push: { [`${day}.${i}`]: x2[k] } },
                                    { upsert: true }
                                );
                            }
                            await collection2.updateOne(
                                { name: x2[k] },
                                { $set: { [`${day}.${i}`]: [data.name[0], data.name[1], data.name[2], data.name[3], data[day][i][0], data[day][i][2]] } },
                                { upsert: true }
                            );
                        }

                        await collection1.updateOne(
                            { name: data[day][i][2] },
                            { $set: { [`${day}.${i}`]: [data.name[1], data.name[2], x1] } },
                            { upsert: true }
                        );
                        await collection6.updateOne(
                            { name: day },
                            { $set: { [`${data[day][i][2]}.${i}`]: [data.name[0], data.name[1], data.name[2], data.name[3], data[day][i][0], x1] } },
                            { upsert: true }
                        );
                        await collection.updateOne(
                            { name: data.name[0] },
                            { $push: { [`${day}.${i}`]: [data.name[1], data.name[2], data.name[3], data[day][i][0], x1, data[day][i][2]] } },
                            { upsert: true }
                        );
                        await collection5.updateOne(
                            { name: [`S${data.name[0]}`, data.name[2]] },
                            { $push: { [`${day}.${i}`]: [data.name[1], data.name[3], data[day][i][0], x1, data[day][i][2]] } },
                            { upsert: true }
                        );
                        await collection4.updateOne(
                            { name: data.name[1] },
                            { $push: { [`${day}.${i}`]: [data.name[2], data.name[3], data[day][i][0], x1, data[day][i][2]] } },
                            { upsert: true }
                        );
                        if (parseInt(match1[0]) === 11) {
                            await collection3.updateOne(
                                { name: "even_records" },
                                { $push: { [`${day}.${i}`]: data[day][i][2] } },
                                { upsert: true }
                            );
                        } else {
                            await collection3.updateOne(
                                { name: "odd_records" },
                                { $push: { [`${day}.${i}`]: data[day][i][2] } },
                                { upsert: true }
                            );
                        }
                        await collection7.updateOne(
                            { name: data.name[3] },
                            { $push: { [`${day}.${i}`]: [data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } },
                            { upsert: true }
                        );
                    } else {
                        await collection.updateOne(
                            { name: data.name },
                            { $set: { [`${day}.${i}`]: ["", "", ""] } },
                            { upsert: true }
                        );
                    }
                }
            }
        }
    }

    return NextResponse.json({ name: "successful" });
}
return NextResponse.json({ name: "unsuccessful" });



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
    let collection7 = db.collection("section_table");

    const data1 = await collection.findOne({ name: data.name })

    if (data1) {
        await collection.deleteOne({ name: data.name })
        await collection.updateOne({ name: "record" }, { $pull: { values: data.name } })
        let str1 = data.name[2];
        let match1 = str1.match(/\d+$/);
        if (parseInt(match1[0]) % 2 === 0) {
            for (let day in data) {
                if (day != "name" && day != "database" && day != "_id") {
                    for (let i = 0; i < data[day].length; i++) {
                        if (data[day][i][2] != "" && data[day][i][1] != "" && data[day][i][0] != "") {
                            let c = 0
                            let x1 = data[day][i][1]
                            let x2 = x1.split("+")
                            for (let j = 0; j < data[day][i][1].length; j++) {
                                if (x1[j] == "+") {
                                    c += 1
                                }
                            }
                            for (let k = 0; k <= c; k++) {
                                x2[k] = x2[k].trim()
                                await collection2.updateOne({ name: "even_records" }, { $pull: { [`${day}.${i}`]: x2[k] } })
                                await collection2.updateOne({ name: x2[k] }, { $set: { [`${day}.${i}`]: ["", "", "", "", "", ""] } })

                            }

                            await collection3.updateOne({ name: "even_records" }, { $pull: { [`${day}.${i}`]: data[day][i][2] } })

                            await collection1.updateOne({ name: data[day][i][2] }, { $set: { [`${day}.${i}`]: ["", "", ""] } })

                            await collection4.updateOne({ name: data.name[1] }, { $pull: { [`${day}.${i}`]: [data.name[2], data.name[3], data[day][i][0], data[day][i][1], data[day][i][2]] } })

                            await collection5.updateOne({ name: [`S${data.name[0]}`, data.name[2]] }, { $pull: { [`${day}.${i}`]: [data.name[1], data.name[3], data[day][i][0], data[day][i][1], data[day][i][2]] } })

                            await collection.updateOne({ name: data.name[0] }, { $pull: { [`${day}.${i}`]: [data.name[1], data.name[2], data.name[3], data[day][i][0], data[day][i][1], data[day][i][2]] } })

                            await collection7.updateOne({ name: data.name[3] }, { $pull: { [`${day}.${i}`]: [data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } })

                            await collection6.updateOne({ name: day }, { $set: { [`${data[day][i][2]}.${i}`]: ["", "", "", "", "", ""] } })


                        }
                    }
                }

            }
        } else {
            for (let day in data) {
                if (day != "name" && day != "database" && day != "_id") {
                    for (let i = 0; i < data[day].length; i++) {
                        if (data[day][i][2] != "" && data[day][i][1] != "" && data[day][i][0] != "") {
                            let c = 0
                            let x1 = data[day][i][1]
                            let x2 = x1.split("+")
                            for (let j = 0; j < data[day][i][1].length; j++) {
                                if (x1[j] == "+") {
                                    c += 1
                                }
                            }
                            for (let k = 0; k <= c; k++) {
                                x2[k] = x2[k].trim()
                                if (parseInt(match1[0]) === 11) {
                                    await collection2.updateOne({ name: "even_records" }, { $pull: { [`${day}.${i}`]: x2[k] } })
                                } else {
                                    await collection2.updateOne({ name: "odd_records" }, { $pull: { [`${day}.${i}`]: x2[k] } })
                                }
                                await collection2.updateOne({ name: x2[k] }, { $set: { [`${day}.${i}`]: ["", "", "", "", "", ""] } })

                            }
                            if (parseInt(match1[0]) === 11) {
                                await collection3.updateOne({ name: "even_records" }, { $pull: { [`${day}.${i}`]: data[day][i][2] } })
                            } else {
                                await collection3.updateOne({ name: "odd_records" }, { $pull: { [`${day}.${i}`]: data[day][i][2] } })
                            }

                            await collection1.updateOne({ name: data[day][i][2] }, { $set: { [`${day}.${i}`]: ["", "", ""] } })

                            await collection4.updateOne({ name: data.name[1] }, { $pull: { [`${day}.${i}`]: [data.name[2], data.name[3], data[day][i][0], data[day][i][1], data[day][i][2]] } })

                            await collection5.updateOne({ name: [`S${data.name[0]}`, data.name[2]] }, { $pull: { [`${day}.${i}`]: [data.name[1], data.name[3], data[day][i][0], data[day][i][1], data[day][i][2]] } })

                            await collection.updateOne({ name: data.name[0] }, { $pull: { [`${day}.${i}`]: [data.name[1], data.name[2], data.name[3], data[day][i][0], data[day][i][1], data[day][i][2]] } })

                            await collection7.updateOne({ name: data.name[3] }, { $pull: { [`${day}.${i}`]: [data.name[2], data[day][i][0], data[day][i][1], data[day][i][2]] } })

                            await collection6.updateOne({ name: day }, { $set: { [`${data[day][i][2]}.${i}`]: ["", "", "", "", "", ""] } })


                        }
                    }
                }

            }
        }
        return NextResponse.json({ name: "successful" })
    } else {
        return NextResponse.json({ name: "unsuccessful" })
    }
}


