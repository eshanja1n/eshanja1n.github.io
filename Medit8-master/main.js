class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;

        this.reset();
        this.print(this.times);
        
        // this.intervals = 3000;
        // setInterval(function(){ alert("Hello"); }, 3000);
    }


    // interval(index) {
    //     if(index) {
    //         myVar = setInterval(function(){ alert("Hello"); }, 1000);
    //     }if(!index) {
    //         clearInterval(myVar);
    //     }

    // }

   
    
    reset() {
        this.times = [ 0, 0, 0 ];
    }
    
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }

        // this.interval(false);
        this.startBreath();        
    }

    breathSound(){
        var audio = new Audio('breath_sound.mp3');
        audio.play();
    }

    exhaleSound(){
        var audio = new Audio('exhale_sound.mp3');
        audio.play();
    }

    startBreath(){
        var e = document.getElementById("ddlViewBy");
        var int = e.options[e.selectedIndex].text;
          //set timer for exhale
          setTimeout(this.startExhale, int*1000);

               //set breath interval
        breath = setInterval(function(){ audio1.play(); }, int*2000);
        //play Breath
        audio1.play();
    

    }

    startExhale(){
                //set exhale timer
                var e = document.getElementById("ddlViewBy");
                var int = e.options[e.selectedIndex].text;
                exhale = setInterval(function(){ audio2.play(); }, int*2000);
        //play Exhale
        audio2.play();

    }



    
    
    stop() {
        this.running = false;
        this.time = null;
        this.stopBreath();
        
    }

    stopBreath(){
        //clearBreather interval
        clearInterval(breath);
        //clearExhaler interval
        clearInterval(exhale);
    }

    stopExhale(){
        
    }

    restart() {
        // if (!this.time) this.time = performance.now();
        // if (!this.running) {
        //     this.running = true;
        //     requestAnimationFrame(this.step.bind(this));
        // }
        
        this.running = false;
        this.reset();
        this.print();
        this.stopBreath();

    }
    
   
    
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    
    print() {
        this.display.innerText = this.format(this.times);
    }
    
    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results'));

var breath;
var exhale;

var audio1 = new Audio('breath_sound.mp3');
var audio2 = new Audio('exhale_sound.mp3');