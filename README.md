# vuepress-blog-template

[![Build Status](https://img.shields.io/github/workflow/status/dvuckovic/vuepress-blog-template/Test)](https://github.com/dvuckovic/vuepress-blog-template/actions/workflows/checks.yml)
[![Powered by VuePress](https://img.shields.io/github/package-json/dependency-version/dvuckovic/vuepress-blog-template/dev/vuepress)](https://vuepress.vuejs.org)
[![License](https://img.shields.io/github/package-json/license/dvuckovic/vuepress-blog-template?color=white)](http://www.wtfpl.net/)

A VuePress blog template for static websites.

[Demo](https://vuepress.dvuckovic.com)

## Installation

### Dependencies

```sh
npm install --no-save
```

### Setup Environment

Create the `.env` file in the root folder, and set the following variables:

```
GOOGLE_MAPS_API_KEY=<your_google_maps_javascript_api_key>
GOOGLE_ANALYTICS_ID=<your_google_analytics_id>
OBJECT2VR_PLAYER=<url_to_object2vr_player_lib>
```

Links:
* [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials/)
* [Google Analytics Web](https://analytics.google.com/analytics/web/)
* [Object2VR](https://ggnome.com/object2vr/)

## Development Server

```sh
npm run dev
```

## Linting

```sh
npm run lint
```

## Production

```sh
npm start
```

### Build

```sh
npm run build
```

### Serve

```sh
npm run serve
```

## Testing

```sh
npm test
```

Or:

```sh
npm run serve
npm run test:all
```

### Unit Tests

```sh
npm run test:unit
npm run test:unit:debug
```

### End-to-end Tests

```sh
npm run test:e2e
npm run test:e2e:debug
```
