"use client";

import { createContext, useContext } from "react";
import React from "react";

const TableContext = createContext<any>(undefined);

function Table({
  children,
  columns,
}: {
  children: React.ReactNode;
  columns?: any;
}) {
  return (
    <TableContext.Provider value={{ columns }}>
      {children}
    </TableContext.Provider>
  );
}
export function Header({ children }: { children: React.ReactNode }) {
  const { columns }: any = useContext(TableContext);
  return (
    <header role="row" style={columns} className={"flex w-[850px]"}>
      {children}
    </header>
  );
}
export function Body({
  data,
  render,
  isLoading,
}: {
  data: any;
  render: any;
  isLoading?: boolean;
}) {
  if (isLoading) return <div>Loading...</div>;
  if (!data || !data.length)
    return <div className={"flex w-[850px]"}>There is no data</div>;

  return <div className={"flex w-[850px] flex-col"}>{data?.map(render)}</div>;
}

export function Row({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext);
  return <div className={"flex w-[850px]"}>{children}</div>;
}
export function Footer({ children }: { children: React.ReactNode }) {
  return <footer className={"flex w-[850px]"}>{children}</footer>;
}

TableContext.displayName = "TableContext";
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
export default Table;
