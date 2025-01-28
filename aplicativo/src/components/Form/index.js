import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Vibration, Pressable, Keyboard, FlatList } from 'react-native';
import ResultImc from './ResultImc';
import styles from './style';

export default function Form() {

  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [messageImc, setMessageImc] = useState("preencha a altura e o peso")
  const [imc, setImc] = useState(null)
  const [textButton, setTextButton] = useState("Calcular")
  const [errorMessage, setErrorMessage] = useState(null)
  const [imcList, setImcList] = useState([])

  function imcCalculator(){
    let heightFormat = height.replace(",", ".")
    let totalImc = (weight/(heightFormat*heightFormat)).toFixed(2);
    setImcList ((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
    setImc(totalImc)
  }

  function verificationImc(){
    if(imc == null){
      Vibration.vibrate()
      setErrorMessage("campo obrigatório")
    }
  }

  function validationImc(){
    if(weight != null && height != null){
      Keyboard.dismiss()
      imcCalculator()
      setHeight(null)
      setWeight(null)
      setMessageImc("Seu IMC é:")
      setTextButton("Calcular novamente")
      setErrorMessage(null)
    }
    else{
      verificationImc()
      setImc(null)
      setTextButton("Calcular")
      setMessageImc("preencha a altura e o peso")
    }
  }

  return (
    
      <View style={styles.formContext}>
        {imc == null ?
        <Pressable style={styles.form}> 
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
          placeholder='Em metros'
          keyboardType='numeric'
          />

          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          placeholder='Em quilos'
          keyboardType='numeric'
          />
          <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => {validationImc()}}
          >
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
          </Pressable>
          :
          <View style={styles.exhibitionResultImc}>
          <ResultImc messageResultImc={messageImc} resultImc={imc} />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => {validationImc()}}
          >
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
        }
        <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.listImc}
        data={imcList.reverse()}
        renderItem={({item}) => {
          return(
            <Text style={styles.resultImcItem}>
              <Text style={styles.textResultItemList}>Resultado IMC =</Text> {item.imc}
            </Text>
          )
        }}
        keyExtractor={(item) => {item.id}}
        />
    </View>
  )
};