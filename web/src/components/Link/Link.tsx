import * as React from "react";

import "./Link.css";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: React.FunctionComponent<
  React.PropsWithChildren<LinkProps>
> = (props) => {
  return <a {...props} className="link" />;
};
