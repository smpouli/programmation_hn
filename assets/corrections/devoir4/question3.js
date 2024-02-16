//déclaration et initialisation de la phrase avec des accents graves
let phrase=`C'était le meilleur des temps, c'était le pire des temps ; 
c'était l'âge de la sagesse, c'était l'âge de la folie ; c'était 
l'époque de la foi, c'était l'époque de l'incrédulité ; c'était la 
saison de la Lumière ; c'était la saison de l'Obscurité ; c'était 
le printemps de l'espoir, c'était l'heure du désespoir ; nous 
avions tout devant nous, nous n'avions rien devant nous ; 
nous devions tous aller directement au Ciel, nous devions 
tous prendre l'autre chemin ; bref, l'époque était tellement 
différente de celle que vous vivons aujourd'hui que quelques- 
unes des plus tapageuses autorités ne parlaient d'elles, que 
ce fut en bien ou en mal, qu'au superlatif.`;

//calcul de la longueur de la phrase
let taille = phrase.length;

//Affichage de la longueur de la phrase
console.log(`La phrase contient ${taille} caractères.`);

//Mots de plus 5 lettres non suivis d'un espace
let words = phrase.match(/\p{L}{6,}\b(?![\s\p{L}'])/uig);
// p{L} permet de récupérer n'importe quelle lettre et pas seulement les caractères latins. 

console.log(`La phrase compte ${words.length} mots de plus 5 lettres non suivis d'un espace : ${words}.`);

// Suppression de tous les "[Cc]'était" et de l'espace supplémentaire
let phrase2 = phrase.replace(/c'était/ig,"").substring(1);

// Première lettre de la phrase en majuscule
let phrase3 = phrase2[0].toUpperCase() + phrase2.substring(1);

console.log(phrase3);
