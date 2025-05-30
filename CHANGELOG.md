# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.10.0] - 2025-05-27

## [2.9.3] - 2025-05-05

## [2.9.2] - 2025-04-30

## [2.9.1] - 2025-04-28

## [2.9.0] - 2025-04-25

## [2.8.2] - 2025-04-25

## [2.8.1] - 2025-04-12

## [2.8.0] - 2025-04-10

## [2.7.1] - 2025-04-04

## [2.7.0] - 2025-04-01

### Added

- Allow ads segmentation by SKU ID.

## [2.6.0] - 2025-03-25

## [2.5.0] - 2025-03-19

## [2.4.0] - 2025-02-14

## [2.3.0] - 2025-02-13

## [2.2.2] - 2024-11-01

### Added

- `getSponsoredBanners` request.
- `sponsoredBanners` resolver.

### Changed

- Update `@vtex/api` dependency to version 6.48.0

## [2.2.1] - 2024-08-12

## [2.2.0] - 2024-07-29

### Added

- Add the `enableAdsOnCollections` setting, determining whether or not to fetch sponsored products on collections.

## [2.1.1] - 2024-07-09

### Fixed

- Correct "not found" message from the Ad Server.

## [2.1.0] - 2024-07-09

### Added

- Pass `placement` and `count` from the frontend to the Ad Server.

## [2.0.0] - 2024-04-22

## [1.0.0] - 2024-04-22

## [0.7.5] - 2024-04-19

### Changed

- Remove billingOptions so that this app can be used as dependency.

## [0.7.4] - 2024-02-08

## [0.7.3] - 2024-02-08

## Fixed

- Correct "Ad not found" error message.

## [0.7.2] - 2024-02-07

## [0.7.1] - 2023-12-11

### Fixed

- Handles "Ad not found" error by returning an empty list.

## [0.7.0] - 2023-12-07

### Added

- Send `anonymousId` as `userId` to ad server. This is used on A/B testing.

## [0.6.1] - 2023-12-04

## [0.6.0] - 2023-12-01

### Added

- Pass the `options` field from the AdServer.

## [0.5.0] - 2023-10-24

### Changed

- Satisfies the new adserver-graphql schema, adding the advertisement field into the sponsored product directly.

## [0.4.0] - 2023-09-21

### Changed

- Update adserver-graphql dependency

## [0.0.3] - 2023-09-20

### Added

- Implement the resolver
