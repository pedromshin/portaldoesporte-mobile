import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function ModalityTable({ data, onDelete }: any) {
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.header}>ID</Text>
        <Text style={styles.header}>Name</Text>
        <Text style={styles.header}>Athletes</Text>
        <Text style={styles.header}>Actions</Text>
      </View>
      {data.map((modality: any) => (
        <View key={modality._id} style={styles.row}>
          <Text style={styles.cell}>{modality._id}</Text>
          <Text style={styles.cell}>{modality.name}</Text>
          <Text style={styles.cell}>{modality.athletes?.join(", ")}</Text>
          <Button
            title="Delete"
            color="#ff4c4c"
            onPress={() => onDelete(modality._id)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  header: {
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
  },
});
