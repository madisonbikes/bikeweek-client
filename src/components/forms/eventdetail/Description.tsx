import { SyntheticEvent, forwardRef, ForwardedRef } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { TextField } from "@mui/material";

export const Description = () => {
  return (
    <div>
      <h4>Description</h4>
      <Controller
        name="description"
        render={({ field: { onChange, value, onBlur, ref } }) => {
          return (
            <TextField
              fullWidth={true}
              multiline={true}
              minRows={5}
              maxRows={10}
              ref={ref}
              value={value}
              onChange={onChange}
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
};

const FormEditor = forwardRef(
  ({ value, onChange }: FormEditorProps, ref: ForwardedRef<Editor>) => {
    return (
      <Editor
        onEditorChange={(newValue) => {
          onChange(newValue);
        }}
        ref={ref}
        apiKey={process.env.REACT_APP_TINYMCE_KEY}
        value={value}
        init={{
          content_css: "dark",
          height: "25rem",
          menubar: false,
          plugins: "advlist autolink lists link anchor searchreplace help",
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        }}
      />
    );
  }
);
FormEditor.displayName = "CustomFormEditor";
