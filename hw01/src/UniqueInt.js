const fs = require('fs');

class UniqueInt {
    constructor() {
        this.seen = new Array(2047).fill(false);
        this.minInt = -1023;
    }

    processFile(inputFilePath, outputFilePath) {
        this.seen.fill(false);
        const uniqueNumbers = this.readUniqueIntegers(inputFilePath);
        this.writeUniqueIntegers(uniqueNumbers, outputFilePath);
    }

    readUniqueIntegers(inputFilePath) {
        const uniqueNumbers = [];
        const data = fs.readFileSync(inputFilePath, 'utf8');
        const lines = data.split('\n');
        lines.forEach(line => {
            const strippedLine = line.trim();
            if (strippedLine && this.isValidIntegerLine(strippedLine)) {
                const number = parseInt(strippedLine);
                if (-1023 <= number && number <= 1023 && !this.seen[number - this.minInt]) {
                    this.seen[number - this.minInt] = true;
                    uniqueNumbers.push(number);
                } else {
                    console.log(`Number out of range: ${number}`);
                }
            }
        });
        return this.sortUniqueNumbers(uniqueNumbers);
    }

    isValidIntegerLine(line) {
        return !isNaN(parseInt(line));
    }

    sortUniqueNumbers(numbers) {
        if (!numbers.length) return numbers;
        return numbers.sort((a, b) => a - b);
    }

    writeUniqueIntegers(uniqueNumbers, outputFilePath) {
        const outputStream = fs.createWriteStream(outputFilePath);
        uniqueNumbers.forEach(number => {
            outputStream.write(`${number}\n`);
        });
        outputStream.close();
    }
}

const inputFolder = "C:\Users\hp\Desktop\sample _inputs";
const outputFolder = "C:\Users\hp\Desktop\Sample _results";

const uniqueIntProcessor = new UniqueInt();

fs.readdirSync(inputFolder).forEach(filename => {
    if (filename.endsWith(".txt")) {
        const inputPath = `${inputFolder}/${filename}`;
        const outputPath = `${outputFolder}/${filename}_results.txt`;

        // Timing for each file
        const startTime = Date.now();
        uniqueIntProcessor.processFile(inputPath, outputPath);
        const endTime = Date.now();

        console.log(`Processed ${filename} in ${(endTime - startTime) / 1000} seconds`);
    }
});

