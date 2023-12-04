import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ImageBackground } from 'react-native';
import CustomModal from './components/CustomModal';
import CustomInput from './components/CustomInput';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de importar el icono necesario

export default function App() {
  const [textItem, setTextItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelectedToDelete, setItemSelectedToDelete] = useState({});
  const [editingText, setEditingText] = useState('');

  const [ticketColor, setTicketColor] = useState('blue'); // Puedes ajustar el color según tus preferencias

  const onChangeTextHandler = (text) => {
    setTextItem(text);
  };

  const addItemToList = () => {
    const newTask = { 
      id: Math.random().toString(), 
      value: textItem, 
      completed: false, 
      isEditing: false, 
      isCompleting: false, 
      showImage: false 
    };
    setItemList((prevItems) => [...prevItems, newTask]);
    setTextItem('');
  };

  const onSelectItemHandler = (id) => {
    setModalVisible(!modalVisible);
    setItemSelectedToDelete(itemList.find((item) => item.id === id));
  };

  const onDeleteItemHandler = () => {
    setItemList(itemList.filter((item) => item.id !== itemSelectedToDelete.id));
    setModalVisible(!modalVisible);
  };

  const handleCompleteTask = (id) => {
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isCompleting: true, showImage: true, completed:true  } : item
      )
    );
  };

  const startEditingTask = (id, text) => {
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item
      )
    );
    setEditingText(text);
  };

  const handleSaveEdit = (id) => {
    setItemList((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, value: editingText, isEditing: false } : item
      )
    );
    setEditingText('');
  };

  const renderListItem = ({ item }) => {
    return (
      <View style={{ ...styles.itemList, backgroundColor: item.completed ? 'green' : '#a2d2ff' }}>
        {item.isEditing ? (
          <>
             <TextInput
            value={editingText}
            onChangeText={(text) => setEditingText(text)}
          />
          <Button title="Guardar" onPress={() => handleSaveEdit(item.id)} />
        </>
        ) : (
          <>
            <Text>{item.value}</Text>
            {!item.isCompleting && !item.completed && (
              <>
                <Button title="COMPLETAR" onPress={() => handleCompleteTask(item.id)} />
                <Button title="EDITAR" onPress={() => startEditingTask(item.id, item.value)} />
                <Button
                  style={styles.buttonCancel}
                  title="X"
                  onPress={() => onSelectItemHandler(item.id)}
                />
              </>
            )}
            {item.completed && item.showImage && (
              <View style={{ backgroundColor: ticketColor, padding: 5, borderRadius: 5, marginRight: 10 }}>
                <Icon name="check-circle" size={20} color="white" />
              </View>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={require('./IMG/FondoApp.jpg')} resizeMode="cover" style={styles.image}>
          <CustomInput
            placeholderProp="Ingresá la tarea"
            placeholderTextColor="white"
            textItemProp={textItem}
            onChangeTextHandlerEvent={onChangeTextHandler}
            addItemToListEvent={addItemToList}
          />
          <FlatList data={itemList} renderItem={renderListItem} keyExtractor={(item) => item.id} />
        </ImageBackground>
      </View>
      <CustomModal
        animationTypeProp="slide"
        isVisibleProp={modalVisible}
        itemSelectedProp={itemSelectedToDelete}
        onDeleteItemHandlerEvent={onDeleteItemHandler}
        setModalVisibleEvent={setModalVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  buttonCancel: {
    backgroundColor: 'red',
  },
  ticket: {
    backgroundColor: 'blue',
    padding: 5,
  },
});
