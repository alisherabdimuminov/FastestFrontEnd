export default function apify(path: string) {
    return `http://localhost:8000/api/v1/${path}/`;
}