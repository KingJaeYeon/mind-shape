import Image from "next/image";

export default function page() {
  return (
    <div className={"flex w-full max-w-7xl flex-col items-center gap-[20px]"}>
      <ListBlock />
      <ListBlock />
    </div>
  );
}

function ListBlock() {
  return (
    <div className={"flex gap-[30px]"}>
      <div
        className={"h-[100px] w-[100px] overflow-hidden border border-gray-300"}
      >
        <Image
          style={{ height: "100%" }}
          src={"./svg/next.svg"}
          width={100}
          height={100}
          alt={"image"}
        />
      </div>
      <div className={"flex flex-col"}>
        <h2 className={"text-[30px] font-bold"}>Title 테스트</h2>
        <p className={"text-[20px]"}>
          dmklasmlkdsnsjdnjsdanjsdanjsdnjsdansjdknj
        </p>
      </div>
    </div>
  );
}
