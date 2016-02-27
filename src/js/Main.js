// import Actor from './Actor.js';
// import World from './World.js';
import terra from 'terra';
import Tone from 'tone';
import knot from 'knot.js';
import {
    rand
}
from './_math.js';
//Init

document.addEventListener('DOMContentLoaded', () => Main.init());

class Main {
    static init() {
        const main = new Main();
        window.addEventListener('resize', () => main.resize());
    }

    constructor(options = {}) {
        const main = this; 

        Tone.Transport.bpm.value = 80;
        // this.canvas = document.querySelector('#canvas');
        // const world = new World({
        //  canvas: this.canvas
        // });
        // world.start();
        this.resize();

        var ping = new Tone.PingPongDelay(.16, 0.2)
            .toMaster();

        var filter = new Tone.Filter(1400, "bandpass")
            .connect(ping);

        //a polysynth composed of 6 Voices of MonoSynth
        this.synth = new Tone.SimpleSynth({
            "volume": -20,
            "oscillator" : {
                "type" : "square"
            },
            "envelope" : {
                "attack" : 0.01,
                "decay" : 0.2,
                "sustain" : 0.2,
                "release" : 0.2,
            }
        }).connect(filter);


        const cellSize = 25;
        const w = Math.ceil(this.screenWidth / cellSize);
        const h = Math.ceil(this.screenHeight / cellSize);

        //New terrarium
        const bbTerrarium = new terra.Terrarium(w, h, {
            id: 'canvas',
            cellSize: cellSize,
            trails: 0.9,
            background: [22, 22, 22]
        });

        const terrariumKnot = knot(bbTerrarium);
        terrariumKnot.on('step', (totalDead) => {
            // console.log('dead: ', totalDead)
            // this.synth.set("detune", ~~(Math.random() * 10 - 5))
        });

        terra.registerCreature({
            type: 'plant',
            color: [0, 120, 0],
            size: 10,
            initialEnergy: 5,
            maxEnergy: 20,
            wait: function() {
                // photosynthesis :)
                this.energy += 1;
            },
            move: false,
            reproduceLv: 0.65
        });


        terra.registerCreature({
            type: 'brute',
            color: [0, 255, 255],
            maxEnergy: 50,
            initialEnergy: 10,
            size: 20,
            reproduceLv: 0.2,
            sustainability: 3,
            move: function(neighbors) {
                var creature = this;

                // first, look for creatures to eat
                var spots = neighbors.filter(function(spot) {
                    return spot.creature.size < this.size;
                }.bind(creature));

                // if there's not enough food, try to move
                if (spots.length < this.sustainability) {
                    spots = neighbors.filter(function(spot) {
                        return !spot.creature;
                    });
                }


                // if we've got a spot to move to...
                if (spots.length) {
                    // ...pick one
                    var step = spots[rand(0, spots.length - 1)];
                    var coords = step.coords;



                    var successFn = (function() {
                            var foodEnergy = step.creature.energy * this.efficiency;

                            // add foodEnergy if eating, subtract 10 if moving
                            this.energy = this.energy + (foodEnergy || -10);

                            //Play sound to indicate we moved.
                            main.playSound(coords.x, coords.y);

                            // clear the original location
                            return false;
                        })
                        .bind(this);
                    return {
                        x: coords.x,
                        y: coords.y,
                        creature: creature,
                        successFn: successFn
                    };
                } else return false;
            }
        });



        terra.registerCreature({
            type: 'bully',
            color: [241, 196, 15],
            initialEnergy: 20,
            reproduceLv: 0.6,
            sustainability: 3
        });


        bbTerrarium.grid = bbTerrarium.makeGridWithDistribution([
            ['plant', 50],
            ['brute', 5],
            ['bully', 5]
        ]);
        bbTerrarium.animate();
        this.canvas = document.getElementById('canvas');
        this.resize();
    }

    playSound(x, y) {
        if (Math.random() > 0.97)
            this.synth.triggerAttackRelease((y * .5) * (x * .5), .12);
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.screenWidth = window.screen.width;
        this.screenHeight = window.screen.height;

        //Make sure canvas is centered
        if (this.canvas) {
            const canvasWidth = parseInt(this.canvas.style.width);
            const canvasHeight = parseInt(this.canvas.style.height);

            if (!isNaN(canvasWidth))
                this.canvas.style['margin-left'] = -(canvasWidth / 2) + 'px';
            if (!isNaN(canvasHeight))
                this.canvas.style['margin-top'] = -(canvasHeight / 2) + 'px';
        }

        console.log(`Resizing. W: ${this.width} H: ${this.height}`);
    }
}
