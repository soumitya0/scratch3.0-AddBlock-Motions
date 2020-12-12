var globalData = {
	program_string : "",
	"if_track" : []
}


function add_ifTrack() {
	globalData.if_track.push(globalData.if_track.length)
}

module.exports = {
	globalData,
	add_ifTrack
}

// most imp

var scratchJSONTree = {"EeAlJ]#yVw)@RH6G#]:K":{"id":"EeAlJ]#yVw)@RH6G#]:K","opcode":"control_repeat","inputs":{"TIMES":{"name":"TIMES","block":"+U,VrKJXa:tb}ghn]6z%","shadow":"+U,VrKJXa:tb}ghn]6z%"},"SUBSTACK":{"name":"SUBSTACK","block":"H)-r].Ht{CIhU-Z3vq#4","shadow":null}},"fields":{},"next":null,"topLevel":false,"parent":"x^f;P69Yrz{?*;o/^Vx6","shadow":false,"x":75.70370370370364,"y":129.1851851851856},"+U,VrKJXa:tb}ghn]6z%":{"id":"+U,VrKJXa:tb}ghn]6z%","opcode":"math_whole_number","inputs":{},"fields":{"NUM":{"name":"NUM","value":"1"}},"next":null,"topLevel":false,"parent":"EeAlJ]#yVw)@RH6G#]:K","shadow":true},"x^f;P69Yrz{?*;o/^Vx6":{"id":"x^f;P69Yrz{?*;o/^Vx6","opcode":"event_whenflagclicked","inputs":{},"fields":{},"next":"EeAlJ]#yVw)@RH6G#]:K","topLevel":true,"parent":null,"shadow":false,"x":75.70370370370364,"y":88.74074074074078},"|~RjGQ+]%J45t1|HGtJY":{"id":"|~RjGQ+]%J45t1|HGtJY","opcode":"BisoftTERN_setPortsLogic","inputs":{},"fields":{"ports":{"name":"ports","value":"A1"},"logic":{"name":"logic","value":"HIGH"}},"next":null,"topLevel":false,"parent":"H)-r].Ht{CIhU-Z3vq#4","shadow":false,"x":84.29629629629623,"y":426.22222222222223},"H)-r].Ht{CIhU-Z3vq#4":{"id":"H)-r].Ht{CIhU-Z3vq#4","opcode":"control_repeat","inputs":{"TIMES":{"name":"TIMES","block":"Yt,)[SsWrr[QtLo($V4M","shadow":"Yt,)[SsWrr[QtLo($V4M"},"SUBSTACK":{"name":"SUBSTACK","block":"|~RjGQ+]%J45t1|HGtJY","shadow":null}},"fields":{},"next":null,"topLevel":false,"parent":"EeAlJ]#yVw)@RH6G#]:K","shadow":false,"x":"-358","y":"147"},"Yt,)[SsWrr[QtLo($V4M":{"id":"Yt,)[SsWrr[QtLo($V4M","opcode":"math_whole_number","inputs":{},"fields":{"NUM":{"name":"NUM","value":"1"}},"next":null,"topLevel":false,"parent":"H)-r].Ht{CIhU-Z3vq#4","shadow":true}}

