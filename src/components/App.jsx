import React, { Component } from "react";
import styles from './App.module.scss';
import NumberFormatService from '../services/numberFormatService';
export default class App extends Component {
    constructor(props) {
        super(props)
        this.onInputChange = this.onInputChange.bind(this);
        this.formattedNumberUS = this.formattedNumberUS.bind(this);
        this.formattedNumberValue = this.formattedNumberValue.bind(this);
        this.state = {
            rawDigitsString: ""
        }
    }

    /* 
    Short description: after a user's event (pressing a key) I take the new value
    from the input, convert it into a normal number, then convert it back into
    the right format using the help of numberFormatService class, and then
    updating the state with the new correct number and placing the
    correct format inside the input's value.
    */

    render() {
        const formattedNumberUS = this.formattedNumberUS(this.state.rawDigitsString);
        const formattedNumberValue = this.formattedNumberValue(this.state.rawDigitsString);
        return (
            <div className={styles.app}>
                <div className="page-content">
                    <input placeholder={"Start typing a number"} value={formattedNumberUS} onChange={this.onInputChange}/>
                    <div>Value: {formattedNumberValue}</div>
                </div>
            </div>
        );
    }

    didDeleteOccur(newNumber) {
        const isNewNumShorter = newNumber.length < (parseInt(this.state.rawDigitsString.length,10)+2) && newNumber.indexOf("(") > -1;
        const lastDigitDeleted = (newNumber.length === 2 && newNumber[0] === '(');
        return (isNewNumShorter || lastDigitDeleted);
    }

    formattedNumberUS(num) {
        if (num.length > 0) 
            return NumberFormatService.formatToUSStandardPhone(this.state.rawDigitsString);
        else return "";
    }
    
    formattedNumberValue (num) {
        if (num.length > 0)
            return "+1" + num;
        else return "";
    }

    onInputChange (event) {
        const newInput = event.target.value;
        const rawDigitsStr = NumberFormatService.transformToNumber(newInput, this.didDeleteOccur(newInput));
        this.setState ({
            rawDigitsString: rawDigitsStr
        });
    }

    
}
