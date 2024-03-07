import { ImageProps, TouchableOpacityProps } from "react-native";

export interface ProductDataProps {
  title: string;
  description: string;
  thumbnail: ImageProps;
  quantity?: number;
}

export interface ProductProps extends TouchableOpacityProps {
  data: ProductDataProps;
}
