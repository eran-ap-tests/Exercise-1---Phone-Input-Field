/*
Class that helps transforming inputs into another format.
*/
class NumberFormatService {     
    formatToUSStandardPhone(number) {
        let str = number && number.length && `(${number.split('').slice(0,3).join('')})`;
        if (number.length < 7)
            str += `${number.split('').slice(3,number.length).join('')}`;
        else if(number.length <11)
            str += `${number.split('').slice(3,6).join('')}-${number.split('').slice(6,number.length).join('')}`;
        else
            str = number;
        return str;
    }

    transformToNumber(formattedNum,didDeletionOccured) {
        formattedNum = formattedNum.length <= 4 && didDeletionOccured ? formattedNum.split('').slice(0,formattedNum.length -1).join(''): formattedNum;
        return formattedNum.replace(/[^0-9.]/g, "");
    }   
}

const numFormatService = new NumberFormatService();
export default numFormatService;