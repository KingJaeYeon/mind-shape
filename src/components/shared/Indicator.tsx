"use client";
import { IconDot, IconDotEmpty } from "@/assets/svg";
import { useState } from "react";
import { cn } from "@/lib/twmarge";
import Image from "next/image";
import Col from "@/components/Layout/Col";
import Row from "@/components/Layout/Row";
import Button from "@/components/PrimitiveUI/Button";

export default function Indicator({
  width = "max-w-[20rem]",
  options,
}: {
  width?: string;
  options: { value: string }[];
}) {
  const [choice, setChoice] = useState(0);
  return (
    <Col className={cn("w-full items-center gap-[15px]", width)}>
      <Image src={options[choice].value} alt={"a"} width={200} height={200} />
      <Row className={"justify-center gap-[15px]"}>
        {options?.map((option: { value: string }, index: number) => (
          <Button
            key={index}
            className={
              "text-grayscale-dark hover:text-primary-light disabled:text-primary"
            }
            onClick={() => setChoice(index)}
            disabled={index === choice}
          >
            {index === choice ? <IconDot /> : <IconDotEmpty />}
          </Button>
        ))}
      </Row>
    </Col>
  );
}
