import moment from 'moment'

export const formateDate = (seconds: number) => {
    const ms = seconds*1000;
    return moment(ms).fromNow()
}