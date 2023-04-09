import { IGate, IPortal, IPortalFrom, IPortalTo } from "@types";
import React, { PropsWithChildren, createContext, useState } from "react";

export const PortalContext = createContext<IPortal>({
  gates: {},
  gateSetter: () => null,
});

export const PortalProvider = ({ children }: PropsWithChildren<object>) => {
  const [gates, setGates] = useState<IGate>({});
  const gateSetter = (gateName: string, element: JSX.Element) => {
    setGates((gates) => ({ ...gates, [gateName]: element }));
  };

  return (
    <PortalContext.Provider value={{ gates, gateSetter }}>
      {children}
    </PortalContext.Provider>
  );
};

const PortalFrom = ({ children }: IPortalFrom) => {
  return (
    <PortalContext.Consumer>
      {({ gateSetter }) => {
        return <>{children && children(gateSetter)}</>;
      }}
    </PortalContext.Consumer>
  );
};

const PortalTo = ({ activeGateName }: IPortalTo) => {
  return (
    <PortalContext.Consumer>
      {({ gates }) => {
        return gates[activeGateName];
      }}
    </PortalContext.Consumer>
  );
};
export { PortalFrom, PortalTo };
