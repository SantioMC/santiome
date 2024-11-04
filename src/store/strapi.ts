import { writable } from "svelte/store";
import type { Post, Project } from "~/lib/strapi";

export const blogs = writable<Post[]>([]);
export const projects = writable<Project[]>([]);