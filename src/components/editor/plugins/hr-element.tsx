import { ElementProps } from "@/components/editor/plugins/change-element";

export const HrElement = ({ attributes }: ElementProps) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <hr
          className={`mb-[42px] mt-[52px] block overflow-visible border-0 text-center before:relative before:top-[-30px] before:ml-[0.6em] before:text-[30px] before:tracking-[0.6em] before:text-[rgba(0,0,0,.68)] before:content-['...']`}
        />
      </div>
    </div>
  );
};
