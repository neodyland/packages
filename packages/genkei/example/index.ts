import { g } from "..";

const x = g.string().safeParse("hello");

g.any().optional().safeParse("xxx");