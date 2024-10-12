import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const client = new MongoClient(process.env.NEXT_MONGODB_URI);


export async function POST(request) {
    let data = await request.json()
    let db = client.db(data.database);
    let collection = db.collection("clg_data")
    let collection5 = db.collection("Tables")

    if (data.name1 == "Stream") {
        let x1 = await collection.findOne({ name: data.value, values: [""] });
        let x2 = await collection.findOne({ name: `S${data.value}`, values: [""] })
        let x4 = await collection5.findOne({ ["name.0"]: data.value })
        if (x1 && x2 && !x4) {
            return NextResponse.json({ name: "clear" })
        } else {
            return NextResponse.json({ name: "not clear" })
        }
    } else if (data.name1 == "department") {
        let x1 = await collection.findOne({ name: data.value, values: [" "] })
        let x2 = await collection5.findOne({ ["name.0"]: data.name, ["name.1"]: data.value })
        if (x1 && !x2) {
            return NextResponse.json({ name: "clear" })
        } else {
            return NextResponse.json({ name: "not clear" })
        }
    } else if (data.name1 == "semester") {
        let x1 = await collection.findOne({ ["name.0"]: data.name, ["name.1"]: data.value, values: [""] })
        let x2 = await collection5.findOne({ ["name.0"]: data.name.substring(1), ["name.2"]: data.value })
        console.log(x1)
        console.log(x2)
        if (x1 && !x2) {
            return NextResponse.json({ name: "clear" })
        } else {
            return NextResponse.json({ name: "not clear" })
        }
    } else if (data.name1 == "subject") {
        let x1 = await collection5.findOne({ name: "record" })
        let x2 = 0;
        for (let i in x1.values) {
            if (x1.values[i][0] == data.name[0].substring(1) && x1.values[i][2] == data.name[1]) {
                let x3 = await collection5.findOne({ name: x1.values[i] })
                for (let day in x3) {
                    if (day != "name" && day != "database" && day != "_id") {
                        for (let j = 0; j < x3[day].length; j++) {
                            if (x3[day][j][0] == data.value) {
                                x2 = x2 + 1
                                break
                            }
                        }
                    }
                }

            }
        }
        if (x2 == 0) {
            return NextResponse.json({ name: "clear" })
        } else {
            return NextResponse.json({ name: "not clear" })
        }
    } else if (data.name1 == "teacher") {
        let x1 = await collection5.findOne({ name: "record" })

        let x2 = 0;
        for (let i in x1.values) {
            if (x1.values[i][1] == data.name) {
                let x3 = await collection5.findOne({ name: x1.values[i] })
                for (let day in x3) {
                    if (day != "name" && day != "database" && day != "_id") {
                        for (let j = 0; j < x3[day].length; j++) {
                            if (x3[day][j][1] == data.value) {
                                x2 = x2 + 1
                                break
                            }
                        }
                    }
                }

            }
        }
        if (x2 == 0) {
            return NextResponse.json({ name: "clear" })
        } else {
            return NextResponse.json({ name: "not clear" })
        }
    } else if (data.name1 == "room") {
        let x1 = await collection5.findOne({ name: "record" })
        let x2 = 0;
        for (let i in x1.values) {
            let x3 = await collection5.findOne({ name: x1.values[i] })
            for (let day in x3) {
                if (day != "name" && day != "database" && day != "_id") {
                    for (let j = 0; j < x3[day].length; j++) {
                        if (x3[day][j][2] == data.value) {
                            x2 = x2 + 1
                            break
                        }
                    }
                }
            }

        }
        if (x2 == 0) {
            return NextResponse.json({ name: "clear" })
        } else {
            return NextResponse.json({ name: "not clear" })
        }
    }

};


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
    let collection7 = db.collection("clg_data");

    if (data.name == "stream") {
        await collection7.findOneAndUpdate({ name: "stream", values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
        await collection7.findOneAndUpdate({ name: data.orgvalue }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })
        await collection7.findOneAndUpdate({ name: `S${data.orgvalue}` }, { $set: { name: `S${data.modvalue}` } }, { returnDocument: 'after' })
        await collection7.findOneAndUpdate({ ["name.0"]: `S${data.orgvalue}` }, { $set: { ["name.0"]: `S${data.modvalue}` } }, { returnDocument: 'after' })
        let x1 = await collection.findOne({ name: "record" })
        for (let i in x1.values) {
            if (x1.values[i][0] == data.orgvalue) {
                await collection.findOneAndUpdate({ name: "record", values: x1.values[i] }, { $set: { [`values.${i}.0`]: data.modvalue } }, { returnDocument: 'after' })
                await collection.findOneAndUpdate({ name: data.orgvalue }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })
                await collection5.findOneAndUpdate({ name: [x1.values[i][0], x1.values[i][2]] }, { $set: { ["name.0"]: data.modvalue } }, { returnDocument: 'after' })
                let x2 = await collection.findOne({ name: x1.values[i] })
                for (let day in x2) {
                    if (day != "name" || day != "_id" || day != "database") {
                        for (let j = 0; j < x2[day].length; j++) {
                            if (x2[day][i][0] != "" && x2[day][i][1] != "" && x2[day][i][2] != "") {
                                await collection6.findOneAndUpdate({ name: day, [`${x2[day][i][2]}.${i}`]: [x2.name[0], x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1]] }, { $set: { [`${x2[day][i][2]}.${i}.$`]: [data.modvalue, x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1]] } }, { returnDocument: 'after' })
                            }
                        }
                    }

                }
                await collection.findOneAndUpdate({ name: x1.values[i] }, { $set: { [`name.0`]: data.modvalue } })
            }

        }
        return NextResponse.json({name : "edited successfully"})
    } else if (data.name == "department") {
        await collection7.findOneAndUpdate({ name: data.name1, values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
        await collection7.findOneAndUpdate({ name: data.orgvalue }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })
        await collection4.findOneAndUpdate({ name: data.orgvalue }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })
        let x1 = await collection.findOne({ name: "record" })
        for (let i in x1.values) {
            if (x1.values[i][0] == data.name1 && x1.values[i][1] == data.orgvalue) {
                await collection.findOneAndUpdate({ name: "record", values: x1.values[i] }, { $set: { [`values.${i}.1`]: data.modvalue } }, { returnDocument: 'after' })
                let x2 = await collection.findOne({ name: x1.values[i] })
                for (let day in x2) {
                    if (day != "name" || day != "_id" || day != "database") {
                        for (let j = 0; j < x2[day].length; j++) {
                            if (x2[day][i][0] != "" && x2[day][i][1] != "" && x2[day][i][2] != "") {
                                await collection5.findOneAndUpdate({ name: [`S${x2.name[0]}`, x2.name[2]], [`${day}.${i}`]: [x2.name[1], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [data.modvalue, x2[day][i][0], x2[day][i][1], x2[day][i][2]] } }, { returnDocument: 'after' })
                                await collection1.findOneAndUpdate({ name: x2[day][i][2] }, { $set: { [`${day}.${i}.1`]: data.modvalue } }, { returnDocument: 'after' })
                                await collection.findOneAndUpdate({ name: x2.name[0], [`${day}.${i}`]: [x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [data.modvalue, x2.name[2], x2[day][i][0], x2[day][i][1], x2[day][i][2]] } }, { returnDocument: 'after' })
                                await collection6.findOneAndUpdate({ name: day, [`${x2[day][i][2]}.${i}`]: [x2.name[0], x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1]] }, { $set: { [`${x2[day][i][2]}.${i}.$`]: [x2.name[0], data.modvalue, x2.name[2], x2[day][i][0], x2[day][i][1]] } }, { returnDocument: 'after' })

                            }
                        }
                    }

                }
                await collection.findOneAndUpdate({ name: x1.values[i] }, { $set: { [`name.1`]: data.modvalue } })
            }

        }
        return NextResponse.json({name : "edited successfully"})
    } else if (data.name == "semester") {
        await collection7.findOneAndUpdate({ name: data.name1, values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
        await collection7.findOneAndUpdate({ name: [data.name1, data.orgvalue] }, { $set: { ["name.1"]: data.modvalue } }, { returnDocument: 'after' })
        let x1 = await collection.findOne({ name: "record" })
        for (let i in x1.values) {
            if (x1.values[i][0] == data.name1.substring(1) && x1.values[i][2] == data.orgvalue) {
                await collection.findOneAndUpdate({ name: "record", values: x1.values[i] }, { $set: { [`values.${i}.2`]: data.modvalue } }, { returnDocument: 'after' })
                let x2 = await collection.findOne({ name: x1.values[i] })
                for (let day in x2) {
                    if (day != "name" || day != "_id" || day != "database") {
                        for (let j = 0; j < x2[day].length; j++) {
                            if (x2[day][i][0] != "" && x2[day][i][1] != "" && x2[day][i][2] != "") {
                                await collection5.findOneAndUpdate({ name: [`S${x2.name[0]}`, x2.name[2]], [`${day}.${i}`]: [x2.name[1], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [data.modvalue, x2[day][i][0], x2[day][i][1], x2[day][i][2]] } }, { returnDocument: 'after' })
                                await collection1.findOneAndUpdate({ name: x2[day][i][2] }, { $set: { [`${day}.${i}.1`]: data.modvalue } }, { returnDocument: 'after' })
                                await collection.findOneAndUpdate({ name: x2.name[0], [`${day}.${i}`]: [x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [x2.name[1], data.modvalue, x2[day][i][0], x2[day][i][1], x2[day][i][2]] } }, { returnDocument: 'after' })
                                await collection6.findOneAndUpdate({ name: day, [`${x2[day][i][2]}.${i}`]: [x2.name[0], x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1]] }, { $set: { [`${x2[day][i][2]}.${i}.$`]: [x2.name[0], data.modvalue, x2.name[2], x2[day][i][0], x2[day][i][1]] } }, { returnDocument: 'after' })
                                await collection2.findOneAndUpdate({ name: x2[day][i][1], [`${day}.${i}`]: [x2.name[2], x2[day][i][0], x2[day][i][2]] }, { $set: { [`${day}.${i}`]: [data.modvalue, x2[day][i][0], x2[day][i][2]] } }, { returnDocument: 'after' })
                                await collection4.findOneAndUpdate({ name: x2.name[1], [`${day}.${i}`]: [x2.name[2], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [data.modvalue, x2[day][i][0], x2[day][i][1], x2[day][i][2]] } }, { returnDocument: 'after' })
                            }
                        }
                    }

                }
                await collection.findOneAndUpdate({ name: x1.values[i] }, { $set: { [`name.2`]: data.modvalue } })
            }

        }
        return NextResponse.json({name : "edited successfully"})

    } else if (data.name == "subject") {
        await collection7.findOneAndUpdate({ name: data.name1, values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
        let x1 = await collection.findOne({ name: "record" })
        for (let i in x1.values) {
            if (x1.values[i][0] == data.name1[0].substring(1) && x1.values[i][2] == data.name[1]) {
                let x2 = await collection.findOne({ name: x1.values[i] })
                for (let day in x2) {
                    if (day != "name" || day != "_id" || day != "database") {
                        for (let j = 0; j < x2[day].length; j++) {
                            if (x2[day][i][0] != "" && x2[day][i][1] != "" && x2[day][i][2] != "") {
                                await collection5.findOneAndUpdate({ name: [`S${x2.name[0]}`, x2.name[2]], [`${day}.${i}`]: [x2.name[1], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [x2.name[1], data.modvalue, x2[day][i][1], x2[day][i][2]] } }, { returnDocument: 'after' })
                                await collection.findOneAndUpdate({ name: x2.name[0], [`${day}.${i}`]: [x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [x2.name[1], x2.name[2], data.modvalue, x2[day][i][1], x2[day][i][2]] } }, { returnDocument: 'after' })
                                await collection6.findOneAndUpdate({ name: day, [`${x2[day][i][2]}.${i}`]: [x2.name[0], x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1]] }, { $set: { [`${x2[day][i][2]}.${i}.$`]: [x2.name[0], x2.name[1], x2.name[2], data.modvalue, x2[day][i][1]] } }, { returnDocument: 'after' })
                                await collection2.findOneAndUpdate({ name: x2[day][i][1], [`${day}.${i}`]: [x2.name[2], x2[day][i][0], x2[day][i][2]] }, { $set: { [`${day}.${i}`]: [x2.name[2], data.modvalue, x2[day][i][2]] } }, { returnDocument: 'after' })
                                await collection4.findOneAndUpdate({ name: x2.name[1], [`${day}.${i}`]: [x2.name[2], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [x2.name[2], data.modvalue, x2[day][i][1], x2[day][i][2]] } }, { returnDocument: 'after' })
                            }
                        }
                    }

                }

            }

        }
        return NextResponse.json({name : "edited successfully"})
    } else if (data.name == "teacher") {
        await collection7.findOneAndUpdate({ name: data.name1, values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
        let x1 = await collection.findOne({ name: "record" })
        for (let i in x1.values) {
            if (x1.values[i][1] == data.name1) {
                let x2 = await collection.findOne({ name: x1.values[i] })
                for (let day in x2) {
                    if (day != "name" || day != "_id" || day != "database") {
                        for (let j = 0; j < x2[day].length; j++) {
                            if (x2[day][i][0] != "" && x2[day][i][1] != "" && x2[day][i][2] != "") {
                                await collection5.findOneAndUpdate({ name: [`S${x2.name[0]}`, x2.name[2]], [`${day}.${i}`]: [x2.name[1], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [x2.name[1], x2[day][i][0], data.modvalue, x2[day][i][2]] } }, { returnDocument: 'after' })
                                await collection.findOneAndUpdate({ name: x2.name[0], [`${day}.${i}`]: [x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [x2.name[1], x2.name[2], x2[day][i][0], data.modvalue, x2[day][i][2]] } }, { returnDocument: 'after' })
                                await collection6.findOneAndUpdate({ name: day, [`${x2[day][i][2]}.${i}`]: [x2.name[0], x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1]] }, { $set: { [`${x2[day][i][2]}.${i}.$`]: [x2.name[0], x2.name[1], x2.name[2], x2[day][i][0], data.modvalue] } }, { returnDocument: 'after' })
                                await collection2.findOneAndUpdate({ name: x2[day][i][1] }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })
                                await collection2.findOneAndUpdate({ name: "records", [`${day}.${i}`]: data[day][i][1] }, { $set: { [`${day}.${i}.$`]: data.modvalue } })
                                await collection1.findOneAndUpdate({ name: x2[day][i][2] }, { $set: { [`${day}.${i}.2`]: data.modvalue } }, { returnDocument: 'after' })
                                await collection4.findOneAndUpdate({ name: x2.name[1], [`${day}.${i}`]: [x2.name[2], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [x2.name[2], x2[day][i][0], data.modvalue, x2[day][i][2]] } }, { returnDocument: 'after' })
                            }
                        }
                    }

                }

            }

        }
        return NextResponse.json({name : "edited successfully"})
    } else if (data.name == "room") {
        await collection7.findOneAndUpdate({ name: data.name1, values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
        let x1 = await collection.findOne({ name: "record" })
        for (let i in x1.values) {
            let x2 = await collection.findOne({ name: x1.values[i] })
            for (let day in x2) {
                if (day != "name" || day != "_id" || day != "database") {
                    for (let j = 0; j < x2[day].length; j++) {
                        if (x2[day][i][0] != "" && x2[day][i][1] != "" && x2[day][i][2] != "") {
                            await collection5.findOneAndUpdate({ name: [`S${x2.name[0]}`, x2.name[2]], [`${day}.${i}`]: [x2.name[1], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [x2.name[1], x2[day][i][0], x2[day][i][1], data.modvalue] } }, { returnDocument: 'after' })
                            await collection.findOneAndUpdate({ name: x2.name[0], [`${day}.${i}`]: [x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [x2.name[1], x2.name[2], x2[day][i][0], x2[day][i][1], data.modvalue] } }, { returnDocument: 'after' })
                            await collection6.findOneAndUpdate({ name: day }, { $rename: { [data.orgvalue]: data.modvalue } }, { returnDocument: 'after' })
                            await collection2.findOneAndUpdate({ name: x2[day][i][1], [`${day}.${i}`]: [x2.name[2], x2[day][i][0], x2[day][i][2]] }, { $set: { [`${day}.${i}`]: [x2.name[2], x2[day][i][0], data.modvalue] } }, { returnDocument: 'after' })
                            await collection3.findOneAndUpdate({ name: "records", [`${day}.${i}`]: data[day][i][2] }, { $set: { [`${day}.${i}.$`]: data.modvalue } })
                            await collection1.findOneAndUpdate({ name: x2[day][i][2] }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })
                            await collection4.findOneAndUpdate({ name: x2.name[1], [`${day}.${i}`]: [x2.name[2], x2[day][i][0], x2[day][i][1], x2[day][i][2]] }, { $set: { [`${day}.${i}.$`]: [x2.name[2], x2[day][i][0], x2[day][i][1], data.modvalue] } }, { returnDocument: 'after' })
                        }
                    }
                }

            }

        }
        return NextResponse.json({name : "edited successfully"})
    }
}