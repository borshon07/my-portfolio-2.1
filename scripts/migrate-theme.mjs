import fs from "node:fs";
import path from "node:path";

const tokens = {
  "141414": "canvas",
  "101010": "sunken", "121212": "sunken",
  "161616": "surface", "171717": "surface", "181818": "surface",
  "1a1a1a": "surface-2", "1c1c1c": "surface-2",
  "1d1713": "tint",
  "202020": "surface-3", "222222": "surface-3",
  "242424": "surface-4", "252525": "surface-4", "272727": "surface-4", "282828": "surface-4",
  "262626": "line-soft",
  "2b2b2b": "line", "2e2e2e": "line", "303030": "line",
  "333": "line-strong", "333333": "line-strong", "353535": "line-strong",
  "383838": "line-strong", "3a3a3a": "line-strong", "404040": "line-strong", "444444": "line-strong",
  "f4f0e8": "fg",
  "a39e93": "muted",
  "ff7849": "accent",
  "ff6633": "accent-hover", "ff8559": "accent-hover", "ff8e66": "accent-hover",
  "b94a22": "accent-deep",
};

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const files = walk("src").filter((f) => /\.(tsx|ts)$/.test(f));

for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  const after = before
    .replace(/text-\[#141414\]/gi, "text-on-accent")
    .replace(/text-\[#FF7849\]/gi, "text-accent-fg")
    .replace(/_#b94a22\]/gi, "_var(--accent-deep)]")
    .replace(/_#262626\]/gi, "_var(--line-soft)]")
    .replace(/_#FF7849\]/gi, "_var(--accent)]")
    .replace(/rgba\(255,\s*120,\s*73,\s*([\d.]+)\)/g, "rgb(var(--accent-rgb)/$1)")
    .replace(/#F4F0E8 1px/gi, "var(--fg) 1px")
    .replace(/1px #3a3a3a/gi, "1px var(--line-strong)")
    .replace(/-\[#([0-9a-f]{3,6})\]/gi, (m, hex) => {
      const token = tokens[hex.toLowerCase()];
      return token ? `-${token}` : m;
    });

  if (after !== before) {
    fs.writeFileSync(file, after);
    console.log("updated:", file);
  }
}

console.log("\nBaki hex rong:");
let left = 0;
for (const file of files) {
  fs.readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (/#[0-9a-fA-F]{3,8}\b/.test(line)) {
        console.log(`${file}:${i + 1}: ${line.trim()}`);
        left++;
      }
    });
}
if (!left) console.log("kichu baki nei");