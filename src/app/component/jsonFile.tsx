"use client";

import React, { useState } from "react";
import { Parser } from "json2csv";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const JsonToCsvFile: React.FC = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          try {
            const json = JSON.parse(e.target.result as string);
            setJsonData(json);
          } catch (error) {
            console.error("Invalid JSON file");
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const flattenObject = (obj: any, parent: string = "", res: any = {}) => {
    for (let key in obj) {
      const propName = parent ? `${parent}.${key}` : key;
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        flattenObject(obj[key], propName, res);
      } else {
        res[propName] = obj[key];
      }
    }
    return res;
  };

  const downloadCSV = () => {
    const parser = new Parser();
    const csv = parser.parse(jsonData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      fileName ? fileName.replace(".json", ".csv") : "data.csv"
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const downloadExcel = () => {
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet(jsonData);
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   // const excelFileName = fileName?.replace('.json', '.xlsx');
  //   const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' as XLSX.WritingOptions['type'] });
  //   const blob = new Blob([wbout], { type: 'application/octet-stream' });

  //   const url = URL.createObjectURL(blob);

  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute('download', fileName? fileName.replace('.json', '.xlsx'): "data.csv");
  //   link.style.visibility = 'hidden';

  //   document.body.appendChild(link);
  //   link.click();

  //   document.body.removeChild(link);
  // };

  return (
    <div>
      <h1 className="text-xl mb-8">JSON to CSV Converter</h1>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {fileName && (
        <div>
          <p className="mt-5">{fileName.replace(".json", "")}</p>
          <button
            onClick={downloadCSV}
            className="bg-white rounded px-4 py-2 text-black mt-5"
          >
            Download CSV
          </button>
          {/* <button
            onClick={downloadExcel}
            className="bg-green-950 rounded px-4 py-2 text-white mt-5"
          >
            Download Excel
          </button> */}
        </div>
      )}
    </div>
  );
};

export default JsonToCsvFile;
