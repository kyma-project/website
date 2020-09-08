import { NestedObject } from "./types";

const flattenMessages = (nestedMessages: NestedObject, prefix: string = "") =>
  Object.keys(nestedMessages).reduce((messages: NestedObject, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      messages[prefixedKey] = value;
    } else {
      if (Array.isArray(value)) {
        messages[prefixedKey] = value;
      }
      Object.assign(
        messages,
        flattenMessages(value as NestedObject, prefixedKey),
      );
    }
    return messages;
  }, {});

export default flattenMessages;
