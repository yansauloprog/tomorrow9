import { mkdir, writeFile } from 'node:fs/promises'

const url = 'https://uc0688ca52a11e9f33109d5c1035.dl.dropboxusercontent.com/cd/0/get/DJdZINdMPl1YWtEN25PTCrNqVoki-iB0O2FTgHvU1NhRA6NQWYHaK6lECchsh6egcOGEclSnhjxuIeXXHMhiNukY28Ysu62_FLPNM5Hy9ZjiOh0n-UnKdWqbigeWXcMSC62n9MtuLnVAzPwahvUCscpWjtGKwkT88FqWIIh2lsYYqQ/file?c_luid=d9d45c48'

const response = await fetch(url)
if (!response.ok) {
  throw new Error(`Failed to fetch Yan video: ${response.status} ${response.statusText}`)
}

const bytes = new Uint8Array(await response.arrayBuffer())
await mkdir('public/media', { recursive: true })
await writeFile('public/media/yan.mp4', bytes)

console.log(`Yan video staged: ${bytes.length} bytes`)
