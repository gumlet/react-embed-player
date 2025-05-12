// fix-jsx-runtime.js
import fs from 'fs'

const filePath = './dist/index.mjs'
let content = fs.readFileSync(filePath, 'utf8')

// Replace the import without extension
content = content.replace(/from ['"]react\/jsx-runtime['"]/g, 'from "react/jsx-runtime.js"')

fs.writeFileSync(filePath, content)
console.log('✅ Patched react/jsx-runtime import in index.mjs')