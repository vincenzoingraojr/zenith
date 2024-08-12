# Lumen | Zenith

A JavaScript utility that provides text processing routines for post content.

I'm creating Lumen to lay the foundations of a social networking platform that I have in mind. And, as you can easily guess, users in a social network interact mainly through a component that allows them to publish text, links, images, emoji and much more. The library provides autolinking and extraction for URLs, usernames, lists, and hashtags.

Based on [twitter-text](https://github.com/twitter/twitter-text).

## NPM Users

Install it with: `npm install @zenith-to/lumen-js`

The `lumen` namespace is exported, making it available as such:

``` js
var lumen = require('@zenith-to/lumen-js')
lumen.autoLink(lumen.htmlEscape('#hello < @world >'))
```

## Extraction Examples

    // basic extraction
    var usernames = lumen.extractMentions("Mentioning @vincent and @james")
    // usernames == ["vincent", "james"]

## Auto-linking Examples

    lumen.autoLink("link @user, please #request");

    lumen.autoLink("link @user, and expand url... http://z.to/0JG5Mcq", {
        urlEntities: [
            {
              "url": "http://z.to/0JG5Mcq",
              "display_url": "blog.zenith.to/2025/05/zenith…",
              "expanded_url": "http://blog.zenith.to/2025/05/zenith-is-online",
              "indices": [
                30,
                48
              ]
            }
        ]});

## Content Parsing
**lumen** exposes a "parseText" method that will return the following fields:

* **weightedLength:** Integer that indicates the weighted length calculated by the algorithm above.
* **permillage:** Integer value corresponding to the ratio of consumed weighted length to the maximum weighted length.
* **valid:** Boolean indicating whether it is a valid content (for posts).
* **dispayRangeStart:** Integer with start index on the text string
* **displayRangeEnd:** Integer with end index on the text string (inclusive)
* **validDisplayRangeStart:** Integer indicating the valid start index on the text string
* **validDisplayRangeEnd:** Integer indicating the valid end index on the text string. This can be lesser than displayRangeEnd (inclusive).

```js
var content = "This is a test post";
lumen.parseText(content);
/* Returns:
  {
    weightedLength: 20,
    permillage: 71,
    valid: true,
    displayRangeEnd: 19,
    displayRangeStart: 0,
    validRangeEnd: 19,
    validRangeStart: 0
  }
*/
```
