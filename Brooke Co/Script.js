var listeProduit;
var panierCache=true;




function chargerZoneItems(){
    var xhr = new XMLHttpRequest();
    try{
        xhr= new ActiveXObject("Max12.XMLHTTP");
        
    }
    catch(e){
        try{
            xhr= new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(el){
            try{
                xhr=new XMLHttpRequest();
            }
            catch(e2){
                xhr=false;
            }
        }
    }
    xhr.open("GET","book1.json",false);xhr.send();
    if (xhr.readyState==4){
        var reponse = xhr.responseText;
        alert(reponse);
        var objJSON = JSON.parse(reponse);
        listeProduit = objJSON.liste;
        afficherListeProduit();
    }
}// chargerZoneItems

function afficherListeProduit(){
    alert("test1");
    listeProduit.forEach(function(items){


        var item = items.item;
        var titre = items.titre;
        var auteur = items.auteur;
        var genre = items.genre;
        var type= items.type;
        var edition = items.edition;
        var date = items.date;
        var pages = items.pages;
        var code = items.code;
        var prix = items.prix;
        var image = items.image;
        alert(titre+" "+image+" " +prix);
        
        var noeudDivItem = document.createElement("div");
        noeudDivItem.setAttribute("class","items");
        
        var noeudItem = document.createElement("div");
        noeudItem.setAttribute("class","item");
        noeudItem.appendChild(document.createTextNode(item));
        noeudDivItem.appendChild(noeudItem);
        
        var noeudTitre = document.createElement("div");
        noeudTitre.setAttribute("class","titre");
        noeudTitre.appendChild(document.createTextNode(titre));
        noeudDivItem.appendChild(noeudTitre);
        
        var noeudAuteur = document.createElement("div");
        noeudAuteur.setAttribute("class","auteur");
        noeudAuteur.appendChild(document.createTextNode(auteur));
        noeudDivItem.appendChild(noeudAuteur);
        
        var noeudGenre = document.createElement("div");
        noeudGenre.setAttribute("class","genre");
        noeudGenre.appendChild(document.createTextNode(genre));
        noeudDivItem.appendChild(noeudGenre);
        
        var noeudType = document.createElement("div");
        noeudType.setAttribute("class","type");
        noeudType.appendChild(document.createTextNode(type));
        noeudDivItem.appendChild(noeudType);
        
        var noeudEdition = document.createElement("div");
        noeudEdition.setAttribute("class","edition");
        noeudEdition.appendChild(document.createTextNode(edition));
        noeudDivItem.appendChild(noeudEdition);
        
        var noeudDate = document.createElement("div");
        noeudDate.setAttribute("class","date");
        noeudDate.appendChild(document.createTextNode(date));
        noeudDivItem.appendChild(noeudDate);
        
        var noeudPages = document.createElement("div");
        noeudPages.setAttribute("class","pages");
        noeudPages.appendChild(document.createTextNode(pages));
        noeudDivItem.appendChild(noeudPages);
        
        var noeudCode = document.createElement("div");
        noeudCode.setAttribute("class","code");
        noeudCode.appendChild(document.createTextNode(code));
        noeudDivItem.appendChild(noeudCode);
        
        var noeudPrix = document.createElement("div");
        noeudPrix.setAttribute("class","prix");
        noeudPrix.appendChild(document.createTextNode(prix));
        noeudDivItem.appendChild(noeudPrix);
        
        var noeudImage = document.createElement("img");
        noeudImage.setAttribute("class","imageItem");
        noeudImage.setAttribute("src", image);
        noeudDivItem.appendChild(noeudImage);
        
        var noeudBtnAjouter = document.createElement("div");
        noeudBtnAjouter.setAttribute("class","ajouter");
        noeudBtnAjouter.appendChild(document.createTextNode("Ajouter"));
        noeudDivItem.appendChild(noeudBtnAjouter);
        
        document.getElementsById("zoneContenuItem").appendChild(noeudDivItem);

       
        
    });
}// afficherListeProduit

function valider(){
    var utilisateur=document.forms["idlogin"].elements["idnomUtilisateur"].value;// check id's
    var motDePasse=document.forms["idlogin"].elements["idmotDePasse"].value;// check id's
    if(utilisateur=="user"&& motDePasse=="password"){
        location="index.html"
    } else { 
        document.getElementById("iderreurLogin").style.display="block";
        
    }
}// valider

function validerFormulaire(){
    var courriel=document.forms["idformulaire"].elements["idcourriel"].value;
    var courrielConfirm=document.forms["idformulaire"].elements["idcourrielConfirm"].value;
    if (courriel==courrielConfirm){
        location="index.html"
    } else { 
        document.getElementById("iderreurForm").style.display="block";
        document.getElement("idmotDePasse").reset();
    }
}// validerFormulaire



function afficherImages(){
    
    var tabImages = ["PROMOTION/001.jpg","PROMOTION/002.jpg","PROMOTION/003.jpg","PROMOTION/004.jpg","PROMOTION/005.jpg","PROMOTION/006.jpg","PROMOTION/007.jpg","PROMOTION/008.jpg","PROMOTION/009.jpg","PROMOTION/010.jpg",];
    var tabPrix2 = ["$35.88","$45.88","$34.34","$23.95","$36.99","$40.00","$27.99","$25.88","$60.88","$25.25",]
    
    
    document.getElementById("idImage2").src = tabImages[0];
    document.getElementById("idPrix2").value = listeItemss[0][9];
    var i=1;
    setInterval(function(){
        
        document.getElementById("idImage2").src = tabImages[i];
        document.getElementById("idPrix2").innerHTML = "$"+listeItemss[i][9];
        document.getElementById("idDetails").innerHTML = listeItemss[i][1];
        i++;
        if(i==10){
            i=0;
        }
    },3000);
    
    
}// afficherImages


function ajouterItems(produit, details,quantite, prix){
    
    var nouvelleLigne="<tr>";
    nouvelleLigne +="<td>" + produit + "</td>";
    nouvelleLigne +="<td>" + details + "</td>";
    nouvelleLigne +="<td>" + quantite + "</td>";
    nouvelleLigne +="<td>" + prix + "</td>";
    
    nouvelleLigne +="</td>";
    
    var ancienContenu = document.getElementById("corpsTableau").innerHTML;
    var nouveauContenu= ancienContenu + nouvelleLigne;
    document.getElementById("corpsTableau").innerHTML = nouveauContenu;
    
    var nombreItemsPanier= parseInt(document.getElementById("idItems").innerHTML);
    nombreItemsPanier += parseInt(quantite);
    document.getElementById("idItems").innerHTML = nombreItemsPanier;
    total=total+(quantite*prix);
}

/* ---------------------------------------------------------------------- */

function afficherFacture(){
    console.log(total);
    
    if(panierCache==true){
        
        document.getElementById("zoneContenuItems").style.display="none";
        document.getElementById("zoneContenuFacture").style.display="block";
        document.getElementById("zoneContenuPanier").style.display="block";
        panierCache = false;
        
    } else {
        document.getElementById("zoneContenuItems").style.display="block";
        document.getElementById("zoneContenuFacture").style.display="none";
        document.getElementById("zoneContenuPanier").style.display="none";
        panierCache = true;
        
    }
    document.getElementById("idTotalPanier").innerHTML = total.toFixed(2);
}

//document.getElementById("idprix2").innerHTML=listeItemss[0][9];

function totalPanier(){
    console.log(total);
}


/* Creation de la liste(tableau) 
let total = 0;
var listeItemss=[
    ["001", "New Thinking","Dagogo Altraide", "informatique", "imprime","Mango Media",  "15 janvier 2019","280","1633537507","22.99"],
    ["002", "Clean Code","Robert C. Martin","informatique", "imprime","Prentice Hall","1 aout 2008","464","9780132350884", "46.10"],
    ["003", "Refactoring(Java)","Fowler Martin","informatique","imprime","Addison-Wesley", "9 mars 2012","431","B007WTFWJ6", "51.99"],
    ["004", "Refactoring(JavaScript)","Fowler Martin","informatique", "imprime","Addison-Wesley", "20 novembre 2018","432","B07LCM8RG2","53.80"],
    ["005", "HTML & CSS", "Jon Duckett","informatique","imprime","Wiley","8 novembre 2011","512","1118008189","29.76"],
    ["006", "JavaScipt & JQuery","Jon Duckett","informatique","imprime","Wisley","20 avril 2021","640","B0933FXPCN","45.10"],
    ["007", "Algorithms","Adita Bhargava","informatique","imprime","Manning Publications","30 mai 2016","256","1617292230","51.47"],
    ["008", "Web Design","Stefan Mischook","informatique","imprime","HOW Books","21 juillet 2015","224","1440341125","52.11"],
    ["009", "Effective Java","Joshua Bloch","informatique","imprime","Pearson","27 decembre 2017","416"," 0134685997","57.91"],
    ["010", "Clean Architecture","Robert Martin","informatique","imprime","Prentice hall","10 septembre 2017","432","0134494164","36.50"],
    ["011", "Design Patterns","Richard Helm","informatique","imprime","Addison-Wesley","31 octobre 1994","416","0201633612","60.73"],
    ["012", "War Of Art","Steven Pressfield","informatique","imprime","Black Irish ent.","11 janvier 2012","190","1936891026","16.78"],
    ["013", "Automate The Boring Stuff With Python","Al Sweigart","informatique","imprime","No Starch Press","12 novembre 2019","592","1593279922","45.35"],
    ["014", "Kali Linux Revealed","Raphael Hertzog","informatique","imprime","Offsec Press","5 juin 2017","342","0997615605","36.85"],
    ["015", "Eloquent JavaScript","Marijn Haverbeke","informatique","imprime","No Starch Press","4 decembre 2018","472","1593279507","43.86"],
    ["016", "The Pragmatic Programmer","David Thomas","informatique","imprime","Addison-Wesley","13 septembre 2019","352","0135957052","45.00"],
    ["017", "The Clean Coder","Robert Martin","informatique","imprime","Prentice hall","13 mai 2011","256"," 0137081073","55.99"],
    ["018", "Python Crash Course","Eric Matthes","informatique","imprime","No Starch Press","3 mai 2019","544","1593279280","34.00"],
    ["019", "The Principles Of OOP in Javascript","Nicholas Zakas","informatique","imprime","No Starch Press","14 fevrier 2014","120"," 9781593275402","32.67"],
    ["020", "Effective Modern C++","Scott Meyers","informatique","imprime","O'Reilly","5 decembre2014","334","9781491903995","51.33"]
];

*/
