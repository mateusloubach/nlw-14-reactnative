import { TouchableOpacityProps } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

export interface ButtonTextProps {
  children: React.ReactNode;
}

export interface ButtonIconProps {
  children: React.ReactNode;
}
