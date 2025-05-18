import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import client from "../../api";
import { useEffect, useState } from "react";
import { UsersStack } from "../../types/navigation";
import { Student } from "../../types/users";

const Details = ({ route, navigation }: NativeStackScreenProps<UsersStack, "Details">) => {
  const { id } = route.params || {};

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<Student>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await client.get<Student>(`/students/${id}`);
      setUser(data);
    } finally {
      setIsLoading(false);
    }
  };

  const createStudent = async () => {
    setIsLoading(true);
    try {
      await client.post("/students", {
        firstName,
        lastName,
        email,
      });
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!id) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Primeiro nome</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.title}>Último nome</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Button title="Salvar" onPress={createStudent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: `https://api.dicebear.com/9.x/personas/png?seed=${user?.firstName}`,
        }}
      />
      <Text style={styles.title}>Primeiro nome</Text>
      <Text>{user?.firstName}</Text>
      <Text style={styles.title}>Último nome</Text>
      <Text>{user?.lastName}</Text>
      <Text style={styles.title}>Email</Text>
      <Text>{user?.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 128,
    borderWidth: 1,
    borderColor: "#c9c9c9",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
});

export default Details;

