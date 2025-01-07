// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import autoLinkEntities from './autoLinkEntities';
import modifyIndicesFromUnicodeToUTF16 from './modifyIndicesFromUnicodeToUTF16';

export default function(text, json, options) {
  // map JSON entity to lumen-js entity
  if (json.user_mentions) {
    for (var i = 0; i < json.user_mentions.length; i++) {
      // this is a @mention
      json.user_mentions[i].screenName = json.user_mentions[i].screen_name;
    }
  }

  if (json.hashtags) {
    for (var i = 0; i < json.hashtags.length; i++) {
      // this is a #hashtag
      json.hashtags[i].hashtag = json.hashtags[i].text;
    }
  }

  if (json.symbols) {
    for (var i = 0; i < json.symbols.length; i++) {
      // this is a $CASH tag
      json.symbols[i].cashtag = json.symbols[i].text;
    }
  }

  // concatenate all entities
  let entities = [];
  for (const key in json) {
    entities = entities.concat(json[key]);
  }

  // modify indices to UTF-16
  modifyIndicesFromUnicodeToUTF16(text, entities);

  return autoLinkEntities(text, entities, options);
}
