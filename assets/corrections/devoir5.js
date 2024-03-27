/*Initialisation du poème en intégrant le titre et 
en gardant la mise en page d'origine (lignes vides entre les strophes)*/

let poem = `LA MUSIQUE

  La musique souvent me prend comme une mer!
      Vers ma pâle étoile,
  Sous un plafond de brume ou dans un vaste éther,
      Je mets à la voile;

  La poitrine en avant et les poumons gonflés
      Comme de la toile,
  J'escalade le dos des flots amoncelés
      Que la nuit me voile;

  Je sens vibrer en moi toutes les passions
      D'un vaisseau qui souffre;
  Le bon vent, la tempête et ses convulsions

      Sur l'immense gouffre
  Me bercent.--D'autres fois, calme plat, grand miroir
      De mon désespoir!`;

/*La première tâche est de compter les n mots les plus fréquents du poème:
cela suppose d'identifier chaque mot et de connaître son nombre d'occurrences.
J'ai choisi de créer une liste contenant tous les vers poème, ce qui permettra de 
supprimer le titre et ensuite de compter les mots de chaque vers.*/

//Création d'un tableau contenant toutes les lignes du poème
let lines = poem.split('\n'); 

//Création d'un tableau contenant uniquement les vers du poème (à partir de la 2e ligne)
let all_vers = lines.splice(2);

//Création d'un tableau contenant tous les mots du poème et d'un dictionnaire de fréquence
/*Pour le dictionnaire, j'ai gardé la syntaxe vue en cours, mais on peut faire plus court.
En parallèle, je compte aussi tous les mots du poème pour pouvoir calculer
ensuite la richesse lexicale du poème.*/

let all_mots = [] ;
let freq_mots = {};

