//variables globales
let cleaned_words = [];
let dic_length = {};
let freq = {};
  



window.onload = function () {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function (e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function (e) {
                fileDisplayArea.innerText = reader.result;
                tokenization();
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}


// fonction pur afficher ou cacher l'aide sur la page principale
function help() {
    
    let aide = document.getElementById("help_section");
    let boutonAide = document.getElementById("help_button");
    let display = aide.style.display;
    
    if (display === "none") {
        aide.style.display = "block";
        boutonAide.innerText = "Cacher l'aide";
    } else {
        aide.style.display = "none";
        boutonAide.innerText = "Afficher l'aide";
    }
}

// fonction pour tokéniser le texte, appelée à la ligne 32
function tokenization (){    
    // récupération du contenu du fichier texte
    const output = document.getElementById("fileDisplayArea").innerText;   
    //récupération des délimiteurs de mots
    let delimiters = document.getElementById("delimID").value;


    //Corrections de la liste de délimiteurs pour éviter des erreurs dans l'expression régulière
    delim2 = delimiters.replace("-", "\\-"); //échappement du tiret, comme il entouré d'autres caractères, il sera considéré comme marquant un intervalle comme dans [4-9]
    delim2 = delim2.replace("[", "\\["); // échappement des crochets ouverts
    delim2 = delim2.replace("]", "\\]"); // échappement des crochets fermants
    delim2 = delim2 + "—"; //facultatif: ajout des tirets longs
    delim2 = delim2 + "\\s";//ajout de tous les symboles d'espacement


    //Construction de l'expression régulière pour découper les mots

    let word_regex = new RegExp("[" + //crochet ouvert pour signifier l'alternative 
        delim2 +
        "]", 'g'); // pour enlever plusieurs délimiteurs 


    let all_words = output.split(word_regex);
    
    cleaned_words = all_words.filter(x => x.trim() != '') // pour ne garder que les tokens non vides 

  

}

// fonction subsisiaire pour compter les mots en fonction de leur longueur
function text_to_dic (word_dic, list_tokens){
    
    for (let word of list_tokens) {
        if (word.length in word_dic) {
            word_dic[word.length]["freq"] += 1;
            if (word_dic[word.length]["elements"].includes(word.toLowerCase())) {

            }
            else {
                word_dic[word.length]["elements"].push(word.toLowerCase());
            }

        }
        else {
            word_dic[word.length] = {}
            word_dic[word.length]["freq"] = 1;
            word_dic[word.length]["elements"] = [word.toLowerCase()];

        }
    }


}

// fonction qui permet d'afficher le tableau qui liste les mots par nombre de caractères
function sort_words() {
     //balise pour écriture des résultats
    let result = document.getElementById("page-analysis");

    if (cleaned_words.length == 0) {
        
        document.getElementById("logger").innerHTML = '<span class="errorlog">Aucun résultat ! Veuillez sélectionner un fichier txt! </span>';
        return;
    }
   

    text_to_dic(dic_length, cleaned_words);


    let table = document.createElement("table");
    table.style.margin = "auto";
    let head = table.appendChild(document.createElement("tr"));
    head.innerHTML = "<th>Nombre de caractères</th><th>Nombre d'occurrences</th><th>Forme(s) unique(s)</th>";

    ordered = Object.keys(dic_length).sort((a, b) => a - b);

    for (let elem of ordered) {
        let row = table.appendChild(document.createElement("tr"));
        let cell_length = row.appendChild(document.createElement("td"));
        let cell_total = row.appendChild(document.createElement("td"));
        let cell_details = row.appendChild(document.createElement("td"));
        cell_length.innerHTML = elem;
        cell_total.innerHTML = dic_length[elem]["freq"];
        cell_details.innerHTML = dic_length[elem]["elements"].sort().join(', ') + ' (' + dic_length[elem]["elements"].length + ')';


    }

    result.innerHTML = `<p>Le  texte contient au total ${cleaned_words.length} mots.<p/>`;
    result.append(table);

}


//démo pour la visualisation des mots par nombre de caractères => camembert
function pie_chars() {
    
    
    //Création de listes pour peupler le dictionnaire data
    ordered = Object.keys(dic_length).sort((a, b) => a - b);

    let size_chars = [];


    for (let elem of ordered) {
        size_chars.push(dic_length[elem]["freq"]);
    }

    let data = { labels: ordered, series: size_chars };

    // Option d'affichage
    let options = {
        width: 400,
        height: 200
    };

    //Ecriture dans la page HTML

    document.getElementById('page-analysis').innerHTML = '';
    new Chartist.Pie("#page-analysis", data, options);
    
}

//fonction subsidiaire pour compter les cooccurrents
function count_sides (mot,dic, side){
    if (dic[mot]){
        dic[mot]["all"] += 1;
        if (dic[mot][side]){
            dic[mot][side] += 1;
        }
        else {
            dic[mot][side] = 1;
        }
    }
    else{
        dic[mot]={};
        dic[mot]["all"] = 1;
        dic[mot][side] = 1;
    }
}    



//décompte et affichage des cooccurrents par ordre alphabétique
function collocates(){

    let pivot = document.getElementById("poleID").value.trim();
    let dist = Number(document.getElementById("lgID").value.trim());
     //balise pour écriture des résultats
    let result = document.getElementById("page-analysis");

   
  
    let word = pivot.toLowerCase();
    if (word.length==0) {
        document.getElementById("logger").innerHTML = '<span class="errorlog">Le pôle n\'est pas renseigné !</span>';
        return;
    }
    
    else if (cleaned_words.includes(word)) {
        for (let n=-1; n < cleaned_words.length; n++){     
       
            if (cleaned_words[n]==word){
                let start = Math.max(n - dist, 0);
                let end = Math.min(n + dist, cleaned_words.length);
                let lc = cleaned_words.slice(start, n);
                let rc = cleaned_words.slice(n+1, end+1);              
              
                for (let token of lc){
                    count_sides(token.toLowerCase(), freq, "left");
                }

                for (let token of rc){
                    count_sides(token.toLowerCase(), freq, "right");
                }               
         
            }

        }    

    }    

    else {
        document.getElementById("logger").innerHTML = '<span class="errorlog">Ce mot ne se trouve pas dans le fichier texte !</span>';
        return;
    }

    let table = document.createElement("table");
    table.style.margin = "auto";
    let head = table.appendChild(document.createElement("tr"));
    head.innerHTML = "<th>Cooccurrent(s)</th><th>Co-fréquence</th><th>Fréquence gauche</th><th>% Fréquence gauche</th><th>Fréquence droite</th><th>% Fréquence droite</th>";

  
    for (let elem of  Object.keys(freq).sort()) {
        let row = table.appendChild(document.createElement("tr"));
        let cell_colloc = row.appendChild(document.createElement("td"));
        let cell_all_freq = row.appendChild(document.createElement("td"));
        let cell_freql = row.appendChild(document.createElement("td"));
        let cell_freql_perc = row.appendChild(document.createElement("td"));
        let cell_freqr = row.appendChild(document.createElement("td"));
        let cell_freqr_perc = row.appendChild(document.createElement("td"));
        cell_colloc.innerHTML = elem;
        cell_all_freq.innerHTML  = freq[elem]["all"];
        if (freq[elem]["left"]){
            cell_freql.innerHTML  = freq[elem]["left"];
            cell_freql_perc.innerHTML  =((freq[elem]["left"]/ freq[elem]["all"]) * 100).toFixed(1);
        }

        else{
            cell_freql.innerHTML  = 0;
            cell_freql_perc.innerHTML  =0;
        }


        if (freq[elem]["right"] ){
            cell_freqr.innerHTML  = freq[elem]["right"];
            cell_freqr_perc.innerHTML  = ((freq[elem]["right"]/ freq[elem]["all"]) * 100).toFixed(1);
        }
        else{
            cell_freqr.innerHTML  = 0;
            cell_freqr_perc.innerHTML  =0;
        }

       
    }

    result.append(table);   


}


//visualisation de tous les cooccurrents par ordre alphabétique même si cela peut parfois être illisible
function collocates_viz(){

    let pivot = document.getElementById("poleID").value.trim();
    let dist = Number(document.getElementById("lgID").value.trim());
     //balise pour écriture des résultats
    let result = document.getElementById("page-analysis");

   
  
    let word = pivot.toLowerCase();
    if (word.length==0) {
        document.getElementById("logger").innerHTML = '<span class="errorlog">Le pôle n\'est pas renseigné !</span>';
        return;
    }
    
    else if (cleaned_words.includes(word)) {
        for (let n=-1; n < cleaned_words.length; n++){     
       
            if (cleaned_words[n]==word){
                let start = Math.max(n - dist, 0);
                let end = Math.min(n + dist, cleaned_words.length);
                let lc = cleaned_words.slice(start, n);
                let rc = cleaned_words.slice(n+1, end+1);              
              
                for (let token of lc){
                    count_sides(token.toLowerCase(), freq, "left");
                }

                for (let token of rc){
                    count_sides(token.toLowerCase(), freq, "right");
                }               
         
            }

        }    

    }    

    else {
        document.getElementById("logger").innerHTML = '<span class="errorlog">Ce mot ne se trouve pas dans le fichier texte !</span>';
        return;
    }

    let co_freq = [];
    let lfreq = [];      
    let rfreq = [];
  

    for (c of Object.keys(freq).sort()){
        co_freq.push(freq[c]['all']);
        if (freq[c]['left']){
            lfreq.push(freq[c]['left']);            
        }
        else {
            lfreq.push(0);
        }

        if (freq[c]['right']){
            rfreq.push(freq[c]['right']);
        }
        else {
            rfreq.push(0);
        }
    }

    
    let data = {
        labels:  Object.keys(freq).sort(),
        series: [co_freq, lfreq, rfreq] // notez les doubles parenthèses comparé à Camembert : on peut gérer plusieurs séries de chiffres (plusieurs barres à chaque label)
    };

    let options = {
        width: 500,
        height: 300,
        horizontalBars: true
    };

    document.getElementById('page-analysis').innerHTML = '';
    new Chartist.Bar("#page-analysis", data, options);


}
