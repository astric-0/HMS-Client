import { useCallback, useState } from "react";
import { Modal, Button, Row, Col, Spinner } from "react-bootstrap";
import MoveOptionsForMediaFile from "./move-options-for-media-file";
import PropTypes from "prop-types";
import { formatFileSize } from "../helpers/format-file-size";
import { getFileIcon } from "../constants";

const ACTIONS = Object.freeze({
	MOVE_ACTION_FOR_MEDIA_FILE: "move_action_for_media_file",
});

function FileDetailsModal({
	show,
	onHide,
	file,
	onDelete,
	deleteMutation,
	onMove,
	moveMutation,
}) {
	const [moveAction, setMoveAction] = useState(null);

	const handleDelete = useCallback(() => {
		onDelete(file.name, file.isDir);
		onHide();
	}, [onDelete, onHide, file]);

	if (!file) return null;

	return (
		<Modal show={show} onHide={onHide} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>
					<i className={`bi ${getFileIcon(file)} me-2`}></i>
					<span className="text-break">{file.name}</span>
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
				<Row className="mt-3">
					<Col md={12}>
						<strong>Actions:</strong>
					</Col>
					<Col md={12} className="mt-2 d-flex gap-2">
						{!moveAction && (
							<Button
								variant="outline-primary"
								onClick={() =>
									setMoveAction(ACTIONS.MOVE_ACTION_FOR_MEDIA_FILE)
								}
							>
								Move
							</Button>
						)}
						{moveAction === ACTIONS.MOVE_ACTION_FOR_MEDIA_FILE && (
							<Button
								variant="outline-secondary"
								onClick={() => setMoveAction(null)}
							>
								Cancel Move
							</Button>
						)}
					</Col>
				</Row>

				{moveAction == ACTIONS.MOVE_ACTION_FOR_MEDIA_FILE && (
					<MoveOptionsForMediaFile {...{ file, moveMutation, onMove }} />
				)}
			</Modal.Body>
			<Modal.Footer>
				<div className="d-flex justify-content-between w-100">
					<Button variant="transparent" onClick={() => handleDelete()}>
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
		path: PropTypes.string.isRequired,
		size: PropTypes.number,
		extension: PropTypes.string,
	}),
	onDelete: PropTypes.func,
	deleteMutation: PropTypes.object,
	onMove: PropTypes.func,
	moveMutation: PropTypes.object,
};

export default FileDetailsModal;
