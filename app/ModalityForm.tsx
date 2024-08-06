import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function ModalityForm({
  onFormSubmit,
}: {
  onFormSubmit: (id?: string) => Promise<void>;
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [athletes, setAthletes] = useState("");

  const endpoint =
    process.env.EXPO_PUBLIC_ENV_VAR === "production"
      ? process.env.EXPO_PUBLIC_ENDPOINT_PRODUCTION
      : process.env.EXPO_PUBLIC_ENV_VAR === "preview"
      ? process.env.EXPO_PUBLIC_ENDPOINT_STAGING
      : process.env.EXPO_PUBLIC_ENDPOINT_LOCAL;

  const handleSubmit = async () => {
    const url = id ? `${endpoint}/modality/${id}` : `${endpoint}/modality`;
    const method = id ? "PATCH" : "POST";
    const body = {
      name,
      athletes: athletes.split(",").map((item) => item.trim()),
    };

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      onFormSubmit();
      setId("");
      setName("");
      setAthletes("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <View style={styles.form}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>ID (for update only):</Text>
        <TextInput style={styles.input} value={id} onChangeText={setId} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Athletes (comma separated):</Text>
        <TextInput
          style={styles.input}
          value={athletes}
          onChangeText={setAthletes}
        />
      </View>
      <Button title={id ? "Update" : "Create"} onPress={handleSubmit} />
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
