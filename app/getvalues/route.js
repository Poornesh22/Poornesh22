import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.NEXT_MONGODB_URI)

export async function POST(request) {
    const data = await request.json();
    const db = client.db(data.database);
    let collection = db.collection("Tables");

    if (data.name1 === "section") {

        const arr = { Monday: [[], [], [], [], [], [], [], [], [], [], [], []], Tuesday: [[], [], [], [], [], [], [], [], [], [], [], []], Wednesday: [[], [], [], [], [], [], [], [], [], [], [], []], Thursday: [[], [], [], [], [], [], [], [], [], [], [], []], Friday: [[], [], [], [], [], [], [], [], [], [], [], []], Saturday: [[], [], [], [], [], [], [], [], [], [], [], []], };

        let data1 = await collection.findOne({ name: "record" });

        for (let i in data1.values) {

            if (data1.values[i][3] === data.name) {

                let data2 = await collection.findOne({ name: data1.values[i] });

                for (let day in data2) {

                    if (day != "_id" && day != "database" && day != "name") {

                        for (let j = 0; j < data2[day].length; j++) {

                            if (data2[day][j][0] != "" && data2[day][j][1] != "" && data2[day][j][2] != "") {

                                arr[day][j].push([data2.name[0], data2.name[1], data2.name[2], data2[day][j][0], data2[day][j][1], data2[day][j][2]])
                            }
                        }
                    }
                }
            }
        }

        return NextResponse.json(arr);
    } else if (data.name1 === "stream") {
        const arr = { Monday: [[], [], [], [], [], [], [], [], [], [], [], []], Tuesday: [[], [], [], [], [], [], [], [], [], [], [], []], Wednesday: [[], [], [], [], [], [], [], [], [], [], [], []], Thursday: [[], [], [], [], [], [], [], [], [], [], [], []], Friday: [[], [], [], [], [], [], [], [], [], [], [], []], Saturday: [[], [], [], [], [], [], [], [], [], [], [], []] }

        let data1 = await collection.findOne({ name: "record" });

        for (let i in data1.values) {

            if (data1.values[i][0] === data.name) {

                let data2 = await collection.findOne({ name: data1.values[i] });

                for (let day in data2) {

                    if (day != "_id" && day != "database" && day != "name") {

                        for (let j = 0; j < data2[day].length; j++) {

                            if (data2[day][j][0] != "" && data2[day][j][1] != "" && data2[day][j][2] != "") {

                                arr[day][j].push([data2.name[1], data2.name[2], data2.name[3], data2[day][j][0], data2[day][j][1], data2[day][j][2]])
                            }
                        }
                    }
                }
            }
        }

        return NextResponse.json(arr);

    } else if (data.name1 === "department") {

        const arr = { Monday: [[], [], [], [], [], [], [], [], [], [], [], []], Tuesday: [[], [], [], [], [], [], [], [], [], [], [], []], Wednesday: [[], [], [], [], [], [], [], [], [], [], [], []], Thursday: [[], [], [], [], [], [], [], [], [], [], [], []], Friday: [[], [], [], [], [], [], [], [], [], [], [], []], Saturday: [[], [], [], [], [], [], [], [], [], [], [], []] }

        let data1 = await collection.findOne({ name: "record" });

        for (let i in data1.values) {

            if (data1.values[i][1] === data.name) {

                let data2 = await collection.findOne({ name: data1.values[i] });

                for (let day in data2) {

                    if (day != "_id" && day != "database" && day != "name") {

                        for (let j = 0; j < data2[day].length; j++) {

                            if (data2[day][j][0] != "" && data2[day][j][1] != "" && data2[day][j][2] != "") {

                                arr[day][j].push([data2.name[0], data2.name[2], data2.name[3], data2[day][j][0], data2[day][j][1], data2[day][j][2]])
                            }
                        }
                    }
                }
            }
        }

        return NextResponse.json(arr);

    } else if (data.name1 === "semester") {

        const arr = { Monday: [[], [], [], [], [], [], [], [], [], [], [], []], Tuesday: [[], [], [], [], [], [], [], [], [], [], [], []], Wednesday: [[], [], [], [], [], [], [], [], [], [], [], []], Thursday: [[], [], [], [], [], [], [], [], [], [], [], []], Friday: [[], [], [], [], [], [], [], [], [], [], [], []], Saturday: [[], [], [], [], [], [], [], [], [], [], [], []] }

        let data1 = await collection.findOne({ name: "record" });

        for (let i in data1.values) {

            if (data1.values[i][2] === data.name) {

                let data2 = await collection.findOne({ name: data1.values[i] });

                for (let day in data2) {

                    if (day != "_id" && day != "database" && day != "name") {

                        for (let j = 0; j < data2[day].length; j++) {

                            if (data2[day][j][0] != "" && data2[day][j][1] != "" && data2[day][j][2] != "") {

                                arr[day][j].push([data2.name[1], data2.name[3], data2[day][j][0], data2[day][j][1], data2[day][j][2]])
                            }
                        }
                    }
                }
            }
        }

        return NextResponse.json(arr);

    } else if (data.name1 === "room") {
        const arr = { Monday: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]], Tuesday: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]], Wednesday: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]], Thursday: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]], Friday: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]], Saturday: [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]], }

        let data1 = await collection.findOne({ name: "record" });
        

        for (let i in data1.values) {
            

            let data2 = await collection.findOne({ name: data1.values[i] });
       

            for (let day in data2) {

                if (day != "_id" && day != "database" && day != "name") {

                    for (let j = 0; j < data2[day].length; j++) {

                        if (data2[day][j][0] != "" && data2[day][j][1] != "" && data2[day][j][2] != "") {

                            if (data2[day][j][2] === data.name) {
                                arr[day][j] = [data2.name[0], data2.name[1], data2.name[2], data2[day][j][0], data2[day][j][1]]
                            }
                        }
                    }
                }
            }
        }

        return NextResponse.json(arr);

    } else if (data.name1 === "teacher") {
        const arr = { Monday: [["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""]], Tuesday: [["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""]], Wednesday: [["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""]], Thursday: [["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""]], Friday: [["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""]], Saturday: [["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""], ["", "", "", "", "", ""]], }

        let data1 = await collection.findOne({ name: "record" });
        

        for (let i in data1.values) {
            

            let data2 = await collection.findOne({ name: data1.values[i] });
            

            for (let day in data2) {

                if (day != "_id" && day != "database" && day != "name") {

                    for (let j = 0; j < data2[day].length; j++) {

                        if (data2[day][j][0] != "" && data2[day][j][1] != "" && data2[day][j][2] != "") {

                            let c = 0
                            let x1 = data2[day][j][1]
                            let x2 = x1.split("+")
                            for (let j = 0; j < x1.length; j++) {
                                if (x1[j] == "+") {
                                    c += 1
                                }
                            }
                            for (let k = 0; k <= c; k++) {
                                x2[k] = x2[k].trim()
                                if (x2[k] === data.name) {
                                    arr[day][j] = [data2.name[0], data2.name[1], data2.name[2], data2.name[3], data2[day][j][0], data2[day][j][2]]
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log("arr", arr)
        return NextResponse.json(arr);
    } else {
        const record = []
        const arr = {}

        let data1 = await collection.findOne({ name: "record" });

        for (let i in data1.values) {

            let data2 = await collection.findOne({ name: data1.values[i] });

            for (let day in data2) {

                if (day === data.name) {

                    for (let j = 0; j < data2[day].length; j++) {

                        if (data2[day][j][0] != "" && data2[day][j][1] != "" && data2[day][j][2] != "") {

                            if (!record.includes(data2[day][j][2])) {
                                record.push(data2[day][j][2])
                                arr[data2[day][j][2]] = Array(12).fill(["", "", "", "", "", ""])
                                arr[data2[day][j][2]][j] = [data2.name[0], data2.name[1], data2.name[2], data2.name[3], data2[day][j][0], data2[day][j][1]]
                            } else {
                                arr[data2[day][j][2]][j] = [data2.name[0], data2.name[1], data2.name[2], data2.name[3], data2[day][j][0], data2[day][j][1]]
                            }
                        }
                    }
                }
            }
        }
        return NextResponse.json(arr);
    }

}