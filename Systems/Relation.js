const { interpret } = require("xstate");

// Importation des Systèmes
const electricityMachine = require("./Electricity");
const oxygenMachine = require("./Oxygen");
const gridMachine = require("./Grid");
const waterMachine = require("./Water");
const eatMachine = require("./Nouriture");
const propulsionMachine = require("./Propulsion");
const stablisateurMachine = require("./Stabilisateur");
const heatMachine = require("./Thermique");
// TODO importer le reste des systèmes

// Création des Instances
const electricityService = interpret(electricityMachine).start();
const oxygenService = interpret(oxygenMachine).start();
const gridService = interpret(gridMachine).start();
const waterService = interpret(waterMachine).start();
const eatService = interpret(eatMachine).start();
const propulsionService = interpret(propulsionMachine).start();
const stabilisateurService = interpret(stablisateurMachine).start();
const heatService = interpret(heatMachine).start();

// TODO Créer les autres instance pour le reste des systèmes

// * Générateurs :

//  Transition des système dépendant directement des générateurs vers le OFF quand le générateur est sur OFF
gridService.onTransition((state) => {
    if (state.matches("OFF")) {
        electricityService.send("TURN_OFF");
        propulsionService.send("TURN_OFF");
        stabilisateurService.send("TURN_OFF");
    }
});
//  Transition des système dépendant directement des générateurs vers le ON quand le générateur est réactivé
gridService.onTransition((state) => {
    if (state.matches("Primary")) {
        electricityService.send("TURN_ON");
        propulsionService.send("TURN_ON");
        stabilisateurService.send("TURN_OFF");
    }
});
//  Transition des système dépendant directement des générateurs vers le Bridged quand le génrateur est sur Emergency
gridService.onTransition((state) => {
    if (state.matches("Emergency")) {
        electricityService.send("TURN_BRIDGED");
        propulsionService.send("TURN_OFF");
        stabilisateurService.send("TURN_ON");
    }
});

// * Electricité :

//  Transition des système dépendant de l'électricité vers le OFF quand l'électricité est couper
electricityService.onTransition((state) => {
    if (state.matches("Off")) {
        oxygenService.send("TURN_OFF");
        waterService.send("TURN_OFF");
        eatService.send("TURN_OFF");
    }
});
//  Transition des système dépendant de l'électricité vers le ON quand l'électricité est remise
electricityService.onTransition((state) => {
    if (state.matches("On")) {
        oxygenService.send("TURN_ON");
        waterService.send("TURN_ON");
        eatService.send("TURN_ON");
    }
});
//  Transition des système dépendant de l'électricité vers le OFF quand l'électricité est Bridged
electricityService.onTransition((state) => {
    if (state.matches("Emergency")) {
        eatService.send("TURN_OFF");
        heatService.send("TURN_OFF");
        oxygenService.send("TURN_ON");
        waterService.send("TURN_ON");
    }
});

// * Oxygène :

//  Transition des système dépendant de l'oxygène vers le OFF quand l'oxygène est couper
electricityService.onTransition((state) => {
    if (state.matches("Off")) {
        heatService.send("TURN_OFF");
    }
});

// * Eau :

//  Transition des système dépendant de l'eau vers le OFF quand l'eau est couper
electricityService.onTransition((state) => {
    if (state.matches("Off")) {
        heatService.send("TURN_OFF");
    }
});

module.exports = {
    electricityService,
    oxygenService,
    gridService,
    waterService,
    eatService,
    propulsionService,
    stabilisateurService,
    heatService,
    // TODO Exporter les autres services des instance
};
