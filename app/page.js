"use client";

import { useEffect, useState } from "react";
import Chart from "./components/Chart";
import MetricsCard from "./components/MetricsCard";
import Sidebar from "./components/Sidebar";
import Strategy from "./components/Strategy";

export default function Home() {
  const [portfolio, setPortfolio] = useState([""]);
  const [strategies, setStrategies] = useState([""]);
  const [marketUpdates, setMarketUpdates] = useState([""]);

  useEffect(() => {
    const call = async () => {
      let data1 = {
        name: "portfolio",
      }
      let data2 = {
        name: "Strategy",
      }
      let data3 = {
        name: "daily-update",
      }
      let a = await fetch("/api", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data1) })
      let res = await a.json()

      let a1 = await fetch("/api", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data2) })
      let res1 = await a1.json()

      let a2 = await fetch("/api", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data3) })
      let res2 = await a2.json()

      setPortfolio(res[0]);
      setStrategies(res1);
      setMarketUpdates(res2);
    }

    call();


  }, [])

  if (!portfolio) return <p>Loading...</p>;

  return (
    <>
      <div className="p-2 flex flex-col items-center h-auto sm:grid sm:grid-cols-4 sm:gap-4 ">
        <div className="sm:col-span-3">
          <h1 className="text-4xl font-bold mb-4">Portfolio Analytics</h1>
          <div className="w-screen h-96 sm:h-auto overflow-x-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent sm:overflow-hidden">
            <Chart label="Portfolio Growth" />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 mb-5 sm:grid-cols-3">
            <MetricsCard title="Total Value" value={`$${portfolio.total_value}`} description="Portfolio total value" />
            <MetricsCard title="Daily P&L" value={`$${portfolio.daily_pl}`} description="Today's profit/loss" />
          </div>
        </div>
        <div className="hidden sm:block sm:col-span-1">
          <Sidebar updates={marketUpdates} />
        </div>
        <div className="block sm:hidden">
          <Sidebar updates={marketUpdates} />
        </div>
        <div className="w-fit h-screen">
          <Strategy data={strategies} />
        </div>
      </div>
    </>
  );
}
