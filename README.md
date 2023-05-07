# php-benchmark-frontend

![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![css3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white) ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black) ![scss](https://img.shields.io/badge/SCss-CC6699?style=for-the-badge&logo=sass&logoColor=white) ![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) ![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) ![bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) ![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)


## Screenshots

![popup](php-benchmark-frontend-popup.png)

![main screen](php-benchmark-frontend-main-screen.png)

## Description

This is the frontend part, SPA, of php benchmark system, which provides graphical representation of results php benchmark script execution by time.

This app can help hosting providers and systems administrators to monitor, indirectly, changes in performance of servers.

## Backend

This app uses backend from this repository:

<https://github.com/thirdmadman/php-benchmark-backend>

## Deploy

Firstly, you have to deploy backend part of this application.

To deploy frontend part of app use:

```npm run build```

then copy content of **/dist** folder into same folder as backed part.

## Usage

Open frontend part, simply following to your backend root path.

Example:

```text
Your backend url: http://benchmark01.somesite.com/api.php
Your frontend url will be: http://benchmark01.somesite.com
```

Copy API key from deploy of your backend part, and paste it into popup "You are not signed in." window.
