"use client"
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Days = (props) => {
    var database = props.database;

    const [room1, setroom1] = useState(["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
    const [columns, setcolumns] = useState(12);
    const [rval, setrval] = useState("");
    const [dptable, setdptable] = useState(false);
    const [table1, settable1] = useState([""]);

    // Excel Export Function
    const exportTableToExcel = () => {
        const table = document.getElementById('table-to-excel');
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });
        XLSX.writeFile(workbook, `${rval}_Daily_Schedule.xlsx`);
    };

    // Standard PDF Export Function for Daily Schedule
    const exportTableToPDF = () => {
        if (!dptable || !table1) {
            alert("No table data to export!");
            return;
        }

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a4'
        });

        // Daily schedule header styling
        doc.setFontSize(24);
        doc.setTextColor(128, 0, 128);
        doc.text(`${rval} - Daily Room Schedule`, 40, 40);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Date: ${rval}`, 40, 70);
        doc.text(`All Room Occupancy Overview`, 40, 85);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 40, 100);

        // Prepare table headers
        const headers = ['Room/Periods'];
        for (let i = 1; i <= columns; i++) {
            headers.push(`Period ${i}`);
        }

        // Prepare table body with daily schedule data structure
        const body = [];
        Object.entries(table1)
            .filter(([days, value]) => days !== "name" && days !== "database" && days !== "_id")
            .forEach(([room, values]) => {
                const row = [room];
                values.forEach((allvalues) => {
                    let cellContent = '';
                    if (Array.isArray(allvalues)) {
                        // Daily schedule data: filter out empty entries and format with "/"
                        const filteredData = [];
                        allvalues.forEach((val, index) => {
                            if (val && val.trim()) {
                                if ((index + 1) % 6 === 0) {
                                    filteredData.push(val);
                                } else {
                                    filteredData.push(val + ' /');
                                }
                            }
                        });
                        cellContent = filteredData.join(' ');
                    }
                    row.push(cellContent || '');
                });
                body.push(row);
            });

        // Generate PDF table with daily schedule styling
        autoTable(doc, {
            head: [headers],
            body: body,
            startY: 120,
            styles: {
                fontSize: 7,
                cellPadding: 3,
                overflow: 'linebreak',
                halign: 'center',
                valign: 'middle',
                lineColor: [128, 128, 128],
                lineWidth: 0.5,
            },
            headStyles: {
                fillColor: [128, 0, 128], // Purple for daily schedule
                textColor: [255, 255, 255],
                fontSize: 9,
                fontStyle: 'bold',
                halign: 'center',
                cellPadding: 5,
            },
            bodyStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 6,
                cellPadding: 2,
            },
            alternateRowStyles: {
                fillColor: [248, 248, 255],
            },
            columnStyles: {
                0: {
                    fillColor: [229, 204, 255],
                    fontStyle: 'bold',
                    halign: 'center',
                    cellWidth: 60,
                }
            },
            margin: { top: 120, right: 15, bottom: 15, left: 15 },
            tableWidth: 'auto',
            theme: 'grid',
            didDrawPage: function (data) {
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                
                doc.setFontSize(8);
                doc.setTextColor(100);
                doc.text(
                    `Page ${data.pageNumber} | ${rval} Schedule`,
                    pageSize.width - 100,
                    pageHeight - 20
                );
                
                doc.setDrawColor(128, 0, 128);
                doc.line(15, pageHeight - 30, pageSize.width - 15, pageHeight - 30);
            }
        });

        doc.save(`${rval}_Daily_Room_Schedule.pdf`);
    };

    // Advanced PDF Export for Daily Schedule with Enhanced Features
    const exportAdvancedPDF = () => {
        if (!dptable || !table1) {
            alert("No table data to export!");
            return;
        }

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a3'
        });

        // Professional daily schedule header
        doc.setFillColor(128, 0, 128);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 100, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(36);
        doc.text('DAILY FACILITY UTILIZATION REPORT', 40, 60);

        // Daily schedule information section
        doc.setFillColor(229, 204, 255);
        doc.rect(0, 100, doc.internal.pageSize.getWidth(), 60, 'F');
        
        doc.setTextColor(128, 0, 128);
        doc.setFontSize(22);
        doc.text(`Day: ${rval}`, 40, 130);
        doc.setFontSize(14);
        doc.text(`Complete Room Occupancy Overview`, 40, 150);
        doc.setFontSize(12);
        doc.text(`Facility Management Report Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 40, 165);

        // Prepare table data
        const headers = ['Room/Periods'];
        for (let i = 1; i <= columns; i++) {
            headers.push(`Period ${i}`);
        }

        const body = [];
        let totalRooms = 0;
        let totalSlots = 0;
        let occupiedSlots = 0;
        const roomUtilization = {};

        Object.entries(table1)
            .filter(([days, value]) => days !== "name" && days !== "database" && days !== "_id")
            .forEach(([room, values]) => {
                const row = [room];
                totalRooms++;
                let roomOccupied = 0;
                
                values.forEach((allvalues) => {
                    let cellContent = '';
                    totalSlots++;
                    
                    if (Array.isArray(allvalues)) {
                        const filteredData = [];
                        let hasContent = false;
                        
                        allvalues.forEach((val, index) => {
                            if (val && val.trim()) {
                                hasContent = true;
                                if ((index + 1) % 6 === 0) {
                                    filteredData.push(val);
                                } else {
                                    filteredData.push(val + ' /');
                                }
                            }
                        });
                        
                        if (hasContent) {
                            cellContent = filteredData.join(' ');
                            occupiedSlots++;
                            roomOccupied++;
                        } else {
                            cellContent = 'Available';
                        }
                    } else {
                        cellContent = 'Available';
                    }
                    
                    row.push(cellContent);
                });
                
                // Calculate room utilization percentage
                roomUtilization[room] = ((roomOccupied / columns) * 100).toFixed(1);
                body.push(row);
            });

        // Generate enhanced table
        autoTable(doc, {
            head: [headers],
            body: body,
            startY: 180,
            styles: {
                fontSize: 8,
                cellPadding: 4,
                overflow: 'linebreak',
                halign: 'center',
                valign: 'middle',
                lineColor: [128, 128, 128],
                lineWidth: 0.75,
                minCellHeight: 25,
            },
            headStyles: {
                fillColor: [75, 0, 130],
                textColor: [255, 255, 255],
                fontSize: 11,
                fontStyle: 'bold',
                halign: 'center',
                cellPadding: 6,
            },
            bodyStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 7,
            },
            alternateRowStyles: {
                fillColor: [248, 245, 255],
            },
            columnStyles: {
                0: {
                    fillColor: [200, 162, 255],
                    fontStyle: 'bold',
                    halign: 'center',
                    cellWidth: 80,
                }
            },
            margin: { top: 180, right: 25, bottom: 25, left: 25 },
            theme: 'grid',
            didDrawPage: function (data) {
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                
                // Enhanced footer for daily schedule
                doc.setFillColor(128, 0, 128);
                doc.rect(0, pageHeight - 80, pageSize.width, 80, 'F');
                
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(11);
                doc.text(
                    `Page ${data.pageNumber} | Daily Facility Management System`,
                    40,
                    pageHeight - 45
                );
                
                doc.text(
                    `${rval} Utilization Report | ${new Date().toLocaleString()}`,
                    pageSize.width - 300,
                    pageHeight - 45
                );
            }
        });

        // Daily facility utilization summary
        const finalY = doc.lastAutoTable.finalY + 40;
        doc.setFontSize(16);
        doc.setTextColor(128, 0, 128);
        doc.text(`${rval.toUpperCase()} - FACILITY UTILIZATION SUMMARY`, 40, finalY);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const overallUtilization = totalSlots > 0 ? ((occupiedSlots / totalSlots) * 100).toFixed(1) : 0;
        
        // Basic statistics
        doc.text(`Day: ${rval}`, 40, finalY + 25);
        doc.text(`Total Rooms: ${totalRooms}`, 200, finalY + 25);
        doc.text(`Total Time Slots: ${totalSlots}`, 350, finalY + 25);
        doc.text(`Occupied Slots: ${occupiedSlots}`, 40, finalY + 45);
        doc.text(`Available Slots: ${totalSlots - occupiedSlots}`, 200, finalY + 45);
        doc.text(`Overall Utilization: ${overallUtilization}%`, 350, finalY + 45);
        
        // Utilization status
        let utilizationStatus = 'Low Usage';
        if (overallUtilization > 75) utilizationStatus = 'High Usage';
        else if (overallUtilization > 50) utilizationStatus = 'Moderate Usage';
        
        doc.text(`Status: ${utilizationStatus}`, 40, finalY + 65);

        const timestamp = new Date().toISOString().slice(0, 10);
        doc.save(`${rval}_Advanced_Daily_Report_${timestamp}.pdf`);
    };

    const gettable = async (name, msg = "") => {
        if (name == "") {
            alert(msg)
        } else {
            let data = {
                name1: "days",
                database: database,
                name: name,
            };
            let a = await fetch("/getvalues", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json()
            settable1(res);
            setdptable(true);
        }
        props.scroll();
    };

    const normal = () => {
        setrval("")
        setdptable(false)
    }

    const randertable = () => {
        return (
            <>
                <div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent'>
                    <table id='table-to-excel' className=" bg-white w-auto border border-gray-500 mt-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-500 px-4 py-2 sticky left-0 bg-purple-200">Room/Periods</th>
                                {[...Array(columns)].map((_, i) => (
                                    <th key={i} className="border border-gray-500 px-4 py-2">
                                        Period {i + 1}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(table1).filter(([days, value]) => days != "name" && days != "database" && days != "_id").map(([day, values]) => (
                                <tr key={day}>
                                    <td className="border border-gray-500 px-4 py-2 sticky left-0 bg-purple-200">{day}</td>
                                    {values.map((allvalues, j) => (
                                        <td key={j} className="border border-gray-500 px-1 py-1">
                                            <div className="flex items-center whitespace-nowrap overflow-hidden text-xs min-w-60 w-auto">
                                                {[...Array(allvalues.length)].map((_, i) => (
                                                    allvalues[i] !== "" ? (
                                                        (i + 1) % 6 === 0 ? (
                                                            <span key={i} className="inline-block">{allvalues[i]}</span>
                                                        ) : (
                                                            <span key={i} className="inline-block">
                                                                {allvalues[i]}&nbsp;/&nbsp;
                                                            </span>
                                                        )
                                                    ) : null
                                                ))}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            </>
        )
    }

    return (
        <div className="mt-1 flex items-center justify-center bg-gray-100 p-2 mb-5">
            <div className="w-full p-4 bg-amber-300 border-t-2 border-l-4 border-amber-400 rounded-3xl shadow-xl shadow-amber-400 flex flex-col justify-normal overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
                <h2 className="text-xl font-bold mb-4">Day wise Timetable with all room numbers</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Day</label>
                    <select onChange={(e) => setrval(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {room1.map(st => <option key={st} value={st} >{st}</option>)}
                    </select>
                </div>

                <button
                    onClick={() => gettable(rval, "First select a Day")}
                    className=" self-center w-72 px-4 py-2 bg-blue-500 text-white font-semibold rounded-3xl shadow-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Get Table
                </button>
                
                {dptable && randertable()}
                
                {dptable && (
                    <div className="flex flex-col items-center gap-3 mt-4">
                        <button
                            onClick={normal}
                            className="w-60 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Back
                        </button>
                        
                        {/* Export Options */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <button
                                onClick={exportTableToExcel}
                                className="w-48 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors"
                            >
                                📊 Export to Excel
                            </button>
                            
                            <button
                                onClick={exportTableToPDF}
                                className="w-48 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors"
                            >
                                📄 Export to PDF
                            </button>
                            
                            <button
                                onClick={exportAdvancedPDF}
                                className="w-48 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow-lg transition-colors"
                            >
                                📋 Advanced PDF
                            </button>
                        </div>
                        
                        <p className="text-xs text-gray-600 mt-2 text-center">
                            Choose from Excel, Standard PDF, or Advanced PDF with utilization analysis
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Days
