import { getAll } from "./db/get";

export default function ServerRoot({ search }) {
  return (
    <div>
      <h1>Server Root</h1>
      <Albums search={search} />
    </div>
  );
}

async function Albums({ search }) {
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
