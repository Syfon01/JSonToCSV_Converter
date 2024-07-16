// src/JsonToCsv.tsx
"use client";

import React, { useState } from 'react';
import { Parser } from 'json2csv';

interface JsonData {
  name: string;
  age: number;
  city: string;
}

const JsonToCsv: React.FC = () => {
  const [jsonData, setJsonData] = useState<JsonData[]>([
    { name: 'John Doe', age: 28, city: 'New York' },
    { name: 'Jane Doe', age: 22, city: 'Los Angeles' },
    { name: 'Peter Parker', age: 18, city: 'Queens' },
  ]);

  const downloadCSV = () => {
    const parser = new Parser();
    const csv = parser.parse(jsonData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>JSON to CSV Converter</h1>
      <button onClick={downloadCSV}>Download CSV</button>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default JsonToCsv;
