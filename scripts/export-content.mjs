import ts from 'typescript'
import { writeFileSync, readFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const source = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8')
const js = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022
  }
}).outputText

const tempDir = mkdtempSync(join(tmpdir(), 'content-export-'))
const tempFile = join(tempDir, 'content.mjs')
writeFileSync(tempFile, js)

const { content } = await import(pathToFileURL(tempFile).href)
const target = new URL('../public/content.json', import.meta.url)
writeFileSync(target, `${JSON.stringify(content, null, 2)}\n`)
console.log(`content.json written: uk + en (${Object.keys(content).join(', ')})`)
