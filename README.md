Here's a `README.md` file for your image optimization CLI tool:

---

# 📷 optimize-images

A simple Node.js CLI tool that optimizes images by converting them to **WebP** format with multiple **responsive sizes** using the [Sharp](https://sharp.pixelplumbing.com/) library.

## ✨ Features

* Converts `.jpg`, `.jpeg`, and `.png` images to `.webp`
* Resizes images to multiple specified widths (default: 320, 640, 1024)
* Supports individual files or entire directories
* Outputs optimized images with filename suffixes (e.g., `image-320.webp`)

---

## 📦 Installation

Make sure you have [Node.js](https://nodejs.org/) installed.

```bash
npm install
```

---

## 🚀 Usage

```bash
./optimize-images.js <input> <output> [options]
```

### Arguments:

* `<input>`: Path to a single image file or a directory containing images
* `<output>`: Directory to save optimized images

### Options:

* `-s, --sizes <sizes>`: Comma-separated list of widths (default: `320,640,1024`)

### Example:

```bash
./optimize-images.js ./images ./output -s 300,600,900
```

This command will:

* Look for supported images in `./images`
* Convert and resize each to 300px, 600px, and 900px widths
* Save output as `.webp` images to the `./output` folder

---

## 📂 Example Output

Input image: `photo.jpg`
Command: `./optimize-images.js photo.jpg ./dist -s 300,600`

Output files:

```
dist/
├── photo-300.webp
└── photo-600.webp
```

---

## 🛠 Supported Formats

* `.jpg`
* `.jpeg`
* `.png`

All images are converted to `.webp` format.

---
