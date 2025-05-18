import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, Button, View } from "react-native";
import client from "../../api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UsersStack } from "../../types/navigation";
import { Students } from "../../types/users";

const List = ({ navigation }: NativeStackScreenProps<UsersStack>) => {
  const [users, setUsers] = useState<Students>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await client.get<Students>("/students");
      setUsers(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchUsers);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Novo Estudante" onPress={() => navigation.navigate("Details", {})} />

      <FlatList
        refreshing={isLoading}
        onRefresh={fetchUsers}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { id: item.id })}
          >
            <Text>
              {item.firstName} {item.lastName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default List;

