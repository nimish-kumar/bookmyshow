import React, { createContext, PropsWithChildren, useState } from "react";

interface IGate {
  [gateName: string]: JSX.Element;
}
interface IPortal {
  gates: IGate;
  gateSetter: (gateName: string, element: JSX.Element) => void;
}
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
interface IPortalFromGate {
  children?: (
    gateSetter: (gateName: string, element: JSX.Element) => void
  ) => JSX.Element;
}
const PortalFromGate = ({ children }: IPortalFromGate) => {
  return (
    <PortalContext.Consumer>
      {({ gateSetter }) => {
        return <>{children && children(gateSetter)}</>;
      }}
    </PortalContext.Consumer>
  );
};
interface IPortalToGate {
  activeGateName: string;
}
const PortalToGate = ({ activeGateName }: IPortalToGate) => {
  return (
    <PortalContext.Consumer>
      {({ gates }) => {
        return gates[activeGateName];
      }}
    </PortalContext.Consumer>
  );
};
export { PortalFromGate, PortalToGate };
