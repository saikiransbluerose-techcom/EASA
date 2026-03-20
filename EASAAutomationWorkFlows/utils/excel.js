// utils/excel.js
import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, '../data/easa-data.xlsx');

function readSheet(sheet) {
  // ✅ ensures date cells are treated as dates
  const wb = XLSX.readFile(file, { cellDates: true });
  const ws = wb.Sheets[sheet];

  // ✅ forces dates to come out as strings in the format your UI shows: 6/21/2026
  return XLSX.utils.sheet_to_json(ws, {
    defval: '',
    raw: false,
    dateNF: 'm/d/yyyy',
  });
}

function getRow(sheet, variant) {
  const rows = readSheet(sheet);
  return rows.find(r => r.Variant === variant);
}

export function getData(variant) {
  return {
    approval: getRow('Approvals', variant),
    phase: getRow('CreatePhase', variant),
    activity: getRow('CreateActivity', variant),
  };
}