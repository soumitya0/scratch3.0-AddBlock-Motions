const BlockUtility = require("../../engine/block-utility");
const BlockType = require("../../extension-support/block-type");
const sendDataToServer = require("./server_request");
var bisoft_data = require("../../bisoft_globalData");

class BisoftTERN {
    constructor(runtime) {
        this.runtime = runtime;

        this.portTrack = [];

        this.readyToExcute = true;

        this.error = "";

        this.scratchJSONTree = "";

        this.str =
            "RTS11SETOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO";
        if (this.runtime) {
            this.runtime.on("PROJECT_RUN_START", () => {
                if (this.readyToExcute) {
                    let startingIndex = "",
                        programCode = "";
                    for (key in this.scratchJSONTree) {
                        if (
                            this.scratchJSONTree[key].opcode ==
                            "event_whenflagclicked"
                        ) {
                            startingIndex = this.scratchJSONTree[key].id;
                            break;
                        }
                    }
                    programCode = this.programStringGenerator(startingIndex);
                    this.str += programCode;

                    console.log("new:: ", this.str);
                    sendDataToServer("http://127.0.0.1:3050/", {
                        str: this.str,
                    });
                    this.resetExtension();
                } else {
                    alert(this.error);
                    this.resetExtension();
                }
            });
        }
    }

    getHats() {}

    // A-I  I-M   OPTION_1
    get ALL_PORTS_MENU() {
        return [
            {
                text: "A1",
                value: "A1",
            },
            {
                text: "A2",
                value: "A2",
            },
            {
                text: "B1",
                value: "B1",
            },
            {
                text: "B2",
                value: "B2",
            },
            {
                text: "C1",
                value: "C1",
            },
            {
                text: "C2",
                value: "C2",
            },
            {
                text: "D1",
                value: "D1",
            },
            {
                text: "D2",
                value: "D2",
            },
            {
                text: "E1",
                value: "E1",
            },
            {
                text: "E2",
                value: "E2",
            },
            {
                text: "F1",
                value: "F1",
            },
            {
                text: "F2",
                value: "F2",
            },
            {
                text: "G1",
                value: "G1",
            },
            {
                text: "G2",
                value: "G2",
            },
            {
                text: "H1",
                value: "H1",
            },
            {
                text: "H2",
                value: "H2",
            },
            {
                text: "I1",
                value: "I1",
            },
            {
                text: "I2",
                value: "I2",
            },
            {
                text: "M1",
                value: "M1",
            },
            {
                text: "M2",
                value: "M2",
            },
        ];
    }

    //A-I    OPTION_7
    get CHECK_LOGIC_PORTS_MENU() {
        return [
            {
                text: "A1",
                value: "A1",
            },
            {
                text: "A2",
                value: "A2",
            },
            {
                text: "B1",
                value: "B1",
            },
            {
                text: "B2",
                value: "B2",
            },
            {
                text: "C1",
                value: "C1",
            },
            {
                text: "C2",
                value: "C2",
            },
            {
                text: "D1",
                value: "D1",
            },
            {
                text: "D2",
                value: "D2",
            },
            {
                text: "E1",
                value: "E1",
            },
            {
                text: "E2",
                value: "E2",
            },
            {
                text: "F1",
                value: "F1",
            },
            {
                text: "F2",
                value: "F2",
            },
            {
                text: "G1",
                value: "G1",
            },
            {
                text: "G2",
                value: "G2",
            },
            {
                text: "H1",
                value: "H1",
            },
            {
                text: "H2",
                value: "H2",
            },
            {
                text: "I1",
                value: "I1",
            },
            {
                text: "I2",
                value: "I2",
            },
        ];
    }

    // B1 F1  OPTION_2
    get SERVO_PORTS() {
        return [
            {
                text: "B1",
                value: "B1",
            },
            {
                text: "F1",
                value: "F1",
            },
        ];
    }

    // B1-B2 F1-F2  OPTION_9
    get ALTRASONIC_PORTS() {
        return [
            {
                text: "B1",
                value: "B1",
            },
            {
                text: "B2",
                value: "B2",
            },
            {
                text: "F1",
                value: "F1",
            },
            {
                text: "F2",
                value: "F2",
            },
        ];
    }

    // HIGH - LOW  OPTION_1 and OPTION_7
    get LOGIC() {
        return [
            {
                text: "HIGH",
                value: "HIGH",
            },
            {
                text: "LOW",
                value: "LOW",
            },
        ];
    }

