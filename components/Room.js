"use client"
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Room = (props) => {
    var database = props.database;

    const [room1, setroom1] = useState([""]);
    const [columns, setcolumns] = useState(0);
    const [rval, setrval] = useState("");
    const [dptable, setdptable] = useState(false);
    const [table1, settable1] = useState([""]);

    // Excel Export Function
    const exportTableToExcel = () => {
        const table = document.getElementById('table-to-excel');
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });
        XLSX.writeFile(workbook, 'Room_Schedule.xlsx');
    };

    // Standard PDF Export Function for Room
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

        // Room-specific header styling
        doc.setFontSize(22);
        doc.setTextColor(128, 0, 128);
        doc.text('Room Occupancy Schedule', 40, 40);

        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(`Room Number: ${rval}`, 40, 70);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 40, 90);

        // Prepare table headers
        const headers = ['Day/Periods'];
        for (let i = 1; i <= columns; i++) {
            headers.push(`Period ${i}`);
        }

        // Prepare table body with room-specific data structure
        const body = [];
        Object.entries(table1)
            .filter(([days, value]) => days !== "name" && days !== "database" && days !== "_id")
            .forEach(([day, values]) => {
                const row = [day];
                values.forEach((allvalues) => {
                    let cellContent = '';
                    if (Array.isArray(allvalues)) {
                        // Room data structure: [course, faculty, section, stream, department]
                        allvalues.forEach((val, index) => {
                            if (val && val.trim()) {
                                cellContent += (index > 0 ? '\n' : '') + val;
                            }
                        });
                    }
                    row.push(cellContent || 'Available');
                });
                body.push(row);
            });

        // Generate PDF table with room-specific styling
        autoTable(doc, {
            head: [headers],
            body: body,
            startY: 110,
            styles: {
                fontSize: 8,
                cellPadding: 4,
                overflow: 'linebreak',
                halign: 'center',
                valign: 'middle',
                lineColor: [128, 128, 128],
                lineWidth: 0.5,
            },
            headStyles: {
                fillColor: [128, 0, 128], // Purple for room
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold',
                halign: 'center',
                cellPadding: 6,
            },
            bodyStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 7,
                cellPadding: 3,
            },
            alternateRowStyles: {
                fillColor: [248, 248, 255],
            },
            columnStyles: {
                0: {
                    fillColor: [229, 204, 255],
                    fontStyle: 'bold',
                    halign: 'center',
                    cellWidth: 80,
                }
            },
            margin: { top: 110, right: 20, bottom: 20, left: 20 },
            tableWidth: 'auto',
            theme: 'grid',
            didDrawPage: function (data) {
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                
                doc.setFontSize(8);
                doc.setTextColor(100);
                doc.text(
                    `Page ${data.pageNumber} | Room ${rval}`,
                    pageSize.width - 80,
                    pageHeight - 20
                );
                
                doc.setDrawColor(128, 0, 128);
                doc.line(20, pageHeight - 30, pageSize.width - 20, pageHeight - 30);
            }
        });

        doc.save(`Room_${rval}_Schedule.pdf`);
    };

    // Advanced PDF Export for Room with Enhanced Features
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

        // Professional room header
        doc.setFillColor(128, 0, 128);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 80, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(32);
        doc.text('ROOM OCCUPANCY REPORT', 40, 50);

        // Room information section
        doc.setFillColor(229, 204, 255);
        doc.rect(0, 80, doc.internal.pageSize.getWidth(), 50, 'F');
        
        doc.setTextColor(128, 0, 128);
        doc.setFontSize(20);
        doc.text(`Room Number: ${rval}`, 40, 110);
        doc.setFontSize(12);
        doc.text(`Facility Utilization Report Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 40, 125);

        // Prepare table data
        const headers = ['Day/Periods'];
        for (let i = 1; i <= columns; i++) {
            headers.push(`Period ${i}`);
        }

        const body = [];
        let totalOccupied = 0;
        let totalSlots = 0;

        Object.entries(table1)
            .filter(([days, value]) => days !== "name" && days !== "database" && days !== "_id")
            .forEach(([day, values]) => {
                const row = [day];
                values.forEach((allvalues) => {
                    let cellContent = '';
                    totalSlots++;
                    
                    if (Array.isArray(allvalues)) {
                        // Room data: [course, faculty, section, stream, department]
                        const roomData = [];
                        allvalues.forEach((val, index) => {
                            if (val && val.trim()) {
                                roomData.push(val);
                            }
                        });
                        
                        if (roomData.length > 0) {
                            cellContent = roomData.join('\n');
                            totalOccupied++;
                        } 
                    }
                    row.push(cellContent);
                });
                body.push(row);
            });

        // Generate enhanced table
        autoTable(doc, {
            head: [headers],
            body: body,
            startY: 150,
            styles: {
                fontSize: 9,
                cellPadding: 5,
                overflow: 'linebreak',
                halign: 'center',
                valign: 'middle',
                lineColor: [128, 128, 128],
                lineWidth: 0.75,
                minCellHeight: 30,
            },
            headStyles: {
                fillColor: [75, 0, 130],
                textColor: [255, 255, 255],
                fontSize: 12,
                fontStyle: 'bold',
                halign: 'center',
                cellPadding: 8,
            },
            bodyStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 8,
            },
            alternateRowStyles: {
                fillColor: [248, 245, 255],
            },
            columnStyles: {
                0: {
                    fillColor: [200, 162, 255],
                    fontStyle: 'bold',
                    halign: 'center',
                    cellWidth: 100,
                }
            },
            margin: { top: 150, right: 30, bottom: 30, left: 30 },
            theme: 'grid',
            didDrawPage: function (data) {
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                
                // Enhanced footer for room
                doc.setFillColor(128, 0, 128);
                doc.rect(0, pageHeight - 70, pageSize.width, 70, 'F');
                
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(11);
                doc.text(
                    `Page ${data.pageNumber} | Room Management System`,
                    40,
                    pageHeight - 40
                );
                
                doc.text(
                    `Room ${rval} Occupancy | ${new Date().toLocaleString()}`,
                    pageSize.width - 250,
                    pageHeight - 40
                );
            }
        });

        // Room utilization summary
        const finalY = doc.lastAutoTable.finalY + 40;
        doc.setFontSize(16);
        doc.setTextColor(128, 0, 128);
        doc.text('ROOM UTILIZATION SUMMARY', 40, finalY);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const utilizationRate = totalSlots > 0 ? ((totalOccupied / totalSlots) * 100).toFixed(1) : 0;
        
        doc.text(`Room Number: ${rval}`, 40, finalY + 25);
        doc.text(`Total Time Slots: ${totalSlots}`, 250, finalY + 25);
        doc.text(`Occupied Slots: ${totalOccupied}`, 450, finalY + 25);
        doc.text(`Available Slots: ${totalSlots - totalOccupied}`, 40, finalY + 45);
        doc.text(`Utilization Rate: ${utilizationRate}%`, 250, finalY + 45);
        doc.text(`Status: ${utilizationRate > 75 ? 'High Usage' : utilizationRate > 50 ? 'Moderate Usage' : 'Low Usage'}`, 450, finalY + 45);

        const timestamp = new Date().toISOString().slice(0, 10);
        doc.save(`Room_${rval}_Advanced_Report_${timestamp}.pdf`);
    };

    const gettable = async (name, msg = "") => {
        if (name == "") {
            alert(msg)
        } else {
            let data = {
                name1: "room",
                database: database,
                name: name,
            };
            let a = await fetch("/getvalues", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json()
            settable1(res);
            setcolumns(res?.Monday?.length);
            setdptable(true);
        }
        props.scroll();
    };

    const getdata = async (name, msg = "") => {
        if (name == "") {
            alert(msg)
        } else {
            let data = {
                database: database,
                collection: "clg_data",
                name: name,
            };
            let a = await fetch("/main", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json()
            const course_d = [...res.values].sort((a, b) => {
                const isANumeric = !isNaN(a);
                const isBNumeric = !isNaN(b);

                if (isANumeric && isBNumeric) {
                    return parseInt(a) - parseInt(b);
                }

                if (!isANumeric && !isBNumeric) {
                    return a.localeCompare(b);
                }
                if (isANumeric != "" || isANumeric != " ") {
                    return isANumeric ? 1 : -1;
                }
            });
            setroom1(course_d)
        };
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
                                <th className="border border-gray-500  px-4 py-2 bg-purple-200 sticky left-0">Day/Periods</th>
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
                                    <td className="border border-gray-500  px-4 py-2 bg-purple-200 sticky left-0">{day}</td>
                                    {values.map((allvalues, j) => (
                                        <td key={j} className="border border-gray-500 px-4 py-2">
                                            <div className="flex flex-col min-w-28 w-auto min-h-20 h-auto whitespace-nowrap">
                                                <div>{allvalues}</div>
                                                <div>{allvalues[1]}</div>
                                                <div>{allvalues[2]}</div>
                                                <div>{allvalues[5]}</div>
                                                <div>{allvalues[17]}</div>
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
            <div className="w-full p-5 bg-amber-300 border-t-4 border-r-4 border-amber-400 rounded-3xl shadow-xl shadow-amber-400 flex flex-col justify-normal overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
                <h2 className="text-xl font-bold mb-4">Room wise Timetable</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Room Number</label>
                    <select onChange={(e) => setrval(e.target.value)} onClick={() => getdata("room")} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {room1.map(st => <option key={st} value={st} >{st}</option>)}
                    </select>
                </div>

                <button
                    onClick={() => gettable(rval, "First select a room number")}
                    className=" self-center w-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-3xl shadow-3xl active:shadow-inner hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
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

export default Room
