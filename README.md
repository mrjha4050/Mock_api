# Mock_api
# Proxy/Callout Rule Script

This project automates the process of creating a Proxy/Callout Rule in Beeceptor using Playwright.this makes the api handking easy .

## Overview

The script performs the following tasks:
1. Logs into Beeceptor using GitHub credentials.
2. Navigates to the target endpoint.
3. Configures a Proxy/Callout Rule with a unique `SOURCE_PATH`.
4. Saves the rule and validates its creation.
5. Captures debugging screenshots if any step fails.

## Prerequisites

- Node.js installed on your system.
- Playwright installed in your project.
- A `.env` file with your GitHub credentials.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