function programStringGenerator(id, ob = { s : "", ifTrack : -1, repeatTrack : -1, ifCloseTrack : {}, andTrack : -1 }){
    let msb = 0, lsb = 0, port = 0, percent = 0
    if (scratchJSONTree[id].opcode == "event_whenflagclicked") {
      if(scratchJSONTree[id].next){
        programStringGenerator(scratchJSONTree[id].next, ob)
      }
    } 

    if (scratchJSONTree[id].opcode == "control_if") {
      if(scratchJSONTree[id].inputs.CONDITION){
        let ipb = scratchJSONTree[id].inputs.CONDITION.block
          ob.ifTrack += 1
          // add positoin to track
          ob.ifCloseTrack[ob.ifTrack] = [] 
          programStringGenerator(ipb, ob)
          // check substack
          if(scratchJSONTree[id].inputs.SUBSTACK){
            let sb = scratchJSONTree[id].inputs.SUBSTACK.block
            programStringGenerator(sb, ob)
            for(let i=(ob.ifCloseTrack[ob.ifTrack].length-1); i>=0; --i){
              ob.s += ob.ifCloseTrack[ob.ifTrack][i]+'ed' //end of if
              ob.andTrack -= 1
            }
            ob.ifTrack -= 1
          }
          else{
                ob.s += ob.ifTrack+'ed'
          }
      }
      if(scratchJSONTree[id].next){
        programStringGenerator(scratchJSONTree[id].next, ob)
      }
    }

    if(scratchJSONTree[id].opcode == "BisoftTERN_checkLogicCondition"){
      ob.s += "d" //start of if
      ob.andTrack = ob.andTrack + 1
      ob.ifCloseTrack[ob.ifTrack].push(ob.andTrack)
      msb = 0
      lsb = scratchJSONTree[id].fields.logic.value == "HIGH" ? 1 : 0
      port = getProgramPortNumber(scratchJSONTree[id].fields.ports.value)
      ob.s += `00${port}${msb}${lsb}61`
    }

    if(scratchJSONTree[id].opcode == "BisoftTERN_setPortsLogic"){
      
       lsb = scratchJSONTree[id].fields.logic.value == "HIGH" ? 1 : 0
       msb = 0
       port = getProgramPortNumber(scratchJSONTree[id].fields.ports.value)
        ob.s += `o{${port}${msb}${lsb}}`
        if(scratchJSONTree[id].next){    
          programStringGenerator(scratchJSONTree[id].next, ob)
        }
    }

    if(scratchJSONTree[id].opcode == "BisoftTERN_moveMotor"){
      percent = scratchJSONTree[scratchJSONTree[id].inputs.speed.block].fields["NUM"].value
      if(percent > 100) percent = 100
      if(percent < 0) percent = 0
      if(scratchJSONTree[id].fields.action.value == "Forward") lsb = 20 + ((20/100)*percent)
      if(scratchJSONTree[id].fields.action.value == "Backward") lsb = 20 - ((20/100)*percent)
      let port1 = getProgramPortNumber('M1')
      let port2 = getProgramPortNumber('M2')
      ob.s += `o{${port1}${msb}${lsb}}o{${port2}${msb}${lsb}}`
      if(scratchJSONTree[id].next){    
        programStringGenerator(scratchJSONTree[id].next, ob)
      }
    }

    if(scratchJSONTree[id].opcode == "BisoftTERN_moveLeftMotor"){
      percent = scratchJSONTree[scratchJSONTree[id].inputs.speed.block].fields["NUM"].value
      if(percent > 100) percent = 100
      if(percent < 0) percent = 0
      if(scratchJSONTree[id].fields.action.value == "Forward") lsb = 20 + ((20/100)*percent)
      if(scratchJSONTree[id].fields.action.value == "Backward") lsb = 20 - ((20/100)*percent)
      let port = getProgramPortNumber('M1')
      ob.s += `o{${port}${msb}${lsb}}`
      if(scratchJSONTree[id].next){    
        programStringGenerator(scratchJSONTree[id].next, ob)
      }
    }

    if(scratchJSONTree[id].opcode == "BisoftTERN_moveRightMotor"){
      percent = scratchJSONTree[scratchJSONTree[id].inputs.speed.block].fields["NUM"].value
      if(percent > 100) percent = 100
      if(percent < 0) percent = 0
      if(scratchJSONTree[id].fields.action.value == "Forward") lsb = 20 + ((20/100)*percent)
      if(scratchJSONTree[id].fields.action.value == "Backward") lsb = 20 - ((20/100)*percent)
      let port = getProgramPortNumber('M1')
      ob.s += `o{${port}${msb}${lsb}}`
      if(scratchJSONTree[id].next){    
        programStringGenerator(scratchJSONTree[id].next, ob)
      }
    }

    if(scratchJSONTree[id].opcode == "BisoftTERN_setBrighness"){
      percent = scratchJSONTree[scratchJSONTree[id].inputs.brightness.block].fields["NUM"].value
      if(percent > 100) percent = 100
      if(percent < 0) percent = 0
      percent = Math.round(65535/100 * percent)
      let {msb, lsb} = getMsbLsb(percent)

      port = getProgramPortNumber(scratchJSONTree[id].fields.ports.value)
      ob.s += `o{${port}${msb}${lsb}}`
      if(scratchJSONTree[id].next){    
        programStringGenerator(scratchJSONTree[id].next, ob)
      }
    }

    if(scratchJSONTree[id].opcode == "BisoftTERN_setServoMotor"){ 
      let degrees = scratchJSONTree[scratchJSONTree[id].inputs.degree.block].fields["NUM"].value
      if(degrees < 0) degrees = 0
      if(degrees > 180) degrees = 180

      degrees = (degrees * 20) + 1800
      let {msb, lsb} = getMsbLsb(degrees)
      port = getProgramPortNumber(scratchJSONTree[id].fields.ports.value)
      ob.s += `o{${port}${msb}${lsb}}`
      if(scratchJSONTree[id].next){    
        programStringGenerator(scratchJSONTree[id].next, ob)
      }
    }

    if (scratchJSONTree[id].opcode == "operator_gt") {
      // check left block is analog read port 
      if(scratchJSONTree[scratchJSONTree[id].inputs.OPERAND1.block].opcode == "BisoftTERN_setAnalogRead"){
        programStringGenerator(scratchJSONTree[id].inputs.OPERAND1.block, ob)
        // get the value of second block
        input_val = scratchJSONTree[scratchJSONTree[id].inputs.OPERAND2.block].fields.TEXT.value
        if(input_val < 0) input_val = 0
        if(input_val > 1024) input_val = 1024
        
        let {msb, lsb} = getMsbLsb(input_val)
        // perform greater than
        ob.s += `${msb}${lsb}62`
      }

      // check right block is analog read port
      if(scratchJSONTree[scratchJSONTree[id].inputs.OPERAND2.block].opcode == "BisoftTERN_setAnalogRead"){
        programStringGenerator(scratchJSONTree[id].inputs.OPERAND2.block, ob)
        input_val = scratchJSONTree[scratchJSONTree[id].inputs.OPERAND1.block].fields.TEXT.value
        if(input_val < 0) input_val = 0
        if(input_val > 1024) input_val = 1024
        
        let {msb, lsb} = getMsbLsb(input_val)
        // perform less than
        ob.s += `${msb}${lsb}60`
      } 
    }

    if (scratchJSONTree[id].opcode == "operator_lt") {
      // check left block is analog read port 
      if(scratchJSONTree[scratchJSONTree[id].inputs.OPERAND1.block].opcode == "BisoftTERN_setAnalogRead"){
        programStringGenerator(scratchJSONTree[id].inputs.OPERAND1.block, ob)
        // get the value of second block
        input_val = scratchJSONTree[scratchJSONTree[id].inputs.OPERAND2.block].fields.TEXT.value
        if(input_val < 0) input_val = 0
        if(input_val > 1024) input_val = 1024
        
        let {msb, lsb} = getMsbLsb(input_val)
        // perform less than
        ob.s += `${msb}${lsb}60`
      }

      // check right block is analog read port
      if(scratchJSONTree[scratchJSONTree[id].inputs.OPERAND2.block].opcode == "BisoftTERN_setAnalogRead"){
        programStringGenerator(scratchJSONTree[id].inputs.OPERAND2.block, ob)
        input_val = scratchJSONTree[scratchJSONTree[id].inputs.OPERAND1.block].fields.TEXT.value
        if(input_val < 0) input_val = 0
        if(input_val > 1024) input_val = 1024
        
        let {msb, lsb} = getMsbLsb(input_val)
        // perform greater than
        ob.s += `${msb}${lsb}62`
      }
    }

    if(scratchJSONTree[id].opcode == "operator_equals"){
      // check left block is analog read port 
      if(scratchJSONTree[scratchJSONTree[id].inputs.OPERAND1.block].opcode == "BisoftTERN_setAnalogRead"){
        programStringGenerator(scratchJSONTree[id].inputs.OPERAND1.block, ob)
        // get the value of second block
        input_val = scratchJSONTree[scratchJSONTree[id].inputs.OPERAND2.block].fields.TEXT.value
        if(input_val < 0) input_val = 0
        if(input_val > 1024) input_val = 1024
        
        let {msb, lsb} = getMsbLsb(input_val)
        ob.s += `${msb}${lsb}61`
      }

      // check right block is analog read port
      if(scratchJSONTree[scratchJSONTree[id].inputs.OPERAND2.block].opcode == "BisoftTERN_setAnalogRead"){
        programStringGenerator(scratchJSONTree[id].inputs.OPERAND2.block, ob)
        input_val = scratchJSONTree[scratchJSONTree[id].inputs.OPERAND1.block].fields.TEXT.value
        if(input_val < 0) input_val = 0
        if(input_val > 1024) input_val = 1024
        
        let {msb, lsb} = getMsbLsb(input_val)
        ob.s += `${msb}${lsb}61`
      }
    }

    if(scratchJSONTree[id].opcode == "operator_and"){
      // process first operand 
      if(scratchJSONTree[id].inputs.OPERAND1.block){
        programStringGenerator(scratchJSONTree[id].inputs.OPERAND1.block, ob)
      }
      // process second operand
      if(scratchJSONTree[id].inputs.OPERAND2.block){
        programStringGenerator(scratchJSONTree[id].inputs.OPERAND2.block, ob)
      }
    }

    if(scratchJSONTree[id].opcode == "BisoftTERN_setAnalogRead"){
      port = getProgramPortNumber(scratchJSONTree[id].fields.ports.value)
      msb = 0, lsb = 0
      ob.s += `${msb}${lsb}${port}`
    }

    if(scratchJSONTree[id].opcode == "control_repeat"){ 
      let input_val = scratchJSONTree[scratchJSONTree[id].inputs.TIMES.block].fields.NUM.value
      if(input_val < 0) input_val = 0
      if(input_val > 255) input_val = 255

      let {lsb} = getMsbLsb(input_val)
      ob.s += `l00${lsb}`
      ob.repeatTrack += 1
      // check if substack present
      if(scratchJSONTree[id].inputs.SUBSTACK){
        programStringGenerator(scratchJSONTree[id].inputs.SUBSTACK.block, ob)       
      }
      ob.s += ob.repeatTrack+"el"
      ob.repeatTrack -= 1
    }

  return ob.s
}

