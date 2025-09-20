"use client"
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Department = (props) => {
    var database = props.database;

    const [stream1, setstream1] = useState([""]);
    const [columns, setcolumns] = useState(0);
    const [department1, setdepartment1] = useState([""]);
    const [stval, setstval] = useState("");
    const [dpval, setdpval] = useState("");
    const [dptable, setdptable] = useState(false);
    const [table1, settable1] = useState([""]);

    const exportTableToExcel = () => {
        const table = document.getElementById('table-to-excel');
        const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });
        XLSX.writeFile(workbook, 'Department_table.xlsx');
    };

    // Standard PDF Export Function for Department
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

        // Department-specific header styling
        doc.setFontSize(22);
        doc.setTextColor(128, 0, 128);
        doc.text('Department Schedule Overview', 40, 40);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Stream: ${stval}`, 40, 70);
        doc.text(`Department: ${dpval}`, 40, 85);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 40, 100);

        // Prepare table headers
        const headers = ['Day/Periods'];
        for (let i = 1; i <= columns; i++) {
            headers.push(`Period ${i}`);
        }

        // Prepare table body with department-specific data structure
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
                                const formattedVal = val.map((item, i) => 
                                    (i + 1) % 5 === 0 ? item : `${item}`
                                ).join(' / ');
                                cellContent += (index > 0 ? '\n' : '') + formattedVal;
                            } else {
                                cellContent += (index > 0 ? '\n' : '') + val;
                            }
                        });
                    }
                    row.push(cellContent || '');
                });
                body.push(row);
            });

        // Generate PDF table with department-specific styling
        autoTable(doc, {
            head: [headers],
            body: body,
            startY: 120,
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
                fillColor: [128, 0, 128], // Purple for department
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
            margin: { top: 120, right: 20, bottom: 20, left: 20 },
            tableWidth: 'auto',
            theme: 'grid',
            didDrawPage: function (data) {
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                
                doc.setFontSize(8);
                doc.setTextColor(100);
                doc.text(
                    `Page ${data.pageNumber} | ${stval} - ${dpval}`,
                    pageSize.width - 120,
                    pageHeight - 20
                );
                
                doc.setDrawColor(128, 0, 128);
                doc.line(20, pageHeight - 30, pageSize.width - 20, pageHeight - 30);
            }
        });

        doc.save(`${stval}_${dpval}_Department_Schedule.pdf`);
    };

    // Advanced PDF Export for Department with Enhanced Features
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

        // Professional department header
        doc.setFillColor(128, 0, 128);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 90, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(32);
        doc.text('DEPARTMENT ACADEMIC SCHEDULE', 40, 55);

        // Department information section
        doc.setFillColor(229, 204, 255);
        doc.rect(0, 90, doc.internal.pageSize.getWidth(), 60, 'F');
        
        doc.setTextColor(128, 0, 128);
        doc.setFontSize(18);
        doc.text(`Department: ${dpval} | Stream: ${stval}`, 40, 120);
        doc.setFontSize(12);
        doc.text(`Comprehensive Schedule Report Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 40, 140);

        // Prepare table data
        const headers = ['Day/Periods'];
        for (let i = 1; i <= columns; i++) {
            headers.push(`Period ${i}`);
        }

        const body = [];
        let totalActivities = 0;
        let totalSlots = 0;
        const courseOfferings = new Set();
        const facultyInvolved = new Set();

        Object.entries(table1)
            .filter(([days, value]) => days !== "name" && days !== "database" && days !== "_id")
            .forEach(([day, values]) => {
                const row = [day];
                values.forEach((allvalues) => {
                    let cellContent = '';
                    totalSlots++;
                    
                    if (Array.isArray(allvalues)) {
                        allvalues.forEach((val, index) => {
                            if (Array.isArray(val)) {
                                const processedData = [];
                                let hasContent = false;
                                val.forEach((item, i) => {
                                    if (item && item.trim()) {
                                        hasContent = true;
                                        // Collect analytics data
                                        if (i === 0) courseOfferings.add(item); // First element might be course
                                        if (i === 1) facultyInvolved.add(item);  // Second element might be faculty
                                        
                                        if ((i + 1) % 5 === 0) {
                                            processedData.push(item);
                                        } else {
                                            processedData.push(item);
                                        }
                                    }
                                });
                                if (hasContent) {
                                    cellContent += (index > 0 ? '\n' : '') + processedData.join(' / ');
                                    totalActivities++;
                                }
                            } else if (val && val.trim()) {
                                cellContent += (index > 0 ? '\n' : '') + val;
                                totalActivities++;
                            }
                        });
                    }
                    row.push(cellContent || 'No Activity');
                });
                body.push(row);
            });

        // Generate enhanced table
        autoTable(doc, {
            head: [headers],
            body: body,
            startY: 170,
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
            margin: { top: 170, right: 30, bottom: 30, left: 30 },
            theme: 'grid',
            didDrawPage: function (data) {
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                
                // Enhanced footer for department
                doc.setFillColor(128, 0, 128);
                doc.rect(0, pageHeight - 80, pageSize.width, 80, 'F');
                
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(11);
                doc.text(
                    `Page ${data.pageNumber} | Department Management System`,
                    40,
                    pageHeight - 45
                );
                
                doc.text(
                    `${stval} - ${dpval} | ${new Date().toLocaleString()}`,
                    pageSize.width - 250,
                    pageHeight - 45
                );
            }
        });

        // Department academic analytics summary
        const finalY = doc.lastAutoTable.finalY + 40;
        doc.setFontSize(16);
        doc.setTextColor(128, 0, 128);
        doc.text('DEPARTMENT ACADEMIC ANALYTICS', 40, finalY);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const utilizationRate = totalSlots > 0 ? ((totalActivities / totalSlots) * 100).toFixed(1) : 0;
        
        // Basic Information
        doc.text(`Stream: ${stval}`, 40, finalY + 25);
        doc.text(`Department: ${dpval}`, 250, finalY + 25);
        doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 450, finalY + 25);
        
        // Activity Statistics
        doc.text(`Total Time Slots: ${totalSlots}`, 40, finalY + 45);
        doc.text(`Active Periods: ${totalActivities}`, 250, finalY + 45);
        doc.text(`Free Periods: ${totalSlots - totalActivities}`, 450, finalY + 45);
        
        // Utilization Metrics
        doc.text(`Department Utilization: ${utilizationRate}%`, 40, finalY + 65);
        doc.text(`Course Offerings: ${courseOfferings.size}`, 250, finalY + 65);
        doc.text(`Faculty Involved: ${facultyInvolved.size}`, 450, finalY + 65);
        
        // Status Assessment
        let performanceStatus = 'Low Activity';
        if (utilizationRate > 75) performanceStatus = 'High Activity';
        else if (utilizationRate > 50) performanceStatus = 'Moderate Activity';
        
        doc.text(`Performance Status: ${performanceStatus}`, 40, finalY + 85);

        const timestamp = new Date().toISOString().slice(0, 10);
        doc.save(`${stval}_${dpval}_Advanced_Department_Report_${timestamp}.pdf`);
    };

    const gettable = async (collection, name, msg = "") => {
        if (name == "") {
            alert(msg)
        } else {
            let data = {
                database: database,
                collection: collection,
                name: name,
            };
            let a = await fetch("/main", { method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(data) })
            let res = await a.json()
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
                setstream1(res.values)
            } else {
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
                setdepartment1(course_d)
            }
        };
    };

    const normal = () => {
        setstval("");
        setdpval("");
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
                                            <div className="flex flex-col min-w-44 w-auto min-h-20 text-xs">
                                                {allvalues.map((val, x) => (
                                                    <div key={x} className=" whitespace-nowrap text-xs border-b-[0.5px] border-black">
                                                        {[...Array(val.length)].map((_, i) => ((i + 1) % 5 == 0 ? <><span key={i}>{val[i]}</span></> : <span key={i}>{val[i]}&nbsp;/&nbsp;</span>))}
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
        <div className="mt-2 flex items-center justify-center bg-gray-100 p-2 mb-5">
            <div className="w-full p-4 bg-amber-300 border-t-2 border-r-4 border-amber-400 rounded-3xl shadow-xl shadow-amber-400 flex flex-col justify-normal overflow-x-scroll scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent">
                <h2 className="text-xl font-bold mb-4">Department wise Timetable</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Stream</label>
                    <select onChange={(e) => setstval(e.target.value)} onClick={() => getdata("stream", "stream")} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {stream1.map(st => <option key={st} value={st} >{st}</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Department</label>
                    <select onChange={(e) => setdpval(e.target.value)} onClick={() => getdata("department", stval, "First select a stream")} className="w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {department1.map(ch => <option key={ch} value={ch} >{ch}</option>)}
                    </select>
                </div>

                <button
                    onClick={() => gettable("department_table", dpval, "First select a Department")}
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
                            Choose from Excel, Standard PDF, or Advanced PDF with academic analytics
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Department
