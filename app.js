(() => {
    // Récupération des éléments du DOM
    const touches = [...document.querySelectorAll('.button')];
    const listeKeycode = touches.map(touche => touche.dataset.key);
    const ecran = document.querySelector('.ecran');

    // Ajout des écouteurs d'événements pour le clavier et les clics
    document.addEventListener('keydown', (e) => {
        const valeur = e.key;
        calculer(valeur);
    });

    document.addEventListener('click', (e) => {
        const valeur = e.target.dataset.key;
        calculer(valeur);
    });

    const ajusterTailleTexte = () => {
        let taille = 30; 
        ecran.style.fontSize = `${taille}px`;

        while (ecran.scrollWidth > ecran.clientWidth && taille > 10) {
            taille -= 1;
            ecran.style.fontSize = `${taille}px`;
        }

        if (ecran.scrollWidth > ecran.clientWidth) {
            ecran.style.overflowX = 'auto';
        } else {
            ecran.style.overflowX = 'hidden';
        }
    };

    const calculer = (valeur) => {
        if (listeKeycode.includes(valeur)) {
            switch(valeur) {
                case '8': 
                    ecran.textContent = "";
                    break;
                case '13': 
                    try {
                        let expression = ecran.textContent;
                        expression = ajouterMultiplicationImplicite(expression);
                        const resultat = evaluerExpression(expression);
                        ecran.textContent = resultat;
                    } catch (error) {
                        ecran.textContent = "Erreur";
                    }
                    break;
                default:
                    const indexKeyCode = listeKeycode.indexOf(valeur);
                    const touche = touches[indexKeyCode];
                    if (touche) {
                        ecran.textContent += touche.innerHTML;
                    }
            }

            ajusterTailleTexte();
        }
    };

    const ajouterMultiplicationImplicite = (expression) => {
        return expression.replace(/(\d)(\()/g, '$1*(').replace(/(\))(\d|\()/g, '$1*$2');
    };

    const evaluerExpression = (expression) => {
        return Function(`"use strict"; return (${expression})`)();
    };
})();
