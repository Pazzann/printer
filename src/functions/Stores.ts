import type {Writable} from "svelte/store";
import {writable} from "svelte/store";

export const count: Writable<number> = writable(0);
export const rowCount: Writable<number> = writable(0);