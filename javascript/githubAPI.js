const githubReleasesAPI = "https://api.github.com/repos/Cockatrice/Cockatrice/releases/latest";

const fallbackDownloadURL = "https://github.com/Cockatrice/Cockatrice/releases/latest";

// TODO: Update regex patterns
const windowsRegex = /(?:Win|Windows)(\d+).*\.exe$/i;
const macOsRegex = /-macOS(\d+)/i;
const macOsIntelRegex = /Intel/i;
const ubuntuRegex = /-Ubuntu(\d+\.\d+)\.deb$/i;
const debianRegex = /-Debian(\d+)\.deb$/i;
const fedoraRegex = /-Fedora(\d+)\.rpm$/i;

async function updateWebpage() {
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
    
// Update download links based on the latest release
function updateDownloadLinks(json) {
    let windowsDownloadURL = fallbackDownloadURL;
    let macOsDownloadURL = fallbackDownloadURL;
    let macOsIntelDownloadURL = fallbackDownloadURL;
    let ubuntuDownloadURL = fallbackDownloadURL;
    let debianDownloadURL = fallbackDownloadURL;
    let fedoraDownloadURL = fallbackDownloadURL;

    // Store best matching version according to OS specific compatibility strategy
    let oldestWindowsVersion = Infinity;
    let oldestMacOsVersion = Infinity;
    let oldestMacOsIntelVersion = Infinity;
    let newestUbuntuVersion = -1;
    let newestDebianVersion = -1;
    let newestFedoraVersion = -1;

    for (const asset of json.assets) {
        const downloadURL = asset.browser_download_url;
        console.debug(downloadURL);

        let match;

        // Windows
        match = downloadURL.match(windowsRegex);
        if (match) {
            const version = Number(match[1]);

            if (version < oldestWindowsVersion) {
                oldestWindowsVersion = version;
                windowsDownloadURL = downloadURL;
            }
        }

        // macOS
        match = downloadURL.match(macOsRegex);
        if (match) {
            const version = Number(match[1]);

            // Intel CPU (x86)
            if (macOsIntelRegex.test(downloadURL)) {
                if (version < oldestMacOsIntelVersion) {
                    oldestMacOsIntelVersion = version;
                    macOsIntelDownloadURL = downloadURL;
                }
            // Apple Silicon CPU (ARM)
            } else {
                if (version < oldestMacOsVersion) {
                    oldestMacOsVersion = version;
                    macOsDownloadURL = downloadURL;
                }
            }
        }

        // Ubuntu
        match = downloadURL.match(ubuntuRegex);
        if (match) {
            const version = parseFloat(match[1]);    // version is e.g. "26.04"

            if (version > newestUbuntuVersion) {
                newestUbuntuVersion = version;
                ubuntuDownloadURL = downloadURL;
            }
        }

        // Debian
        match = downloadURL.match(debianRegex);
        if (match) {
            const version = Number(match[1]);

            if (version > newestDebianVersion) {
                newestDebianVersion = version;
                debianDownloadURL = downloadURL;
            }
        }

        // Fedora
        match = downloadURL.match(fedoraRegex);
        if (match) {
            const version = Number(match[1]);

            if (version > newestFedoraVersion) {
                newestFedoraVersion = version;
                fedoraDownloadURL = downloadURL;
            }
        }
    }

    // Update buttons with links to best matching asset
    document.getElementById('windowsDownloadButton').href = windowsDownloadURL;
    document.getElementById('macOsDownloadButton').href = macOsDownloadURL;
    document.getElementById('macOsIntelDownloadButton').href = macOsIntelDownloadURL;
    document.getElementById('ubuntuDownloadButton').href = ubuntuDownloadURL;
    document.getElementById('debianDownloadButton').href = debianDownloadURL;
    document.getElementById('fedoraDownloadButton').href = fedoraDownloadURL;
}

updateWebpage();
