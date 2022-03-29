export const useYoutubeConverter = () => {
  /**
   * Stworzenie linku do playera youtube/vimeo na podstawie podanego URL
   * @param {String} url  Link do filmu
   * @returns {String} Link do playera youtube/vimeo
   */
  const createPlayerURL = (url) => {
    const urlObj = getURLFromText(url);
    if (
      urlObj.hostname.toLowerCase() === 'www.youtube.com' ||
      urlObj.hostname.toLowerCase() === 'youtu.be'
    ) {
      return createYoutubeLink(url);
    }
    return null;
  };

  /**
   * Stworzenie obiektu klasy 'URL' z podanego url
   * @param {String} url Link do filmu
   * @returns {Object} Obiekt klasy 'URL'
   */
  const getURLFromText = (url) => {
    const urlObj = new URL(url);
    return urlObj;
  };

  /**
   * Stworzenie linku do playera YouTube
   * @param {String} url Link do filmu
   * @returns {String} Link do playera YouTube
   */
  const createYoutubeLink = (url) => {
    const id = getIdFromYtUrl(url);
    return `https://www.youtube.com/embed/${id}`;
  };

  /**
   * Pobranie identyfikatora filmu z linku
   * @param {String} url Link do filmu
   * @returns {String} Identyfikator filmu na YouTube
   */
  const getIdFromYtUrl = (url) => {
    if (url.match('https://(www.)?youtube|youtu.be')) {
      return url.split(
        /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/
      )[2];
    }
  };

  return { createPlayerURL };
};
