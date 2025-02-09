import { useState } from 'react';
import { Accordion, ListGroup, Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MovieList from './movie-list';

function SeriesList({ series }) {
  const [selectedSeason, setSelectedSeason] = useState(null);

  return (
    <Container className="py-3">
      <Accordion>
        {series?.map((show, index) => (
          <Accordion.Item key={show.name} eventKey={index.toString()}>
            <Accordion.Header>
              <div className="d-flex align-items-center">
                <i className="bi bi-tv me-2"></i>
                <span className="text-break">{show.name}</span>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-0">
              <ListGroup variant="flush">
                {show.seasons?.map((season, seasonIndex) => (
                  <ListGroup.Item 
                    key={season.name}
                    className="border-bottom p-1"
                  >
                    <div className="d-flex justify-content-between align-items-center mx-2">
                      <span className="text-break">{season.name}</span>
                      <Button
                        variant={selectedSeason === `${index}-${seasonIndex}` ? "primary" : "outline-primary"}
                        size="sm"
                        onClick={() => setSelectedSeason(
                          selectedSeason === `${index}-${seasonIndex}` ? null : `${index}-${seasonIndex}`
                        )}
                      >
                        <i className="bi bi-collection-play me-1"></i>
                        {selectedSeason === `${index}-${seasonIndex}` ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                    {selectedSeason === `${index}-${seasonIndex}` && (
                      <div className="mt-3 mx-1">
                        <MovieList 
                          files={season.episodes}
                        />
                      </div>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}

SeriesList.propTypes = {
  series: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      seasons: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          episodes: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              url: PropTypes.string.isRequired,
            })
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default SeriesList; 