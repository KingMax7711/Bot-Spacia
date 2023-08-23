const { createMachine } = require("xstate");

const machine = createMachine(
    {
        /** @xstate-layout N4IgpgJg5mDOIC5QFEA2YDGAXATgSwzywE8A6AeQDFKBiABQCUBJAWQEEGBNAfXIDkA2gAYAuolAAHAPawieKQDtxIAB6IATOoCspdQHYhADnUA2IQEZzAFm1aAzABoQxRHfV3SQr1-UWAnH4mVnYAviFOaJi4BERkVLTILMgMAOLIfADCPPzCYkgg0rJY8kr5aghWfuqk9ubaelYGBkImTi4Ibh7ePv6BwWER6Nj4hCSkdPgAtgCGOMS8fDQAKgCqDHy81LnKhXKKyuW+Hr6GdnaBfo1+xlZtrnoeWt12weYmhkJ+egMgkcMxYwmeBmcwWNESyTSmWyglEOxke1KoEOQmORjOFyuNzuCF81W03nMdms5haQisPz+0VGZGQkzAOBgCgw834yzWG3i23yu2K+zKiHsOi0VjeJnODy0WgCOLsDxqz1e70+33CvyG1NipDpDKZLLBjFYHBh3MkCL5SNUgusNT8cuCekMD30fhxhnMCu6Zhuel9YTVCikEDgyipI1i8KKJQOiAAtK1nHGdAEU6m06E1WGAXFqJHETGOu6asTbFZPsE7An2pXDKRRSZ3npLHYnajKRrw4CprNWXw8xaCzZZWY608hO4DH4iSZ7O2op3afTGWBmb3+9GBQhlaRDCLzA9zLuzlXXIfSNYU2YtA2rI0Kf6gA */
        id: "Electricity",
        initial: "Primary",
        states: {
            OFF: {
                on: {
                    PRIMARY_ON: "Primary",
                    EMERGENCY_ON: "Emergency",
                },
            },
            Primary: {
                on: {
                    TURN_OFF: "OFF",
                    EMERGENCY_ON: "Emergency",
                },
            },
            Emergency: {
                on: {
                    TURN_OFF: "OFF",
                    PRIMARY_ON: "Primary",
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
