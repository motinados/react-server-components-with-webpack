import SearchBox from "./SearchBox";

export default function SearchableAlbumList({ albums, search }) {
  const filteredAlbums = albums.filter((album) => {
    return album.artist.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <SearchBox search={search} />
      <ul>
        {filteredAlbums.map((album) => (
          <li key={album.id}>
            <div>artist: {album.artist}</div>
            <div>title: {album.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
