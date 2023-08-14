const getImageUrl = path => {
  const url = `https://pegocltkdfdaomiwizla.supabase.co/storage/v1/object/public/e-commerce/${path}`;
  return url;
};
export default getImageUrl;
