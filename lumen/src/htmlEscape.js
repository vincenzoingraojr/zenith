// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

const HTML_ENTITIES = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#39;'
};

export default function(text) {
  return (
    text &&
    text.replace(/[&"'><]/g, function(character) {
      return HTML_ENTITIES[character];
    })
  );
}
