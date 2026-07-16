const githubReleasesAPI = "https://api.github.com/repos/Cockatrice/Cockatrice/releases/latest";

const fallbackDownloadURL = "https://github.com/Cockatrice/Cockatrice/releases/latest";

// String ending with separator "-", followed by "OS name", "version digits", "dot", "file extension"
const windowsRegex = /-(?:Win|Windows)(\d+)\.[^.]+$/i;    // e.g. "-Windows10.exe"
const macOsRegex = /-macOS(\d+)\.[^.]+$/i;                // e.g. "-macOS14.dmg"
const macOsIntelRegex = /-macOS(\d+)_Intel\.[^.]+$/i;     // e.g. "-macOS13_Intel.dmg"
const ubuntuRegex = /-Ubuntu(\d+\.\d+)\.[^.]+$/i;         // e.g. "-Ubuntu25.10.deb"
const debianRegex = /-Debian(\d+)\.[^.]+$/i;              // e.g. "-Debian13.deb"
const fedoraRegex = /-Fedora(\d+)\.[^.]+$/i;              // e.g. "-Fedora44.rpm"

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

	// Windows/macOS: Start with the largest possible value and find smallest version available
    // Linux distros: Start with the smallest possible value and find biggest version available
    let windowsOldestVersionValue = Infinity;
    let macOsOldestVersionValue = Infinity;
    let macOsIntelOldestVersionValue = Infinity;
    let ubuntuNewestVersionValue = -Infinity;
    let debianNewestVersionValue = -Infinity;
    let fedoraNewestVersionValue = -Infinity;

    let windowsTargetVersion = "";
    let macOsTargetVersion = "";
    let macOsIntelTargetVersion = "";
    let ubuntuTargetVersion = "";
    let debianTargetVersion = "";
    let fedoraTargetVersion = "";

    // Store best matching version according to OS specific compatibility rules:
    // Windows/macOS: pick oldest targeted version (lowest number), assets will work on newer OS versions
    // Linux distros: pick newest targeted version (highest number), newer OS require assets targeting new versions
    for (const asset of json.assets) {
        const downloadURL = asset.browser_download_url;
        console.debug(downloadURL);

        let match;

        // Windows
        match = downloadURL.match(windowsRegex);
        if (match) {
            const versionValue = Number(match[1]);

            if (versionValue < windowsOldestVersionValue) {
                windowsOldestVersionValue = versionValue;
				windowsTargetVersion = versionValue + "+";
                windowsDownloadURL = downloadURL;
            }
        }

        // macOS, Intel CPU (x86)
        match = downloadURL.match(macOsIntelRegex);
        if (match) {
            const versionValue = Number(match[1]);

            if (versionValue < macOsIntelOldestVersionValue) {
                macOsIntelOldestVersionValue = versionValue;
                macOsIntelTargetVersion = versionValue + "+ (Intel)";
                macOsIntelDownloadURL = downloadURL;
            }
        }

        // macOS, Apple Silicon CPU (ARM) 
        match = downloadURL.match(macOsRegex);
        if (match) {
            const versionValue = Number(match[1]);

            if (versionValue < macOsOldestVersionValue) {
                macOsOldestVersionValue = versionValue;
                macOsTargetVersion = versionValue + "+";
                macOsDownloadURL = downloadURL;
            }
        }

        // Ubuntu
        match = downloadURL.match(ubuntuRegex);
        if (match) {
            const versionValue = Number(match[1]);    // "25.10" --> 25.1, numeric comparison is still safe for Ubuntu's YY.04 / YY.10 release convention

            if (versionValue > ubuntuNewestVersionValue) {
                ubuntuNewestVersionValue = versionValue;
                ubuntuTargetVersion = versionValue.toFixed(2);    // 25.1 --> "25.10"
                ubuntuDownloadURL = downloadURL;
            }
        }

        // Debian
        match = downloadURL.match(debianRegex);
        if (match) {
            const versionValue = Number(match[1]);

            if (versionValue > debianNewestVersionValue) {
                debianNewestVersionValue = versionValue;
                debianTargetVersion = versionValue;
                debianDownloadURL = downloadURL;
            }
        }

        // Fedora
        match = downloadURL.match(fedoraRegex);
        if (match) {
            const versionValue = Number(match[1]);

            if (versionValue > fedoraNewestVersionValue) {
                fedoraNewestVersionValue = versionValue;
                fedoraTargetVersion = versionValue;
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

    document.getElementById("windowsTargetVersion").textContent = windowsTargetVersion;
    document.getElementById("macOsTargetVersion").textContent = macOsTargetVersion;
    document.getElementById("macOsIntelTargetVersion").textContent = macOsIntelTargetVersion;
    document.getElementById("ubuntuTargetVersion").textContent = ubuntuTargetVersion;
    document.getElementById("debianTargetVersion").textContent = debianTargetVersion;
    document.getElementById("fedoraTargetVersion").textContent = fedoraTargetVersion;
}

updateWebpage();