function getProgramPortNumber(port){
  let num = 0
  switch(port){
    case 'A1' :
      num = 1
    break

    case 'A2' :
      num = 2
    break

    case 'B1' :
      num = 3
    break

    case 'B2' :
      num = 4
    break

    case 'c1' :
      num = 5
    break

    case 'c2' :
      num = 6
    break

    case 'D1' :
      num = 7
    break

    case 'D2' :
      num = 8
    break

    case 'E1' :
      num = 9
    break

    case 'E2' :
      num = 10
    break

    case 'F1' :
      num = 11
    break

    case 'F2' :
      num = 12
    break

    case 'G1' :
      num = 13
    break

    case 'G2' :
      num = 14
    break

    case 'H1' :
      num = 15
    break

    case 'H2' :
      num = 16
    break

    case 'I1' :
      num = 17
    break

    case 'I2' :
      num = 18
    break

    case 'M1' :
      num = 19
    break

    case 'M2' :
      num = 20
    break
  }

  return num
}

function getMsbLsb(input_val){
  if(input_val < 255) return { msb : 0, lsb : input_val }
  input_val = (input_val).toString(2)
  lsb = input_val.toString(2).substr(input_val.toString(2).length - 8)
  msb = input_val.substr(0, (input_val.toString(2).length - 8))
  msb = parseInt(msb,2)
  lsb = parseInt(lsb,2)

  return {
    msb : msb,
    lsb : lsb
  }
}
console.log(programStringGenerator("x^f;P69Yrz{?*;o/^Vx6"))