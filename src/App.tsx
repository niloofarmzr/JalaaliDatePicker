import React, {useState} from 'react'
import './App.css'
import JalaaliDatePicker from "./components/jalaliDatePicker";
import {Rtl} from "./rtl";

function App() {
    const [date,setDate] = useState<string | null>(null)

    return (
        <Rtl>
            <div className='app'>
                <div className='date-picker'>
                    <h1>تاریخ مورد نظر خود را انتخاب کنید.</h1>
                    <JalaaliDatePicker value={date} label='تاریخ' onSelectDate={date => {
                        setDate(date)
                    }}/>
                </div>
            </div>
        </Rtl>

    )
}

export default App
