type FormattedError = {
  _errors?: string[];
  [key: string]: FormattedError | string[] | undefined;
};

export function getZodErrorMessages(error: FormattedError): string[] {
  const messages: string[] = [];

  if (Array.isArray(error)) {
    messages.push(...error);
  } else if (typeof error === 'object' && error !== null) {
    if (error._errors && Array.isArray(error._errors)) {
      messages.push(...error._errors);
    }
    for (const key of Object.keys(error)) {
      if (key !== '_errors' && error[key]) {
        messages.push(...getZodErrorMessages(error[key] as FormattedError));
      }
    }
  }

  return messages.filter(Boolean);
}
