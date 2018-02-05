var githubReleasesAPI = "https://api.github.com/repos/Cockatrice/Cockatrice/releases/latest";
$.getJSON(githubReleasesAPI, function (json) {
    var win64 = 'https://github.com/Cockatrice/Cockatrice/releases/latest'
    var macOS = 'https://github.com/Cockatrice/Cockatrice/releases/latest'
    var ubuntu = 'https://github.com/Cockatrice/Cockatrice/releases/latest'
    for (asset of json.assets) {
      url = asset.browser_download_url
      if (url.includes('win64.exe')) {
        win64 = url
      }
      else if (url.includes('.dmg')) {
        macOS = url
      }
      else if (url.includes('.deb')) {
        ubuntu = url
      }
    }
    $('#win64').attr('href', win64);
    $('#macOS').attr('href', macOS);
    $('#ubuntu').attr('href', ubuntu);
});
