export const useEnv = () => {
  const ENV = import.meta.env;
  const {
    VITE_APP_TITLE,
    VITE_APP_URL,
    VITE_API_PREFIX,
    VITE_API_URL,
    VITE_UPLOAD_URL,
    VITE_IMG_URL,
    VITE_TEAM_NAME,
    VITE_GITHUB_URL,
    VITE_APP_VERSION,
  } = ENV;

  return {
    appTitle: VITE_APP_TITLE,
    appUrl: VITE_APP_URL,
    apiPrefix: VITE_API_PREFIX,
    apiUrl: VITE_API_URL,
    uploadUrl: VITE_UPLOAD_URL,
    imgUrl: VITE_IMG_URL,
    version: VITE_APP_VERSION,
    teamName: VITE_TEAM_NAME,
    teamGitHubURL: VITE_GITHUB_URL,
  };
};
