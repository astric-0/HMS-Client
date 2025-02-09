import SeriesList from "../components/series-list";
import { Container } from "react-bootstrap";
import { useSeries } from "../api";

function Series() {
  const { data, isLoading } = useSeries();

  return (
    <Container>
      <h3 className="my-3">TV Series</h3>
      {!isLoading && <SeriesList series={data.series} />}
    </Container>
  );
}

export default Series; 