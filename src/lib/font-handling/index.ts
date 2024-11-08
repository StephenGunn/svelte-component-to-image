function isValidUrl(location: string): boolean {
  try {
    new URL(location);
    return true;
  } catch {
    return false;
  }
}
// get local font and render as an array buffer
export const get_font_as_buffer = async (location: string) => {
  // check to make sure that we have a full URL
  if (!isValidUrl(location)) {
    console.error(
      `Font locations need to be specified with a full URL to work`,
    );
    throw new Error(`Invalid URL: ${location}`);
  }

  // the renderer
  const font = await (await fetch(location)).blob();
  const buf = await font.arrayBuffer();
  return buf;
};