    // FORWARD-BACKWORD OPTION_3 OPTION_4 and OPTION_5
    get MOTOR_ACTIONS() {
        return [
            {
                text: "Forward",
                value: "Forward",
            },
            {
                text: "Backward",
                value: "Backward",
            },
        ];
    }

    // A-F  OPTION_8 
    get ANALOG_PORTS() {
        return [
            {
                text: "A1",
                value: "A1",
            },
            {
                text: "A2",
                value: "A2",
            },
            {
                text: "B1",
                value: "B1",
            },
            {
                text: "C1",
                value: "C1",
            },
            {
                text: "C2",
                value: "C2",
            },
            {
                text: "D1",
                value: "D1",
            },
            {
                text: "E1",
                value: "E1",
            },
            {
                text: "E2",
                value: "E2",
            },
            {
                text: "F1",
                value: "F1",
            },
        ];
    }


    //B1-F1  OPTION_2 and OPTION_6
    get BRIGHTNESS_PORTS() {
        return [
            {
                text: "B1",
                value: "B1",
            },
            {
                text: "F1",
                value: "F1",
            },
        ];
    }

    get SERVO_PORTS() {
        return [
            {
                text: "B1",
                value: "B1",
            },
            {
                text: "F1",
                value: "F1",
            },
        ];
    }

    get MOTOR_PORTS() {
        return [
            {
                text: "M1",
                value: "M1",
            },
            {
                text: "M2",
                value: "M2",
            },
        ];
    }

    get COLOR() {
        return [
            {
                text: "red",
                value: "red",
            },
            {
                text: "green",
                value: "green",
            },
            {
                text: "blue",
                value: "blue",
            },
            {
                text: "distance",
                value: "distance",
            },
            {
                text: "light",
                value: "light",
            },
            {
                text: "gesture",
                value: "gesture",
            },
        ];
    }

    startTERN() {}

    setPortsLogic(args, utils) {
        if (this.scratchJSONTree === "") {
            this.scratchJSONTree = utils.thread.blockContainer._blocks;
        }

        console.log(
            "utils",
            JSON.stringify(utils.thread.blockContainer._blocks)
        ); //

        let lsb = args.logic == "HIGH" ? "1" : "0";
        let msb = 0;

        let ob = {
            port: args.ports,
            type: "O",
            value: args.logic,
            block: "setPortsLogic",
            lsb: lsb,
            msb: msb,
            closeString: false,
        };

        if (!this.checkPortPerBlock(ob)) {
            this.readyToExcute = false;
        } else {
            this.registerPortPerBlock(ob);
        }
        this.generateSettingString(ob);
        return;
    }

    setBrighness(args, utils) {
        if (this.scratchJSONTree === "") {
            this.scratchJSONTree = utils.thread.blockContainer._blocks;
        }

        let msb, lsb;

        let ob = {
            port: args.ports,
            type: "P",
            value: args.brightness,
            block: "setBrighness",
            msb: msb,
            lsb: lsb,
        };
        if (!this.checkPortPerBlock(ob)) {
            this.readyToExcute = false;
        } else {
            this.registerPortPerBlock(ob);
        }
        this.generateSettingString(ob);
        return;
    }

    moveMotor(args, utils) {
        if (this.scratchJSONTree === "") {
            this.scratchJSONTree = utils.thread.blockContainer._blocks;
        }

        let msb, lsb, percent;
        msb = 0;

        percent = args.speed;

        if (args.speed > 100) percent = 100;
        if (args.speed < 0) percent = 0;
        if (args.action == "Forward") lsb = 20 + (20 / 100) * percent;
        if (args.action == "Backward") lsb = 20 - (20 / 100) * percent;

        let ob = {
            port: "M1",
            type: "P",
            value: args.speed,
            action: args.action,
            msb: msb,
            lsb: lsb,
        };
        this.generateSettingString(ob);
        ob = {
            port: "M2",
            type: "P",
            value: args.speed,
            action: args.action,
            msb: msb,
            lsb: lsb,
        };
        if (!this.checkPortPerBlock(ob)) {
            this.readyToExcute = false;
        } else {
            this.registerPortPerBlock(ob);
        }
        this.generateSettingString(ob);
        return;
    }

