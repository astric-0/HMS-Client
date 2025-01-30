import { Accordion, ProgressBar, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { formatFileSize } from "../helpers/formatFileSize";

function StorageInfo({ info }) {
	const { total, used, available, usedByDownloads, disk } = info;
	const usedPercentage = (used / total) * 100;
	const downloadsPercentage = (usedByDownloads / total) * 100;

	return (
        <Accordion className="mb-2">
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <h5 className="mb-0">Storage Information</h5>
                </Accordion.Header>
                <Accordion.Body>
                    <ProgressBar className="mb-3">
                        <ProgressBar
                            variant="success"
                            now={downloadsPercentage}
                            key={1}
                            label={`Downloads: ${downloadsPercentage.toFixed(2)}%`}
                        />
                        <ProgressBar
                            variant="info"
                            now={usedPercentage - downloadsPercentage}
                            key={2}
                            label={`Other: ${(usedPercentage - downloadsPercentage).toFixed(2)}%`}
                        />
                    </ProgressBar>
                    <Row className="mb-3">
                        <Col md={4}><strong>Disk:</strong></Col>
                        <Col md={8}>{disk}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={4}><strong>Total:</strong></Col>
                        <Col md={8}>{formatFileSize(total)}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={4}><strong>Used:</strong></Col>
                        <Col md={8}>{formatFileSize(used)}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={4}><strong>Available:</strong></Col>
                        <Col md={8}>{formatFileSize(available)}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={4}><strong>Used by Downloads:</strong></Col>
                        <Col md={8}>{formatFileSize(usedByDownloads)}</Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

StorageInfo.propTypes = {
	info: PropTypes.shape({
		total: PropTypes.number.isRequired,
		used: PropTypes.number.isRequired,
		available: PropTypes.number.isRequired,
		usedByDownloads: PropTypes.number.isRequired,
		disk: PropTypes.string.isRequired,
	}).isRequired,
};

export default StorageInfo;
