import slugify from 'slugify';

export const makeSlugtext = (text: string) => {
  const slug = slugify(text, {
    lower: true,
    trim: true,
    strict: true,
  });

  return slug;
};
