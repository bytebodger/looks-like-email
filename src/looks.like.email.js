import { allow } from '@toolz/allow';
import { contains } from '@toolz/string-contains';

export const looksLikeEmail = (string = '', showWarnings = false) => {
   allow.setFailureBehavior(allow.failureBehavior.WARN);
   allow.aString(string).aBoolean(showWarnings);
   
   const showWarning = (message = '') => {
      if (!showWarnings)
         return;
      console.warn(message);
   }
   
   if (string.split('@').length > 2) {
      showWarning(`Too many @ symbols in [${string}]`);
      return false;
   }
   const [localPart, domainPart] = string.split('@');
   if (!localPart) {
      showWarning(`No local part in [${string}]`);
      return false;
   }
   if (localPart.length > 64) {
      showWarning(`Local part cannot exceed 64 characters in [${string}]`);
      return false;
   }
   if (!domainPart) {
      showWarning(`No domain part in [${string}]`);
      return false;
   }
   if (!contains.onlyAlphanumerics(localPart, ['!', '#', '$', '%', '&', '‘', '*', '+', '-', '/', '=', '?', '^', '_', '`', '.', '{', '|', '}', '~'])) {
      showWarning(`Illegal characters found in local part of [${string}]`);
      return false;
   }
   if (localPart.includes('..')) {
      showWarning(`Consecutive periods found in the local part of [${string}]`)
      return false;
   }
   if (domainPart.length > 255) {
      showWarning(`Domain part cannot exceed 255 characters in [${string}]`);
      return false;
   }
   const domainLabels = domainPart.split('.');
   if (domainLabels.length < 2) {
      showWarning(`No top-level domain found in [${string}]`);
      return false;
   }
   let errorMessage = '';
   domainLabels.forEach(domainLabel => {
      if (errorMessage !== '')
         return;
      if (domainLabel.length > 63) {
         errorMessage = `Domain label exceeds 63 characters in [${domainLabel}]`;
         return;
      }
      if (!contains.onlyAlphanumerics(domainLabel, ['-'])) {
         errorMessage = `Illegal characters found in [${domainLabel}]`;
         return;
      }
      if (domainLabel[0] === '-') {
         errorMessage = `The first character cannot be a hyphen in [${domainLabel}]`;
         return;
      }
      if (domainLabel[domainLabel.length - 1] === '-')
         errorMessage = `The last character cannot be a hyphen in [${domainLabel}]`;
   })
   if (errorMessage !== '') {
      showWarning(errorMessage);
      return false;
   }
   return true;
}
