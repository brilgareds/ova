const htmlFetch = async ({ url }) => {
  if (!url) throw new error('Url is required!');

  const response = await fetch(url);
  const html = await response.text();

  return html;
};

const jsonFetch = async ({ url }) => {
  if (!url) throw new error('Url is required!');

  const response = await fetch(url);
  const json = await response.json();

  return json;
};