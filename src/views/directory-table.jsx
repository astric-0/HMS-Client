import { useState, useCallback } from "react";
import { Spinner, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { getFileIcon } from "../constants";
import { formatFileSize } from "../helpers/format-file-size";
import FileDetailsModal from "./file-details-modal";
import { useRemoveDownloadedFile, useMoveFileMutation } from "../api";

function DirectoryTable({ isLoading, files, error }) {
	const [selectedFile, setSelectedFile] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const openFileDetails = useCallback((file) => {
		setSelectedFile(file);
		setShowModal(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setShowModal(false);
		setTimeout(() => setSelectedFile(null), 300);
	}, []);

	const deleteMutation = useRemoveDownloadedFile();
	const moveFileMutation = useMoveFileMutation();

	const handleDeleteFile = useCallback(
		async (file) => {
			deleteMutation.mutate(file);
		},
		[deleteMutation]
	);

	const handleMoveFile = useCallback(
		async (actionPayload) => {
			moveFileMutation.mutate(actionPayload);
		},
		[moveFileMutation]
	);

	return (
		<>
			{isLoading ? (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading directory contents...</span>
				</Spinner>
			) : (
				<Table bordered hover responsive>
					<thead>
						<tr>
							<th className="width-75">Name</th>
							<th className="width-25">Size</th>
							<th className="width-25">Type</th>
						</tr>
					</thead>
					<tbody>
						{files.map((file) => (
							<tr key={file.path}>
								<td onClick={() => openFileDetails(file)}>
									<i className={`bi ${getFileIcon(file)} me-2`}></i>
									{file.name}
								</td>
								<td>{formatFileSize(file.size)}</td>
								<td>
									{file.isDir
										? "Directory"
										: file.extension?.substring(1).toUpperCase() || "File"}
								</td>
							</tr>
						))}
						{files.length === 0 && !isLoading && !error && (
							<tr>
								<td colSpan="3" className="text-center">
									Directory is empty.
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			)}

			<FileDetailsModal
				show={showModal}
				onHide={handleCloseModal}
				file={selectedFile}
				onDelete={handleDeleteFile}
				deleteMutation={deleteMutation}
				onMove={handleMoveFile}
				moveMutation={moveFileMutation}
			/>
		</>
	);
}

DirectoryTable.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	files: PropTypes.array.isRequired,
	error: PropTypes.bool,
};

export default DirectoryTable;
