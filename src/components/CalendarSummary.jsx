import React from 'react';
import momentPropTypes from 'react-moment-proptypes';
// import moment from 'moment';


const propTypes = {
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  previewStartDate: momentPropTypes.momentObj,
  previewEndDate: momentPropTypes.momentObj,
};


const CalendarSummary = ({ startDate, endDate, previewEndDate }) => {
  const finishDate = previewEndDate || endDate;
  if (!startDate || !finishDate || finishDate.isBefore(startDate)) {
    return null;
  }
  return (
    <div className="CalendarSummary">
      <span>{`${finishDate.diff(startDate, 'days')} nights`}</span>
    </div>
  );
};

export default CalendarSummary;

CalendarSummary.propTypes = propTypes;
