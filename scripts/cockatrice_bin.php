<?php
	switch ($_GET['os'])
	{
		case "MAC": header("Location: " . get_stable_url_from_bintray("MAC")); break;
		case "WIN32": header("Location: " . get_stable_url_from_bintray("WIN32")); break;
		case "WIN64": header("Location: " . get_stable_url_from_bintray("WIN64")); break;
		case "UNIX": die("We don't have a stable unix package on bintray at this time, try UNIX_DEV"); break;

		case "MAC_DEV": header("Location: " . get_dev_url_from_bintray("MacOSX")); break;
		case "WIN32_DEV": header("Location: " . get_dev_url_from_bintray("Win32")); break;
		case "WIN64_DEV": header("Location: " . get_dev_url_from_bintray("Win64")); break;
		case "UNIX_DEV": header("Location: " . get_dev_url_from_bintray("Ubuntu%2Ftrusty")); break;
		
		default: die("<b>?os=</b> must be set as one of the following: (MAC, WIN32, WIN64, MAC_DEV, WIN32_DEV, WIN64_DEV, UNIX_DEV)"); break;
	}

	function get_dev_url_from_bintray($path)
	{
		$mac = file_get_contents("https://bintray.com/package/files/cockatrice/Cockatrice/Cockatrice-git?order=asc&sort=name&basePath=$path&tab=files");
		$mac_start = explode('<a class="nodeFileName" data-id="downloadRef" href="', $mac);
		$mac_link_set = explode('">', $mac_start[count($mac_start) - 1]);
		$mac_link = "https://bintray.com" . $mac_link_set[0];

		return $mac_link;
	}

	function get_stable_url_from_bintray($os)
	{
		$mac = file_get_contents("https://bintray.com/package/files/cockatrice/Cockatrice/Cockatrice?order=asc&sort=name&basePath=&tab=files");
		$mac_start = explode('<a class="nodeFileName" data-id="downloadRef" href="', $mac);

		$mac_link_set = explode('">', $mac_start[1]);
		$win32_link_set = explode('">', $mac_start[2]);
		$win64_link_set = explode('">', $mac_start[3]);
		
		$mac_link = "https://bintray.com" . $mac_link_set[0];
		$win32_link = "https://bintray.com" . $win32_link_set[0];
		$win64_link = "https://bintray.com" . $win64_link_set[0];
		
		switch ($os)
		{
			case "MAC": return $mac_link; break;
			case "WIN32": return $win32_link; break;
			case "WIN64": return $win64_link; break;
			default: return "Invalid OS"; break;
		}
	}
?>