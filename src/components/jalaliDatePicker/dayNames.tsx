import React, { Component } from 'react';

class DayNames extends Component {
    render() {
        return (
            <div className='row day-names'>
                <span className='day-name'>شنبه</span>
                <span className='day-name'>یکشنبه</span>
                <span className='day-name'>دوشنبه</span>
                <span className='day-name'>سه‌شنبه</span>
                <span className='day-name'>چهارشنبه</span>
                <span className='day-name'>پنجشنبه</span>
                <span className='day-name'>جمعه</span>
            </div>
        );
    }
}
export default DayNames;
