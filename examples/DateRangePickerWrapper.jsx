import React from 'react';

import DateRangePicker from '../src/components/DateRangePicker';

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
      previewStartDate: null,
      previewEndDate: null
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onPreviewDatesChange = this.onPreviewDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.handlePrevMonthClick = this.handlePrevMonthClick.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    const dates = { startDate, endDate };

    if (startDate) {
      dates.previewStartDate = null;
    }

    if (endDate) {
      dates.previewEndDate = null;
    }

    this.setState(dates);
  }

  onPreviewDatesChange({ startDate: previewStartDate, endDate: previewEndDate }) {
    this.setState({ previewStartDate, previewEndDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    return (
      <div>
        <DateRangePicker
          {...this.props}
          onDatesChange={this.onDatesChange}
          onPreviewDatesChange={this.onPreviewDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          previewStartDate={this.state.previewStartDate}
          previewEndDate={this.state.previewEndDate}
        />
      </div>
    );
  }
}

export default DateRangePickerWrapper;
