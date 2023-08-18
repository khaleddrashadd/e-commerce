const getImagePath = (url) => {
  return url.replace(
    'https://pegocltkdfdaomiwizla.supabase.co/storage/v1/object/public/e-commerce/',
    ''
  );
};
export default getImagePath;