var moment = require('moment');

const FREQUENCIES = [
  'Every week',
  'Every month',
  'Every three months',
  'Every year',
];

class DateRange {
  constructor(startDate, endDate, freq) {
    if (!FREQUENCIES.includes(freq)) {
      console.log("invalid frequency");
      return;
    }

    this.startDate = moment(startDate);
    this.endDate = moment(endDate);
    const diff = moment.duration(this.endDate.diff(this.startDate));

    // Set number of dates between start and end, and set frequency interval as a Moment duration
    switch(freq) {
      case 'Every week':
        this.numDates = Math.ceil(diff.asWeeks());
        this.interval = moment.duration(1, 'weeks');
        break;
      case 'Every month':
        this.numDates = Math.ceil(diff.asMonths());
        this.interval = moment.duration(1, 'months');
        break;
      case 'Every three months':
        this.numDates = Math.ceil(diff.asMonths() / 3);
        this.interval = moment.duration(3, 'months');
        break;
      case 'Every year':
        this.numDates = Math.ceil(diff.asYears());
        this.interval = moment.duration(1, 'years');
        break;
    }

    // Enumerate dates between start and end date
    this.dates = [];
    var date = this.startDate;
    for (var i = 0; i < this.numDates; i++) {
      this.dates.push(date.clone().toDate());
      date.add(this.interval);
    }
  }

  getFormattedDates(format) {
    return this.dates.map((date) => {
      return moment(date).format(format);
    });
  }

  getFormattedDateRanges(format) {
    return this.dates.map((date) => {
      var start = moment(date).format(format)
      var end = moment(date).add(this.interval).subtract(1, 'days').format(format)
      return [start, end]
    })
  }
}



export {FREQUENCIES, DateRange};
