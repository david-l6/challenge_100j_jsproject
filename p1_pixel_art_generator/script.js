// Sélectionne les éléments HTML par leur classe ou ID
let container = document.querySelector('.container');
let gridButton = document.getElementById('submit-grid');
let clearGridButton = document.getElementById('clear-grid');
let gridWidth = document.getElementById('width-range');
let gridHeight = document.getElementById('height-range');
let colorButton = document.getElementById('color-input');
let eraseBtn = document.getElementById('erase-btn');
let paintBtn = document.getElementById('paint-btn');
let widthValue = document.getElementById('width-value');
let heightValue = document.getElementById('height-value');

// Définition des événements en fonction du type de dispositif (souris ou tactile)
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend"
    },
};

// Initialisation du type de dispositif
let deviceType = "";

// Variables pour gérer l'état de dessin et d'effacement
let draw = false;
let erase = false;

// Fonction pour détecter si l'appareil est un dispositif tactile
const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

// Détermine le type de dispositif au chargement
isTouchDevice();

// Événement déclenché lors du clic sur le bouton de soumission de la grille
gridButton.addEventListener("click", () => {
    container.innerHTML = ""; // Réinitialise le conteneur
    let count = 0; // Compteur pour assigner des IDs uniques
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow"); // Ajoute la classe pour une rangée de la grille
        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement('div');
            col.classList.add("gridCol"); // Ajoute la classe pour une colonne de la grille
            col.setAttribute("id", `gridCol${count}`); // Assigne un ID unique
            // Événement pour le début du dessin ou de l'effacement
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                if (erase) {
                    col.style.backgroundColor = "transparent"; // Efface la couleur
                } else {
                    col.style.backgroundColor = colorButton.value; // Applique la couleur sélectionnée
                }
            });
            // Événement pour dessiner ou effacer en déplaçant
            col.addEventListener(events[deviceType].move, (e) => {
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                ).id;
                checker(elementId); // Vérifie et met à jour la couleur
            });
            // Événement pour arrêter de dessiner ou d'effacer
            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });
            div.appendChild(col); // Ajoute la colonne à la rangée
        }
        container.appendChild(div); // Ajoute la rangée au conteneur
    }
});

// Fonction pour vérifier l'élément et appliquer la couleur
function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

// Événement pour effacer la grille
clearGridButton.addEventListener("click", () => {
    container.innerHTML = '';
});

// Événement pour activer le mode effacement
eraseBtn.addEventListener("click", () => {
    erase = true;
});

// Événement pour activer le mode dessin
paintBtn.addEventListener("click", () => {
    erase = false;
});

// Événement pour mettre à jour l'affichage de la largeur
gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
});

// Événement pour mettre à jour l'affichage de la hauteur
gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

// Initialise les valeurs de la grille au chargement de la page
window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};