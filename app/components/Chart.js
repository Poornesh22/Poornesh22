"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required components
ChartJS.register(
  CategoryScale, // x-axis category scale
  LinearScale, // y-axis linear scale
  PointElement, // points in the chart
  LineElement, // line in the chart
  Title, // chart title
  Tooltip, // tooltip functionality
  Legend // legend functionality
);

const Chart = ({ label }) => {
  const [chartdata, setChartdata] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const call = async () => {
      try {
        let data = {
          name: "portfolio",
        };
        let response = await fetch("/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // Fixed "header" -> "headers"
          body: JSON.stringify(data),
        });
        let res = await response.json();

        if (!res || res.length === 0 || !res[0].growth) {
          console.error("Invalid API response", res);
          return;
        }

        let data1 = res[0].growth;
        let data2 = data1.map((item) => item.date);

        const chartData1 = {
          labels: data2,
          datasets: [
            {
              label: label,
              data: data1.map((item) => item.value),
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
              tension: 0.4, // smooth curve
            },
          ],
        };

        const options = {
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
            title: { display: true, text: label },
          },
        };

        setChartdata(chartData1);
        setOptions(options);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    call();
  }, [label]); // ✅ Include label as a dependency to avoid stale closures

  return (
      <div className="w-[180vw] h-auto sm:w-[60vw]">
        {chartdata && options && <Line data={chartdata} options={options} />}
      </div>
  );
};

export default Chart;
