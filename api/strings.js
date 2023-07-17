/**
 * 
      resultHtml += (workingString.substring(0, closer + 1) + "/");
      workingString = workingString.substring(closer + 1);
 */

function addClosingTags(htmlString) {

  let workingString = htmlString;
  let resultHtml = "";

  /**
   * Holy shit I cannot believe this works
   */
  function getValidOpener() {
    let lastFound = 0;
    while (true) {
      const newOpener = workingString.indexOf("<", lastFound);
      if (newOpener === -1) { break ; }
      const nextLineBreak = workingString.indexOf("<br/>", lastFound);
      if (newOpener !== nextLineBreak) {
        return newOpener;
      } else {
        lastFound = nextLineBreak + "<br/>".length;
      }
    } 
    return -1;
  }

  while (workingString.indexOf("<") !== -1) {
    const opener = getValidOpener();
    if (opener === -1) { break; }
    const closer = workingString.indexOf("<", opener + 1);
    resultHtml += (workingString.substring(0, closer + 1) + "/");
    workingString = workingString.substring(closer + 1);
  }
  resultHtml += workingString;

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