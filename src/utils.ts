export let random = {
  initialize(seed: number) {
    // Initialize the first 96 bits of the seed
    // First 11 digits of PI, E, and PHI
    let a = 31415926535;
    let b = 71828182845
    let c = 16180339887;

    // sfc32 (short fast counter) PRNG algorithm
    // Produces uniformly-distributed floats between 0 and 1, with 32 bits of precision
    this.random = function() {
      a >>>= 0; b >>>= 0; c >>>= 0; seed >>>= 0; 
      let t = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = c + (c << 3) | 0;
      c = ((c << 21) | (c >>> 11));
      seed = seed + 1 | 0;
      t = t + seed | 0;
      c = c + t | 0;
      // Divide by max Uint32 to get a float between 0 and 1
      return (t >>> 0) / 4294967296;
    }
    // Since the first 96 bits of the seed were fixed initially, run the generator a few times to mix everything up
    for (let i = 0; i < 15; i++) this.random();
  },
  random() {
    // This function will be reassigned when this.initialize() is called
    //throw new Error("PRNG has not been initialized.");
    console.log("PRNG called before being initialized!");
    return -1;
  },
  choice<T>(arr: T[]) {
    return arr[Math.floor(arr.length * this.random())];
  },
  int(min: number, max: number) {
    return Math.floor((1 + max - min) * this.random()) + min;
  },
  shuffle<T>(arr: T[]) {
    let tmp = arr.map(i => i);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = tmp.splice(Math.floor(this.random() * tmp.length), 1)[0];
    }
  }
};

export function rollingShuffle<T>(arr: T[], currentCycle: number) {
  let indexC = Math.floor(arr.length * 2 / 3);
  random.initialize(currentCycle - 1);
  let oldListA = arr.map(i => i);
  random.shuffle(oldListA);
  let oldListC = oldListA.splice(indexC, arr.length - indexC);
  random.initialize(currentCycle);
  let listA = arr.map(i => i);
  random.shuffle(listA);
  let listC = listA.splice(indexC, arr.length - indexC);
  let listB = [];
  for (let i = 0; i < listA.length; i++) {
    if (oldListC.indexOf(listA[i]) !== -1) {
      listB.push(listA.splice(i, 1)[0]);
      i--;
    }
  }
  return listA.concat(listB, listC);
}