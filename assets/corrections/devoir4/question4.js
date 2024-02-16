let data = "Lepautre, Jean/MALE/Paris/17051999";

// Position du 2e /
let index2 = data.slice(data.indexOf('/')+1).search('/') + data.indexOf('/')+1;

console.log(`L'indice du deuxième "/" est ${index2}.`);

//Extraction des 8 derniers chiffres et stockage dans une nouvelle variable
let jour = data.substr(data.length-8,2);
let mois = data.substr(data.length-6,2);
let an = data.substr(data.length-4);

//concaténation au format AAAA-MM-JJ
let bon_format= an.concat('-',mois, '-' , jour);

console.log(bon_format);