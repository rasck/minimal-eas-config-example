import qa from './app.qa.json';
import prod from './app.production.json';

const baseConfig = {
	name: 'eas-config-example',
	slug: 'eas-config-example',
	owner: 'ntimhe',
	version: '1.0.0',
	orientation: 'portrait',
	splash: {
		image: './assets/splash.png',
		resizeMode: 'contain',
		backgroundColor: '#ffffff'
	},
	updates: {
		fallbackToCacheTimeout: 0
	},
	assetBundlePatterns: [ '**/*' ],
	ios: {
		supportsTablet: true
	},
	android: {
		versionCode: "{CI SYSTEM UPDATE THIS}",
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
			backgroundColor: '#FFFFFF'
		},
		package: 'com.rcknti.easconfigexample'
	},
	web: {
		favicon: './assets/favicon.png'
	}
};

module.exports = () => {
  // Based on APP_ENV environment variable we are able to use different icons
  // On the full blown app we are having two different app s. One for qa and production (e.g. different bundle identifiers for IOS).
  // This gives our QA the possibility to easy detect what app is the qa version and what is production
	switch (process.env.APP_ENV) {
		case 'production': {
			// Update android version code.
			// CI or anyone who calls eas build, should be able to do this dynamically by provding the
			// VERSION_CODE environment variable.
			const newConfig = { ...baseConfig, ...prod.expo };
			newConfig.android.versionCode = parseInt(process.env.VERSION_CODE, 10);
			return newConfig;
		}
		case 'qa': {
			const newConfig = { ...baseConfig, ...qa.expo };
      // The qa version doesnt reach play store
      newConfig.android.versionCode = 1
			return newConfig;
		}
    // other configs...
		default: {
			throw new Error('Could not create a config file based on environment: APP_ENV=' + process.env.APP_ENV);
		}
	}
};
