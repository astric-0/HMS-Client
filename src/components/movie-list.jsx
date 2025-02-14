import { ListGroup, Container, Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import { getUrl } from "../config";

function MovieList({ files }) {
	const [showModal, setShowModal] = useState(false);
	const [selectedUrl, setSelectedUrl] = useState("");

	const handleCopy = useCallback((url) => {
		if (!navigator?.clipboard) return alert("Failed to copy");

		navigator?.clipboard
			?.writeText(getUrl(url))
			.then(() => alert("URL copied to clipboard!"))
			.catch((err) => alert("Failed to copy:", err));
	}, []);

	const handleShowUrl = useCallback(({ url, downloadUrl }, e) => {
		e.stopPropagation();
		console.log({ url, downloadUrl });
		setSelectedUrl({ url: getUrl(url), downloadUrl: getUrl(downloadUrl) });
		setShowModal(true);
	}, []);

	const openInVLC = useCallback((url) => {
		const videoUrl = getUrl(url);
		const androidIntent = `intent:${videoUrl}#Intent;package=org.videolan.vlc;type=video/*;end`;
		window.location.href = androidIntent;

		setTimeout(() => {
			window.location.href = `vlc://${videoUrl}`;
		}, 100);
	}, []);

	return (
		<Container className="px-0">
			<ListGroup as="ul">
				{files?.map((file) => (
					<ListGroup.Item
						key={file.url}
						action
						as="li"
						className="d-flex align-items-center text-break justify-content-between"
					>
						<div className="d-flex align-items-center flex-grow-1">
							{file.name}
						</div>
						<div className="d-flex gap-2">
							<Button
								variant="outline-success"
								size="sm"
								onClick={() => openInVLC(file.url)}
								title="Open in VLC"
							>
								<i className="bi bi-play-circle"></i>
							</Button>

							<Button
								variant="outline-info"
								size="sm"
								onClick={(e) => handleShowUrl(file, e)}
							>
								<i className="bi bi-eye"></i>
							</Button>
						</div>
					</ListGroup.Item>
				))}
			</ListGroup>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						{typeof selectedUrl.url === "string" ? "Complete URL" : "Open With"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="text-break user-select-all">{selectedUrl.url}</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Close
					</Button>
					{typeof selectedUrl.url === "string" && (
						<Button
							variant="primary"
							onClick={() => {
								handleCopy(selectedUrl.url);
								setShowModal(false);
							}}
						>
							Copy URL
						</Button>
					)}
					{typeof selectedUrl.downloadUrl === "string" && (
						<a href={selectedUrl.downloadUrl} className="btn btn-dark" download>
							Download
						</a>
					)}
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

MovieList.propTypes = {
	files: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default MovieList;
