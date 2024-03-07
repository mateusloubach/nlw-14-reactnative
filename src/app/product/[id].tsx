import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { Button, LinkButton } from "@/components";

import { useCartStore } from "@/stores";

import { PRODUCTS, formatCurrency } from "@/utils";

export default function Product() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const cartStore = useCartStore();

  const product = PRODUCTS.find((product) => product.id === id);

  const handleAddToCart = () => {
    product && cartStore.add(product);
    navigation.goBack();
  };

  if (!product) return <Redirect href="/" />;

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <Image
          source={product?.cover}
          className="w-full h-52"
          resizeMode="cover"
        />

        <View className="p-5 mt-8 flex-1">
          <Text className="text-white text-xl font-heading">
            {product?.title}
          </Text>

          <Text className="text-lime-400 text-2xl font-heading my-2">
            {formatCurrency(product?.price || 0)}
          </Text>

          <Text className="text-slate-400 font-body text-base leading-6 mb-6">
            {product?.description}
          </Text>

          {product?.ingredients.map((ingredient, index) => (
            <Text
              key={ingredient}
              className="text-slate-400 font-body text-base leading-6"
            >
              {"\u2022"} {ingredient}
            </Text>
          ))}
        </View>
      </ScrollView>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>

          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
