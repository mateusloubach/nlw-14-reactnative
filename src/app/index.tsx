import { useRef, useState } from "react";
import { FlatList, SectionList, Text, View } from "react-native";
import { Link } from "expo-router";

import { Header, CategoryButton, Product } from "@/components";

import { useCartStore } from "@/stores";

import { CATEGORIES, MENU, ProductProps } from "@/utils";

export default function Home() {
  const sectionListRef = useRef<SectionList<ProductProps>>(null);
  const cartStore = useCartStore();

  const [category, setCategory] = useState(CATEGORIES[0]);

  const cardQuantityItems = cartStore.products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory,
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cardQuantityItems={cardQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {section.title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
