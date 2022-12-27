import React from "react"
import { View } from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker"


function DatePicker (Props) {

    let {isVisible,onConfirm,onCancel,mode} = Props

return (
        <View>
             <DateTimePicker 
        isVisible={isVisible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={onCancel}
        isDarkModeEnabled = {true}
      />
        </View>
    )
}


export default DatePicker