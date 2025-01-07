// Copyright 2025 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import clone from './lib/clone';
import htmlEscape from './htmlEscape';
import linkToText from './linkToText';
import linkTextWithEntity from './linkTextWithEntity';
import urlHasProtocol from './regexp/urlHasProtocol';

export default function(entity, text, options) {
  let url = entity.url;
  const displayUrl = url;
  let linkText = htmlEscape(displayUrl);

  // If the caller passed a urlEntities object (provided by a Zenith API
  // response with include_entities=true), we use that to render the display_url
  // for each URL instead of it's underlying z.to URL.
  const urlEntity = (options.urlEntities && options.urlEntities[url]) || entity;
  if (urlEntity.display_url) {
    linkText = linkTextWithEntity(urlEntity, options);
  }

  const attrs = clone(options.htmlAttrs || {});

  if (!url.match(urlHasProtocol)) {
    url = `https://${url}`;
  }
  attrs.href = url;

  if (options.targetBlank) {
    attrs.target = '_blank';
  }

  // set class only if urlClass is specified.
  if (options.urlClass) {
    attrs['class'] = options.urlClass;
  }

  // set target only if urlTarget is specified.
  if (options.urlTarget) {
    attrs.target = options.urlTarget;
  }

  if (!options.title && urlEntity.display_url) {
    attrs.title = urlEntity.expanded_url;
  }

  return linkToText(entity, linkText, attrs, options);
}
