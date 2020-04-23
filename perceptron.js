class Perceptron{
    constructor(numOfInputs, activationFunction){
        this.learningRate = 0.1;
        this.weights = [];
        for(let i = 0; i < numOfInputs; i++){
            this.weights.push( 1 - (Math.random() * 2));//init random weights for every input ranging from -1 to 1
        }
        this.numberOfInputs = numOfInputs;
        this.activationFunction = activationFunction;

        this.biasWeight = Math.random(); 
    }

    setWeights(weights){
        if(weights.length != this.numberOfInputs){
            throw "Wrong number of weights";
        }
        this.weights = weights;
    }

    getWeights(){
        // return this.weights.concat([this.biasWeight]);
        return this.weights;
    }

    predict(inputs){
        if(this.numberOfInputs != inputs.length){
            throw "Wrong number of inputs";
        }
        let prediction = 0;
        for(let i = 0; i < inputs.length; i++){
            prediction += this.weights[i] * inputs[i];
        }

        // return this.activationFunction(prediction + this.biasWeight);
        return this.activationFunction(prediction);
    }

    train(inputs, realOutput){
        if(this.numberOfInputs != inputs.length){
            throw "Wrong number of inputs";
        }
        let prediction = this.predict(inputs);
        let delta = realOutput - prediction;
        // console.log(delta);

        for(let i = 0; i < this.numberOfInputs; i++){
            this.weights[i] += delta * inputs[i] * this.learningRate;
        }
        // this.biasWeight += delta * this.learningRate;
    }
}