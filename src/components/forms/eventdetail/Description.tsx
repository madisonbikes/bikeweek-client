import { Ref, SyntheticEvent, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Editor, EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import "draft-js/dist/Draft.css";
import { Button } from "@mui/material";

const Description = () => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        minHeight: "5rem",
        padding: 10,
      }}
    >
      <Controller
        name="description"
        render={({ field: { onChange, value, onBlur, ref } }) => {
          return (
            <FormEditor
              onChange={onChange}
              value={value}
              ref={ref}
              onBlur={onBlur}
            />
          );
        }}
      />
    </div>
  );
};

type FormEditorProps = {
  onChange: (newValue: string) => void;
  onBlur: (e: SyntheticEvent) => void;
  value: string;
  ref: Ref<Editor> | undefined;
};

const FormEditor = ({
  value: htmlText,
  onChange,
  ref,
  onBlur,
}: FormEditorProps) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  useEffect(() => {
    const state = EditorState.createWithContent(stateFromHTML(htmlText));
    setEditorState(state);
  }, [htmlText]);

  const localOnChange = (state: EditorState): void => {
    setEditorState(state);
    const html = stateToHTML(state.getCurrentContent());
    onChange(html);
  };

  return (
    <div>
      <Button
        onMouseDown={(e) => {
          e.preventDefault();
          localOnChange(RichUtils.toggleBlockType(editorState, "BOLD"));
        }}
      >
        B
      </Button>
      <Editor
        editorState={editorState}
        onChange={localOnChange}
        onBlur={onBlur}
        ref={ref}
      />
    </div>
  );
};

export default Description;
