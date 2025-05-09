import React from 'react';
import './Loading.css'; // contains .animate-tile

// Periods: Rows 1–7; Groups: Columns 1–18
// Each entry is either null (empty slot) or an element symbol.
const periodicGrid = [
  // Period 1
  [ 'H', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'He' ],
  // Period 2
  [ 'Li', 'Be', null, null, null, null, null, null, null, null, null, null, 'B', 'C', 'N', 'O', 'F', 'Ne' ],
  // Period 3
  [ 'Na', 'Mg', null, null, null, null, null, null, null, null, null, null, 'Al', 'Si', 'P', 'S', 'Cl', 'Ar' ],
  // Period 4
  [ 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr' ],
  // Period 5
  [ 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe' ],
  // Period 6
  [ 'Cs', 'Ba', 'La', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn' ],
  // Period 7
  [ 'Fr', 'Ra', 'Ac', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Fl', 'Lv', 'Ts', 'Og', null, null ],
];

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-fit bg-transparent">
      <div className="grid grid-cols-18 gap-1">
        {periodicGrid.flat().map((el, idx) =>
          el ? (
            <div
              key={idx}
              className="w-10 h-10 border border-white rounded flex items-center justify-center text-white text-xs font-bold animate-tile"
              style={{ animationDelay: `${idx * 0.02}s` }}
            >
              {el}
            </div>
          ) : (
            <div key={idx} className="w-10 h-10" /> // Empty space
          )
        )}
      </div>
    </div>
  );
}
