#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const {Command} = require('commander');

const program = new Command();
const supportedExtensions = ['.jpg', '.jpeg', '.png'];
const defaultSizes = [320, 640, 1024];

program
    .name('optimize-images')
    .description('Optimize images to WebP with responsive sizes')
    .argument('<input>', 'File or directory to process')
    .argument('<output>', 'Output directory for optimized images')
    .option('-s, --sizes <sizes>', 'Comma-separated list of sizes (e.g. 300,600,900)', val =>
        val.split(',').map(Number), defaultSizes)
    .version('1.0.0')
    .parse();

const options = program.opts();
const [inputPath, outputDir] = program.args;
const sizes = options.sizes;

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, {recursive: true});
}

function processImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const base = path.basename(filePath, ext);

    if (!supportedExtensions.includes(ext)) {
        console.warn(`⚠️ Skipping unsupported file: ${filePath}`);
        return;
    }

    sizes.forEach(size => {
        const outputFile = path.join(outputDir, `${base}-${size}.webp`);
        sharp(filePath)
            .resize(size)
            .toFormat('webp')
            .toFile(outputFile)
            .then(() => console.log(`✅ Created ${outputFile}`))
            .catch(err => console.error(`❌ Error processing ${filePath}:`, err));
    });
}

function handleInput(inputPath) {
    try {
        const stats = fs.lstatSync(inputPath);

        if (stats.isDirectory()) {
            const files = fs.readdirSync(inputPath);
            files.forEach(file => {
                const fullPath = path.join(inputPath, file);
                if (fs.lstatSync(fullPath).isFile()) {
                    processImage(fullPath);
                }
            });
        } else if (stats.isFile()) {
            processImage(inputPath);
        } else {
            console.error('❌ Input is neither a file nor a directory');
        }
    } catch (err) {
        console.error(`❌ Error: ${err.message}`);
    }
}

handleInput(inputPath);

