import { useState, useCallback } from "react";
import { Spinner, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { getFileIcon } from "../constants";
import { formatFileSize } from "../helpers/format-file-size";
import FileDetailsModal from "./file-details-modal";
import { useRemoveFile, useMoveFileMutation } from "../api";

function DirectoryTable({
	isLoading,
	files,
	error,
	handleOpenDir,
	rootDir,
	path,
}) {
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

	const deleteMutation = useRemoveFile({ rootDir, path });
	const moveFileMutation = useMoveFileMutation({ rootDir, path });

	const handleDeleteFile = useCallback(
		async (filename) => {
			await deleteMutation.mutateAsync(filename);
		},
		[deleteMutation]
	);

	const handleMoveFile = useCallback(
		(actionPayload) => {
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
				<Table hover responsive>
					<thead>
						<tr>
							<th className="width-75">Name</th>
							<th className="width-25">Size</th>
							<th className="width-25"></th>
						</tr>
					</thead>
					<tbody>
						{files.map((file) => (
							<tr key={file.path}>
								<td
									onClick={() =>
										file.isDir
											? handleOpenDir(file.name)
											: openFileDetails(file)
									}
								>
									<i className={`bi ${getFileIcon(file)} me-2`}></i>
									<span className="text-break">{file.name}</span>
								</td>
								<td>{!file.isDir ? formatFileSize(file.size) : "N/A"}</td>
								<td>
									<i
										role="button"
										onClick={() => openFileDetails(file)}
										className="bi bi-three-dots-vertical"
									></i>
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
	handleOpenDir: PropTypes.func,
	rootDir: PropTypes.string.isRequired,
	path: PropTypes.array,
};

export default DirectoryTable;
