const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

const mainTabNavigation = {
  FEED_TAB: 'FeedTab',
  MAP_TAB: 'MapTab',
  CALENDAR_TAB: 'CalendarTab',
  SETTING_TAB: 'SeetingTab',
} as const;

export {authNavigations, mainTabNavigation};
