import React from 'react';
import PropTypes from 'prop-types';

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disbabled: PropTypes.bool,
};

InputField.deafaultProps = {
    type: "text",
    label: '',
    placeholder: '',
    disbabled: false,
}

function InputField(props) {
    const { field, form,
        type, label, placeholder, disbabled
    } = props;
    const { name, value } = field;

    return (
        <div className="personal-info-body__edit-wapper">
            {label && <div className="personal-info-body__edit-title">
                {label}
            </div>}
            <input
                id={name}
                {...field}
                value={value}

                type={type}
                placeholder={placeholder}
                disbabled={disbabled}
                className="personal-info-body__edit-input" />
        </div>
    );
}

export default InputField;