    moveLeftMotor(args, utils) {
        if (this.scratchJSONTree === "") {
            this.scratchJSONTree = utils.thread.blockContainer._blocks;
        }

        let msb, lsb, percent;
        msb = 0;

        percent = args.speed;

        if (args.speed > 100) percent = 100;
        if (args.speed < 0) percent = 0;
        if (args.action == "Forward") lsb = 20 + (20 / 100) * percent;
        if (args.action == "Backward") lsb = 20 - (20 / 100) * percent;

        let ob = {
            port: "M1",
            type: "P",
            value: args.speed,
            action: args.action,
            block: "moveLeftMotor",
            msb: msb,
            lsb: lsb,
        };

        if (!this.checkPortPerBlock(ob)) {
            this.readyToExcute = false;
        } else {
            this.registerPortPerBlock(ob);
        }
        this.generateSettingString(ob);
        return;
    }

    moveRightMotor(args, utils) {
        if (this.scratchJSONTree === "") {
            this.scratchJSONTree = utils.thread.blockContainer._blocks;
        }

        let msb, lsb, percent;
        msb = 0;

        percent = args.speed;

        if (args.speed > 100) percent = 100;
        if (args.speed < 0) percent = 0;
        if (args.action == "Forward") lsb = 20 + (20 / 100) * percent;
        if (args.action == "Backward") lsb = 20 - (20 / 100) * percent;

        let ob = {
            port: "M2",
            type: "P",
            value: args.speed,
            action: args.action,
            block: "moveRightMotor",
            lsb: lsb,
            msb: msb,
        };
        if (!this.checkPortPerBlock(ob)) {
            this.readyToExcute = false;
        } else {
            this.registerPortPerBlock(ob);
        }
        this.generateSettingString(ob);
        return;
    }

    setServoMotor(args, utils) {
        if (this.scratchJSONTree === "") {
            this.scratchJSONTree = utils.thread.blockContainer._blocks;
        }

        (msb = 0), (lsb = 0);

        let ob = {
            port: args.ports,
            type: "S",
            value: args.degree,
            block: "setServoMotor",
            msb: msb,
            lsb: lsb,
        };
        if (!this.checkPortPerBlock(ob)) {
            this.readyToExcute = false;
        } else {
            this.registerPortPerBlock(ob);
        }
        this.generateSettingString(ob);
        return;
    }

    setAnalogRead(args, utils) {
        if (this.scratchJSONTree === "") {
            this.scratchJSONTree = utils.thread.blockContainer._blocks;
        }

        let ob = {
            port: args.ports,
            type: "A",
            value: args.degree,
            block: "setAnalogRead",
        };
        if (!this.checkPortPerBlock(ob)) {
            this.readyToExcute = false;
        } else {
            this.registerPortPerBlock(ob);
        }
        this.generateSettingString(ob);
        return;
    }

    checkLogicCondition(args, utils) {
        if (this.scratchJSONTree === "") {
            this.scratchJSONTree = utils.thread.blockContainer._blocks;
        }

        let ob = {
            port: args.ports,
            type: "A",
            value: args.degree,
            block: "checkLogicCondition",
        };

        if (!this.checkPortPerBlock(ob)) {
            this.readyToExcute = false;
        } else {
            this.registerPortPerBlock(ob);
        }
        return true;
    }

    replaceCharacterAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substr(0, index) + chr + str.substr(index + 1);
    }

    generateSettingString({ port, value, type, msb, lsb, closeString }) {
        switch (port) {
            case "A1":
                if (type === "A") {
                    this.str = this.replaceCharacterAt(this.str, 8, "A");
                }
                this.outputBlockProgramString(1, msb, lsb, closeString);
                break;

            case "A2":
                if (type === "A") {
                    this.str = this.replaceCharacterAt(this.str, 9, "A");
                }
                this.outputBlockProgramString(2, msb, lsb);

                break;

            case "B1":
                if (type === "A") {
                    this.str = this.replaceCharacterAt(this.str, 10, "A");
                }
                if (type === "P") {
                    this.str = this.replaceCharacterAt(this.str, 10, "P");
                }
                if (type === "S") {
                    this.str = this.replaceCharacterAt(this.str, 10, "S");
                }
                this.outputBlockProgramString(3, msb, lsb);
                break;

            case "B2":
                this.outputBlockProgramString(4, msb, lsb);
                break;

            case "C1":
                if (type === "A") {
                    this.str = this.replaceCharacterAt(this.str, 12, "A");
                }
                this.outputBlockProgramString(5, msb, lsb);
                break;

            case "C2":
                if (type === "A") {
                    this.str = this.replaceCharacterAt(this.str, 13, "A");
                }
                this.outputBlockProgramString(6, msb, lsb);
                break;

            case "D1":
                if (type === "A") {
                    this.str = this.replaceCharacterAt(this.str, 14, "A");
                }
                this.outputBlockProgramString(7, msb, lsb);
                break;

            case "D2":
                if (type === "O") {
                    this.outputBlockProgramString(8, msb, lsb);
                }
                break;

            case "E1":
                if (type === "A") {
                    this.str = this.replaceCharacterAt(this.str, 16, "A");
                }
                this.outputBlockProgramString(9, msb, lsb);
                break;

            case "E2":
                if (type === "A") {
                    this.str = this.replaceCharacterAt(this.str, 17, "A");
                }
                this.outputBlockProgramString(10, msb, lsb);
                break;

            case "F1":
                if (type === "A") {
                    this.str = this.replaceCharacterAt(this.str, 18, "A");
                }
                if (type === "P") {
                    this.str = this.replaceCharacterAt(this.str, 18, "P");
                }
                if (type === "S") {
                    this.str = this.replaceCharacterAt(this.str, 18, "S");
                }
                this.outputBlockProgramString(11, msb, lsb);
                break;

            case "F2":
                this.outputBlockProgramString(12, msb, lsb);
                break;

            case "G1":
                this.outputBlockProgramString(13, msb, lsb);
                break;

            case "G2":
                this.outputBlockProgramString(14, msb, lsb);
                break;

            case "H1":
                this.outputBlockProgramString(15, msb, lsb);
                break;

            case "H2":
                this.outputBlockProgramString(16, msb, lsb);
                break;

            case "I1":
                this.outputBlockProgramString(17, msb, lsb);
                break;

            case "I2":
                this.outputBlockProgramString(18, msb, lsb);
                break;

            case "M1":
                if (type === "P") {
                    this.str = this.replaceCharacterAt(this.str, 28, "P");
                }
                this.outputBlockProgramString(19, msb, lsb);
                break;

            case "M2":
                if (type === "P") {
                    this.str = this.replaceCharacterAt(this.str, 29, "P");
                }
                this.outputBlockProgramString(20, msb, lsb);
                break;
        }
    }

    // check the port is available for block to use
    checkPortPerBlock({ port, block }) {
        // return true if track is empty
        if (this.portTrack.length < 1) return true;

        // check port is in use with other block
        for (let i = 0; i < this.portTrack.length; i++) {
            if (
                this.portTrack[i].port == port &&
                this.portTrack[i].block != block
            ) {
                this.error = port + " is already in use.";
                return false;
            }
        }
        return true;
    }

    registerPortPerBlock({ port, block }) {
        this.portTrack.push({ port: port, block: block });
        return;
    }

    outputBlockProgramString(port, msb, lsb, cString = false) {
        if (cString) {
            bisoft_data.globalData.program_string +=
                `o{${port},${msb},${lsb}}` + cString + "_";
            return;
        }
        bisoft_data.globalData.program_string += `o{${port},${msb},${lsb}}`;
        return;
        // this.str += `o{${port},${msb},${lsb}}`
    }

    resetExtension() {
        this.str =
            "RTS11SETOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO";
        this.portTrack = [];
        this.readyToExcute = true;
        this.error = "";
        this.scratchJSONTree = "";
        return;
    }

    getInfo() {
        return {
            id: "BisoftTERN",
            name: "TERN",
            blocks: [
                // {
                //     opcode : 'startTERN',
                //     text : 'When turn starts up',
                //     blockType: BlockType.HAT
                // },
                {
                    opcode: "setPortsLogic",
                    text: "Set [ports]at  Logic [logic]",
                    blockType: "command",
                    arguments: {
                        ports: {
                            type: "string",
                            menu: "allPorts",
                            defaultValue: "A1",
                        },
                        logic: {
                            type: "string",
                            menu: "logic",
                            defaultValue: "HIGH",
                        },
                    },
                },
                {
                    opcode: "setBrighness",
                    text: "set [ports]at  brightness [brightness]%",
                    blockType: "command",
                    arguments: {
                        ports: {
                            type: "string",
                            menu: "brightnessPorts",
                            defaultValue: "B1",
                        },
                        brightness: {
                            type: "number",
                            defaultValue: 100,
                            maxValue: 100,
                            minValue: 0,
                        },
                    },
                },
                {
                    opcode: "moveMotor",
                    text: "move [action] at [speed]% speed",
                    blockType: "command",
                    arguments: {
                        action: {
                            type: "string",
                            menu: "motor_actions",
                            defaultValue: "Forward",
                        },
                        speed: {
                            type: "number",
                            defaultValue: 100,
                        },
                    },
                },
                {
                    opcode: "moveLeftMotor",
                    text: "move left motor [action] at [speed] % speed",
                    blockType: "command",
                    arguments: {
                        action: {
                            type: "string",
                            menu: "motor_actions",
                            defaultValue: "Forward",
                        },
                        speed: {
                            type: "number",
                            defaultValue: 100,
                        },
                    },
                },
                {
                    opcode: "moveRightMotor",
                    text: "move right motor [action] at [speed] % speed",
                    blockType: "command",
                    arguments: {
                        action: {
                            type: "string",
                            menu: "motor_actions",
                            defaultValue: "Forward",
                        },
                        speed: {
                            type: "number",
                            defaultValue: 100,
                        },
                    },
                },
                {
                    opcode: "setServoMotor",
                    text: "set servo motor at [ports] to [degree] degrees",
                    blockType: "command",
                    arguments: {
                        ports: {
                            type: "string",
                            menu: "servo_ports",
                            defaultValue: "B1",
                        },
                        degree: {
                            type: "number",
                            defaultValue: 180,
                        },
                    },
                },
                {
                    opcode: "checkLogicCondition",
                    text: "Port [ports] is [logic]",
                    blockType: "Boolean",
                    arguments: {
                        ports: {
                            type: "string",
                            menu: "checkLogicConditionPorts",
                            defaultValue: "A1",
                        },
                        logic: {
                            type: "string",
                            menu: "logic",
                            defaultValue: "HIGH",
                        },
                    },
                },
                {
                    opcode: "setAnalogRead",
                    text: "Analog read of port [ports]",
                    blockType: "reporter",
                    arguments: {
                        ports: {
                            type: "string",
                            menu: "analog_ports",
                            defaultValue: "A1",
                        },
                    },
                },
                {
                    opcode: "handler9",
                    text: "ultrasonic sensor at port [ports]",
                    blockType: "reporter",
                    arguments: {
                        ports: {
                            type: "string",
                            menu: "altraSonic_ports",
                            defaultValue: "B1",
                        },
                    },
                },
                {
                    opcode: "handler10",
                    text: "[color] of 4-in 1 sensor is",
                    blockType: "reporter",
                    arguments: {
                        color: {
                            type: "string",
                            menu: "color",
                            defaultValue: "red",
                        },
                    },
                },
            ],
            menus: {
                allPorts: {
                    acceptReporters: false,
                    items: this.ALL_PORTS_MENU,
                },
                checkLogicConditionPorts: {
                    acceptReporters: false,
                    items: this.CHECK_LOGIC_PORTS_MENU,
                },
                brightnessPorts: {
                    acceptReporters: false,
                    items: this.BRIGHTNESS_PORTS,
                },
                motorPorts: {
                    acceptReporters: false,
                    items: this.MOTOR_PORTS,
                },
                analogPorts: {
                    acceptReporters: false,
                    items: this.ANALOG_PORTS,
                },
                servoPorts: {
                    acceptReporters: false,
                    items: this.SERVO_PORTS,
                },
                logic: {
                    acceptReporters: false,
                    items: this.LOGIC,
                },
                motor_actions: {
                    acceptReporters: false,
                    items: this.MOTOR_ACTIONS,
                },
                servo_ports: {
                    acceptReporters: false,
                    items: this.SERVO_PORTS,
                },
                analog_ports: {
                    acceptReporters: false,
                    items: this.ANALOG_PORTS,
                },
                altraSonic_ports: {
                    acceptReporters: false,
                    items: this.ALTRASONIC_PORTS,
                },
                color: {
                    acceptReporters: false,
                    items: this.COLOR,
                },
            },
        };
    }

    programStringGenerator(
        id,
        ob = {
            s: "",
            ifTrack: -1,
            repeatTrack: -1,
            ifCloseTrack: {},
            andTrack: -1,
        }
    ) {
        let msb = 0,
            lsb = 0,
            port = 0,
            percent = 0;
        if (this.scratchJSONTree[id].opcode == "event_whenflagclicked") {
            if (this.scratchJSONTree[id].next) {
                this.programStringGenerator(this.scratchJSONTree[id].next, ob);
            }
        }

        if (this.scratchJSONTree[id].opcode == "control_if") {
            if (this.scratchJSONTree[id].inputs.CONDITION) {
                let ipb = this.scratchJSONTree[id].inputs.CONDITION.block;
                ob.ifTrack += 1;
                // add positoin to track
                ob.ifCloseTrack[ob.ifTrack] = [];
                this.programStringGenerator(ipb, ob);
                // check substack
                if (this.scratchJSONTree[id].inputs.SUBSTACK) {
                    let sb = this.scratchJSONTree[id].inputs.SUBSTACK.block;
                    this.programStringGenerator(sb, ob);
                    for (
                        let i = ob.ifCloseTrack[ob.ifTrack].length - 1;
                        i >= 0;
                        --i
                    ) {
                        ob.s += ob.ifCloseTrack[ob.ifTrack][i] + "ed"; //end of if
                        ob.andTrack -= 1;
                    }
                    ob.ifTrack -= 1;
                } else {
                    ob.s += ob.ifTrack + "ed";
                }
            }
            if (this.scratchJSONTree[id].next) {
                this.programStringGenerator(this.scratchJSONTree[id].next, ob);
            }
        }

        if (
            this.scratchJSONTree[id].opcode == "BisoftTERN_checkLogicCondition"
        ) {
            ob.s += "d"; //start of if
            ob.andTrack = ob.andTrack + 1;
            ob.ifCloseTrack[ob.ifTrack].push(ob.andTrack);
            msb = 0;
            lsb = this.scratchJSONTree[id].fields.logic.value == "HIGH" ? 1 : 0;
            port = this.getProgramPortNumber(
                this.scratchJSONTree[id].fields.ports.value
            );
            ob.s += `00${port}${msb}${lsb}61`;
        }

        if (this.scratchJSONTree[id].opcode == "BisoftTERN_setPortsLogic") {
            lsb = this.scratchJSONTree[id].fields.logic.value == "HIGH" ? 1 : 0;
            msb = 0;
            port = this.getProgramPortNumber(
                this.scratchJSONTree[id].fields.ports.value
            );
            ob.s += `o{${port}${msb}${lsb}}`;
            if (this.scratchJSONTree[id].next) {
                this.programStringGenerator(this.scratchJSONTree[id].next, ob);
            }
        }

        if (this.scratchJSONTree[id].opcode == "BisoftTERN_moveMotor") {
            percent = this.scratchJSONTree[
                this.scratchJSONTree[id].inputs.speed.block
            ].fields["NUM"].value;
            if (percent > 100) percent = 100;
            if (percent < 0) percent = 0;
            if (this.scratchJSONTree[id].fields.action.value == "Forward")
                lsb = 20 + (20 / 100) * percent;
            if (this.scratchJSONTree[id].fields.action.value == "Backward")
                lsb = 20 - (20 / 100) * percent;
            let port1 = this.getProgramPortNumber("M1");
            let port2 = this.getProgramPortNumber("M2");
            ob.s += `o{${port1}${msb}${lsb}}o{${port2}${msb}${lsb}}`;
            if (this.scratchJSONTree[id].next) {
                this.programStringGenerator(this.scratchJSONTree[id].next, ob);
            }
        }

        if (this.scratchJSONTree[id].opcode == "BisoftTERN_moveLeftMotor") {
            percent = this.scratchJSONTree[
                this.scratchJSONTree[id].inputs.speed.block
            ].fields["NUM"].value;
            if (percent > 100) percent = 100;
            if (percent < 0) percent = 0;
            if (this.scratchJSONTree[id].fields.action.value == "Forward")
                lsb = 20 + (20 / 100) * percent;
            if (this.scratchJSONTree[id].fields.action.value == "Backward")
                lsb = 20 - (20 / 100) * percent;
            let port = this.getProgramPortNumber("M1");
            ob.s += `o{${port}${msb}${lsb}}`;
            if (this.scratchJSONTree[id].next) {
                this.programStringGenerator(this.scratchJSONTree[id].next, ob);
            }
        }

        if (this.scratchJSONTree[id].opcode == "BisoftTERN_moveRightMotor") {
            percent = this.scratchJSONTree[
                this.scratchJSONTree[id].inputs.speed.block
            ].fields["NUM"].value;
            if (percent > 100) percent = 100;
            if (percent < 0) percent = 0;
            if (this.scratchJSONTree[id].fields.action.value == "Forward")
                lsb = 20 + (20 / 100) * percent;
            if (this.scratchJSONTree[id].fields.action.value == "Backward")
                lsb = 20 - (20 / 100) * percent;
            let port = this.getProgramPortNumber("M1");
            ob.s += `o{${port}${msb}${lsb}}`;
            if (this.scratchJSONTree[id].next) {
                this.programStringGenerator(this.scratchJSONTree[id].next, ob);
            }
        }

        if (this.scratchJSONTree[id].opcode == "BisoftTERN_setBrighness") {
            percent = this.scratchJSONTree[
                this.scratchJSONTree[id].inputs.brightness.block
            ].fields["NUM"].value;
            if (percent > 100) percent = 100;
            if (percent < 0) percent = 0;
            percent = Math.round((65535 / 100) * percent);
            let { msb, lsb } = this.getMsbLsb(percent);

            port = this.getProgramPortNumber(
                this.scratchJSONTree[id].fields.ports.value
            );
            ob.s += `o{${port}${msb}${lsb}}`;
            if (this.scratchJSONTree[id].next) {
                this.programStringGenerator(this.scratchJSONTree[id].next, ob);
            }
        }

        if (this.scratchJSONTree[id].opcode == "BisoftTERN_setServoMotor") {
            let degrees = this.scratchJSONTree[
                this.scratchJSONTree[id].inputs.degree.block
            ].fields["NUM"].value;
            if (degrees < 0) degrees = 0;
            if (degrees > 180) degrees = 180;

            degrees = degrees * 20 + 1800;
            let { msb, lsb } = this.getMsbLsb(degrees);
            port = this.getProgramPortNumber(
                this.scratchJSONTree[id].fields.ports.value
            );
            ob.s += `o{${port}${msb}${lsb}}`;
            if (this.scratchJSONTree[id].next) {
                this.programStringGenerator(this.scratchJSONTree[id].next, ob);
            }
        }

        if (this.scratchJSONTree[id].opcode == "operator_gt") {
            // check left block is analog read port
            if (
                this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND1.block
                ].opcode == "BisoftTERN_setAnalogRead"
            ) {
                this.programStringGenerator(
                    this.scratchJSONTree[id].inputs.OPERAND1.block,
                    ob
                );
                // get the value of second block
                input_val = this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND2.block
                ].fields.TEXT.value;
                if (input_val < 0) input_val = 0;
                if (input_val > 1024) input_val = 1024;

                let { msb, lsb } = this.getMsbLsb(input_val);
                // perform greater than
                ob.s += `${msb}${lsb}62`;
            }

            // check right block is analog read port
            if (
                this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND2.block
                ].opcode == "BisoftTERN_setAnalogRead"
            ) {
                this.programStringGenerator(
                    this.scratchJSONTree[id].inputs.OPERAND2.block,
                    ob
                );
                input_val = this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND1.block
                ].fields.TEXT.value;
                if (input_val < 0) input_val = 0;
                if (input_val > 1024) input_val = 1024;

                let { msb, lsb } = this.getMsbLsb(input_val);
                // perform less than
                ob.s += `${msb}${lsb}60`;
            }
        }

        if (this.scratchJSONTree[id].opcode == "operator_lt") {
            // check left block is analog read port
            if (
                this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND1.block
                ].opcode == "BisoftTERN_setAnalogRead"
            ) {
                this.programStringGenerator(
                    this.scratchJSONTree[id].inputs.OPERAND1.block,
                    ob
                );
                // get the value of second block
                input_val = this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND2.block
                ].fields.TEXT.value;
                if (input_val < 0) input_val = 0;
                if (input_val > 1024) input_val = 1024;

                let { msb, lsb } = this.getMsbLsb(input_val);
                // perform less than
                ob.s += `${msb}${lsb}60`;
            }

            // check right block is analog read port
            if (
                this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND2.block
                ].opcode == "BisoftTERN_setAnalogRead"
            ) {
                this.programStringGenerator(
                    this.scratchJSONTree[id].inputs.OPERAND2.block,
                    ob
                );
                input_val = this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND1.block
                ].fields.TEXT.value;
                if (input_val < 0) input_val = 0;
                if (input_val > 1024) input_val = 1024;

                let { msb, lsb } = this.getMsbLsb(input_val);
                // perform greater than
                ob.s += `${msb}${lsb}62`;
            }
        }

        if (this.scratchJSONTree[id].opcode == "operator_equals") {
            // check left block is analog read port
            if (
                this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND1.block
                ].opcode == "BisoftTERN_setAnalogRead"
            ) {
                this.programStringGenerator(
                    this.scratchJSONTree[id].inputs.OPERAND1.block,
                    ob
                );
                // get the value of second block
                input_val = this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND2.block
                ].fields.TEXT.value;
                if (input_val < 0) input_val = 0;
                if (input_val > 1024) input_val = 1024;

                let { msb, lsb } = this.getMsbLsb(input_val);
                ob.s += `${msb}${lsb}61`;
            }

            // check right block is analog read port
            if (
                this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND2.block
                ].opcode == "BisoftTERN_setAnalogRead"
            ) {
                this.programStringGenerator(
                    this.scratchJSONTree[id].inputs.OPERAND2.block,
                    ob
                );
                input_val = this.scratchJSONTree[
                    this.scratchJSONTree[id].inputs.OPERAND1.block
                ].fields.TEXT.value;
                if (input_val < 0) input_val = 0;
                if (input_val > 1024) input_val = 1024;

                let { msb, lsb } = this.getMsbLsb(input_val);
                ob.s += `${msb}${lsb}61`;
            }
        }

        if (this.scratchJSONTree[id].opcode == "operator_and") {
            // process first operand
            if (this.scratchJSONTree[id].inputs.OPERAND1.block) {
                this.programStringGenerator(
                    this.scratchJSONTree[id].inputs.OPERAND1.block,
                    ob
                );
            }
            // process second operand
            if (this.scratchJSONTree[id].inputs.OPERAND2.block) {
                this.programStringGenerator(
                    this.scratchJSONTree[id].inputs.OPERAND2.block,
                    ob
                );
            }
        }

        if (this.scratchJSONTree[id].opcode == "BisoftTERN_setAnalogRead") {
            port = this.getProgramPortNumber(
                this.scratchJSONTree[id].fields.ports.value
            );
            (msb = 0), (lsb = 0);
            ob.s += `${msb}${lsb}${port}`;
        }

        if (this.scratchJSONTree[id].opcode == "control_repeat") {
            let input_val = this.scratchJSONTree[
                this.scratchJSONTree[id].inputs.TIMES.block
            ].fields.NUM.value;
            if (input_val < 0) input_val = 0;
            if (input_val > 255) input_val = 255;

            let { lsb } = this.getMsbLsb(input_val);
            ob.s += `l00${lsb}`;
            ob.repeatTrack += 1;
            // check if substack present
            if (this.scratchJSONTree[id].inputs.SUBSTACK) {
                this.programStringGenerator(
                    this.scratchJSONTree[id].inputs.SUBSTACK.block,
                    ob
                );
            }
            ob.s += ob.repeatTrack + "el";
            ob.repeatTrack -= 1;
        }

        return ob.s;
    }

    getProgramPortNumber(port) {
        let num = 0;
        switch (port) {
            case "A1":
                num = 1;
                break;

            case "A2":
                num = 2;
                break;

            case "B1":
                num = 3;
                break;

            case "B2":
                num = 4;
                break;

            case "c1":
                num = 5;
                break;

            case "c2":
                num = 6;
                break;

            case "D1":
                num = 7;
                break;

            case "D2":
                num = 8;
                break;

            case "E1":
                num = 9;
                break;

            case "E2":
                num = 10;
                break;

            case "F1":
                num = 11;
                break;

            case "F2":
                num = 12;
                break;

            case "G1":
                num = 13;
                break;

            case "G2":
                num = 14;
                break;

            case "H1":
                num = 15;
                break;

            case "H2":
                num = 16;
                break;

            case "I1":
                num = 17;
                break;

            case "I2":
                num = 18;
                break;

            case "M1":
                num = 19;
                break;

            case "M2":
                num = 20;
                break;
        }

        return num;
    }

    getMsbLsb(input_val) {
        if (input_val < 255) return { msb: 0, lsb: input_val };
        input_val = input_val.toString(2);
        lsb = input_val.toString(2).substr(input_val.toString(2).length - 8);
        msb = input_val.substr(0, input_val.toString(2).length - 8);
        msb = parseInt(msb, 2);
        lsb = parseInt(lsb, 2);

        return {
            msb: msb,
            lsb: lsb,
        };
    }
}

module.exports = BisoftTERN;
