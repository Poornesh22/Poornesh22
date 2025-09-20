"use client"
import React from 'react'
import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Section = (props) => {
    var database = props.database;

    const [stream1, setstream1] = useState([""]);
    const [department1, setdepartment1] = useState([""]);
    const [section1, setsection1] = useState([""]);
    const [columns, setcolumns] = useState(0);
    const [stval, setstval] = useState("");
    const [dpval, setdpval] = useState("");
    const [secval, setsecval] = useState("");
    const [dptable, setdptable] = useState(false);
    const [table1, settable1] = useState([""]);

    const exportTableToExcel = () => {
        const table = document.getElementById('table-to-excel');
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });
        XLSX.writeFile(workbook, 'Semester_table.xlsx');
    };

    // Standard PDF Export Function
    const exportTableToPDF = () => {
        if (!dptable || !table1) {
            alert("No table data to export!");
            return;
        }

        // Create new PDF document in landscape mode
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a4'
        });

        // Add title and metadata
        doc.setFontSize(20);
        doc.setTextColor(128, 0, 128);
        doc.text('Section Wise Timetable', 40, 40);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Stream: ${stval}`, 40, 65);
        doc.text(`Department: ${dpval}`, 40, 80);
        doc.text(`Section: ${secval}`, 40, 95);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 40, 110);

        // Prepare table headers
        const headers = ['Day/Periods'];
        for (let i = 1; i <= columns; i++) {
            headers.push(`Period ${i}`);
        }

        // Prepare table body with complex data structure
        const body = [];
        Object.entries(table1)
            .filter(([days, value]) => days !== "name" && days !== "database" && days !== "_id")
            .forEach(([day, values]) => {
                const row = [day];
                values.forEach((allvalues) => {
                    let cellContent = '';
                    allvalues.forEach((val, index) => {
                        if (Array.isArray(val)) {
                            const formattedVal = val.map((item, i) => 
                                (i + 1) % 6 === 0 ? item : `${item}`
                            ).join(' / ');
                            cellContent += (index > 0 ? '\n' : '') + formattedVal;
                        } else {
                            cellContent += (index > 0 ? '\n' : '') + val;
                        }
                    });
                    row.push(cellContent || '');
                });
                body.push(row);
            });

        // Generate PDF table with styling
        autoTable(doc, {
            head: [headers],
            body: body,
            startY: 130,
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
                fillColor: [128, 0, 128], // Purple background
                textColor: [255, 255, 255], // White text
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
                fillColor: [248, 248, 255], // Light purple
            },
            columnStyles: {
                0: { // Day column
                    fillColor: [229, 204, 255], // Light purple
                    fontStyle: 'bold',
                    halign: 'center',
                    cellWidth: 80,
                }
            },
            margin: { top: 130, right: 20, bottom: 20, left: 20 },
            tableWidth: 'auto',
            theme: 'grid',
            didDrawPage: function (data) {
                // Add page footer
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                
                doc.setFontSize(8);
                doc.setTextColor(100);
                doc.text(
                    `Page ${data.pageNumber}`,
                    pageSize.width - 50,
                    pageHeight - 20
                );
                
                // Add footer line
                doc.setDrawColor(128, 0, 128);
                doc.line(20, pageHeight - 30, pageSize.width - 20, pageHeight - 30);
            }
        });

        // Save the PDF
        doc.save(`${stval}_${dpval}_${secval}_Timetable.pdf`);
    };

    // Advanced PDF Export with Enhanced Styling
    const exportAdvancedPDF = () => {
        if (!dptable || !table1) {
            alert("No table data to export!");
            return;
        }

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a3' // Larger format for complex tables
        });

        // Professional header with colored background
        doc.setFillColor(128, 0, 128);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 80, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(28);
        doc.text('SECTION TIMETABLE REPORT', 40, 45);

        // Subtitle section with hierarchy information
        doc.setFillColor(229, 204, 255);
        doc.rect(0, 80, doc.internal.pageSize.getWidth(), 50, 'F');
        
        doc.setTextColor(128, 0, 128);
        doc.setFontSize(16);
        doc.text(`Stream: ${stval} | Department: ${dpval} | Section: ${secval}`, 40, 105);
        doc.setFontSize(12);
        doc.text(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 40, 120);

        // Prepare enhanced table data
        const headers = ['Day/Periods'];
        for (let i = 1; i <= columns; i++) {
            headers.push(`Period ${i}`);
        }

        const body = [];
        Object.entries(table1)
            .filter(([days, value]) => days !== "name" && days !== "database" && days !== "_id")
            .forEach(([day, values]) => {
                const row = [day];
                values.forEach((allvalues) => {
                    let cellContent = '';
                    if (Array.isArray(allvalues)) {
                        allvalues.forEach((val, index) => {
                            if (Array.isArray(val)) {
                                const processedVal = val.map((item, i) => {
                                    return (i + 1) % 6 === 0 ? item : `${item}`;
                                }).join(' / ');
                                cellContent += (index > 0 ? '\n' : '') + processedVal;
                            } else {
                                cellContent += (index > 0 ? '\n' : '') + (val || '');
                            }
                        });
                    }
                    row.push(cellContent || '-');
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
                minCellHeight: 25,
            },
            headStyles: {
                fillColor: [75, 0, 130], // Dark purple
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
                // Enhanced footer
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                
                // Footer background
                doc.setFillColor(128, 0, 128);
                doc.rect(0, pageHeight - 60, pageSize.width, 60, 'F');
                
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(11);
                doc.text(
                    `Page ${data.pageNumber} | Section Timetable Management System`,
                    40,
                    pageHeight - 30
                );
                
                // Add timestamp and section info
                doc.text(
                    `${stval} - ${dpval} - ${secval} | ${new Date().toLocaleString()}`,
                    pageSize.width - 300,
                    pageHeight - 30
                );
            }
        });

        // Add comprehensive summary information
        const finalY = doc.lastAutoTable.finalY + 40;
        doc.setFontSize(14);
        doc.setTextColor(128, 0, 128);
        doc.text('TIMETABLE SUMMARY', 40, finalY);
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(`Stream: ${stval}`, 40, finalY + 20);
        doc.text(`Department: ${dpval}`, 200, finalY + 20);
        doc.text(`Section: ${secval}`, 360, finalY + 20);
        doc.text(`Total Periods: ${columns}`, 40, finalY + 35);
        doc.text(`Total Days: ${Object.keys(table1).filter(key => key !== "name" && key !== "database" && key !== "_id").length}`, 200, finalY + 35);

        // Save with comprehensive timestamp
        const timestamp = new Date().toISOString().slice(0, 10);
        doc.save(`${stval}_${dpval}_${secval}_Advanced_Timetable_${timestamp}.pdf`);
    };

    const gettable = async (name) => {
        if (stval == "") {
            alert("First select a stream")
        } else if (dpval == "") {
            alert("First select a department")
        } else if (secval == "") {
            alert("First select a section")
        } else {
            let data = {
                name1: "section",
                database: database,
                name: name,
            };
            let a = await fetch("/getvalues", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json()
            settable1(res);
            setcolumns(res["Monday"]?.length);
            setdptable(true);
        }
        props.scroll();
    };

    const getdata = async (name1, name, msg = "") => {
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
            if (name1 == "stream") {
                try {
                    setstream1(res.values)
                } catch {
                    alert("Properly input data")
                }
            } else if (name1 == "department") {
                try {
                    setdepartment1(res.values)
                } catch {
                    alert("Properly input data")
                }
            } else {
                try {
                    setsection1(res.values)
                } catch {
                    alert("Properly input data")
                }
            }
        };
    };

    const normal = () => {
        setstval("");
        setdpval("");
        setsecval("");
        setdptable(false)
    }

    const randertable = () => {
        return (
            <>
                <div className='overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent'>
                    <table id='table-to-excel' className=" bg-white w-full border-collapse border border-gray-500 mt-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-500 px-4 py-2 sticky left-0 bg-purple-200">Day/Periods</th>
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
                                            <div className="flex flex-col min-w-60 w-auto min-h-20 h-auto text-xs">
                                                {allvalues.map((val, x) => (
                                                    <div key={x} className="border-b-[0.5px] border-black whitespace-nowrap">
                                                        {[...Array(val.length)].map((_, i) => ((i + 1) % 6 == 0 ? <><span key={i}>{val[i]}</span></> : <span key={i}>{val[i]}&nbsp;/&nbsp;</span>))}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    return (
        <div className="mt-1 flex items-center justify-center bg-gray-100 p-2 mb-5">
            <div className="w-full p-4 bg-amber-300 border-t-4 border-l-4 border-amber-400 rounded-3xl shadow-xl shadow-amber-400 flex flex-col justify-normal overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
                <h2 className="text-xl font-bold mb-4">Section wise Timetable</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Stream</label>
                    <select onChange={(e) => setstval(e.target.value)} onClick={() => getdata("stream", "stream")} value={stval} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {stream1.map(st => <option key={st} value={st} >{st}</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a department</label>
                    <select onChange={(e) => setdpval(e.target.value)} onClick={() => getdata("department", stval, "First select a stream")} value={dpval} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {department1.map(ch => <option key={ch} value={ch} >{ch}</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Section</label>
                    <select onChange={(e) => { setsecval(e.target.value) }} onClick={() => getdata("section", dpval, "First select a Department")} value={secval} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {section1.map(se => <option key={se} value={se} >{se}</option>)}
                    </select>
                </div>

                <button
                    onClick={() => gettable(secval, "First select a section")}
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
                            Choose from Excel, Standard PDF, or Advanced PDF with enhanced styling
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Section
