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
import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { cn } from "@/lib/utils";
import "@mdxeditor/editor/style.css";

export default function InternalMarkdownEditor({
	ref,
	className,
	...props
}: MDXEditorProps & { ref?: Ref<MDXEditorMethods> }) {
	const isDarkMode = useIsDarkMode();
	return (
		<MDXEditor
			{...props}
			ref={ref}
			className={cn(className, isDarkMode && "dark-theme")}
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
