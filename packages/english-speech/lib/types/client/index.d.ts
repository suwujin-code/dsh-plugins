import type { ClientContext } from "@deepseek-ai/dsh-client-runtime/client";
/** Required client services. */
export declare const inject: string[];
/** Registers the per-message English speech control. */
export declare function apply(ctx: ClientContext): void;
