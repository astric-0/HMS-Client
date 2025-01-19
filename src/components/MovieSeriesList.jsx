import { useState } from 'react';
import { Accordion, ListGroup, Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MovieList from './MovieList';

function MovieSeriesList({ movieSeries }) {
  const [selectedSeries, setSelectedSeries] = useState(null);

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
              <ListGroup variant="flush">
                <ListGroup.Item className="border-bottom">
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span>Episodes</span>
                    <Button
                      variant={selectedSeries === index ? "primary" : "outline-primary"}
                      size="sm"
                      onClick={() => setSelectedSeries(
                        selectedSeries === index ? null : index
                      )}
                    >
                      <i className="bi bi-collection-play me-1"></i>
                      {selectedSeries === index ? 'Hide' : 'Show'} Episodes
                    </Button>
                  </div>
                  {selectedSeries === index && (
                    <div className="mt-3">
                      <MovieList files={series.episodes} />
                    </div>
                  )}
                </ListGroup.Item>
              </ListGroup>
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