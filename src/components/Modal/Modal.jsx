import React from "react";
import PropTypes from "prop-types";

const Modal = ({isModalVisible, imageLargeURL, alt, closeModal}) => {
        return (
            <div tabIndex={0} className="Overlay" style={{ visibility: isModalVisible }} onClick={closeModal}>
                <div className="Modal"  >
                    <img src={imageLargeURL} alt={alt} />
                </div>
            </div>
        )
    }


export default Modal;
Modal.propTypes = {
    isModalVisible: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    imageLargeURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}