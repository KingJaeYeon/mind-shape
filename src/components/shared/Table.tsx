"use client";

import { createContext, useContext } from "react";
import React from "react";
import Row from "@/components/Layout/Row";
import Col from "@/components/Layout/Col";

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
    return <Row className={"w-[850px]"}>There is no data</Row>;

  return <Col className={"w-[850px]"}>{data?.map(render)}</Col>;
}

export function TRow({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext);
  return <Row className={"w-[850px]"}>{children}</Row>;
}
export function Footer({ children }: { children: React.ReactNode }) {
  return <footer className={"flex w-[850px]"}>{children}</footer>;
}

TableContext.displayName = "TableContext";
Table.Header = Header;
Table.Body = Body;
Table.TRow = TRow;
Table.Footer = Footer;
export default Table;
