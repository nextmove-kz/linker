'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function uploadImages(data: FormData) {
  const files = data.getAll('files') as File[]
  const uploadedPaths: string[] = []

  for (const file of files) {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = join('./public', 'uploads', file.name)
    await writeFile(path, buffer)
    uploadedPaths.push(`/uploads/${file.name}`)
  }

  return { success: true, paths: uploadedPaths }
}