all_vers.forEach (vers => {
    if (vers.length>0){
        vers = vers.trim ();
        vers = vers.replace(/([,;!]|--)/g,'');
        vers = vers.replace(/\./g,' ');
        vers = vers.replace(/'/g,"' ");
        mots = vers.toLowerCase().split(' ');
        mots.forEach( mot => {
            all_mots.push(mot);
            if (freq_mots.hasOwnProperty(mot)==false){
                freq_mots[mot.toLowerCase()] = 1;
             }
             else{
                freq_mots[mot.toLowerCase()] += 1;
             }})
    }
})

//Affichage des cinq mots les plus fréquents
/*On va inverser les clés et les valeurs du tableau précédent et les stocker dans un nouveau dictionnaire/tableau:
associer un nombre d'occurrences à la liste de mots correspondante*/
let valeurs= {};
let top_cinq = [];

for (elem of Object.keys(freq_mots)){
    if (valeurs.hasOwnProperty(freq_mots[elem])==false){
        valeurs[freq_mots[elem]] = [elem];
     }
     else{
        valeurs[freq_mots[elem]].push(elem);
     }
}

/*Les clés d'un dictionnaire constituent une liste. On va l'ordonner par ordre 
décroissant*/
let freq_croiss = Object.keys(valeurs).reverse();

/*On peut alors faire une boucle dans cette liste pour et accéder à la liste de mots associée
pour ne garder que les cinq mots les plus fréquents*/
for (item of freq_croiss){
    for (word of valeurs[item]){
         if (top_cinq.length<5){
             top_cinq.push(word);
         }
      }
 }
 
//Affichage des 5 mots les plus fréquents
console.log(`Les cinq les plus fréquents sont ${top_cinq}.`);


/* Calcul de la richesse lexicale du poème : nombre de mots du premier dictionnaire/tableau
de fréquence (chaque clé étant unique, aucune mot n'est répété) que l'on
divise par le nombre total de mots obtenu lorsque l'on identifiait les mots
du poème.*/
let lexical_richness = Object.keys(freq_mots).length/all_mots.length

//Afficahe de la richesse lexicale du poème
console.log(`La richesse lexicale du poème est de ${lexical_richness}.`);


//Calcul du nombre de phrases du poème
/*Je ne tiens compte ici que des fins de phrases présentes dans mon poème. 
Il existe des subtilités comme les trois points de suspension ou encore des points
d'exclamation ou d'interrogation suivis d'une minuscule. Premièrement, je 
transforme mes vers en une chaîne de caractères que je vais découper (split) en utilisant
les signes de ponctuation indiquant une fin de phrase. */

let text_string = all_vers.join(' ');

let phrases = text_string.split(/[\.!][\s-]/g);

console.log(`Le poème contient ${phrases.length} phrases.`);

//Décompte des strophes
/*Une strophe correspond à un ensemble de lignes non vides consécutives.
Je crée une liste qui stockera toutes mes strophes (une strophe = une liste).
Je commence par créer une liste temporaire. 
Je vais lire chaque ligne et la stocker dans ma liste temporaire
si elle n'est pas vide. Si elle est vide, j'ajoute ma liste temporaire à ma 
liste de strophes et remet ma liste temporaire à zéro.
Puisqu'il n'y a normalement pas d'espace après la dernière strophe, il faudra
prévoir une autre condition pour pouvoir l'ajouter: ici, si j'ai atteint le derniers vers.
*/

let strophes = [];
let temp = [];

all_vers.forEach (vers => {
    if (vers.length===0){
        strophes.push(temp);
        temp = [];
    }
    else if (vers===all_vers[all_vers.length-1]){       
        temp.push(vers);
        strophes.push(temp);
    }
    else {
        temp.push(vers);
    }
   

})

//Typologie des strophes
/* On va lire notre liste de strophes, puis grâce à un dictionnaire,
associer au nombre de vers (taille de chaque liste/strophe), l'indice correspondant
(on utilise  des listes car plusieurs strophes peuvent avoir le même nombre de vers et
    on ajoute 1 parce que les indices commencent à 0).*/

let type_strophes = {};
for (liste_vers of strophes){
    if (type_strophes.hasOwnProperty(liste_vers.length)==false){
        type_strophes[liste_vers.length] = [strophes.indexOf(liste_vers)+1];
     }
     else{
        type_strophes[liste_vers.length].push(strophes.indexOf(liste_vers)+1);
     }


}

//Affichage de la typologie des strophes
/* On fait une boucle dans notre dictionnaire contenant le nombre de vers et les strophes associées pour afficher
le nombre d'occurrences de chaque type de strophes (longueur de la valeur => liste), le nombre de  vers (clé) et les
strophes concernées (valeur). 
 */
console.log(`Le poème contient ${strophes.length} strophes dont:`);

for (ens_lignes of Object.keys(type_strophes)){
    console.log(`${type_strophes[ens_lignes].length} strophes de ${ens_lignes} lignes [${type_strophes[ens_lignes]}].`);
}


//Décompte des syllabes
/*On part du principe qu'une syllabe doit forcément contenir une voyelle ou plusieurs voyelles consécutives.
Dans chaque ligne/vers non vide,on va compter le nombre de syllabes uniques ou consécutives. Bien sûr, il y a des exceptions 
comme le e précédé d'un é ou encore avec les i.
J'ai enlevé les espaces pour tenir compte d'éventuelles liaisons.
Pour faciliter le décompte des syllabes, je commence par créer une liste contenant uniquement les vers (lignes non vides)
On stocke le nombre de syllabes dans un dictionnaire et l'associe à l'indice du vers correspondant
(auquel on ajoute 1 car l'index des listes commence à 0).*/

let type_syll = {};

let cleaned_vers= [];


for (vers of all_vers) {    
    if (vers.length>0){ 
        cleaned_vers.push(vers);      
    }
}

for (let line of cleaned_vers){
        sans_espace = line.trim().replace(/\s/g,'');       
        let syll = sans_espace.match(/[aàâiîeéèêoôuù]{1,}/g).length;
        if (syll>0){
        
            if (type_syll.hasOwnProperty(syll)==false){
                type_syll[syll] = [cleaned_vers.indexOf(line)+1];
            }
            else{
            type_syll[syll].push(cleaned_vers.indexOf(line)+1);
            }   
                                    
        }      
        
}   



//Affichage du nombre des syllabes des vers 
/* Comme précédemment, on fait une une boucle dans notre dictionnaire contenant le nombre de syllabes
et les indices des vers associés. On affiche le nombre d'occurrences (longueur de la valeur => liste) 
de chaque nombre de syllabes, le nombre de  syllabes (clé) et les vers concernés (valeur = liste). 

 */
console.log(`Le poème contient également:`);

for (count_syll of Object.keys(type_syll)){
    console.log(`${type_syll[count_syll].length} vers de ${count_syll} syllabes [${type_syll[count_syll]}].`);
}
