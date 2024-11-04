import { writable } from "svelte/store";

export const page = writable<string>('about');
export const reference = writable<string | undefined>(undefined);

page.subscribe(() => {
	if (!window.location.hash) return;
	reference.set(window.location.hash.substring(1).replace("+", " "));
	window.location.hash = ``;
});