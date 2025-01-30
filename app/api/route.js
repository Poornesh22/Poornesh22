import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.MONGODB_URI)

export async function POST(request) {
  const data = await request.json();
  const db = client.db("Portfolio-Analysis")
  const collection = db.collection("portfolio-data")
  let data1 = await collection.findOne({name : data.name})
  return NextResponse.json(data1.values)
}