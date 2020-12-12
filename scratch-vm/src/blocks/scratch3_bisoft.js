const Cast = require('../util/cast');

class Scratch3StartEndBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        this.data = [];

        if (this.runtime) {
            this.runtime.on('PROJECT_RUN_START', ()=>{
                // console.log("Default Runtime :: ", this.runtime)
                if(this.data.length > 0){    
                    let preparedData = this.data;
                    this.sendDataToServer('http://127.0.0.1:3050/',{instructions : preparedData})
                    console.log('Data ', this.data)
                    this.data = []
                }
            })
        }
    }

    getPrimitives(){
        return {
            // motion_startblock : this.bisoftStartBlock,
            // motion_endblock : this.bisoftEndBlock,
            looks_portA1 : this.bisoftA1LedBlock,
            looks_portA2 : this.bisoftA2LedBlock,
            looks_portA3 : this.bisoftA3LedBlock,
            looks_portA4 : this.bisoftA4LedBlock
        }
    } 
    
    getHats(){
        return {
            motion_startblock : {
                restartExistingThreads : true
            }
        }
    }

    bisoftStartBlock(args, util){
        this.data.push("Hi i am start block")
    }

    bisoftEndBlock(args, util){
        this.data.push( args)   
    }

    bisoftA1LedBlock(args, util){
        this.data.push('W')
        return true;
    }

    bisoftA2LedBlock(args, util){
        this.data.push('H')
        return true;
    }

    bisoftA3LedBlock(args, util){
        this.data.push('O')
        return true;
    }

    bisoftA4LedBlock(args, util){
        this.data.push('B4')
        return true;
    }

    // send data to local server

    sendDataToServer(url = '', data = {}) {
      // Default options are marked with *
      fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      })
      .then((da)=>{
            console.log(da)
        })
        .catch((err)=>{
            console.log('Server Communication error')
        })
      return 1; // parses JSON response into native JavaScript objects
    }

}

module.exports = Scratch3StartEndBlocks;
