var githubReleasesAPI = "https://api.github.com/repos/Cockatrice/Cockatrice/releases/latest";

$.getJSON(githubReleasesAPI, function (json) {
    var win64 = 'https://github.com/Cockatrice/Cockatrice/releases/latest'
    var macOS_latest = 'https://github.com/Cockatrice/Cockatrice/releases/latest'
    var macOS_legacy = 'https://github.com/Cockatrice/Cockatrice/releases/latest'
    var ubuntu = 'https://github.com/Cockatrice/Cockatrice/releases/latest'
    var debian = 'https://github.com/Cockatrice/Cockatrice/releases/latest'
    var fedora = 'https://github.com/Cockatrice/Cockatrice/releases/latest'
    
    for (asset of json.assets) {
      url = asset.browser_download_url
      console.log(url);
      if (url.includes('Win10')) {
        win64 = url
      }
      else if (url.includes('macOS15')) {
        macOS_latest = url
      }
      else if (url.includes('macOS14')) {
        macOS_legacy = url
      }
      else if (url.includes('Ubuntu24')) {
        ubuntu = url
      }
      else if (url.includes("Debian")) {
        debian = url
      }
      else if (url.includes("Fedora")) {
        fedora = url
      }
    }

    $('#win64').attr('href', win64);
    $('#macOS_latest').attr('href', macOS_latest);
    $('#macOS_legacy').attr('href', macOS_legacy);
    $('#ubuntu').attr('href', ubuntu);
    $('#debian').attr('href', debian);
    $('#fedora').attr('href', fedora);
});
