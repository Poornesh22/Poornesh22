"use client"
export default function Sidebar({ updates }) {
    return (
      <div className="bg-teal-200 p-4">
        <h2 className="text-2xl underline font-semibold">Market Updates</h2>
        <ul>
          {updates.map((update, index) => (
            <li key={index} className="py-2 border-b">
              {update.update} - {update.date}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  