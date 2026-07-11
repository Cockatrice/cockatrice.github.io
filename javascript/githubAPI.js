const githubReleasesAPI = "https://api.github.com/repos/Cockatrice/Cockatrice/releases/latest";
const fallbackDownloadURL = "https://github.com/Cockatrice/Cockatrice/releases/latest";

let win64 = fallbackDownloadURL;
let macOS_latest = fallbackDownloadURL;
let macOS_legacy = fallbackDownloadURL;
let ubuntu = fallbackDownloadURL;
let debian = fallbackDownloadURL;
let fedora = fallbackDownloadURL;

$.getJSON(githubReleasesAPI, function (json) {

    // Update news section with latest release information
    const releaseName = json.name;
    const releaseDate = new Date(json.published_at).toISOString().split('T')[0];
    const releaseURL = json.html_url;
    const newsItem = `<li><kbd>${releaseDate}</kbd> <a href="${releaseUrl}" target="_blank" rel="noreferrer">${releaseName}</a> released!</li>`;
    $('#news-list').html(newsItem);    // Replace static content with newest release item fetched

    // Update download links based on the latest release assets
    for (const asset of json.assets) {
        const assetURL = asset.browser_download_url;
        console.log(assetURL);
        if (assetURL.includes('Win10')) {
            win64 = assetUrl;
        }
        else if (assetURL.includes('macOS15')) {
            macOS_latest = assetUrl;
        }
        else if (assetURL.includes('macOS13')) {
            macOS_legacy = assetUrl;
        }
        else if (assetURL.includes('Ubuntu26')) {
            ubuntu = assetUrl;
        }
        else if (assetURL.includes("Debian13")) {
            debian = assetUrl;
        } //version is hardcoded so as not to pick up servatrice debian by accident
        else if (assetURL.includes("Fedora")) {
            fedora = assetUrl;
        }
    }
    $('#win64').attr('href', win64);
    $('#macOS_latest').attr('href', macOS_latest);
    $('#macOS_legacy').attr('href', macOS_legacy);
    $('#ubuntu').attr('href', ubuntu);
    $('#debian').attr('href', debian);
    $('#fedora').attr('href', fedora);

}).fail(function() {
    console.error('Failed to fetch latest GitHub release.');
});
