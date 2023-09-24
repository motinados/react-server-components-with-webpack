import { getAll } from "./db/get";

export default function ServerRoot() {
  return (
    <div>
      <h1>Server Root</h1>
      <Albums />
    </div>
  );
}

async function Albums() {
  const albums = await getAll();
  return (
    <div>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <div>artist: {album.artist}</div>
            <div>title: {album.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
