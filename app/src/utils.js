export const useWpSiteUrl = () => {
    let wpUrl = window.location.origin;
    if (wpUrl === 'http://localhost:3000') {
        wpUrl = 'https://gparency.local';
    }
    return wpUrl + '/wp-json';
};