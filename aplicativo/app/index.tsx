import { View, StyleSheet } from "react-native";
import Titulo from '../src/components/Titulo';
import Form from '../src/components/Form';

export default function App() {
  return (
    <View style={styles.container}>
      <Titulo/>
      <Form/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#e0e5e5',
  }
});