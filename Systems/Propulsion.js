const { createMachine } = require("xstate");

const machine = createMachine(
    {
        id: "Propulsion",
        initial: "On",
        states: {
            On: {
                on: {
                    TURN_OFF: {
                        target: "Off",
                    },
                },
            },
            Off: {
                on: {
                    TURN_ON: {
                        target: "On",
                    },
                },
            },
        },
        predictableActionArguments: true,
        preserveActionOrder: true,
    },
    {
        actions: {},
        services: {},
        guards: {},
        delays: {},
    },
);

module.exports = machine;
