import React from "react";
import PropTypes from "prop-types";

const Button = ({loadMore, isButtonVisible})=> {

        return (
            <button className="Button" onClick={loadMore}
                style={{ visibility: isButtonVisible ? "visible" : "hidden"}}>Load more</button>
        )
    }

export default Button;

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
    isButtonVisible: PropTypes.string.isRequired
}