// Copyright 2024 Zenith
// Licensed under the CC-BY-NC-ND-1.0 License

import autoLink from './autoLink';
import autoLinkCashtags from './autoLinkCashtags';
import autoLinkEntities from './autoLinkEntities';
import autoLinkHashtags from './autoLinkHashtags';
import autoLinkUrlsCustom from './autoLinkUrlsCustom';
import autoLinkUsernamesOrLists from './autoLinkUsernamesOrLists';
import autoLinkWithJSON from './autoLinkWithJSON';
import configs from './configs';
import convertUnicodeIndices from './convertUnicodeIndices';
import extractCashtags from './extractCashtags';
import extractCashtagsWithIndices from './extractCashtagsWithIndices';
import extractEntitiesWithIndices from './extractEntitiesWithIndices';
import extractHashtags from './extractHashtags';
import extractHashtagsWithIndices from './extractHashtagsWithIndices';
import extractHtmlAttrsFromOptions from './extractHtmlAttrsFromOptions';
import extractMentions from './extractMentions';
import extractMentionsOrListsWithIndices from './extractMentionsOrListsWithIndices';
import extractMentionsWithIndices from './extractMentionsWithIndices';
import extractReplies from './extractReplies';
import extractUrls from './extractUrls';
import extractUrlsWithIndices from './extractUrlsWithIndices';
import getTextLength from './getTextLength';
import getUnicodeTextLength from './getUnicodeTextLength';
import hasInvalidCharacters from './hasInvalidCharacters';
import hitHighlight from './hitHighlight';
import htmlEscape from './htmlEscape';
import isInvalidContent from './isInvalidContent';
import isValidHashtag from './isValidHashtag';
import isValidList from './isValidList';
import isValidContentText from './isValidContentText';
import isValidUrl from './isValidUrl';
import isValidUsername from './isValidUsername';
import linkTextWithEntity from './linkTextWithEntity';
import linkToCashtag from './linkToCashtag';
import linkToHashtag from './linkToHashtag';
import linkToMentionAndList from './linkToMentionAndList';
import linkToText from './linkToText';
import linkToTextWithSymbol from './linkToTextWithSymbol';
import linkToUrl from './linkToUrl';
import modifyIndicesFromUTF16ToUnicode from './modifyIndicesFromUTF16ToUnicode';
import modifyIndicesFromUnicodeToUTF16 from './modifyIndicesFromUnicodeToUTF16';
import regexen from './regexp/index';
import removeOverlappingEntities from './removeOverlappingEntities';
import parseText from './parseText';
import splitTags from './splitTags';
import standardizeIndices from './standardizeIndices';
import tagAttrs from './tagAttrs';

export default {
  autoLink,
  autoLinkCashtags,
  autoLinkEntities,
  autoLinkHashtags,
  autoLinkUrlsCustom,
  autoLinkUsernamesOrLists,
  autoLinkWithJSON,
  configs,
  convertUnicodeIndices,
  extractCashtags,
  extractCashtagsWithIndices,
  extractEntitiesWithIndices,
  extractHashtags,
  extractHashtagsWithIndices,
  extractHtmlAttrsFromOptions,
  extractMentions,
  extractMentionsOrListsWithIndices,
  extractMentionsWithIndices,
  extractReplies,
  extractUrls,
  extractUrlsWithIndices,
  getTextLength,
  getUnicodeTextLength,
  hasInvalidCharacters,
  hitHighlight,
  htmlEscape,
  isInvalidContent,
  isValidHashtag,
  isValidList,
  isValidContentText,
  isValidUrl,
  isValidUsername,
  linkTextWithEntity,
  linkToCashtag,
  linkToHashtag,
  linkToMentionAndList,
  linkToText,
  linkToTextWithSymbol,
  linkToUrl,
  modifyIndicesFromUTF16ToUnicode,
  modifyIndicesFromUnicodeToUTF16,
  regexen,
  removeOverlappingEntities,
  parseText,
  splitTags,
  standardizeIndices,
  tagAttrs
};
