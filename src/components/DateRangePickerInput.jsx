import React, { PropTypes } from 'react';
import cx from 'classnames';
import momentPropTypes from 'react-moment-proptypes';

import DateInput from './DateInput';
import RightArrow from '../svg/arrow-right.svg';
import CloseButton from '../svg/close.svg';

import { START_DATE, END_DATE } from '../../constants';

const propTypes = {
  startDateId: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  previewStartDate: momentPropTypes.momentObj,
  previewEndDate: momentPropTypes.momentObj,

  endDateId: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,

  onStartDateFocus: PropTypes.func,
  onEndDateFocus: PropTypes.func,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  onStartDateShiftTab: PropTypes.func,
  onEndDateTab: PropTypes.func,
  onClearDates: PropTypes.func,

  startDate: PropTypes.string,
  endDate: PropTypes.string,

  isStartDateFocused: PropTypes.bool,
  isEndDateFocused: PropTypes.bool,
  showClearDates: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  showCaret: PropTypes.bool,

  inputWrapperClassNames: PropTypes.string,
  inputStartFieldClassNames: PropTypes.string,
  inputEndFieldClassNames: PropTypes.string,

  // i18n
  phrases: PropTypes.shape({
    clearDates: PropTypes.node,
  }),
};

const defaultProps = {
  startDateId: START_DATE,
  endDateId: END_DATE,
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  onStartDateFocus() {},
  onEndDateFocus() {},
  onStartDateChange() {},
  onEndDateChange() {},
  onStartDateShiftTab() {},
  onEndDateTab() {},
  onClearDates() {},
  isStartDateFocused: false,
  isEndDateFocused: false,
  showClearDates: false,
  disabled: false,
  showCaret: false,

  // i18n
  phrases: {
    clearDates: 'Clear Dates',
  },
};

export default class DateRangePickerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClearDatesHovered: false,
    };

    this.onClearDatesMouseEnter = this.onClearDatesMouseEnter.bind(this);
    this.onClearDatesMouseLeave = this.onClearDatesMouseLeave.bind(this);
  }

  onClearDatesMouseEnter() {
    this.setState({
      isClearDatesHovered: true,
    });
  }

  onClearDatesMouseLeave() {
    this.setState({
      isClearDatesHovered: false,
    });
  }

  render() {
    const { startDateString, endDateString, isClearDatesHovered } = this.state;
    const {
      startDate,
      startDateId,
      startDatePlaceholderText,
      isStartDateFocused,
      onStartDateChange,
      onStartDateFocus,
      onStartDateShiftTab,
      endDate,
      endDateId,
      endDatePlaceholderText,
      isEndDateFocused,
      onEndDateChange,
      onEndDateFocus,
      onEndDateTab,
      onClearDates,
      showClearDates,
      disabled,
      required,
      showCaret,
      phrases,
      previewStartDate: momentPreviewStartDate,
      previewEndDate: momentPreviewEndDate,
      inputWrapperClassNames = '',
      inputStartFieldClassNames = '',
      inputEndFieldClassNames = '',
    } = this.props;

    const previewStartDate = momentPreviewStartDate
      ? momentPreviewStartDate.format('MMM DD')
      : null;

    const previewEndDate = momentPreviewEndDate
      ? momentPreviewEndDate.format('MMM DD')
      : null;

    const startDateValue = previewStartDate || startDate || startDateString;
    const endDateValue = previewEndDate || endDate || endDateString;

    const renderMiddleIcon = () => {
      console.log('');
      return (
        <div className="DateRangePickerInput__arrow">
          <RightArrow />
        </div>
      );
    };

    return (
      <div
        className={cx(`DateRangePickerInput ${inputWrapperClassNames}`, {
          'DateRangePickerInput--disabled': disabled,
        })}
      >
        <div
          className={cx('input-start', {
            [`${inputStartFieldClassNames}`]: inputStartFieldClassNames !== '',
          })}
        >
          <DateInput
            id={startDateId}
            placeholder={startDatePlaceholderText}
            dateValue={startDateValue}
            focused={isStartDateFocused}
            disabled={disabled}
            required={required}
            showCaret={showCaret}
            onChange={onStartDateChange}
            onFocus={onStartDateFocus}
            onKeyDownShiftTab={onStartDateShiftTab}
          />
        </div>

        {true ? null : renderMiddleIcon()}

        <div
          className={cx('input-end', {
            [`${inputEndFieldClassNames}`]: inputEndFieldClassNames !== '',
          })}
        >
          <DateInput
            id={endDateId}
            placeholder={endDatePlaceholderText}
            dateValue={endDateValue}
            focused={isEndDateFocused}
            disabled={disabled}
            required={required}
            showCaret={showCaret}
            onChange={onEndDateChange}
            onFocus={onEndDateFocus}
            onKeyDownTab={onEndDateTab}
          />
        </div>

        {showClearDates &&
          <button
            type="button"
            className={cx('DateRangePickerInput__clear-dates', {
              'DateRangePickerInput__clear-dates--hide': !(startDateValue || endDateValue),
              'DateRangePickerInput__clear-dates--hover': isClearDatesHovered,
            })}
            onMouseEnter={this.onClearDatesMouseEnter}
            onMouseLeave={this.onClearDatesMouseLeave}
            onClick={onClearDates}
          >
            <span className="screen-reader-only">
              {phrases.clearDates}
            </span>
            <CloseButton />
          </button>
        }
      </div>
    );
  }
}

DateRangePickerInput.propTypes = propTypes;
DateRangePickerInput.defaultProps = defaultProps;
