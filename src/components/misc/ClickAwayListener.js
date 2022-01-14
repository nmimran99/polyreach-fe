import { useEffect, useRef } from "react/cjs/react.development";

export default function ClickAwayListener({
	onClickAway,
	nodeRef,
	children,
	className,
}) {
	const node = useRef();

	const handleClickAway = (e) => {
		if (node.current.contains(e.target)) return;
		if (nodeRef && nodeRef.current && nodeRef.current.containes(e.target))
			return;
		onClickAway();
	};

	useEffect(() => {
		window.addEventListener("click", handleClickAway, true);
		return () => {
			window.removeEventListener("click", handleClickAway, true);
		};
	}, []);

	return (
		<div ref={node} className={className}>
			{children}
		</div>
	);
}
