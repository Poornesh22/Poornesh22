import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const url = "mongodb://localhost:27017/"
const client = new MongoClient(url);

export async function POST(request){
    let data = await request.json();
    let db = client.db(data.database);
    let collection = db.collection(data.collection);
    const data1 = await collection.findOne({name : data.name})
    return NextResponse.json(data1);
}