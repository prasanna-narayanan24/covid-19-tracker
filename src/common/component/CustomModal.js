import React from "react";
import { Modal } from "@material-ui/core";
import PropType from "prop-types";

const CustomModal = props => {
    const { open, onClose, children } = props;
    return <>
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open} onClose={onClose}>
            {children}
        </Modal>
    </>
}

CustomModal.propTypes = {
    open: PropType.bool.isRequired,
    onClose: PropType.func.isRequired
}

export default CustomModal;