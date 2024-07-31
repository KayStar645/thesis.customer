import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import React from 'react';

type TextEditorProps = {
	container?: React.HTMLAttributes<HTMLDivElement>;
	label?: React.HtmlHTMLAttributes<HTMLLabelElement>;
	input?: {
		id: number;
		label?: string;
		value?: string;
		onChange?: (_value: string) => void;
		config?: EditorConfig;
	};
	errorMessage?: string;
};

const TextEditor = (props: TextEditorProps) => {
	return (
		<></>
		// <div
		// 	{...props.container}
		// 	className={classNames('w-full', props.container?.className)}
		// >
		// 	{props.input?.label && (
		// 		<label
		// 			{...props.label}
		// 			className={classNames({ 'p-error': props?.errorMessage }, props.label?.className)}
		// 		>
		// 			{props.input?.label}
		// 		</label>
		// 	)}

		// 	<CKEditor
		// 		editor={Editor}
		// 		id={props.input?.id}
		// 		config={props.input?.config}
		// 		data={props?.input?.value}
		// 		onChange={(event, editor) => {
		// 			props.input?.onChange?.(editor.getData());
		// 		}}
		// 	/>
		// </div>
	);
};

export { TextEditor };
