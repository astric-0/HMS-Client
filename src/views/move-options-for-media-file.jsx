import { useState, useCallback } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { MEDIA_TYPES } from "../constants";

MoveOptionsForMediaFile.propTypes = {
	file: PropTypes.object.isRequired,
	onMove: PropTypes.func.isRequired,
	moveMutation: PropTypes.object.isRequired,
	sourcePath: PropTypes.string.isRequired,
};

export default function MoveOptionsForMediaFile({
	file,
	onMove,
	moveMutation,
}) {
	const [path, setPath] = useState(["", ""]);
	const [moveTo, setMoveTo] = useState("");

	const handleMove = useCallback(() => {
		if (!moveTo) return;

		const actionPayload = {
			file,
			destination: {
				rootDir: moveTo,
				path: path.filter(Boolean),
			}
		};

		onMove(actionPayload);
	}, [file, path, moveTo, onMove]);

	const handleMoveToChange = useCallback((e) => {
		setMoveTo(e.target.value);
		setPath(["", ""]);
	}, []);

	return (
		<Row className="mt-3">
			<Col md={12}>
				<strong>Move to:</strong>
			</Col>
			<Col md={12} className="mt-2">
				<Form>
					<Form.Group className="mb-3">
						<Form.Check
							type="radio"
							id="moveMovies"
							label="Movies"
							name="moveTarget"
							value={MEDIA_TYPES.MOVIES}
							checked={moveTo === MEDIA_TYPES.MOVIES}
							onChange={handleMoveToChange}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Check
							type="radio"
							id="moveMovieSeries"
							label="Movie Series"
							name="moveTarget"
							value={MEDIA_TYPES.MOVIE_SERIES}
							checked={moveTo === MEDIA_TYPES.MOVIE_SERIES}
							onChange={handleMoveToChange}
						/>
						{moveTo === MEDIA_TYPES.MOVIE_SERIES && (
							<Form.Control
								type="text"
								placeholder="Enter Movie Series Name"
								className="mt-2"
								value={path[0]}
								onChange={(e) =>
									setPath((val) => {
										val[0] = e.target.value;
										return [...val];
									})
								}
							/>
						)}
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Check
							type="radio"
							id="moveSeries"
							label="Series"
							name="moveTarget"
							value={MEDIA_TYPES.SERIES}
							checked={moveTo === MEDIA_TYPES.SERIES}
							onChange={handleMoveToChange}
						/>
						{moveTo === MEDIA_TYPES.SERIES && (
							<>
								<Form.Control
									type="text"
									placeholder="Enter Series Name"
									className="mt-2 mb-2"
									value={path[0]}
									onChange={(e) =>
										setPath((val) => {
											val[0] = e.target.value;
											return [...val];
										})
									}
								/>

								<Form.Control
									type="text"
									placeholder="Enter Season Name"
									value={path[1]}
									onChange={(e) =>
										setPath((val) => {
											val[1] = e.target.value;
											return [...val];
										})
									}
								/>
							</>
						)}
					</Form.Group>

					<Button
						variant="success"
						type="button"
						onClick={handleMove}
						disabled={moveMutation.isLoading}
					>
						{moveMutation.isLoading ? (
							<Spinner animation="border" size="sm" />
						) : (
							"Confirm Move"
						)}
					</Button>
				</Form>
			</Col>
		</Row>
	);
}
