"use client"
export default function MetricsCard({ title, value, description }) {
    return (
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg text-amber-600 font-semibold">{title}</h3>
        <p className="text-2xl font-bold text-green-500">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    );
};
  