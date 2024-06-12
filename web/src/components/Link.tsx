import * as React from "react";
import { Link as RLink } from "react-router-dom";
import "./Link.css";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

export const Link: React.FunctionComponent<
  React.PropsWithChildren<LinkProps>
> = (props) => {
  return <RLink {...props} className="link" />;
};
