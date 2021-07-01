import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    placeholder: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.string,
    disbabled: PropTypes.bool,
};

SelectField.deafaultProps = {
    placeholder: '',
    label: '',
    options: [],
    disbabled: false,
}

function SelectField(props) {
    const { field, form,
        placeholder, label, options, disbabled
    } = props;
    const { name, value } = field;
    const selectedOption = options.find(option => option.value === value);

    function handleOnChangeOption(selectedOption) {
        const selectValue = selectedOption ? selectedOption.value : selectedOption;

        const changeEvent = {
            target: {
                name: name,
                value: selectValue,
            }
        }
        field.onChange(changeEvent);
    }

    return (
        <div className="personal-info-body__edit-wapper">
            {label && <div className="personal-info-body__edit-title">
                {label}
            </div>}
            <Select
                id={name}
                {...field}
                value={selectedOption}
                onChange={handleOnChangeOption}

                placeholder={placeholder}
                disbabled={disbabled}
                options={options}

                className="personal-info-body__edit-input" />
        </div>
    );
}

export default SelectField;