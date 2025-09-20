"use client"
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Stream = (props) => {
    var database = props.database;

    const [stream1, setstream1] = useState([""]);
    const [columns, setcolumns] = useState(0);
    const [stval, setstval] = useState("");
    const [dptable, setdptable] = useState(false);
    const [table1, settable1] = useState([""]);

    const exportTableToExcel = () => {
        const table = document.getElementById('table-to-excel');
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });
        XLSX.writeFile(workbook, 'Semester_table.xlsx');
    };

    // Fixed PDF Export Function
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
        doc.text('Stream Wise Timetable', 40, 40);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Stream: ${stval}`, 40, 65);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 40, 80);

        // Prepare table headers
        const headers = ['Day/Periods'];
        for (let i = 1; i <= columns; i++) {
            headers.push(`Period ${i}`);
        }

        // Prepare table body
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

        // Use autoTable function (not doc.autoTable)
        autoTable(doc, {
            head: [headers],
            body: body,
            startY: 100,
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
                fillColor: [128, 0, 128],
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
            margin: { top: 100, right: 20, bottom: 20, left: 20 },
            tableWidth: 'auto',
            theme: 'grid',
            didDrawPage: function (data) {
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                
                doc.setFontSize(8);
                doc.setTextColor(100);
                doc.text(
                    `Page ${data.pageNumber}`,
                    pageSize.width - 50,
                    pageHeight - 20
                );
                
                doc.setDrawColor(128, 0, 128);
                doc.line(20, pageHeight - 30, pageSize.width - 20, pageHeight - 30);
            }
        });

        doc.save(`${stval}_Timetable.pdf`);
    };

    // Enhanced PDF Export
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

        // Professional header
        doc.setFillColor(128, 0, 128);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 60, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.text('STREAM TIMETABLE REPORT', 40, 35);

        doc.setFillColor(229, 204, 255);
        doc.rect(0, 60, doc.internal.pageSize.getWidth(), 30, 'F');
        
        doc.setTextColor(128, 0, 128);
        doc.setFontSize(14);
        doc.text(`Stream: ${stval} | Generated: ${new Date().toLocaleDateString()}`, 40, 80);

        // Prepare table data
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

        // Use autoTable function (not doc.autoTable)
        autoTable(doc, {
            head: [headers],
            body: body,
            startY: 110,
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
                fillColor: [75, 0, 130],
                textColor: [255, 255, 255],
                fontSize: 11,
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
            margin: { top: 110, right: 30, bottom: 30, left: 30 },
            theme: 'grid',
            didDrawPage: function (data) {
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                
                doc.setFillColor(128, 0, 128);
                doc.rect(0, pageHeight - 40, pageSize.width, 40, 'F');
                
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(10);
                doc.text(
                    `Page ${data.pageNumber} | Generated by Timetable System`,
                    40,
                    pageHeight - 20
                );
                
                doc.text(
                    `${new Date().toLocaleString()}`,
                    pageSize.width - 150,
                    pageHeight - 20
                );
            }
        });

        const timestamp = new Date().toISOString().slice(0, 10);
        doc.save(`${stval}_Advanced_Timetable_${timestamp}.pdf`);
    };

    // Rest of your existing functions remain the same...
    const gettable = async (name) => {
        if (stval == "") {
            alert("First select a stream")
        } else {
            let data = {
                name1: "stream",
                database: database,
                name: name,
            };
            let a = await fetch("/getvalues", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json()
            console.log(res);
            settable1(res);
            setcolumns(res?.Monday?.length);
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
            }
        }
    };

    const normal = () => {
        setstval("");
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
        <div className="mt-5 flex items-center justify-center bg-gray-100 p-4 mb-5">
            <div className="w-full p-6 bg-amber-300 border-b-2 border-l-4 border-amber-400 rounded-3xl shadow-xl shadow-amber-400 flex flex-col justify-normal overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
                <h2 className="text-xl font-bold mb-4">Stream wise Timetable</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Stream</label>
                    <select onChange={(e) => setstval(e.target.value)} onClick={() => getdata("stream", "stream", "First select a stream")} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {stream1.map(st => <option key={st} value={st} >{st}</option>)}
                    </select>
                </div>

                <button
                    onClick={() => gettable(stval)}
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

export default Stream
