// Sélectionne les boutons d'option
let optionsButtons = document.querySelectorAll(".option-button");
// Sélectionne les boutons d'option avancée
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
// Sélectionne l'élément de sélection du nom de la police
let fontName = document.getElementById("fontName");
// Sélectionne l'élément de sélection de la taille de police
let fontSizeRef = document.getElementById("fontSize");
// Sélectionne la zone d'écriture
let writingArea = document.getElementById("text-input");
// Sélectionne le bouton pour créer des liens
let linkButton = document.getElementById("createLink");
// Sélectionne les boutons d'alignement
let alignButtons = document.querySelectorAll(".align");
// Sélectionne les boutons d'espacement
let spacingButtons = document.querySelectorAll(".spacing");
// Sélectionne les boutons de formatage
let formatButtons = document.querySelectorAll(".format");
// Sélectionne les boutons de script
let scriptButtons = document.querySelectorAll(".script");

// Liste des polices disponibles
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];

// Fonction d'initialisation
const initializer = () => {
    // Applique des surligneurs aux boutons d'alignement, d'espacement, de formatage et de script
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    // Remplit le menu déroulant des polices avec les polices disponibles
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // Remplit le menu déroulant des tailles de police de 1 à 7
    for(let i = 1; i <= 7; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    // Définit la taille de police par défaut sur 3
    fontSizeRef.value = 3;
};

// Fonction pour modifier le texte en utilisant document.execCommand
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

// Ajoute des écouteurs d'événements aux boutons d'option
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

// Ajoute des écouteurs d'événements aux boutons d'option avancée
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

// Ajoute un écouteur d'événement au bouton de création de lien
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter the URL");
    if(/http/i.test(userLink)){
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

// Fonction pour ajouter ou retirer la classe "active" pour les boutons
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if(needsRemoval){
                let alreadyActive = false;
                if(button.classList.contains("active")){
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if(!alreadyActive){
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

// Fonction pour enlever la classe "active" de tous les boutons dans une classe donnée
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

// Appelle la fonction d'initialisation lorsque la fenêtre se charge
window.onload = initializer();