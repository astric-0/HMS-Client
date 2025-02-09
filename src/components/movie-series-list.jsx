import { Accordion, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import MovieList from "./movie-list";

function MovieSeriesList({ movieSeries }) {
	return (
		<Container className="py-3">
			<Accordion>
				{movieSeries?.map((series, index) => (
					<Accordion.Item key={series.name} eventKey={index.toString()}>
						<Accordion.Header>
							<div className="d-flex align-items-center">
								<i className="bi bi-collection-play me-2"></i>
								<span className="text-break">{series.name}</span>
							</div>
						</Accordion.Header>
						<Accordion.Body className="p-0">
							<MovieList files={series.episodes} />
						</Accordion.Body>
					</Accordion.Item>
				))}
			</Accordion>
		</Container>
	);
}

MovieSeriesList.propTypes = {
	movieSeries: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			episodes: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					type: PropTypes.string.isRequired,
					url: PropTypes.string.isRequired,
				})
			).isRequired,
		})
	).isRequired,
};

export default MovieSeriesList;
