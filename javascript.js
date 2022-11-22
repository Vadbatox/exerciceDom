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

NettoyerChamps()
editionModeActif()

let listeApprenants = [

    {
        'nom': "Batomene",
        'postnom': "Luyambula",
        'prenom': "Vad",
        'pays': "RD Congo",
        'genre': "Masculin",
        'github': "https://github.com/Vadbatox"

    },

    {
        'nom': "Katoto",
        'postnom': "Mbula",
        'prenom': "Percide",
        'pays': "RD Congo",
        'genre': "Feminin",
        'github': "https://github.com/Katox"

    },

    {
        'nom': "Mbuyi",
        'postnom': "Mwamba",
        'prenom': "Monica",
        'pays': "RD Congo",
        'genre': "Feminin",
        'github': "https://github.com/Sloe"

    },

    {
        'nom': "Nzau",
        'postnom': "Ngana",
        'prenom': "Gaithan",
        'pays': "RD Congo",
        'genre': "Masculin",
        'github': "https://github.com/Gaga"

    }
]

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
                 <button class="btn btn-danger" onclick='supprimerApprenant(this)'>Supprimer</button>
                 <button class="btn btn-primary" data-nom="${apprenant.nom}" data-postnom="${apprenant.postnom}" data-prenom="${apprenant.prenom}"
                 data-genre="${apprenant.genre}" data-pays="${apprenant.pays}" data-github="${apprenant.github}"
                 onclick="modifierApprenant(this)">Modifier</button>
             </td>
        </tr>
    `
        corpsdutableau.innerHTML += maquette
    }
}

chargerTableau();

formulaire.addEventListener('submit', function(event) {
    event.preventDefault();

    if (editionMode) {
        mettreAjourApprenant()
    } else {
        ajouterApprenant()
    }
    NettoyerChamps();
})

function NettoyerChamps() {
    newnom.value = "";
    newpostnom.value = "";
    newprenom.value = "";
    newpays.value = "";
    newgithub.value = "";

    newnom.focus();
}

function supprimerApprenant(e) {

    let confirmation = window.confirm("Voulez vous vraiment supprimer cet etudiant ?")
    if (confirmation == true) {
        e.parentNode.parentNode.remove();
        alert("L'apprenant a été supprimé avec succes !!!")
        NettoyerChamps()
    }

}

function ajouterApprenant() {
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
        NettoyerChamps()
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