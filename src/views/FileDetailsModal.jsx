import { useCallback } from "react";
import { Modal, Button, Row, Col, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { formatFileSize } from "../helpers/formatFileSize";
import { getFileIcon } from "../constants";

function FileDetailsModal({ show, onHide, file, onDelete, deleteMutation }) {
	const handleDelete = useCallback(() => {
		onDelete(file);
		onHide();
	}, [onDelete, onHide, file]);

	if (!file) return null;

	return (
		<Modal show={show} onHide={onHide} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>
					<i className={`bi ${getFileIcon(file)} me-2`}></i>
					{file.name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col md={4}>
						<strong>Name:</strong>
					</Col>
					<Col md={8} className="text-break">
						{file.name}
					</Col>
				</Row>
				<Row className="mt-2">
					<Col md={4}>
						<strong>Path:</strong>
					</Col>
					<Col md={8} className="text-break">
						{file.path}
					</Col>
				</Row>
				<Row className="mt-2">
					<Col md={4}>
						<strong>Size:</strong>
					</Col>
					<Col md={8}>{formatFileSize(file.size)}</Col>
				</Row>
				<Row className="mt-2">
					<Col md={4}>
						<strong>Type:</strong>
					</Col>
					<Col md={8}>
						{file.isDir
							? "Directory"
							: file.extension?.substring(1).toUpperCase() || "File"}
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<div className="d-flex justify-content-between w-100">
					<Button
						variant="transparent"
						onClick={() => handleDelete()}
					>
						{!deleteMutation?.isLoading ? (
							<i className="bi bi-trash-fill text-danger"></i>
						) : (
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Deleting...</span>
							</Spinner>
						)}
					</Button>

					<Button variant="secondary" onClick={onHide}>
						Close
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

FileDetailsModal.propTypes = {
	show: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired,
	file: PropTypes.shape({
		isDir: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
		size: PropTypes.number.isRequired,
		path: PropTypes.string.isRequired,
		extension: PropTypes.string,
	}),
	onDelete: PropTypes.func.isRequired,
	deleteMutation: PropTypes.object.isRequired,
};

export default FileDetailsModal;
