const replaceMe = ["$ab", "$bb", "cd", "dd"];

const getDollar = replaceMe.toString().replace(/^\$/, "&");
console.log(getDollar);
// const filtered = replaceMe.filter((filt) => filt.startsWith("$"));
// const filtered = replaceMe.filter((filt) => filt.startsWith("$"));
