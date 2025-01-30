import { useState, useCallback, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useAddDownloads } from "../api";
import PropTypes from "prop-types";

function AddDownloadModal({ show, setter }) {
	const addDownloadMutation = useAddDownloads();
	const [downloadData, setDownloadData] = useState({ type: "movie" });
	const [errors, setErrors] = useState({});

	const handleAddDownload = useCallback(
		async (event) => {
			event.preventDefault();

			const errors = {};
			if (!downloadData?.url) errors.url = "Invalid Url";
			if (!downloadData?.filename) errors.filename = "Invalid Filename";

			if (errors.url || errors.filename) return setErrors(errors);

			const response = addDownloadMutation.mutate(downloadData);
			if (response) setter(false);
		},

		[downloadData, addDownloadMutation, setter]
	);

	useEffect(() => {
		if (
			!addDownloadMutation.isLoading &&
			!addDownloadMutation.error &&
			addDownloadMutation.data
		)
			setter(false);
	}, [setter, addDownloadMutation]);

	return (
		<Form onSubmit={handleAddDownload} className="mb-3">
			<Modal show={show} onHide={() => setter(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						{typeof selectedUrl === "string" ? "Complete URL" : "Open With"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="downloadUrl">
						<Form.Label>Download URL</Form.Label>
						<Form.Control
							type="url"
							placeholder="Enter URL to download"
							value={downloadData.url}
							onChange={(e) => {
								setDownloadData({ ...downloadData, url: e.target.value });
							}}
							isInvalid={!!errors.url}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.url}
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3" controlId="filename">
						<Form.Label>Filename</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter filename"
							value={downloadData.filename}
							onChange={(e) => {
								setDownloadData({ ...downloadData, filename: e.target.value });
							}}
							isInvalid={!!errors.filename}
						/>
						<Form.Control.Feedback type="invalid">
							{errors.filename}
						</Form.Control.Feedback>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setter(false)}>
						Close
					</Button>
					<Button
						variant="primary"
						type="submit"
						disabled={addDownloadMutation.isLoading}
						onClick={handleAddDownload}
					>
						{addDownloadMutation.isLoading ? (
							<Spinner animation="border" size="sm" />
						) : (
							"Add Download"
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</Form>
	);
}

AddDownloadModal.propTypes = {
	show: PropTypes.bool.isRequired,
	setter: PropTypes.func.isRequired,
};

export default AddDownloadModal;
