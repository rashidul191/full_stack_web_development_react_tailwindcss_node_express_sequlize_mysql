// ================= HELPER =================
const isEmpty = (value) => {
  return value === "" || value === undefined || value === null;
};

// ================= FORM DATA WITH FILE =================
export const createFormDataWithFile = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    // skip empty values
    if (isEmpty(value)) return;

    // FileList
    if (value instanceof FileList) {
      if (value.length > 0) {
        formData.append(key, value[0]);
      }
      return;
    }

    // File
    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    // Array
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (!isEmpty(item)) {
          formData.append(`${key}[]`, item);
        }
      });
      return;
    }

    // Normal value
    formData.append(key, value);
  });

  return formData;
};

// ================= NORMAL FORM DATA =================
export const createFormData = (data) => {
  const cleanedData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => !isEmpty(value)),
  );

  return cleanedData;
};
