export const urltoFile = async (
  url: string | any,
  filename: string,
  mimeType: string,
) => {
  const buf = await fetch(url).then((res) => res.arrayBuffer());
  return new File([buf], filename, { type: mimeType });
};
