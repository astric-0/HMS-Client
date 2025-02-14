import { useMemo, useState } from "react";
import { Container, Spinner, Button } from "react-bootstrap";
import { useDownloadJobs } from "../api";
import AddDownloadModal from "../views/add-download-modal";
import DownloadsTable from "../views/downloads-table";

function DownloadJobs() {
	const { data, isLoading } = useDownloadJobs();
	const [showModal, setShowModal] = useState(false);

	const jobsData = useMemo(
		() => [
			{
				caption: "Active",
				jobs: data?.jobs?.active ?? [],
			},
			{
				caption: "Completed",
				jobs: data?.jobs?.completed ?? [],
			},
			{
				caption: "Waiting",
				jobs: data?.jobs?.waiting ?? [],
			},
			{
				caption: "Failed",
				jobs: data?.jobs?.failed ?? [],
			},
		],
		[data]
	);

	return (
		<Container>
			<div className="d-flex justify-content-between">
				<h3 className="my-3">Download Jobs</h3>
				<Button
					onClick={() => setShowModal(true)}
					variant="transparent"
					className="text-primary"
				>
					<i className="bi bi-plus"></i>
				</Button>
			</div>
			{isLoading ? (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading Downloads...</span>
				</Spinner>
			) : (
				jobsData?.map((val) => <DownloadsTable key={val.caption} {...val} />)
			)}
			<AddDownloadModal show={showModal} setter={setShowModal} />
		</Container>
	);
}

export default DownloadJobs;
