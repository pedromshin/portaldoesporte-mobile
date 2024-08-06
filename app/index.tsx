import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ModalityTable from "./ModalityTable";
import ModalityForm from "./ModalityForm";
import ModalitySearch from "./ModalitySearch";

const endpoint = process.env.EXPO_PUBLIC_ENDPOINT;

console.log(endpoint);

export default function Index() {
  const [data, setData] = useState<string[]>([]);

  const fetchData = async (id = "") => {
    const url = id ? `${endpoint}/modality/${id}` : `${endpoint}/modality`;

    try {
      const response = await fetch(url, { method: "GET" });
      const result = await response.json();
      setData(Array.isArray(result) ? result : [result]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (id: string) => {
    fetchData(id);
  };

  const handleDelete = async (id: string) => {
    const url = `${endpoint}/modality/${id}`;
    try {
      await fetch(url, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ModalitySearch onSearch={handleSearch} />
      <ModalityTable data={data} onDelete={handleDelete} />
      <ModalityForm onFormSubmit={fetchData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});
