# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
