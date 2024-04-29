import boy1 from "../components/images/icons/boy1.png";
import boy2 from "../components/images/icons/boy2.png";
import boy3 from "../components/images/icons/boy3.png";
import boy4 from "../components/images/icons/boy4.png";
import boy5 from "../components/images/icons/boy5.png";
import boy6 from "../components/images/icons/boy6.png";
import boy7 from "../components/images/icons/boy7.png";
import boy8 from "../components/images/icons/boy8.png";
import girl1 from "../components/images/icons/girl1.png";
import girl2 from "../components/images/icons/girl2.png";
import girl3 from "../components/images/icons/girl3.png";
import girl4 from "../components/images/icons/girl4.png";
import girl5 from "../components/images/icons/girl5.png";
import girl6 from "../components/images/icons/girl6.png";
import devil from "../components/images/icons/devil.png";
import frankestein from "../components/images/icons/frankenstein.png";
import vampire from "../components/images/icons/vampire.png";
import { nanoid, random } from "nanoid";
// interface Icons {
//     img: Img
// }
const icons = [
  {
    img: boy1,
    id: nanoid(),
    gender: "male",
  },
  {
    img: boy2,
    id: nanoid(),
    gender: "male",
  },
  {
    img: boy3,
    id: nanoid(),
    gender: "male",
  },
  {
    img: boy4,
    id: nanoid(),
    gender: "male",
  },
  {
    img: boy5,
    id: nanoid(),
    gender: "male",
  },
  {
    img: boy6,
    id: nanoid(),
    gender: "male",
  },
  {
    img: boy7,
    id: nanoid(),
    gender: "male",
  },
  {
    img: boy8,
    id: nanoid(),
    gender: "male",
  },
  {
    img: girl1,
    id: nanoid(),
    gender: "female",
  },
  {
    img: girl2,
    id: nanoid(),
    gender: "female",
  },
  {
    img: girl3,
    id: nanoid(),
    gender: "female",
  },
  {
    img: girl4,
    id: nanoid(),
    gender: "female",
  },
  {
    img: girl5,
    id: nanoid(),
    gender: "female",
  },
  {
    img: girl6,
    id: nanoid(),
    gender: "female",
  },
];
export function randomIcon(gender: string | null) {
  const filteredIcon = icons.filter((icon) => icon.gender === gender);
  for (let i = filteredIcon.length - 1; i > 0; i--) {
    const randomize = Math.floor(Math.random() * (i + 1));
    [filteredIcon[i], filteredIcon[randomize]] = [
      filteredIcon[randomize],
      filteredIcon[i],
    ];
  }
  return filteredIcon[0].img;
}
