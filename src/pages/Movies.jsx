import { Container } from "react-bootstrap";
import MovieList from "../components/movie-list";
import { useMovies } from '../api';

function Movies() {
  const { data, isLoading } = useMovies();

  return (
    <Container>
      <h3 className="my-3">Movies</h3>
      {!isLoading && <MovieList files={data.movies} />}
    </Container>
  );
}

export default Movies; 