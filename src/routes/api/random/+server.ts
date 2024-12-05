import { json } from '@sveltejs/kit';

export async function GET() {
	const random = Math.floor(Math.random() * 1000) + 1;
    await sleep(random);
	return json({ random });
}

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}