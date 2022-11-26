let newnom = document.getElementById('nom');
let newpostnom = document.getElementById('postnom');
let newprenom = document.getElementById('prenom');
let newpays = document.getElementById('pays');
let newgenres = document.getElementsByName('genre');
let newgithub = document.getElementById('github');
let newmasculin = document.getElementById('btnM');
let newfeminin = document.getElementById('btnF')

let formulaire = document.getElementById('form')

let corpsdutableau = document.getElementById('tableau')

let editionMode = false
let etatBouton = document.getElementById("boutonEnvoie")
let apprenantModifie = null;

nettoyerChamps()
editionModeActif()

let listeApprenants = []

function chargerTableau() {
    corpsdutableau.innerHTML = ''
    for (const apprenant of listeApprenants) {
        let maquette = `
        <tr>
             <td>${apprenant.nom}</td>
             <td>${apprenant.postnom}</td>
             <td>${apprenant.prenom}</td>
             <td>${apprenant.genre}</td>
             <td>${apprenant.pays}</td>
             <td>
                 <a href="${apprenant.github}"></a>${apprenant.github}</td>
             <td>
                 <button class="btn btn-danger" onclick='supprimerApprenant(this, ${listeApprenants.indexOf(apprenant)})'>Supprimer</button>
                 <button class="btn btn-primary" data-nom="${apprenant.nom}" data-postnom="${apprenant.postnom}" data-prenom="${apprenant.prenom}"
                 data-genre="${apprenant.genre}" data-pays="${apprenant.pays}" data-github="${apprenant.github}"
                 onclick="modifierApprenant(this)">Modifier</button>
             </td>
        </tr>
    `
        corpsdutableau.innerHTML += maquette
    }
}


formulaire.addEventListener('submit', function(event) {
    event.preventDefault();

    if (editionMode) {
        mettreAjourApprenant()
    } else {
        ajouterApprenant()
    }
    nettoyerChamps();
})

function nettoyerChamps() {
    newnom.value = "";
    newpostnom.value = "";
    newprenom.value = "";
    newpays.value = "";
    newgithub.value = "";

    newnom.focus();
}

function supprimerApprenant(e, index) {
    let confirmation = window.confirm("Voulez vous vraiment supprimer cet etudiant ?")
    if (confirmation == true) {
        listeApprenants.splice(index, 1)
        alert("L'apprenant a été supprimé avec succes !!!")

        chargerTableau()

        nettoyerChamps()

        liste()

        // let confirmation = window.confirm("Voulez vous vraiment supprimer cet etudiant ?")
        // if (confirmation == true) {
        //     let asupprimer = e.parentNode.parentNode
        //     e.parentNode.parentNode.remove()
        //     alert("L'apprenant a été supprimé avec succes !!!")
        //     nettoyerChamps()

    }

}

function ajouterApprenant() {
    corpsdutableau.innerHTML = ''
    for (const gr of newgenres) {
        if (gr.checked) {
            var newGenreValue = gr.value;
        }
    }
    let apprenant = {
        'nom': newnom.value,
        'postnom': newpostnom.value,
        'prenom': newprenom.value,
        'pays': newpays.value,
        'genre': newGenreValue,
        'github': newgithub.value
    }

    listeApprenants.push(apprenant)
    chargerTableau()

}

function editionModeActif(enabled) {
    if (enabled) {
        editionMode = true
        etatBouton.innerHTML = "Modifier"
    } else {
        editionMode = false
        etatBouton.innerHTML = "Ajouter"
        apprenantModifie = null
        nettoyerChamps()
    }
}

function modifierApprenant(e) {
    editionModeActif(true)
    newnom.value = e.dataset.nom
    newpostnom.value = e.dataset.postnom
    newprenom.value = e.dataset.prenom

    if (e.dataset.genre == 'Masculin') {
        newmasculin.checked = true
    } else if (e.dataset.genre = 'Feminin') {
        newfeminin.checked = true
    }
    newpays.value = e.dataset.pays
    newgithub.value = e.dataset.github

    apprenantModifie = listeApprenants.find((t) => t.nom == e.dataset.nom &&
        t.postnom == e.dataset.postnom && t.prenom == e.dataset.prenom)


}

function mettreAjourApprenant() {

    let confirmation = window.confirm("Les informations de cet apprenant seront modifiées, voulez-vous continuer ?")
    if (confirmation == true) {
        for (const gr of newgenres) {
            if (gr.checked) {
                apprenantModifie.genre = gr.value;
            }
        }
        apprenantModifie.nom = newnom.value
        apprenantModifie.postnom = newpostnom.value
        apprenantModifie.prenom = newprenom.value
        apprenantModifie.pays = newpays.value
        apprenantModifie.github = newgithub.value

        chargerTableau()
        editionModeActif(false)
    } else {
        chargerTableau()
        editionModeActif(false)
    }

}

const homme = document.createElement("ol")
const femme = document.createElement("ol")

function liste() {
    homme.innerHTML = ''
    femme.innerHTML = ''
    for (let i = listeApprenants.length - 1; i >= 0; i--) {
        if (listeApprenants[i].genre == "Masculin") {
            const nomsElement = document.createElement("li")
            nomsElement.innerText = listeApprenants[i].nom + " " + listeApprenants[i].postnom + " " + listeApprenants[i].prenom
            homme.appendChild(nomsElement)
        } else {
            const nomsElement = document.createElement("li")
            nomsElement.innerText = listeApprenants[i].nom + " " + listeApprenants[i].postnom + " " + listeApprenants[i].prenom
            femme.appendChild(nomsElement)
        }
    }
    document.querySelector(".divhomme").appendChild(homme)
    document.querySelector(".divfemme").appendChild(femme)
}

formulaire.addEventListener('submit', function() {
    liste()
});