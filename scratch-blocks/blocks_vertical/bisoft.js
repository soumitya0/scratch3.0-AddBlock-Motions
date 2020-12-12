/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Blocks.bisoft');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

// Start / End Blocks

// custom blocks

Blockly.Blocks['motion_startblock'] = {
  /**
   * Block Start Block.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_STARTBLOCK,
      "category": Blockly.Categories.start_end,
      "extensions": ["colours_start_end", "shape_hat"]
    });
  }
};

Blockly.Blocks['motion_endblock'] = {
  /**
   * Block END BLOCK.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_ENDBLOCK,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ENDBLOCK",
          "options": [
            ['REPEAT', 'REPEAT'],
            ['END', 'END']
          ]
        }
      ],
      "category": Blockly.Categories.start_end,
      "extensions": ["colours_start_end", "shape_end"]
    });
  }
};

// Loop Blocks

Blockly.Blocks['repeat_loop'] = {
  /**
   * Block for repeat n times (external number).
   * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#so57n9
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "id": "control_repeat",
      "message0": Blockly.Msg.CONTROL_REPEAT,
      "message1": "%1", // Statement
      "message2": "%1", // Icon
      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "input_value",
          "name": "TIMES"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.data,
      "extensions": ["colours_loop", "shape_statement"]
    });
  }
};


// Variables Blocks

// Custom blocks


Blockly.Blocks['BiCounter_variable'] = {
  init : function(){
    this.jsonInit({
      "message0": "BiCounter %1 initial value: %2 %3 value: %4",
      "args0" : [
          {
            "type" : "field_dropdown",
            "options" : [
                [ "1", "1" ],
                [ "2", "2" ],
                [ "3", "3" ]
              ]
          },
          {
            "type" : "input_value",
            "name" : "bicounter_initial_value"
          },
          {
            "type" : "field_dropdown",
            "options" : [
                [ "+", "plus" ],
                [ "-", "minus" ],
                
              ]
          },
          {
            "type" : "input_value",
            "name" : "bicounter_value"
          }
        ],
          "category": Blockly.Categories.event,
          "extensions": ["colours_decision", "shape_statement"]
    })
  }
}


Blockly.Blocks['event_biflag'] = {
  init : function(){
    this.jsonInit({
      "message0": "BiFlag %1 bloolean: %2",
      "args0" : [
          {
            "type" : "field_dropdown",
            "options" : [
                [ "1", "1" ],
                [ "2", "2" ],
                [ "3", "3" ]
              ]
          },
          {
            "type" : "field_dropdown",
            "options" : [
                [ "True", "True" ],
                [ "False", "False" ]
              ]
          }
        ],
          "category": Blockly.Categories.event,
          "extensions": ["colours_decision", "shape_statement"]
    })
  }
}

Blockly.Blocks['event_bidata'] = {
  init : function(){
    this.jsonInit({
      "message0": "BiData %1 equals to %2 %3",
      "args0" : [
          {
            "type" : "field_dropdown",
            "options" : [
                [ "1", "1" ],
                [ "0", "0" ]
              ]
          },
          {
            "type" : "field_dropdown",
            "options" : [
                [ "Value", "Value" ],
                [ "False", "False" ]
              ]
          },
          {
            "type" : "input_value",
            "name" : "bidatavalue"
          }
        ],
          "category": Blockly.Categories.event,
          "extensions": ["colours_decision", "shape_statement"]
    })
  }
}

Blockly.Blocks['event_biiot'] = {
  init : function(){
    this.jsonInit({
      "message0": "BiIOT %1 equals to %2 %3",
      "args0" : [
          {
            "type" : "field_dropdown",
            "options" : [
                [ "1", "1" ],
                [ "2", "2" ],
                [ "3", "3" ],
                [ "4", "4" ],
                [ "5", "5" ],
                [ "6", "6" ],
              ]
          },
          {
            "type" : "field_dropdown",
            "options" : [
                [ "Value", "Value" ],
                [ "False", "False" ]
              ]
          },
          {
            "type" : "input_value",
            "name" : "bidatavalue"
          }
        ],
          "category": Blockly.Categories.decision,
          "extensions": ["colours_decision", "shape_statement"]
    })
  }
}

// Ports Block 

//-------------------- CUSTOM BLOCK SECTION START ------------------ 

Blockly.Blocks['looks_porta1'] = {
  /**
   * Block to say for some time.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "A1 %1 logic %2",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "A1",
          "options" : [
            ['LED', 'LED'],
            ['MOTOR', 'MOTOR']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "logic",
          "options" : [
            ['HIGH', 'HIGH'],
            ['LOW', 'LOW']
          ]
        }
      ],
      "category": Blockly.Categories.ports,
      "extensions": ["colours_ports", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_portA1'] = {
  /**
   * Block to say for some time.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "A1 %1 logic %2",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "A1",
          "options" : [
            ['LED', 'LED'],
            ['MOTOR', 'MOTOR']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "logic",
          "options" : [
            ['HIGH', 'HIGH'],
            ['LOW', 'LOW']
          ]
        }
      ],
      "category": Blockly.Categories.ports,
      "extensions": ["colours_ports", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_portA2'] = {
  /**
   * Block to say for some time.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "A2 %1 logic %2",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "A1",
          "options" : [
            ['LED', 'LED'],
            ['MOTOR', 'MOTOR']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "logic",
          "options" : [
            ['HIGH', 'HIGH'],
            ['LOW', 'LOW']
          ]
        }
      ],
      "category": Blockly.Categories.ports,
      "extensions": ["colours_ports", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_portA3'] = {
  /**
   * Block to say for some time.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "A3 %1 logic %2",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "A1",
          "options" : [
            ['LED', 'LED'],
            ['MOTOR', 'MOTOR']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "logic",
          "options" : [
            ['HIGH', 'HIGH'],
            ['LOW', 'LOW']
          ]
        }
      ],
      "category": Blockly.Categories.ports,
      "extensions": ["colours_ports", "shape_statement"]
    });
  }
};

Blockly.Blocks['looks_portA4'] = {
  /**
   * Block to say for some time.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "A4 %1 logic %2",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "A1",
          "options" : [
            ['LED', 'LED'],
            ['MOTOR', 'MOTOR']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "logic",
          "options" : [
            ['HIGH', 'HIGH'],
            ['LOW', 'LOW']
          ]
        }
      ],
      "category": Blockly.Categories.ports,
      "extensions": ["colours_ports", "shape_statement"]
    });
  }
};

Blockly.Blocks['if_block'] = {
  /**
   * Block for if-then.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "type": "control_if",
      "message0": Blockly.Msg.CONTROL_IF,
      "message1": "%1", // Statement
      "args0": [
        {
          "type": "input_value",
          "name": "CONDITION",
          "check": "Boolean"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.decision,
      "extensions": ["colours_decision", "shape_statement"]
    });
  }
};


Blockly.Blocks['bicounter_decision'] = {
  /**
   * Block for greater than comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 %2 %3 %4",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "bicounter",
          "options" : [
            ["BiCounter", "BiCounter"],
            ["OtherBlcok", "OtherBlock"]
          ]
        },
        {
          "type": "field_dropdown",
          "name": "bicounter_2",
          "options" : [
            [ "1", "1" ],
            ["2", "2"],
            ["3", "3"],
          ]
        },
        {
          "type" : "field_dropdown",
          "name" : "bicounter_3",
          "options" : [
            [ "=", "=" ],
            ["!=", "!="]
          ]
        },
        {
          "type" : "input_value",
          "name" : "bicounter_4"
        }
      ],
      "category": Blockly.Categories.decision,
      "extensions": ["colours_decision", "output_boolean"]
    });
  }
};

Blockly.Blocks['bicounter_IOT'] = {
  /**
   * Block for greater than comparator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 %2 %3 %4",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "iot",
          "options" : [
            ["IOT", "IOT"],
            ["OtherBlcok", "OtherBlock"]
          ]
        },
        {
          "type": "field_dropdown",
          "name": "iot_2",
          "options" : [
            [ "1", "1" ],
            ["2", "2"],
            ["3", "3"],
          ]
        },
        {
          "type" : "field_dropdown",
          "name" : "iot_3",
          "options" : [
            [ "=", "=" ],
            ["!=", "!="]
          ]
        },
        {
          "type" : "input_value",
          "name" : "iot_4"
        }
      ],
      "category": Blockly.Categories.decision,
      "extensions": ["colours_decision", "output_boolean"]
    });
  }
};


Blockly.Blocks['wait_block'] = {
  init : function(){
    this.jsonInit({
      "message0": "wait h: %1 m: %2 s: %3 milli: %4",
      "args0" : [
          {
            "type" : "input_value",
            "name" : "hour"
          },
          {
            "type" : "input_value",
            "name" : "minitue"
          },
          {
            "type" : "input_value",
            "name" : "second"
          },
          {
            "type" : "input_value",
            "name" : "millisecond"
          }
        ],
          "category": Blockly.Categories.wait,
          "extensions": ["colours_wait", "shape_statement"]
    })
  }
}
