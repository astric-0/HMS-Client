import { Container } from "react-bootstrap";
import MovieSeriesList from "../components/movie-series-list";
import { useMovieSeries } from "../api";

function MovieSeries() {
	const { data, isLoading } = useMovieSeries();

	return (
		<Container>
			<h3 className="my-3">Movie Series</h3>
			{!isLoading && <MovieSeriesList movieSeries={data.movieSeries} />}
		</Container>
	);
}

export default MovieSeries;
