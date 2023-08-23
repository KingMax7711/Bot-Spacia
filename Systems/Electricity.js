const { createMachine } = require("xstate");

const machine = createMachine(
    {
        /** @xstate-layout N4IgpgJg5mDOIC5QFEA2YDGAXATgSwzywE8A6AeQDsBiAFQFUAlAOQH1yAxDgbQAYBdRKAAOAe1hE8oykJAAPRAEYAbAGZSvTZoCsAdgAsvAEzLd2gDQhiiVUfVbNyowA59Ro9oCcAX2+W0mLgERGRUdExsAEKMAJIAIgDiyHF8gkggYhJYUjLpCggq9g56hiZmltYIRsakHlpuiqqq+vrOzr7+6Nj4hCQUAGb94SzszKmymZLSsvkt2qReqmbaTbq2irzKFYjOigsORopu+mquHSAB3cF9kfjQkMNsnDwCE+JTuaCzbhrVrob6VTKRRtbZVGp1TQNJotNrnS5BXpkW54e4QR6jcbpSbZaZ5GxLUieNy6arE3jOIz6MGNTxEuzKXi6JzaZTKTw+c6UUQQOCyBE9EJvLI5GaIAC0WysEuUGgc+k8zWcS0O+nhXURIQonwy71xOtmRjBnl4pCW2i0Ll4xM8HnVgUFfXIg2FHzFCD0ujNTWaTNMbOcFml4PmVI5bWZRk8imZuntVyRpBRaNd+vdMNIhicjMVWf0ujB1SMpAM4eckejujjvm8QA */
        id: "Electricity",
        initial: "On",
        states: {
            On: {
                on: {
                    TURN_OFF: {
                        target: "Off",
                    },
                    TURN_BRIDGED: {
                        target: "Emergency",
                    },
                },
            },
            Off: {
                on: {
                    TURN_ON: {
                        target: "On",
                    },
                    TURN_BRIDGED: {
                        target: "Emergency",
                    },
                },
            },
            Emergency: {
                on: {
                    TURN_OFF: {
                        target: "Off",
                    },

                    TURN_ON: "On",
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
