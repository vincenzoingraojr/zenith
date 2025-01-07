// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

export default function(o) {
  const r = {};
  for (const k in o) {
    if (o.hasOwnProperty(k)) {
      r[k] = o[k];
    }
  }

  return r;
}
