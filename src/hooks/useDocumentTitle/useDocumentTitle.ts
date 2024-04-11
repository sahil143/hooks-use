import * as React from "react";

export const useDocumentTitle = (title: string): void => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);
};
