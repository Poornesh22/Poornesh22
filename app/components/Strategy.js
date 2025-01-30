"use client"
import React from 'react'

const Strategy = (data) => {
  let data1 = data.data


  if (!data) return <div>Loading...</div>

  return (
    <>
      <div>
        <h2 className='text-5xl p-5 m-2 bg-lime-500 rounded-3xl text-center font-bold'>Strategies</h2>
        <div className='w-screen h-screen overflow-x-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent'>
          <table>
            <thead>
              <tr className='border border-black'>
                <th className='border border-black'>Strategy Name</th>
                <th className='border border-black'>Rate of Interest (ROI) in %</th>
                <th className='border border-black'>Compound Annual Growth Rate (CAGR) in %</th>
                <th className='border border-black'>Drawdown Percentage</th>
                <th className='border border-black'>Description</th>
              </tr>
            </thead>
            <tbody className='border bprder-black'>
              {data1.map((item, index) => (
                <tr key={index} className='border border-black'>
                  <td className='text-center border border-blue-500'>{item.strategy_name}</td>
                  <td className='text-center border border-blue-500'>{item.roi}</td>
                  <td className='text-center border border-blue-500'>{item.cagr}</td>
                  <td className='text-center border border-blue-500'>{item.drawdown}</td>
                  <td className='text-center border border-blue-500'>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default Strategy
