#!/usr/bin/env node
// stdio <-> Streamable HTTP bridge for the tropia.pl MCP server (https://api.tropia.pl/mcp).
// Reads JSON-RPC messages (one per line) from stdin, forwards them over HTTPS, writes responses to stdout.
// No dependencies: Node 18+ (global fetch).
import { createInterface } from "node:readline";

const URL_MCP = process.env.TROPIA_MCP_URL || "https://api.tropia.pl/mcp";
const KEY = process.env.TROPIA_API_KEY || "";
const log = (...a) => process.stderr.write("[tropia-mcp] " + a.join(" ") + "\n");

const headers = { "Content-Type": "application/json", "Accept": "application/json, text/event-stream", "User-Agent": "tropia-mcp-docker/1.0" };
if (KEY) headers.Authorization = "Bearer " + KEY;
else log("TROPIA_API_KEY is not set: tools will return a hint how to get a key (https://tropia.pl/api)");

const ids = (m) => (Array.isArray(m) ? m : [m]).filter((x) => x && x.id !== undefined && x.id !== null).map((x) => x.id);
const out = (obj) => process.stdout.write(JSON.stringify(obj) + "\n");

async function forward(line) {
  let msg;
  try { msg = JSON.parse(line); } catch { return out({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }); }
  try {
    const res = await fetch(URL_MCP, { method: "POST", headers, body: JSON.stringify(msg) });
    const text = await res.text();
    if (res.status === 202 || !text.trim()) return;
    if ((res.headers.get("content-type") || "").includes("text/event-stream")) {
      for (const l of text.split("\n")) if (l.startsWith("data:")) { const d = l.slice(5).trim(); if (d) process.stdout.write(d + "\n"); }
      return;
    }
    JSON.parse(text);
    process.stdout.write(text.replace(/\n/g, "") + "\n");
  } catch (e) {
    log("request failed:", e.message);
    for (const id of ids(msg)) out({ jsonrpc: "2.0", id, error: { code: -32603, message: "tropia bridge: " + e.message } });
  }
}

// sequential queue keeps response order and avoids flooding the API
let chain = Promise.resolve();
createInterface({ input: process.stdin }).on("line", (l) => { if (l.trim()) chain = chain.then(() => forward(l)); })
  .on("close", () => chain.then(() => process.exit(0)));
