import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";

import { Button, Header, Input, LinkButton, Product } from "@/components";

import { useCartStore } from "@/stores";

import { ProductCartProps } from "@/stores/cartStore/models";

import { formatCurrency } from "@/utils";
import { useState } from "react";
import { useNavigation } from "expo-router";

export default function Cart() {
  const { products, remove, clear } = useCartStore();
  const navigation = useNavigation();

  const total = formatCurrency(
    products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    ),
  );

  const [address, setAddress] = useState("");

  const handleProductRemove = (product: ProductCartProps) => {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        onPress: () => remove(product.id),
      },
    ]);
  };

  const handleOrder = () => {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega");
    }

    const productList = products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join("");

    const message = `NOVO PEDIDO
      \nEntregar em: ${address}

      ${productList}

      \nValor total: ${total}`;

    Linking.openURL(
      `https://api.whatsapp.com/send?phone=${process.env.EXPO_PUBLIC_PHONE_NUMBER}&text=${message}`,
    );

    clear();
    navigation.goBack();
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="flex-1 p-5">
            {products.length ? (
              <View className="border-b border-slate-700">
                {products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white font-subtitle text-xl">Total:</Text>

              <Text className="text-lime-400 font-heading text-2xl">
                {total}
              </Text>
            </View>

            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP número e complemento..."
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              returnKeyType="next"
              blurOnSubmit
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>

          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  );
}
