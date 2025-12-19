const fs = require("fs/promises");
const path = require("path");

// Carpeta amb les imatges generades
const generatedDir = path.join(__dirname, "../src/assets/images/generated");
// Fitxer de sortida a src/js
const outputFile = path.join(__dirname, "../src/js/preload-images.js");

// Funció recursiva per obtenir totes les imatges
async function getAllImages(dir) {
    let results = [];
    const list = await fs.readdir(dir);

    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            results = results.concat(await getAllImages(filePath));
        } else if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
            results.push(filePath);
        }
    }

    return results;
}

async function generate() {
    const images = await getAllImages(generatedDir);

    // Transformar rutes a paths relatius respecte a src/js
    const relativeImages = images.map(imgPath => {
        const relPath = path.relative(path.join(__dirname, "../src/js"), imgPath);
        return relPath.replace(/\\/g, "/"); // per Windows
    });

    const fileContent = `// Aquest fitxer està generat automàticament
export const imagesToPreload = [
${relativeImages.map(p => `    new URL("${p}", import.meta.url),`).join("\n")}
];
`;

    await fs.writeFile(outputFile, fileContent, "utf-8");
    console.log("preload-images.js generat correctament!");
}

// Executa
generate().catch(err => console.error(err));