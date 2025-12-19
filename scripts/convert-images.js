const sharp = require("sharp");
const path = require("path");
const fs = require("fs/promises");

const originalsDir = path.join(__dirname, "../src/assets/images/originals");
const generatedDir = path.join(__dirname, "../src/assets/images/generated");
const sizes = [480, 800, 1200];

async function getAllImages(dir) {
    let results = [];
    const list = await fs.readdir(dir);

    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            results = results.concat(await getAllImages(filePath));
        } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
            results.push(filePath);
        }
    }

    return results;
}

async function exists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function convert() {
    const images = await getAllImages(originalsDir);
    console.log("Imatges trobades:", images.length);

    for (const imgPath of images) {
        const ext = path.extname(imgPath);
        const relativePath = path.relative(originalsDir, path.dirname(imgPath));
        const name = path.basename(imgPath, ext);

        // Crear subdirectori equivalent dins de generated
        const targetDir = path.join(generatedDir, relativePath);
        await fs.mkdir(targetDir, { recursive: true });

        for (const width of sizes) {
            const webpPath = path.join(targetDir, `${name}-${width}.webp`);
            const avifPath = path.join(targetDir, `${name}-${width}.avif`);

            try {
                // WEBP
                if (!(await exists(webpPath))) {
                    console.log("Generant:", webpPath);
                    await sharp(imgPath).resize({ width }).toFormat("webp").toFile(webpPath);
                } else {
                    console.log("Saltant (ja existeix):", webpPath);
                }

                // AVIF
                if (!(await exists(avifPath))) {
                    console.log("Generant:", avifPath);
                    await sharp(imgPath).resize({ width }).toFormat("avif").toFile(avifPath);
                } else {
                    console.log("Saltant (ja existeix):", avifPath);
                }
            } catch (err) {
                console.error("Error amb", imgPath, err);
            }
        }
    }
}

// CRIDA FINAL DE LA FUNCIO
convert().then(() => console.log("Conversió completada!")).catch(err => console.error(err));