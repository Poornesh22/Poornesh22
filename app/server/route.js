
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const client = new MongoClient(process.env.NEXT_MONGODB_URI);

const db = client.db("test1");
const collection = db.collection("blogs");


export async function POST(request) {
    try{
    let data = await request.json();
    const queary = {
        username: data.username,
        password: data.password
    };
    const data1 = await collection.findOne(queary);
    if (!data1) {
        return NextResponse.json({name : "login unsuccessful"});
    } else {
        await collection.insertOne({username12 : data.username})
        return NextResponse.json({name : "login successful"});
    }
} catch {
    return NextResponse.json({ name: "Something went wrong Connection failed" })
}
}

export async function PUT(request){
    try{
    let data = await request.json();
    const check = await collection.findOne({username12 : data.username})
    if (check){
        await collection.deleteOne({username12 : data.username})
        return NextResponse.json({name : "login user"})
    }else{
        return NextResponse.json({name : "not login user"})
    }
} catch {
    return NextResponse.json({ name: "Something went wrong Connection failed" })
}
}

export async function DELETE(request) {
    try{
    let data = await request.json();
    const queary = {
        username: data.username,
    };
    const data1 = await collection.findOne(queary);
    console.log(data1)
    if (!data1) {
        return NextResponse.json({name : "login unsuccessful"});
    } else {
        return NextResponse.json({name : "login successful"});
    }
} catch {
    return NextResponse.json({ name: "Something went wrong Connection failed" })
}
}