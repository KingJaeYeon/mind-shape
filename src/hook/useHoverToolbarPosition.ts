import { useEffect } from "react";
import { Editor as SlateEditor, Range } from "slate";

export function useHoverToolbarPosition(
  ref: any,
  editor: any,
  inType: any,
  key = "default",
  isLink = false,
) {
  const height = key === "default" ? 5 : 15;
  //빈배열을 제공하지 않으면 컴포넌트가 렌더링될 때마다 동작한다.
  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    if (!isLink) {
      if (!el) return;
      if (!selection || !inType) {
        el.removeAttribute("style");
        return;
      }
      if (
        key === "default" &&
        (Range.isCollapsed(selection) ||
          SlateEditor.string(editor, selection) === "")
      ) {
        el.removeAttribute("style");
        return;
      }

      //window.getSelection(): 사용자가 페이지에서 선택한 텍스트의 정보를 가져옵니다. 이것은 Selection 객체를 반환합니다.
      const domSelection = window.getSelection();
      if (!domSelection) return;
      //getRangeAt(0): 사용자가 선택한 텍스트 범위 중 첫 번째 범위를 반환합니다.
      const domRange = domSelection.getRangeAt(0);
      //getBoundingClientRect(): 선택된 텍스트 범위의 위치와 크기에 대한 정보를 포함하는 DOMRect 객체를 반환합니다.
      const rect = domRange.getBoundingClientRect();

      //el.style.opacity = "1";: el 요소의 투명도를 설정하여 요소를 보이게 만듭니다
      el.style.display = "flex";
      //el.style.top: el 요소의 상단 위치를 설정합니다. 이 위치는 선택된 텍스트의 상단 위치(rect.top)에 현재 문서의 수직 스크롤
      // 오프셋(window.pageYOffset)을 더하고, el의 높이(el.offsetHeight)를 빼서 계산합니다.
      el.style.top = `${
        rect.top +
        (window.scrollY || window.pageYOffset) -
        (el.offsetHeight + height)
      }px`;
      //el.style.left: el 요소의 왼쪽 위치를 설정합니다. 이 위치는 선택된 텍스트의 왼쪽 위치(rect.left)에 현재 문서의 수평 스크롤
      // 오프셋(window.pageXOffset)을 더하고, el의 너비의 절반(el.offsetWidth / 2)을 뺀 다음,
      // 선택된 텍스트의 너비의 절반(rect.width / 2)을 더해 계산합니다.
      if (key === "default") {
        el.style.left = `${
          rect.left +
          (window.scrollX || window.pageXOffset) -
          el.offsetWidth / 2 +
          rect.width / 2
        }px`;
      }
      if (key === "image") {
        const centerX = window.innerWidth / 2;
        el.style.left = `${centerX - el.offsetWidth / 2}px`;
      }
    }
  }); // 의존성 배열에 ref, editor, inFocus 추가
}
