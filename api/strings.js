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

  resultHtml = resultHtml.replaceAll("</br/>", "<br/>");

  return resultHtml;
}


function replaceMultiples(str, regex, replacement) {
  return str.replace(regex, replacement);
}

export function HTMLToMarkdown(string) {
  let newString = string;
  // Repalce line breaks
  newString = newString.replaceAll("<br/>", "\n\n" )
  // Replace bolds
  newString = newString.replaceAll("<strong>", "**");
  newString = newString.replaceAll("</strong>", "**");
  return newString;
}

export function markdownToHTML(string) {
  let newString = string;
  // Repalce line breaks
  newString = replaceMultiples(newString, /\n+/g, "<br/>");
  // Replace bolds
  newString = newString.replaceAll("**", "<strong>");
  newString = addClosingTags(newString);
  return newString;
}