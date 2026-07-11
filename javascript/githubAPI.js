const githubReleasesAPI = "https://api.github.com/repos/Cockatrice/Cockatrice/releases/latest";
const fallbackDownloadURL = "https://github.com/Cockatrice/Cockatrice/releases/latest";

async function updatePage() {
    try {
        const response = await fetch(githubReleasesAPI);

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        const json = await response.json();

        updateReleaseNews(json);
        updateDownloadLinks(json);

    } catch (error) {
        console.error('Failed to fetch latest GitHub release.', error);
    }
}

// Update news section with latest release information
function updateReleaseNews(json) {
    const releaseName = json.name;
    const releaseDate = new Date(json.published_at).toISOString().split('T')[0];
    const releaseURL = json.html_url;

    const newsItem = `<li><kbd>${releaseDate}</kbd> <a href="${releaseURL}" target="_blank" rel="noreferrer">${releaseName}</a> released!</li>`;

    document.getElementById('news-list').innerHTML = newsItem;
}
    
// Update download links based on the latest release assets
function updateDownloadLinks(json) {
    let win = fallbackDownloadURL;
    let mac = fallbackDownloadURL;
    let macIntel = fallbackDownloadURL;
    let ubuntu = fallbackDownloadURL;
    let debian = fallbackDownloadURL;
    let fedora = fallbackDownloadURL;

    for (const asset of json.assets) {
        const downloadURL = asset.browser_download_url;
        console.debug(downloadURL);

        if (downloadURL.includes('Win10')) {
            win = downloadURL;
        }
        else if (downloadURL.includes('macOS15')) {
            mac = downloadURL;
        }
        else if (downloadURL.includes('macOS13')) {
            macIntel = downloadURL;
        }
        else if (downloadURL.includes('Ubuntu26')) {
            ubuntu = downloadURL;
        }
        else if (downloadURL.includes("Debian13")) {    //version is hardcoded so as not to pick up servatrice debian by accident
            debian = downloadURL;
        }
        else if (downloadURL.includes("Fedora")) {
            fedora = downloadURL;
        }
    }

    // Update download buttons with new links
    document.getElementById('win64').href = win;
    document.getElementById('macOS_latest').href = mac;
    document.getElementById('macOS_legacy').href = macIntel;
    document.getElementById('ubuntu').href = ubuntu;
    document.getElementById('debian').href = debian;
    document.getElementById('fedora').href = fedora;
}
