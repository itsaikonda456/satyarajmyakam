import fs from "fs"
import path from "path"
import heicConvert from "heic-convert"

const basePath = "./public/images"

async function convertHEIC(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      await convertHEIC(fullPath)
    } else if (file.toLowerCase().endsWith(".heic")) {
      const outputPath = fullPath.replace(/\.heic$/i, ".jpg")
      const inputBuffer = fs.readFileSync(fullPath)
      const outputBuffer = await heicConvert({ buffer: inputBuffer, format: "JPEG", quality: 1 })
      fs.writeFileSync(outputPath, outputBuffer)
      console.log(`✅ Converted: ${file} → ${path.basename(outputPath)}`)
    }
  }
}

convertHEIC(basePath)
