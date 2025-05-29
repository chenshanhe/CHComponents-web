const TYPES = [
    "input","select","datePicker","dateTimePicker","link","button","component"
]
const TYPES_LAYOUT = {
    input:"el-input",
    select:"ChSelect",
    datePicker:"ChDatePicker",
    dateTimePicker:"ChDateTimePicker",
    link:"ChLink",
    button:"ChButton"
}
const TYPES_DEFAULT_VALUE ={
    input:"",
    select:null,
    datePicker:null,
    dateTimePicker:null,
    link:null,
    button:null
}

const LABEL_POSITIONS = ["left","right","top"]

const SIZES = ["","medium","small","mini"]

export {
    TYPES,
    TYPES_LAYOUT,
    TYPES_DEFAULT_VALUE,
    LABEL_POSITIONS,
    SIZES
}
