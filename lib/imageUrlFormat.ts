export default function imageUrlFormat(imagePath: string) {
    return `https://firebasestorage.googleapis.com/v0/b/nestify-d913c.firebasestorage.app/o/${encodeURIComponent(imagePath)}?alt=media`
}