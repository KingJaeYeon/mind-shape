import { ImageElement, ParagraphElement } from "../../../../@types/slate";
import { Transforms } from "slate";
import isUrl from "is-url";
import { BLOCK_PARAGRAPH, IMAGE, IMAGE_SIZE_LARGE } from "@/constant/slate";
import { imageExtensionsJs } from "@/lib/utilsJS";

export const withImages = (editor: any) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element: any) => {
    return element.type === `image` ? true : isVoid(element);
  };

  editor.insertData = (data: any) => {
    const text = data.getData(`text/plain`);
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split(`/`);

        if (mime === `image`) {
          reader.addEventListener(`load`, () => {
            const url = reader.result;
            insertImage(editor, url);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const insertImage = (editor: any, url: any) => {
  const text = { text: `` };
  const image: ImageElement = {
    type: IMAGE,
    url,
    children: [text],
    size: IMAGE_SIZE_LARGE,
  };
  const normal: ParagraphElement = {
    type: BLOCK_PARAGRAPH,
    children: [{ text: `` }],
  };
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, normal);
};
const isImageUrl = (url: any) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(`.`).pop();
  return imageExtensionsJs(ext as string);
};
