import { Text, TouchableOpacity } from "react-native";

import { ButtonIconProps, ButtonProps, ButtonTextProps } from "./models";

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

const ButtonText = ({ children }: ButtonTextProps) => {
  return (
    <Text className="text-black font-heading text-base mx-2">{children}</Text>
  );
};

const ButtonIcon = ({ children }: ButtonIconProps) => {
  return children;
};

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
