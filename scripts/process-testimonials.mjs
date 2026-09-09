import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const outputDir = path.resolve('public/images/testimonials')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const images = [
  {
    src: 'C:/Users/Sasha/.gemini/antigravity-ide/brain/a9fb2c86-f4de-490d-ac5d-cf87887a6bbd/telegram_review_viktoriia_1788987188090.jpg',
    dest: 'review-telegram-7.webp'
  },
  {
    src: 'C:/Users/Sasha/.gemini/antigravity-ide/brain/a9fb2c86-f4de-490d-ac5d-cf87887a6bbd/viber_review_artem_1788987204271.jpg',
    dest: 'review-viber-8.webp'
  },
  {
    src: 'C:/Users/Sasha/.gemini/antigravity-ide/brain/a9fb2c86-f4de-490d-ac5d-cf87887a6bbd/whatsapp_review_mykhailo_1788987220967.jpg',
    dest: 'review-whatsapp-9.webp'
  },
  {
    src: 'C:/Users/Sasha/.gemini/antigravity-ide/brain/a9fb2c86-f4de-490d-ac5d-cf87887a6bbd/telegram_review_yuliia_1788987238143.jpg',
    dest: 'review-telegram-10.webp'
  },
  {
    src: 'C:/Users/Sasha/.gemini/antigravity-ide/brain/a9fb2c86-f4de-490d-ac5d-cf87887a6bbd/whatsapp_review_bohdan_1788987255822.jpg',
    dest: 'review-whatsapp-11.webp'
  },
  {
    src: 'C:/Users/Sasha/.gemini/antigravity-ide/brain/a9fb2c86-f4de-490d-ac5d-cf87887a6bbd/telegram_review_tetiana_1788987275225.jpg',
    dest: 'review-telegram-12.webp'
  }
]

for (const img of images) {
  const targetPath = path.join(outputDir, img.dest)
  await sharp(img.src)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(targetPath)
  console.log(`Saved ${targetPath}`)
}
