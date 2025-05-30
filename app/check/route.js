import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const client = new MongoClient(process.env.NEXT_MONGODB_URI);


export async function POST(request) {
    let data = await request.json()
    let db = client.db(data.database);
    let collection = db.collection("clg_data")
    let collection5 = db.collection("Tables")

    if (data.name1 == "stream") {
        let x1 = await collection.findOne({ name: data.value, values: [""] });
        let x2 = await collection.findOne({ name: `S${data.value}`, values: [""] })
        let x4 = await collection5.findOne({ ["name.0"]: data.value })
        if (x1 && x2 && !x4) {
            return NextResponse.json({ name: "clear" })
        } else {
            return NextResponse.json({ name: "not clear" })
        }
    } else if (data.name1 == "department") {
        let x1 = await collection.findOne({ name: data.value, values: [""] })
        let x2 = await collection5.findOne({ ["name.0"]: data.name, ["name.1"]: data.value })
        if (x1 && !x2) {
            return NextResponse.json({ name: "clear" })
        } else {
            return NextResponse.json({ name: "not clear" })
        }
    } else if (data.name1 == "semester") {
        let x1 = await collection.findOne({ ["name.0"]: data.name, ["name.1"]: data.value, values: [""] })
        let x2 = await collection5.findOne({ ["name.0"]: data.name.substring(1), ["name.2"]: data.value })
        if (x1 && !x2) {
            return NextResponse.json({ name: "clear" })
        } else {
            return NextResponse.json({ name: "not clear" })
        }
    } else if(data.name1 == "section"){
        let x1 = await collection5.findOne({ ["name.3"] : data.value})
        if (!x1) {
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
        let x100 = await collection7.findOne({ name: data.name1, values: data.modvalue })
        if (!x100) {
            await collection7.findOneAndUpdate({ name: "stream", values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
            await collection7.findOneAndUpdate({ name: data.orgvalue }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })
            await collection7.findOneAndUpdate({ name: `S${data.orgvalue}` }, { $set: { name: `S${data.modvalue}` } }, { returnDocument: 'after' })
            await collection7.findOneAndUpdate({ ["name.0"]: `S${data.orgvalue}` }, { $set: { "name.0": `S${data.modvalue}` } }, { returnDocument: 'after' })
            await collection.findOneAndUpdate({ name: data.orgvalue }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })
            let x1 = await collection.findOne({ name: "record" })
            for (let i in x1.values) {
                if (x1.values[i][0] == data.orgvalue) {
                    await collection.findOneAndUpdate({ name: "record", values: x1.values[i] }, { $set: { [`values.${i}.0`]: data.modvalue } }, { returnDocument: 'after' })

                    await collection5.findOneAndUpdate({ name: [`S${x1.values[i][0]}`, x1.values[i][2]] }, { $set: { ["name.0"]: `S${data.modvalue}` } }, { returnDocument: 'after' })
                    let x2 = await collection.findOne({ name: x1.values[i] })
                    for (let day in x2) {
                        if (day != "name" && day != "_id" && day != "database") {
                            for (let j = 0; j < x2[day].length; j++) {
                                if (x2[day][j][0] != "" && x2[day][j][1] != "" && x2[day][j][2] != "") {
                                    await collection6.findOneAndUpdate({ name: day, [`${x2[day][j][2]}`]: { $elemMatch: { 0: data.orgvalue } } }, { $set: { [`${x2[day][j][2]}.$[elem].0`]: data.modvalue } }, { arrayFilters: [{ "elem.0": data.orgvalue }], returnDocument: 'after' })
                                    await collection2.findOneAndUpdate({ name: x2[day][j][1], [day]: { $elemMatch: { 0: data.orgvalue } } }, { $set: { [`${day}.$[elem].0`]: data.modvalue } }, { arrayFilters: [{ "elem.0": data.orgvalue }], returnDocument: 'after' })
                                }
                            }
                        }
                    }
                    await collection.findOneAndUpdate({ name: x1.values[i] }, { $set: { "name.0": data.modvalue } }, { returnDocument: 'after' })
                }

            }
            return NextResponse.json({ name: "Edited Successfully" })
        } else {
            return NextResponse.json({ name: "Value Already Exist" })
        }
    } else if (data.name == "department") {
        let x100 = await collection7.findOne({ name: data.name1, values: data.modvalue })
        if (!x100) {
            await collection7.findOneAndUpdate({ name: data.name1, values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
            await collection7.findOneAndUpdate({ name: data.orgvalue }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })
            await collection4.findOneAndUpdate({ name: data.orgvalue }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })
            let x1 = await collection.findOne({ name: "record" })
            for (let i in x1.values) {
                if (x1.values[i][0] == data.name1 && x1.values[i][1] == data.orgvalue) {
                    await collection.findOneAndUpdate({ name: "record", values: x1.values[i] }, { $set: { [`values.${i}.1`]: data.modvalue } }, { returnDocument: 'after' })
                    let x2 = await collection.findOne({ name: x1.values[i] })
                    for (let day in x2) {
                        if (day != "name" && day != "_id" && day != "database") {
                            for (let j = 0; j < x2[day].length; j++) {
                                if (x2[day][j][0] != "" && x2[day][j][1] != "" && x2[day][j][2] != "") {

                                    await collection1.findOneAndUpdate({ name: x2[day][j][2], [`${day}.${j}.0`]: data.orgvalue }, { $set: { [`${day}.${j}.0`]: data.modvalue } }, { returnDocument: 'after' })

                                    await collection5.findOneAndUpdate({ name: [`S${x2.name[0]}`, x2.name[2]], [day]: { $elemMatch: { $elemMatch: { 0: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].0`]: data.modvalue } }, { arrayFilters: [{ "inner.0": data.orgvalue }], returnDocument: 'after' })

                                    await collection.findOneAndUpdate({ name: x2.name[0], [day]: { $elemMatch: { $elemMatch: { 0: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].0`]: data.modvalue } }, { arrayFilters: [{ "inner.0": data.orgvalue }], returnDocument: 'after' })

                                    await collection6.findOneAndUpdate({ name: day, [`${x2[day][j][2]}`]: { $elemMatch: { 1: data.orgvalue } } }, { $set: { [`${x2[day][j][2]}.$[elem].1`]: data.modvalue } }, { arrayFilters: [{ "elem.1": data.orgvalue }], returnDocument: 'after' })

                                    await collection2.findOneAndUpdate({ name: x2[day][j][1], [day]: { $elemMatch: { 1: data.orgvalue } } }, { $set: { [`${day}.$[elem].1`]: data.modvalue } }, { arrayFilters: [{ "elem.1": data.orgvalue }], returnDocument: 'after' })

                                }
                            }
                        }

                    }
                    await collection.findOneAndUpdate({ name: x1.values[i] }, { $set: { "name.1": data.modvalue } }, { returnDocument: 'after' })
                }

            }
            return NextResponse.json({ name: "Edited Successfully" })
        } else {
            return NextResponse.json({ name: "Value Already Exist" })
        }
    } else if (data.name == "semester") {
        let x100 = await collection7.findOne({ name: data.name1, values: data.modvalue })
        if (!x100) {
            await collection7.findOneAndUpdate({ name: data.name1, values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
            await collection7.findOneAndUpdate({ name: [data.name1, data.orgvalue] }, { $set: { "name.1": data.modvalue } }, { returnDocument: 'after' })
            await collection5.findOneAndUpdate({ name: [data.name1, data.orgvalue] }, { $set: { "name.1": data.modvalue } }, { returnDocument: 'after' })
            let x1 = await collection.findOne({ name: "record" })
            for (let i in x1.values) {
                if (x1.values[i][0] == data.name1.substring(1) && x1.values[i][2] == data.orgvalue) {
                    await collection.findOneAndUpdate({ name: "record", values: x1.values[i] }, { $set: { [`values.${i}.2`]: data.modvalue } }, { returnDocument: 'after' })

                    let x2 = await collection.findOne({ name: x1.values[i] })

                    for (let day in x2) {
                        if (day != "name" && day != "_id" && day != "database") {
                            for (let j = 0; j < x2[day].length; j++) {
                                if (x2[day][j][0] != "" && x2[day][j][1] != "" && x2[day][j][2] != "") {

                                    await collection1.findOneAndUpdate({ name: x2[day][j][2], [`${day}.${j}.1`]: data.orgvalue }, { $set: { [`${day}.${j}.1`]: data.modvalue } }, { returnDocument: 'after' })

                                    await collection.findOneAndUpdate({ name: x2.name[0], [day]: { $elemMatch: { $elemMatch: { 1: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].1`]: data.modvalue } }, { arrayFilters: [{ "inner.1": data.orgvalue }], returnDocument: 'after' })

                                    await collection6.findOneAndUpdate({ name: day, [`${x2[day][j][2]}`]: { $elemMatch: { 2: data.orgvalue } } }, { $set: { [`${x2[day][j][2]}.$[elem].2`]: data.modvalue } }, { arrayFilters: [{ "elem.2": data.orgvalue }], returnDocument: 'after' })

                                    await collection2.findOneAndUpdate({ name: x2[day][j][1], [day]: { $elemMatch: { 2: data.orgvalue } } }, { $set: { [`${day}.$[elem].2`]: data.modvalue } }, { arrayFilters: [{ "elem.2": data.orgvalue }], returnDocument: 'after' })

                                    await collection4.findOneAndUpdate({ name: x2.name[1], [day]: { $elemMatch: { $elemMatch: { 0: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].0`]: data.modvalue } }, { arrayFilters: [{ "inner.0": data.orgvalue }], returnDocument: 'after' })

                                    await collection7.findOneAndUpdate({name : x2.name[3], [day]: { $elemMatch: { $elemMatch: { 0: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].0`]: data.modvalue } }, { arrayFilters: [{ "inner.0": data.orgvalue }], returnDocument: 'after' })}

                            }
                        }

                    }
                    await collection.findOneAndUpdate({ name: x1.values[i] }, { $set: { "name.2": data.modvalue } }, { returnDocument: 'after' })
                }

            }
            return NextResponse.json({ name: "Edited Successfully" })
        } else {
            return NextResponse.json({ name: "Value Already Exist" })
        }

    } else if (data.name == "section") {
        let x100 = await collection7.findOne({ name: data.name1, values: data.modvalue })
        if (!x100) {
            await collection7.findOneAndUpdate({ name: data.name1, values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
            await collection4.findOneAndUpdate({ name: data.orgvalue }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })
            let x1 = await collection.findOne({ name: "record" })
            for (let i in x1.values) {
                if (x1.values[i][1] == data.name1 && x1.values[i][3] == data.orgvalue) {

                    await collection.findOneAndUpdate({ name: "record", values: x1.values[i] }, { $set: { [`values.${i}.3`]: data.modvalue } }, { returnDocument: 'after' })

                    let x2 = await collection.findOne({ name: x1.values[i] })

                    for (let day in x2) {
                        if (day != "name" && day != "_id" && day != "database") {
                            for (let j = 0; j < x2[day].length; j++) {
                                if (x2[day][j][0] != "" && x2[day][j][1] != "" && x2[day][j][2] != "") {

                                    await collection5.findOneAndUpdate({ name: [`S${x2.name[0]}`, x2.name[2]], [day]: { $elemMatch: { $elemMatch: { 1: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].1`]: data.modvalue } }, { arrayFilters: [{ "inner.1": data.orgvalue }], returnDocument: 'after' })

                                    await collection.findOneAndUpdate({ name: x2.name[0], [day]: { $elemMatch: { $elemMatch: { 2: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].2`]: data.modvalue } }, { arrayFilters: [{ "inner.2": data.orgvalue }], returnDocument: 'after' })

                                    await collection6.findOneAndUpdate({ name: day, [`${x2[day][j][2]}`]: { $elemMatch: { 3: data.orgvalue } } }, { $set: { [`${x2[day][j][2]}.$[elem].3`]: data.modvalue } }, { arrayFilters: [{ "elem.3": data.orgvalue }], returnDocument: 'after' })

                                    await collection2.findOneAndUpdate({ name: x2[day][j][1], [day]: { $elemMatch: { 3: data.orgvalue } } }, { $set: { [`${day}.$[elem].3`]: data.modvalue } }, { arrayFilters: [{ "elem.3": data.orgvalue }], returnDocument: 'after' })

                                    await collection4.findOneAndUpdate({ name: x2.name[1], [day]: { $elemMatch: { $elemMatch: { 1: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].1`]: data.modvalue } }, { arrayFilters: [{ "inner.1": data.orgvalue }], returnDocument: 'after' })

                                }
                            }
                        }

                    }

                    await collection.findOneAndUpdate({ name: x1.values[i] }, { $set: { "name.3": data.modvalue } }, { returnDocument: 'after' })
                }

            }
            return NextResponse.json({ name: "Edited Successfully" })
        } else {
            return NextResponse.json({ name: "Value Already Exist" })
        }

    } else if (data.name == "subject") {
        let x100 = await collection7.findOne({ name: data.name1, values: data.modvalue })
        if (!x100) {
            await collection7.findOneAndUpdate({ name: data.name1, values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
            let x1 = await collection.findOne({ name: "record" })
            for (let i in x1.values) {
                if (x1?.values[i][0] == data.name1[0].substring(1) && x1?.values[i][2] == data.name1[1]) {
                    let x2 = await collection.findOne({ name: x1?.values[i] })
                    if (x2) {
                        for (let day in x2) {
                            if (day != "name" && day != "_id" && day != "database") {
                                for (let j = 0; j < x2[day].length; j++) {
                                    if (x2[day][j][0] != "" && x2[day][j][1] != "" && x2[day][j][2] != "") {

                                        await collection5.findOneAndUpdate({ name: [`S${x2.name[0]}`, x2.name[2]], [day]: { $elemMatch: { $elemMatch: { 1: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].1`]: data.modvalue } }, { arrayFilters: [{ "inner.1": data.orgvalue }], returnDocument: 'after' })

                                        await collection.findOneAndUpdate({ name: x2.name[0], [day]: { $elemMatch: { $elemMatch: { 2: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].2`]: data.modvalue } }, { arrayFilters: [{ "inner.2": data.orgvalue }], returnDocument: 'after' })

                                        await collection.findOneAndUpdate({ name: x1.values[i], [`${day}.${j}.0`]: data.orgvalue }, { $set: { [`${day}.${j}.0`]: data.modvalue } }, { returnDocument: 'after' });

                                        await collection6.findOneAndUpdate({ name: day, [`${x2[day][j][2]}`]: { $elemMatch: { 3: data.orgvalue } } }, { $set: { [`${x2[day][j][2]}.$[elem].3`]: data.modvalue } }, { arrayFilters: [{ "elem.3": data.orgvalue }], returnDocument: 'after' })

                                        await collection2.findOneAndUpdate({ name: x2[day][j][1], [day]: { $elemMatch: { 3: data.orgvalue } } }, { $set: { [`${day}.$[elem].3`]: data.modvalue } }, { arrayFilters: [{ "elem.3": data.orgvalue }], returnDocument: 'after' })

                                        await collection4.findOneAndUpdate({ name: x2.name[1], [day]: { $elemMatch: { $elemMatch: { 1: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].1`]: data.modvalue } }, { arrayFilters: [{ "inner.1": data.orgvalue }], returnDocument: 'after' })

                                        await collection7.findOneAndUpdate({name : x2.name[3], [day]: { $elemMatch: { $elemMatch: { 1: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].1`]: data.modvalue } }, { arrayFilters: [{ "inner.1": data.orgvalue }], returnDocument: 'after' })
                                    }

                                }
                            }

                        }
                    }

                }

            }
            return NextResponse.json({ name: "Edited Successfully" })
        } else {
            return NextResponse.json({ name: "Value Already Exist" })
        }
    } else if (data.name == "teacher") {
        let x100 = await collection7.findOne({ name: data.name1, values: data.modvalue })
        if (!x100) {
            await collection7.findOneAndUpdate({ name: data.name1, values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })
            let x1 = await collection.findOne({ name: "record" })
            for (let i in x1.values) {
                if (x1?.values[i][1] == data.name1) {
                    let x2 = await collection.findOne({ name: x1?.values[i] })
                    if (x2) {
                        for (let day in x2) {
                            if (day != "name" && day != "_id" && day != "database") {
                                for (let j = 0; j < x2[day].length; j++) {
                                    if (x2[day][j][0] != "" && x2[day][j][1] != "" && x2[day][j][2] != "") {
                                        await collection5.findOneAndUpdate({ name: [`S${x2.name[0]}`, x2.name[2]], [day]: { $elemMatch: { $elemMatch: { 2: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].2`]: data.modvalue } }, { arrayFilters: [{ "inner.2": data.orgvalue }], returnDocument: 'after' })

                                        await collection.findOneAndUpdate({ name: x2.name[0], [day]: { $elemMatch: { $elemMatch: { 3: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].3`]: data.modvalue } }, { arrayFilters: [{ "inner.3": data.orgvalue }], returnDocument: 'after' })

                                        await collection.findOneAndUpdate({ name: x1.values[i], [`${day}.${j}.1`]: data.orgvalue }, { $set: { [`${day}.${j}.1`]: data.modvalue } }, { returnDocument: 'after' });

                                        await collection6.findOneAndUpdate({ name: day, [`${x2[day][j][2]}`]: { $elemMatch: { 4: data.orgvalue } } }, { $set: { [`${x2[day][j][2]}.$[elem].4`]: data.modvalue } }, { arrayFilters: [{ "elem.4": data.orgvalue }], returnDocument: 'after' })

                                        await collection2.findOneAndUpdate({ name: data.orgvalue }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })

                                        await collection2.findOneAndUpdate({ name: "even_records", [`${day}.${j}`]: data.orgvalue }, { $set: { [`${day}.${j}.$`]: data.modvalue } }, { returnDocument: 'after' })

                                        await collection2.findOneAndUpdate({ name: "odd_records", [`${day}.${j}`]: data.orgvalue }, { $set: { [`${day}.${j}.$`]: data.modvalue } }, { returnDocument: 'after' })

                                        await collection1.findOneAndUpdate({ name: x2[day][j][2], [`${day}.${j}.2`]: data.orgvalue }, { $set: { [`${day}.${j}.2`]: data.modvalue } }, { returnDocument: 'after' })

                                        await collection4.findOneAndUpdate({ name: x2.name[1], [day]: { $elemMatch: { $elemMatch: { 2: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].2`]: data.modvalue } }, { arrayFilters: [{ "inner.2": data.orgvalue }], returnDocument: 'after' })

                                        await collection7.findOneAndUpdate({name : x2.name[3], [day]: { $elemMatch: { $elemMatch: { 2: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].2`]: data.modvalue } }, { arrayFilters: [{ "inner.2": data.orgvalue }], returnDocument: 'after' })

                                    }
                                }
                            }

                        }
                    }

                }

            }
            return NextResponse.json({ name: "Edited Successfully" })
        } else {
            return NextResponse.json({ name: "Value Already Exist" })
        }
    } else if (data.name == "room") {
        let x100 = await collection7.findOne({ name: data.name1, values: data.modvalue })
        if (!x100) {
            await collection7.findOneAndUpdate({ name: data.name1, values: data.orgvalue }, { $set: { "values.$": data.modvalue } }, { returnDocument: 'after' })

            let x1 = await collection.findOne({ name: "record" })

            for (let i in x1.values) {

                let x2 = await collection.findOne({ name: x1?.values[i] })
                if (x2) {

                    for (let day in x2) {

                        if (day != "name" && day != "_id" && day != "database") {

                            for (let j = 0; j < x2[day].length; j++) {

                                if (x2[day][j][0] != "" && x2[day][j][1] != "" && x2[day][j][2] != "") {

                                    await collection5.findOneAndUpdate({ name: [`S${x2.name[0]}`, x2.name[2]], [day]: { $elemMatch: { $elemMatch: { 3: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].3`]: data.modvalue } }, { arrayFilters: [{ "inner.3": data.orgvalue }], returnDocument: 'after' })

                                    await collection.findOneAndUpdate({ name: x2.name[0], [day]: { $elemMatch: { $elemMatch: { 4: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].4`]: data.modvalue } }, { arrayFilters: [{ "inner.4": data.orgvalue }], returnDocument: 'after' })

                                    await collection.findOneAndUpdate({ name: x1.values[i], [`${day}.${j}.2`]: data.orgvalue }, { $set: { [`${day}.${j}.2`]: data.modvalue } }, { returnDocument: 'after' });

                                    await collection6.findOneAndUpdate({ name: day }, { $rename: { [data.orgvalue]: data.modvalue } }, { returnDocument: 'after' })

                                    await collection2.findOneAndUpdate({ name: x2[day][j][1], [day]: { $elemMatch: { 4: data.orgvalue } } }, { $set: { [`${day}.$[elem].4`]: data.modvalue } }, { arrayFilters: [{ "elem.4": data.orgvalue }], returnDocument: 'after' })

                                    await collection3.findOneAndUpdate({ name: "even_records", [`${day}.${j}`]: data.orgvalue }, { $set: { [`${day}.${j}.$`]: data.modvalue } }, { returnDocument: 'after' })

                                    await collection3.findOneAndUpdate({ name: "odd_records", [`${day}.${j}`]: data.orgvalue }, { $set: { [`${day}.${j}.$`]: data.modvalue } }, { returnDocument: 'after' })

                                    await collection1.findOneAndUpdate({ name: data.orgvalue }, { $set: { name: data.modvalue } }, { returnDocument: 'after' })

                                    await collection4.findOneAndUpdate({ name: x2.name[1], [day]: { $elemMatch: { $elemMatch: { 3: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].3`]: data.modvalue } }, { arrayFilters: [{ "inner.3": data.orgvalue }], returnDocument: 'after' })

                                    await collection7.findOneAndUpdate({name : x2.name[3], [day]: { $elemMatch: { $elemMatch: { 3: data.orgvalue } } } }, { $set: { [`${day}.$[].$[inner].3`]: data.modvalue } }, { arrayFilters: [{ "inner.3": data.orgvalue }], returnDocument: 'after' })

                                }
                            }
                        }

                    }
                }

            }
            return NextResponse.json({ name: "Edited Successfully" })
        } else {
            return NextResponse.json({ name: "Value Already Exist" })
        }
    }
}

export async function DELETE() {
    let db = client.db("test1");
    let collection = db.collection("blogs");
    let a = await collection.countDocuments();
    if (a === 2) {
        return NextResponse.json({ value: "1" })

    } else {
        return NextResponse.json({ value: "0" })
    }
}