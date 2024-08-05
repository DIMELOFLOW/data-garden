interface JsonMapping {
  [key: string]: string | number | boolean;
}

export const validateMappingEditorCode = (
  pattern: JsonMapping,
  mapping: JsonMapping
): void => {
  Object.entries(pattern).forEach(([key, type]) => {
    const value = mapping[key];
    if (typeof value !== type) {
      throw new Error(
        `The ${key} field should be of type ${type}, but a ${typeof mapping[
          key
        ]} was found`
      );
    }
  });
};
