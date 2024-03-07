import { Link } from "expo-router";

import { LinkButtonProps } from "./models";

export const LinkButton = ({ title, ...rest }: LinkButtonProps) => {
  return (
    <Link className="text-slate-300 text-center text-base font-body" {...rest}>
      {title}
    </Link>
  );
};
