export const detectOS = (): string => {
  const {userAgent, platform} = window.navigator
  const macPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']

  if (macPlatforms.includes(platform)) {
    return 'MacOS'
  } else if (iosPlatforms.includes(platform)) {
    return 'iOS'
  } else if (windowsPlatforms.includes(platform)) {
    return 'Windows'
  } else if (/Android/.test(userAgent)) {
    return 'Android'
  } else if (/Linux/.test(platform)) {
    return 'Linux'
  }
  return 'Unknown'
}