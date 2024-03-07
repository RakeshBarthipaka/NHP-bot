import React from "react";
import Modal from "react-bootstrap/Modal";

export const CModal = (props: any) => {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered animation={false}>
            {/* <Modal.Header closeButton={props?.removecloseicon ? false : true}>
                <Modal.Title id="contained-modal-title-vcenter">{props.heading}</Modal.Title>
            </Modal.Header> */}
            <Modal.Body className={`add-topics-body`}>{props.children}</Modal.Body>
            {/* <Modal.Body className={`save-simulation ${props?.className}`}>
            {props.children}
          </Modal.Body> */}
            {/* <Modal.Body className={props?.className}>{props.children}</Modal.Body> */}
            {/* <Modal.Footer>
                <ULButton onClick={props.onHide} label="Close" />
            </Modal.Footer> */}
        </Modal>
    );
};

export default CModal;
