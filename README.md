# looks-like-email
`looks-like-email` is a utility function that determines whether a string _looks_ like a valid email address.  Obviously, this function cannot tell whether a string represents a _working_ email address.  But this utility performs a series of checks to ensure that the input at least _appears_ to be a valid email address.

## Usage

After installation, import the package:

```javascript
import { looksLikeEmail } from '@toolz/looks-like-email';
```

### looksLikeEmail()

Given any string, `looksLikeEmail()` performs the following validates that:

1. The string contains exact one `@` symbol.
1. The `@` symbol does not appear the beginning or end of the string.  (The portion _before_ the `@` symbol is the "local part".  The portion _after_ it is the "domain part").
1. The local part consists of alphanumerics and/or the following characters: ! # $ % & ‘ * + - / = ? ^ _ ` . { | } ~
1. There are no consecutive periods in the local part.
1. The domain part is no longer than 255 characters.
1. There is _some kind of_ top-level domain in the domain part.  (Given the every fluctuating directory of TLDs, this utility does _not_ try to validate that the supplied TLD is a _real_ TLD.)
1. The domain part is divided into _domain labels_ by periods - and there are at least two domain labels.
1. No domain label exceeds 63 characters in length.
1. Each domain label consists of alphanumerics and/or a hyphen.
1. Domain labels do not start or end with a hyphen.

This utility uses `@toolz/string-contains` to look for alphanumerics _across the UTF-8 spectrum_.  This means that letters are accepted when they are outside the ASCII range.

**Examples:**

```javascript
looksLikeEmail('adam@bytebodger@foo.com'); // FALSE
looksLikeEmail('@adambytebodger.com'); // FALSE
looksLikeEmail('abcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzy@bytebodger.com'); // FALSE
looksLikeEmail('adambytebodger.com@'); // FALSE
looksLikeEmail('ad[am@bytebodger.com'); // FALSE
looksLikeEmail('ad..am@bytebodger.com'); // FALSE
looksLikeEmail('abc@defghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzybytebodger.com'); // FALSE
looksLikeEmail('adam@bytebodgercom'); // FALSE
looksLikeEmail('adam@bytebodgerbytebodgercombytebodgercombytebodgercombytebodgercombytebodgercombytebodgercombytebodgercom.com'); // FALSE
looksLikeEmail('adam@byte*bodger.com'); // FALSE
looksLikeEmail('adam@byte.-bodger.com'); FALSE
looksLikeEmail('adam@byte-.bodger.com'); // FALSE
looksLikeEmail('adam@byte.bodger.com'); // TRUE
looksLikeEmail('adam_davis1@byte.bodger.com'); TRUE
```
