import { looksLikeEmail } from './looks.like.email';

test('returns FALSE with more than 1 @ symbol', () => {
   expect(looksLikeEmail('adam@bytebodger@foo.com')).toEqual(false);
})

test('returns FALSE with no localpart', () => {
   expect(looksLikeEmail('@adambytebodger.com')).toEqual(false);
})

test('returns FALSE with local part longer than 64 characters', () => {
   expect(looksLikeEmail('abcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzy@bytebodger.com')).toEqual(false);
})

test('returns FALSE with no domainpart', () => {
   expect(looksLikeEmail('adambytebodger.com@')).toEqual(false);
})

test('returns FALSE with illegal characters in local part', () => {
   expect(looksLikeEmail('ad[am@bytebodger.com')).toEqual(false);
})

test('returns FALSE with consecutive periods in local part', () => {
   expect(looksLikeEmail('ad..am@bytebodger.com')).toEqual(false);
})

test('returns FALSE with domain part longer than 255 characters', () => {
   expect(looksLikeEmail('abc@defghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzydefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzyabcdefghijklmnopqrstuvwxzybytebodger.com')).toEqual(false);
})

test('returns FALSE with no top-level domain in domain part', () => {
   expect(looksLikeEmail('adam@bytebodgercom')).toEqual(false);
})

test('returns FALSE if any domain label is longer than 63 characters', () => {
   expect(looksLikeEmail('adam@bytebodgerbytebodgercombytebodgercombytebodgercombytebodgercombytebodgercombytebodgercombytebodgercom.com')).toEqual(false);
})

test('returns FALSE if any domain label contains illegal characters', () => {
   expect(looksLikeEmail('adam@byte*bodger.com')).toEqual(false);
})

test('returns FALSE if any domain label starts with a hypen', () => {
   expect(looksLikeEmail('adam@byte.-bodger.com')).toEqual(false);
})

test('returns FALSE if any domain label ends with a hypen', () => {
   expect(looksLikeEmail('adam@byte-.bodger.com')).toEqual(false);
})

test('returns TRUE with a "normal"-looking email', () => {
   expect(looksLikeEmail('adam@byte.bodger.com')).toEqual(true);
   expect(looksLikeEmail('adam_davis1@byte.bodger.com')).toEqual(true);
})

