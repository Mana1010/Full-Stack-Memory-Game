import { nanoid } from "nanoid";
import { Cards } from "@/types/game.types";

type CardsFunctionSchema = Omit<Cards, "sticker" | "color"> & {
  codeName: string;
};
const elements = [
  { name: "Hydrogen", symbol: "H" },
  { name: "Helium", symbol: "He" },
  { name: "Lithium", symbol: "Li" },
  { name: "Beryllium", symbol: "Be" },
  { name: "Boron", symbol: "B" },
  { name: "Carbon", symbol: "C" },
  { name: "Nitrogen", symbol: "N" },
  { name: "Oxygen", symbol: "O" },
  { name: "Fluorine", symbol: "F" },
  { name: "Neon", symbol: "Ne" },
  { name: "Sodium", symbol: "Na" },
  { name: "Magnesium", symbol: "Mg" },
  { name: "Aluminum", symbol: "Al" },
  { name: "Silicon", symbol: "Si" },
  { name: "Phosphorus", symbol: "P" },
  { name: "Sulfur", symbol: "S" },
  { name: "Chlorine", symbol: "Cl" },
  { name: "Argon", symbol: "Ar" },
  { name: "Potassium", symbol: "K" },
  { name: "Calcium", symbol: "Ca" },
  { name: "Scandium", symbol: "Sc" },
  { name: "Titanium", symbol: "Ti" },
  { name: "Vanadium", symbol: "V" },
  { name: "Chromium", symbol: "Cr" },
  { name: "Manganese", symbol: "Mn" },
  { name: "Iron", symbol: "Fe" },
  { name: "Cobalt", symbol: "Co" },
  { name: "Nickel", symbol: "Ni" },
  { name: "Copper", symbol: "Cu" },
  { name: "Zinc", symbol: "Zn" },
  { name: "Gallium", symbol: "Ga" },
  { name: "Germanium", symbol: "Ge" },
  { name: "Arsenic", symbol: "As" },
  { name: "Selenium", symbol: "Se" },
  { name: "Bromine", symbol: "Br" },
  { name: "Krypton", symbol: "Kr" },
  { name: "Rubidium", symbol: "Rb" },
  { name: "Strontium", symbol: "Sr" },
  { name: "Yttrium", symbol: "Y" },
  { name: "Zirconium", symbol: "Zr" },
  { name: "Niobium", symbol: "Nb" },
  { name: "Molybdenum", symbol: "Mo" },
  { name: "Technetium", symbol: "Tc" },
  { name: "Ruthenium", symbol: "Ru" },
  { name: "Rhodium", symbol: "Rh" },
  { name: "Palladium", symbol: "Pd" },
  { name: "Silver", symbol: "Ag" },
  { name: "Cadmium", symbol: "Cd" },
  { name: "Indium", symbol: "In" },
  { name: "Tin", symbol: "Sn" },
  { name: "Antimony", symbol: "Sb" },
  { name: "Tellurium", symbol: "Te" },
  { name: "Iodine", symbol: "I" },
  { name: "Xenon", symbol: "Xe" },
  { name: "Cesium", symbol: "Cs" },
  { name: "Barium", symbol: "Ba" },
  { name: "Lanthanum", symbol: "La" },
  { name: "Cerium", symbol: "Ce" },
  { name: "Praseodymium", symbol: "Pr" },
  { name: "Neodymium", symbol: "Nd" },
  { name: "Promethium", symbol: "Pm" },
  { name: "Samarium", symbol: "Sm" },
  { name: "Europium", symbol: "Eu" },
  { name: "Gadolinium", symbol: "Gd" },
  { name: "Terbium", symbol: "Tb" },
  { name: "Dysprosium", symbol: "Dy" },
  { name: "Holmium", symbol: "Ho" },
  { name: "Erbium", symbol: "Er" },
  { name: "Thulium", symbol: "Tm" },
  { name: "Ytterbium", symbol: "Yb" },
  { name: "Lutetium", symbol: "Lu" },
  { name: "Hafnium", symbol: "Hf" },
  { name: "Tantalum", symbol: "Ta" },
  { name: "Tungsten", symbol: "W" },
  { name: "Rhenium", symbol: "Re" },
  { name: "Osmium", symbol: "Os" },
  { name: "Iridium", symbol: "Ir" },
  { name: "Platinum", symbol: "Pt" },
  { name: "Gold", symbol: "Au" },
  { name: "Mercury", symbol: "Hg" },
  { name: "Thallium", symbol: "Tl" },
  { name: "Lead", symbol: "Pb" },
  { name: "Bismuth", symbol: "Bi" },
  { name: "Polonium", symbol: "Po" },
  { name: "Astatine", symbol: "At" },
  { name: "Radon", symbol: "Rn" },
  { name: "Francium", symbol: "Fr" },
  { name: "Radium", symbol: "Ra" },
  { name: "Actinium", symbol: "Ac" },
  { name: "Thorium", symbol: "Th" },
  { name: "Protactinium", symbol: "Pa" },
  { name: "Uranium", symbol: "U" },
  { name: "Neptunium", symbol: "Np" },
  { name: "Plutonium", symbol: "Pu" },
  { name: "Americium", symbol: "Am" },
  { name: "Curium", symbol: "Cm" },
  { name: "Berkelium", symbol: "Bk" },
  { name: "Californium", symbol: "Cf" },
  { name: "Einsteinium", symbol: "Es" },
  { name: "Fermium", symbol: "Fm" },
  { name: "Mendelevium", symbol: "Md" },
  { name: "Nobelium", symbol: "No" },
  { name: "Lawrencium", symbol: "Lr" },
  { name: "Rutherfordium", symbol: "Rf" },
  { name: "Dubnium", symbol: "Db" },
  { name: "Seaborgium", symbol: "Sg" },
  { name: "Bohrium", symbol: "Bh" },
  { name: "Hassium", symbol: "Hs" },
  { name: "Meitnerium", symbol: "Mt" },
  { name: "Darmstadtium", symbol: "Ds" },
  { name: "Roentgenium", symbol: "Rg" },
  { name: "Copernicium", symbol: "Cn" },
  { name: "Nihonium", symbol: "Nh" },
  { name: "Flerovium", symbol: "Fl" },
  { name: "Moscovium", symbol: "Mc" },
  { name: "Livermorium", symbol: "Lv" },
  { name: "Tennessine", symbol: "Ts" },
  { name: "Oganesson", symbol: "Og" },
];

export function shuffleElements(): CardsFunctionSchema[] {
  for (let i = elements.length - 1; i > 0; i--) {
    const randomElements = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[randomElements]] = [
      elements[randomElements],
      elements[i],
    ];
  }
  const firstObj = [];
  const secondObj = [];
  const mapVal = elements
    .map((element) => Object.entries(element))
    .slice(0, 12);
  for (let [firstValue, secondValue] of mapVal) {
    firstObj.push({
      name: firstValue[1],
      codeName: firstValue[1],
      id: nanoid(),
      isPick: false,
      isDone: false,
      isShowAddPoints: false,
      cardModified: Date.now(),
    });
    secondObj.push({
      name: secondValue[1],
      codeName: firstValue[1],
      id: nanoid(),
      isPick: false,
      isDone: false,
      isShowAddPoints: false,
      cardModified: Date.now(),
    });
  }
  return [...firstObj, ...secondObj];
}
