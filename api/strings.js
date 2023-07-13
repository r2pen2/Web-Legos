function addClosingTags(htmlString) {
  let lastOpener = -1;
  let resultHtml = htmlString;
  for (let i in resultHtml) {
    if (resultHtml[i] === '>' && resultHtml[i - 1] !== '/') {
      lastOpener = i;
    }
    if (resultHtml[i] === '<' && lastOpener !== -1) {
      i++;
      resultHtml = resultHtml.substring(0, i) + "/" + resultHtml.substring(i);
    }
  }
  // Replace line breaks that may have been changed by accident
  resultHtml = resultHtml.replaceAll("</br/>", "<br/>");
  return resultHtml;
}

export function HTMLToMarkdown(string) {
  let newString = string;
  // Repalce line breaks
  newString = newString.replaceAll("<br/>", "\n\n" )
  // Replace bolds
  newString = newString.replaceAll("<strong>", "**");
  newString = newString.replaceAll("</strong>", "**");

  // Handle links
  while (newString.includes("<a") && newString.includes("</a")) {
    
    const linkStart = newString.indexOf("<a");
    const linkEnd = newString.indexOf("</a>");

    const nameStart = newString.indexOf(">", linkStart);
    const nameEnd = newString.indexOf("<", nameStart);
    const nameText = newString.substring(nameStart + 1, nameEnd);

    const hrefStart = newString.indexOf(`href="`, linkStart);
    const hrefEnd = newString.indexOf(`"`, hrefStart + `href="`.length);
    const href = newString.substring(hrefStart + `href="`.length, hrefEnd);
    
    const markdownString = `[${nameText}](${href})`;

    newString = newString.substring(0, linkStart) + markdownString + newString.substring(linkEnd + "</a>".length);
  }

  return newString;
}

/**
 * Turn any markdown string into HTML for injection
 * @param {string} markdownString - markdown formatted string
 * @returns 
 */
export function markdownToHTML(markdownString) {
  let newString = markdownString;
  // Repalce line breaks
  newString = newString.replace(/\n+/g, "<br/>");
  // Replace bolds
  newString = newString.replaceAll("**", "<strong>");
  newString = addClosingTags(newString);

  // Handle links
  while (newString.includes("[") && newString.includes("]") && newString.includes("(") && newString.includes(")")) {
    const nameStart = newString.indexOf("[");
    const nameEnd = newString.indexOf("]", nameStart);
    const nameText = newString.substring(nameStart + 1, nameEnd);
    const hrefStart = newString.indexOf("(");
    const hrefEnd = newString.indexOf(")", hrefStart);
    const href = newString.substring(hrefStart + 1, hrefEnd);
    
    const linkElementString = `<a href="${href}" target="blank">${nameText}</a>`;

    newString = newString.substring(0, nameStart) + linkElementString + newString.substring(hrefEnd + 1);
  }

  return newString;
}