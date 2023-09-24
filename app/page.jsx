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
  return <SearchableAlbumList albums={albums} search={search} />;
}
