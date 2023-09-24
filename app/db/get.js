const albums = require('./data/albums.json');

const artificialWait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAll() {
	await artificialWait(200);
	return albums;
}
