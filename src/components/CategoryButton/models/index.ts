import { PressableProps } from "react-native";

export interface CategoryButtonProps extends PressableProps {
  title: string;
  isSelected?: boolean;
}
