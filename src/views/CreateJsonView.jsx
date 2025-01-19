import { useState } from "react";
import { ButtonGroup, Container } from "react-bootstrap";
import { createJson } from "../api";
import LoadingButton from "../components/LoadingButton";
import { MEDIA_TYPES } from "../constants";

export default function CreateJsonView() {
	const [loading, setLoading] = useState({
		movies: false,
		series: false,
		movieSeries: false,
	});

	const handleCreateJson = async (mediaType) => {
		setLoading((prev) => ({ ...prev, [mediaType]: true }));
		try {
			const response = await createJson(mediaType);
			if (response.error) throw new Error(response.error);
			alert(`${mediaType} JSON created successfully!`);
		} catch {
			alert(`Failed to create ${mediaType} JSON`);
		} finally {
			setLoading((prev) => ({ ...prev, [mediaType]: false }));
		}
	};
	return (
		<Container>
			<h4 className="my-3">Create JSON</h4>
			<ButtonGroup className="mb-3 w-100">
				<LoadingButton
					loading={loading.movies}
					iconClass="bi bi-film"
					text="Movies"
					onClick={() => handleCreateJson(MEDIA_TYPES.MOVIES)}
				/>

				<LoadingButton
					loading={loading.movieSeries}
					iconClass="bi bi-collection-play"
					text="Movie Series"
					onClick={() => handleCreateJson(MEDIA_TYPES.MOVIE_SERIES)}
				/>

				<LoadingButton
					loading={loading.series}
					iconClass="bi bi-tv"
					text="Series"
					onClick={() => handleCreateJson(MEDIA_TYPES.SERIES)}
				/>
			</ButtonGroup>
		</Container>
	);
}
