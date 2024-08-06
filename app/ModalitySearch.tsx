import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function ModalitySearch({ onSearch }: { onSearch: any }) {
  const [id, setId] = useState("");

  const handleSearch = () => {
    onSearch(id);
  };

  return (
    <View style={styles.form}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Search by ID:</Text>
        <TextInput style={styles.input} value={id} onChangeText={setId} />
      </View>
      <Button title="Search" onPress={handleSearch} />
      <Button title="Fetch All" onPress={() => onSearch("")} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginVertical: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});
