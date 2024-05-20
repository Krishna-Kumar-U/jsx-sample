import { sub, format } from 'date-fns';

const ONE_MONTH = '1months';
const THREE_MONTH = '3months';
const SIX_MONTH = '6months';
const NINE_MONTH = '9months';
const TWELVE_MONTH = '12months';
const TWENTFOUR_MONTH = '24months';

export const DATE_OPTIONS = [{
    label: 'Last Month',
    value: ONE_MONTH
},{
    label: 'Last 3 Months',
    value: THREE_MONTH
},{
    label: 'Last 6 Months',
    value: SIX_MONTH
},{
    label: 'Last 9 Months',
    value: NINE_MONTH
},{
    label: 'Last 12 Months',
    value: TWELVE_MONTH
},{
    label: 'Last 24 Months',
    value: TWENTFOUR_MONTH
}]

export const DATE_FORMAT = 'dd-MM-yyyy';

export const formatDate = (date) => {
    return date ? format(date, DATE_FORMAT) : null;
};

export const calculateDate = (selected) => {
    const monthsToSubtract = parseInt(selected.replace('months', ''));
    const currentDate = new Date();
    const newDate = sub(currentDate, { months: monthsToSubtract });
    return formatDate(newDate) + ' - ' + formatDate(currentDate);
};