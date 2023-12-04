import {View, TextInput, Button, StyleSheet} from 'react-native'

const CustomInput = (
    {
        placeholderProp,
        textItemProp,
        onChangeTextHandlerEvent,
        addItemToListEvent
    }
) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholderProp}
                placeholderTextColor="white"
                onChangeText={onChangeTextHandlerEvent}
                value={textItemProp}
            />
            <Button
                title="Add"
                color="#841584"
                onPress={addItemToListEvent}
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 70
      },
      textInput: {
        width: 200,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        color: 'white',
        textAlign: 'center'
      }
})