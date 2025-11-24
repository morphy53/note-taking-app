import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	headingsPlugin,
	InsertTable,
	InsertThematicBreak,
	ListsToggle,
	listsPlugin,
	MDXEditor,
	type MDXEditorMethods,
	type MDXEditorProps,
	markdownShortcutPlugin,
	quotePlugin,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
} from "@mdxeditor/editor";
import type { Ref } from "react";
import { cn } from "@/lib/utils";
import "@mdxeditor/editor/style.css";

export default function InternalMarkdownEditor({
	ref,
	className,
	...props
}: MDXEditorProps & { ref?: Ref<MDXEditorMethods> }) {
	return (
		<MDXEditor
			{...props}
			ref={ref}
			className={cn(className)}
			suppressHtmlProcessing
			plugins={[
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				tablePlugin(),
				toolbarPlugin({
					toolbarContents() {
						return (
							<>
								<BlockTypeSelect />
								<BoldItalicUnderlineToggles />
								<ListsToggle />
								<InsertThematicBreak />
								<InsertTable />
							</>
						);
					},
				}),
			]}
		/>
	);
}
