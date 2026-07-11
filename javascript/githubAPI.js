const githubReleasesAPI = "https://api.github.com/repos/Cockatrice/Cockatrice/releases/latest";

const fallbackDownloadURL = "https://github.com/Cockatrice/Cockatrice/releases/latest";

// TODO: Update regex patterns
const windowsRegex = /(?:Win|Windows)(\d+).*\.exe$/i;
const macRegex = /-macOS(\d+)/i;
const macIntelRegex = /Intel/i;
const ubuntuRegex = /-Ubuntu(\d+\.\d+)\.deb$/i;
const debianRegex = /-Debian(\d+)\.deb$/i;
const fedoraRegex = /-Fedora(\d+)\.rpm$/i;

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

    let oldestWindowsVersion = Infinity;
    let oldestMacVersion = Infinity;
    let oldestMacIntelVersion = Infinity;

    let newestUbuntuVersion = -1;
    let newestDebianVersion = -1;
    let newestFedoraVersion = -1;

    for (const asset of json.assets) {
        const downloadURL = asset.browser_download_url;
        console.debug(downloadURL);

        let match;

        match = downloadURL.match(windowsRegex);
        if (match) {
            const version = Number(match[1]);

            if (version < oldestWindowsVersion) {
                oldestWindowsVersion = version;
                win = downloadURL;
            }
        }

        match = downloadURL.match(macRegex);
        if (match) {
            const version = Number(match[1]);

            if (intelRegex.test(downloadURL)) {
                if (version < oldestMacIntelVersion) {
                    oldestMacIntelVersion = version;
                    macIntel = downloadURL;
                }
            } else {
                if (version < oldestMacVersion) {
                    oldestMacVersion = version;
                    mac = downloadURL;
                }
            }
        }

        match = downloadURL.match(ubuntuRegex);
        if (match) {
            const version = parseFloat(match[1]);    // version is e.g. "26.04"

            if (version > newestUbuntuVersion) {
                newestUbuntuVersion = version;
                ubuntu = downloadURL;
            }
        }

        // version is hardcoded so as not to pick up servatrice debian by accident
        match = downloadURL.match(debianRegex);
        if (match) {
            const version = Number(match[1]);

            if (version > newestDebianVersion) {
                newestDebianVersion = version;
                debian = downloadURL;
            }
        }

        match = downloadURL.match(fedoraRegex);
        if (match) {
            const version = Number(match[1]);

            if (version > newestFedoraVersion) {
                newestFedoraVersion = version;
                fedora = downloadURL;
            }
        }
    }

    // TODO: change to new names (html + here)
    // Update download buttons with new links
    document.getElementById('win64').href = win;
    document.getElementById('macOS_latest').href = mac;
    document.getElementById('macOS_legacy').href = macIntel;
    document.getElementById('ubuntu').href = ubuntu;
    document.getElementById('debian').href = debian;
    document.getElementById('fedora').href = fedora;
}
