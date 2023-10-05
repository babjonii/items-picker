import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons from Expo vector icons
import React from 'react'; // Importing React
import { Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'; // Importing necessary components and modules from react-native
import PropTypes from 'prop-types'; // Import PropTypes


const colors = {
    black: '#000000', // Define color values for reference
    grey: '#A4A3A3',
    fadedTexts: '#868686',
    granted: "#1EB53A",
    f5: "#F5F5F5"
};
const height = Dimensions.get('window').height; // Getting the height of the device window

// ItemsPicker Component - A customizable dropdown component
const ItemsPicker = ({ isVisible, closeModal, itemsArray, onSelect, active, title }) => {

    const [localArray, setLocalArray] = React.useState(itemsArray); // Initializing state for localArray

    React.useEffect(() => {
        return () => setLocalArray(itemsArray); // Cleanup effect to reset localArray when isVisible changes
    }, [isVisible]);

    // Function to filter itemsArray based on input name
    function filterArray(name) {
        let tmp = itemsArray.filter((val) => val.name.toLowerCase().includes(name.toLowerCase()));
        setLocalArray(tmp);
    };

    return (
        <Modal visible={isVisible} transparent onRequestClose={closeModal}>
            <View style={styles.wrapperView}>
                <Pressable style={{ flexGrow: 1 }} onPress={closeModal} /> {/* Pressable area to close modal */}
                <View style={styles.innerWrapper}>
                    <Text style={styles.title}>{title}</Text> {/* Title of the picker */}

                    <TextInput
                        placeholder='Search' // Placeholder text for search input
                        onChangeText={filterArray} // Call filterArray on text input change
                        style={styles.textInput} // Style for search input
                    />

                    {
                        localArray.length === 0 ?
                            <Text style={[styles.font14Fade, styles.textCenter]}>Result Not Found At The Moment!</Text> // Displayed when localArray is empty
                            :
                            <FlatList
                                data={localArray} // Data source for FlatList
                                renderItem={({ item, index }) =>
                                    <SingleItem item={item} index={index} onPress={onSelect} activeItem={active} />} // Rendering individual items
                                keyExtractor={(item, index) => index.toString()} // Key extractor for FlatList items
                                ItemSeparatorComponent={() => <Text style={{ height: 5 }} />} // Separator between FlatList items
                                style={{ marginBottom: 0 }} // Style for FlatList
                            />
                    }
                </View>
            </View>
        </Modal>
    );
};

// SingleItem Component - Represents an individual item in the dropdown
const SingleItem = ({ item, index, onPress, activeItem }) => {
    return (
        <Pressable onPress={() => onPress(item)} style={styles.singleItemWrapper}>
            <Text style={styles.itemName}>{`${index + 1}. ${item.name}`}</Text>
            {
                item.name === activeItem ?
                    <Ionicons name="checkmark-circle" size={24} color={colors.granted} />
                    : null
            }
        </Pressable>
    )
}


ItemsPicker.propTypes = {
    isVisible: PropTypes.bool.isRequired, // isVisible should be a boolean and is required
    closeModal: PropTypes.func.isRequired, // closeModal should be a function and is required
    itemsArray: PropTypes.array.isRequired, // itemsArray should be an array and is required
    onSelect: PropTypes.func.isRequired, // onSelect should be a function and is required
    active: PropTypes.string.isRequired, // active should be a string and is required
    title: PropTypes.string.isRequired // title should be a string and is required
};

SingleItem.propTypes = {
    item: PropTypes.object.isRequired, // item should be an object and is required
    index: PropTypes.number.isRequired, // index should be a number and is required
    onPress: PropTypes.func.isRequired, // onPress should be a function and is required
    activeItem: PropTypes.string.isRequired // activeItem should be a string and is required
};

export default ItemsPicker; // Export ItemsPicker component

// Styles for components
const styles = StyleSheet.create({
    wrapperView: {
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
        justifyContent: 'flex-end', flex: 1 // Align content to bottom of screen
    },
    innerWrapper: {
        backgroundColor: '#FFFFFF', // White background
        paddingVertical: 10, paddingHorizontal: 20, // Padding around content
        borderTopLeftRadius: 20, borderTopRightRadius: 20, // Rounded corners at the top
        maxHeight: height / 2 // Maximum height for inner wrapper
    },
    singleItemWrapper: {
        backgroundColor: colors.f5, // Light gray background
        padding: 10, // Padding around item
        flexDirection: 'row', // Horizontal layout
        justifyContent: 'space-between', // Space between item and icon
        alignItems: 'center', // Center content vertically
        borderRadius: 20 // Rounded corners for item
    },
    itemName: {
        fontSize: 14, // Font size
        fontFamily: 'light' // Light font weight
    },
    title: {
        fontFamily: 'bold', // Bold font
        fontSize: 16, // Font size
        textAlign: 'center', // Centered text
        marginBottom: 10 // Bottom margin
    },
    font14Fade: { color: colors.fadedTexts, fontSize: 14, fontFamily: "regular" }, // Styling for faded text
    textCenter: { textAlign: 'center' }, // Centered text
    textInput: {
        width: '100%', paddingHorizontal: 20, // Full width with horizontal padding
        paddingVertical: 2, fontSize: 12, // Vertical padding and font size
        fontFamily: 'regular', color: colors.black, // Regular font and black color
        borderWidth: 1, borderRadius: 20, // Border and rounded corners
        borderColor: colors.grey, marginBottom: 10 // Border color and bottom margin
    }
});
