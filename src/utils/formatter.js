const slugify = (val) => {
  if (!val) {
    return
  }

  return String(val)
    .normalize('NFKC')  // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')  // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
}

export default slugify