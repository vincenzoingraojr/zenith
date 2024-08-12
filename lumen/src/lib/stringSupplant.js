// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

// simple string interpolation
export default function(str, map) {
  return str.replace(/#\{(\w+)\}/g, function(match, name) {
    return map[name] || '';
  });
}
